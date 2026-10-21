'use strict';

const express = require('express');
const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

// Tiny .env reader so no extra dependency is required.
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !Object.prototype.hasOwnProperty.call(process.env, match[1])) {
      process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
}

const app = express();
const port = Number(process.env.PORT || 3000);
const refreshMinutes = Math.max(10, Number(process.env.REFRESH_MINUTES || 30));
const projectRoot = path.resolve(__dirname, '..');
const parser = new Parser({
  timeout: 15000,
  headers: { 'User-Agent': 'CRIG-EKTettehLibrary-NewsReader/1.0 (publisher feed access; contact library administrator)' },
  customFields: { item: [['media:content', 'mediaContent'], ['content:encoded', 'contentEncoded']] }
});

let cache = { items: [], updatedAt: null, error: null };
let refreshInProgress = null;
let lastRefreshAttemptAt = 0;

function stripHtml(input = '') {
  return String(input).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/\s+/g, ' ').trim().slice(0, 1800);
}
function safeGraphicLink(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || !/(^|\.)graphic\.com\.gh$/i.test(url.hostname)) return '';
    return url.href;
  } catch { return ''; }
}
function publishedLabel(value) {
  if (!value) return 'Recently published';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Recently published' : date.toLocaleDateString('en-GH', { year: 'numeric', month: 'short', day: 'numeric' });
}

async function makeAiSummaries(items) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'put_your_openai_api_key_here') {
    throw new Error('AI is not configured yet. Add OPENAI_API_KEY to backend/.env.');
  }
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const promptItems = items.map((item, index) => ({
    id: index,
    title: item.title,
    description: item.description
  }));
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You summarize news metadata for a Ghanaian research library. Return JSON only in the shape {"stories":[{"id":0,"summary":"...","category":"..."}]}. For each item, write a neutral summary of at most 2 short sentences based only on the supplied title and description. Do not add facts or speculate. If context is insufficient, say the original article has more details. Category must be one of: Agriculture & Cocoa, Science & Research, Education, Ghana News, Business, Environment, Other. Prioritize agriculture, cocoa, science, education and environment when supported by the supplied information.' },
        { role: 'user', content: JSON.stringify(promptItems) }
      ]
    })
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`AI summary request failed (${response.status}). ${detail.slice(0, 240)}`);
  }
  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;
  if (!content) throw new Error('AI service returned an empty summary.');
  const parsed = JSON.parse(content);
  return Array.isArray(parsed.stories) ? parsed.stories : [];
}

async function refreshNews() {
  if (refreshInProgress) return refreshInProgress;
  refreshInProgress = (async () => {
    const feedUrl = process.env.GRAPHIC_RSS_URL;
    if (!feedUrl) throw new Error('Set GRAPHIC_RSS_URL in backend/.env after confirming the permitted feed URL.');
    let parsedUrl;
    try { parsedUrl = new URL(feedUrl); } catch { throw new Error('GRAPHIC_RSS_URL is not a valid URL.'); }
    if (parsedUrl.protocol !== 'https:' || !/(^|\.)graphic\.com\.gh$/i.test(parsedUrl.hostname)) {
      throw new Error('For safety, GRAPHIC_RSS_URL must be an HTTPS feed hosted on graphic.com.gh.');
    }
    const feed = await parser.parseURL(feedUrl);
    const items = (feed.items || []).map((item) => ({
      title: stripHtml(item.title || 'Untitled news story').slice(0, 260),
      description: stripHtml(item.contentSnippet || item.summary || item.content || item.contentEncoded || ''),
      link: safeGraphicLink(item.link),
      publishedAt: item.isoDate || item.pubDate || null
    })).filter(item => item.title && item.link).slice(0, 10);
    if (!items.length) throw new Error('The feed returned no usable stories. Check the feed URL or ask Graphic Online for its approved feed details.');
    const aiStories = await makeAiSummaries(items);
    const byId = new Map(aiStories.map(story => [Number(story.id), story]));
    cache = {
      items: items.map((item, index) => {
        const ai = byId.get(index) || {};
        return {
          id: `${Buffer.from(item.link).toString('base64url').slice(0, 24)}`,
          title: item.title,
          summary: stripHtml(ai.summary || 'Please open the original article for details.'),
          category: stripHtml(ai.category || 'Ghana News').slice(0, 40),
          link: item.link,
          publishedAt: item.publishedAt,
          publishedLabel: publishedLabel(item.publishedAt)
        };
      }),
      updatedAt: new Date().toISOString(),
      error: null
    };
    return cache;
  })();
  try { return await refreshInProgress; }
  catch (error) {
    cache.error = error.message || 'News refresh failed.';
    throw error;
  } finally { refreshInProgress = null; }
}

app.disable('x-powered-by');
app.use((req, res, next) => {
  if (req.path.startsWith('/backend') || req.path === '/.env' || req.path.includes('/.env')) return res.status(404).end();
  next();
});
app.get('/api/health', (_req, res) => res.json({ ok: true, aiConfigured: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'put_your_openai_api_key_here'), feedConfigured: Boolean(process.env.GRAPHIC_RSS_URL), refreshMinutes }));
app.get('/api/graphic-news', async (req, res) => {
  const freshEnough = cache.updatedAt && (Date.now() - new Date(cache.updatedAt).getTime() < refreshMinutes * 60 * 1000);
  const forceAllowed = req.query.refresh && Date.now() - lastRefreshAttemptAt > 5 * 60 * 1000;
  if (freshEnough && !forceAllowed) return res.json(cache);
  if (Date.now() - lastRefreshAttemptAt < 60 * 1000 && cache.updatedAt) return res.json(cache);
  lastRefreshAttemptAt = Date.now();
  try { return res.json(await refreshNews()); }
  catch (error) {
    return res.status(503).json({ error: error.message || 'News is temporarily unavailable.', items: cache.items, updatedAt: cache.updatedAt });
  }
});

app.use(express.static(projectRoot, { dotfiles: 'deny', extensions: ['html'] }));
app.get('*', (_req, res) => res.sendFile(path.join(projectRoot, 'index.html')));

app.listen(port, () => {
  console.log(`CRIG E-Library running at http://localhost:${port}`);
  console.log(`Graphic Online news refresh interval: ${refreshMinutes} minutes`);
  if (!process.env.OPENAI_API_KEY) console.warn('Add OPENAI_API_KEY to backend/.env to enable AI summaries.');
  // Warm the cache after startup. Feed access must be permitted by the publisher.
  refreshNews().catch(err => console.warn(`Initial news refresh not completed: ${err.message}`));
  setInterval(() => refreshNews().catch(err => console.warn(`Scheduled news refresh failed: ${err.message}`)), refreshMinutes * 60 * 1000);
});
