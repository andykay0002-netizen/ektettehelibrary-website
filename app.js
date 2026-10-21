const app = document.getElementById("app");

const divisions = [
  ["Plant Pathology", "leaf", "Research on cocoa diseases, pathogens, diagnosis, prevention and sustainable crop protection."],
  ["Plant Breeding", "leaf", "Resources on cocoa genetics, improved planting materials, breeding programmes and crop resilience."],
  ["Soil Science", "leaf", "Knowledge on soil fertility, soil health, nutrient management and sustainable cocoa-growing landscapes."],
  ["Entomology", "bug", "Studies of cocoa insects and pests, beneficial organisms, pest monitoring and integrated pest management."],
  ["Agronomy", "leaf", "Practical and scientific guidance on cocoa cultivation, farm management, productivity and good agricultural practices."],
  ["Physio/Biochem", "flask", "Research on plant physiology, biochemistry, cocoa quality, plant processes and laboratory-based findings."],
  ["SSSU", "leaf", "Socio-economic and supporting research resources covering farmer livelihoods, adoption, statistics and sustainable cocoa systems."]
];

const categories = [
  {title:"Journals/Books", icon:"book-open", desc:"Research journals, books and scholarly publications"},
  {title:"Technical Bulletin", icon:"file-text", desc:"Technical publications and research bulletins"},
  {title:"Cocoa", icon:"leaf", desc:"Cocoa research, cultivation and industry resources"},
  {title:"References", icon:"layers", desc:"Reference materials, guides and supporting resources"},
  {title:"Reports", icon:"report", desc:"Annual and progress reports from the Institute"},
  {title:"Current Periodicals", icon:"newspaper", desc:"Recent journals, magazines and periodicals"},
  {title:"Management Books", icon:"layers", desc:"Management, administration and leadership resources"},
  {title:"Thesis Collection", icon:"book-open", desc:"Browse student theses, dissertations and academic research projects"}
];

function icon(name, size=28) {
  const common = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
  const paths = {
    leaf:`<path d="M20.8 3.2C12.5 3.2 5.1 5.6 3.3 12.2c-1.1 4 1.6 7.5 5.4 7.5 6.9 0 11.8-6.7 12.1-16.5Z"/><path d="M3.8 20.2c3.2-5.6 7.3-8.8 12.5-11.2"/>`,
    bug:`<rect x="7" y="7" width="10" height="11" rx="5"/><path d="M9 4v3M15 4v3M4 10h3M17 10h3M4 15h3M17 15h3M9 18v2M15 18v2"/>`,
    flask:`<path d="M9 3h6M10 3v6l-5.2 8.7A2.2 2.2 0 0 0 6.7 21h10.6a2.2 2.2 0 0 0 1.9-3.3L14 9V3"/><path d="M8 15h8"/>`,
    "book-open":`<path d="M3.5 5.5A2.5 2.5 0 0 1 6 3h4a2 2 0 0 1 2 2v15a2 2 0 0 0-2-2H6a2.5 2.5 0 0 0-2.5 2.5v-15Z"/><path d="M20.5 5.5A2.5 2.5 0 0 0 18 3h-4a2 2 0 0 0-2 2v15a2 2 0 0 1 2-2h4a2.5 2.5 0 0 1 2.5 2.5v-15Z"/>`,
    "file-text":`<path d="M6 2.8h8l4 4V21H6z"/><path d="M14 2.8v4h4M9 11h6M9 15h6M9 18h4"/>`,
    report:`<path d="M5 3h14v18H5z"/><path d="M8 17v-5M12 17V8M16 17v-8"/>`,
    newspaper:`<path d="M4 4h16v16H4z"/><path d="M7 8h5M7 11h5M7 14h5M14 8h3v3h-3zM14 14h3"/>`,
    layers:`<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>`,
    search:`<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>`,
    shield:`<path d="M12 3 20 6v5c0 5-3.3 8.8-8 10-4.7-1.2-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-5"/>`,
    user:`<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.8-3.5 3.1-5.3 7-5.3s6.2 1.8 7 5.3"/>`,
    chat:`<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8.4 8.4 0 0 1-3.1-.6L4 20l1.5-4.1A7.5 7.5 0 1 1 20 11.5Z"/><path d="M9 11.5h.01M12 11.5h.01M15 11.5h.01"/>`,
    arrow:`<path d="M5 12h13M13 6l6 6-6 6"/>`,
    logout:`<path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 4h5v16h-5"/>`,
    close:`<path d="m6 6 12 12M18 6 6 18"/>`,
    upload:`<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>`,
    trash:`<path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6"/>`,
    calendar:`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>`,
    bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>`,
    download:`<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>`,
    check:`<path d="m5 12 4 4L19 6"/>`
  };
  return `<svg ${common}>${paths[name] || paths.leaf}</svg>`;
}

function logoMarkup() {
  return `<div class="brand-mark crig-mark" aria-label="Cocoa Research Institute of Ghana logo"><img src="assets/crig-logo.png" alt="Cocoa Research Institute of Ghana logo"></div>`;
}

let heroIndex = 0;
let heroTimer = null;
const heroSlides = [
  {image:"assets/hero-cocoa.jpg", kicker:"COCOA RESEARCH & INNOVATION", title:"Knowledge rooted in cocoa.", text:"Discover research, publications and trusted knowledge from the Cocoa Research Institute of Ghana.", button:"Explore the E-Library"},
  {image:"assets/hero-research.jpg", kicker:"RESEARCH & DISCOVERY", title:"Research that moves Ghana forward.", text:"Access a curated digital collection designed for researchers, students, scientists and knowledge professionals.", button:"Browse Publications"},
  {image:"assets/hero-library.jpg", kicker:"E. K. TETTEH LIBRARY", title:"A library built for discovery.", text:"Find journals, books, technical bulletins, annual reports and current periodicals in one professional digital space.", button:"Enter Library"},
  {image:"assets/hero-digital.jpg", kicker:"DIGITAL KNOWLEDGE", title:"Your research, wherever you are.", text:"A modern gateway to the Institute's knowledge resources — available when you need them.", button:"Get Started"}
];

function homePage() {
  app.innerHTML = `
    <div class="public-home">
      <header class="public-header">
        <div class="public-brand">
          ${logoMarkup()}
          <div><strong>COCOA RESEARCH INSTITUTE OF GHANA</strong><span>E. K. TETTEH LIBRARY</span></div>
        </div>
        <nav class="public-nav">
          <a href="#home">Home</a><a href="#about" onclick="openCRIGLibraryPage();return false">About CRIG Library</a><a href="#ek-tetteh" onclick="openEKTettehPage();return false">About E.K. Tetteh</a><a href="#collections" onclick="goToLogin('user')">Collections</a><a href="#contact" onclick="openChat()">Contact</a>
          <button class="public-login" onclick="showLoginForm('user')">${icon("user",16)} User Login</button>
          <button class="public-admin" onclick="showLoginForm('admin')">${icon("shield",16)} Admin</button>
        </nav>
      </header>

      <main>
        <section class="hero-carousel" id="home">
          <div class="hero-media" id="heroMedia"></div>
          <div class="hero-shade"></div>
          <div class="hero-copy" id="heroCopy"></div>
          <button class="hero-arrow hero-prev" onclick="changeHero(-1)" aria-label="Previous slide">‹</button>
          <button class="hero-arrow hero-next" onclick="changeHero(1)" aria-label="Next slide">›</button>
          <div class="hero-dots" id="heroDots"></div>
          <div class="hero-progress"><span id="heroProgress"></span></div>
          <div class="hover-next-zone" onmouseenter="hoverAdvance()"></div>
        </section>

        <section class="home-intro" id="about">
          <div><span class="section-kicker">CENTRE OF EXCELLENCE</span><h2>Welcome to the E.K. Tetteh Library</h2><p>A professional digital gateway to cocoa research, scientific publications and institutional knowledge. Built to make trusted information easier to discover, browse and use.</p></div>
          <div class="intro-actions"><button class="gold-btn" onclick="showLoginForm('user')">Access the Library ${icon("arrow",17)}</button><button class="outline-btn" onclick="openChat()">Need Help? Chat with us</button></div>
        </section>

        <section class="public-news-section" id="latest-news"><div class="section-heading"><div><span class="section-kicker">CRIG LIBRARY UPDATES</span><h2>News & Announcements</h2><p>Latest notices and updates from the E.K. Tetteh Library.</p></div><button class="outline-btn" onclick="showLoginForm('user')">Sign in to the Library ${icon('arrow',15)}</button></div><div id="publicNewsList" class="news-card-grid"></div></section>

        <section class="graphic-news-section" id="graphic-news"><div class="section-heading"><div><span class="section-kicker">AI-POWERED NEWS</span><h2>Latest from Graphic Online</h2><p>Automatically refreshed headlines with AI-generated summaries. Open the original story on Graphic Online for full details.</p></div><button class="outline-btn" onclick="refreshGraphicNews(true)">${icon('newspaper',15)} Refresh News</button></div><div id="graphicNewsUpdated" class="graphic-news-updated">Connecting to news service…</div><div id="graphicNewsList" class="news-card-grid"><div class="news-empty"><strong>Loading latest headlines…</strong><p>News will appear here when the service is connected.</p></div></div><p class="graphic-news-credit">Source: Graphic Online. AI summaries are for quick reference and may omit context. Please read the original article. News feed use is subject to the publisher’s permission and terms.</p></section>

        <section class="home-cards" id="collections">
          <article><div class="home-card-icon">${icon("book-open",28)}</div><span>01</span><h3>Scholarly Collection</h3><p>Journals, books and research materials for informed study and discovery.</p></article>
          <article><div class="home-card-icon">${icon("report",28)}</div><span>02</span><h3>Institute Publications</h3><p>Technical bulletins, annual reports and current institutional resources.</p></article>
          <article><div class="home-card-icon">${icon("search",28)}</div><span>03</span><h3>Easy Discovery</h3><p>Browse by division or search titles and authors through one focused portal.</p></article>
          <article><div class="home-card-icon">${icon("chat",28)}</div><span>04</span><h3>Library Support</h3><p>Need assistance? Send a message directly to the library support team.</p></article>
        </section>
      </main>

      <footer class="public-footer" id="contact">
        <div class="footer-top">
          <div class="footer-brand-block">${logoMarkup()}<div><strong>E. K. TETTEH LIBRARY</strong><span>Cocoa Research Institute of Ghana</span><small>Centre of Excellence</small></div></div>
          <div><h4>Library</h4><a onclick="openCRIGLibraryPage()">About CRIG Library</a><a onclick="openEKTettehPage()">About E.K. Tetteh</a><a onclick="showLoginForm('user')">User Login</a><a onclick="showLoginForm('admin')">Administration</a><a onclick="openChat()">Need Help?</a></div>
          <div><h4>Collections</h4><a onclick="showLoginForm('user')">Journals & Books</a><a onclick="showLoginForm('user')">Technical Bulletins</a><a onclick="showLoginForm('user')">Reports</a></div>
          <div><h4>Support</h4><p>Digital Library Portal</p><p>Research & Knowledge Services</p><button onclick="openChat()">Chat with us ${icon("arrow",14)}</button></div>
        </div>
        <div class="footer-bottom"><span>© 2026 Cocoa Research Institute of Ghana • E.K. Tetteh Library</span><span>Knowledge for a Sustainable Cocoa Industry</span></div>
      </footer>
    </div>`;
  renderHero();
  renderNews('publicNewsList');
  loadGraphicNews();
  startHero();
}

function renderHero(){
  const slide=heroSlides[heroIndex];
  const media=document.getElementById("heroMedia");
  if(!media)return;
  media.style.backgroundImage=`url("${slide.image}")`;
  document.getElementById("heroCopy").innerHTML=`<span class="hero-kicker">${slide.kicker}</span><h1>${slide.title}</h1><p>${slide.text}</p><button class="hero-cta" onclick="showLoginForm('user')">${slide.button} ${icon("arrow",17)}</button>`;
  document.getElementById("heroDots").innerHTML=heroSlides.map((_,i)=>`<button class="${i===heroIndex?'active':''}" onclick="setHero(${i})" aria-label="Slide ${i+1}"></button>`).join("");
  const progress=document.getElementById("heroProgress"); if(progress){progress.style.animation="none"; void progress.offsetWidth; progress.style.animation="heroProgress 6s linear";}
}
function startHero(){ clearInterval(heroTimer); heroTimer=setInterval(()=>changeHero(1),6000); }
function setHero(i){heroIndex=(i+heroSlides.length)%heroSlides.length; renderHero(); startHero();}
function changeHero(dir){setHero(heroIndex+dir);}
function hoverAdvance(){ clearTimeout(window.__hoverAdvance); window.__hoverAdvance=setTimeout(()=>changeHero(1),750); }

function goToLogin(role){showLoginForm(role);}
function loginScreen(){homePage();}


const DB_NAME = "crigElibraryDB";
const DB_STORE = "resources";
function openLibraryDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,1);
    req.onupgradeneeded=()=>{ if(!req.result.objectStoreNames.contains(DB_STORE)) req.result.createObjectStore(DB_STORE,{keyPath:"id",autoIncrement:true}); };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}
async function saveResource(resource){
  const db=await openLibraryDB();
  return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readwrite"); tx.objectStore(DB_STORE).add(resource); tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error);});
}
async function getResources(){
  try{const db=await openLibraryDB(); return await new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readonly"); const req=tx.objectStore(DB_STORE).getAll(); req.onsuccess=()=>resolve(req.result||[]); req.onerror=()=>reject(req.error);});}catch(e){return [];}
}
async function deleteResource(id){
  const db=await openLibraryDB();
  return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readwrite"); tx.objectStore(DB_STORE).delete(id); tx.oncomplete=()=>resolve(); tx.onerror=()=>reject(tx.error);});
}
async function getResource(id){
  const db=await openLibraryDB();
  return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readonly"); const req=tx.objectStore(DB_STORE).get(id); req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);});
}
function resourceIcon(type){ return type==='Book'?'book-open':type==='Research'?'flask':type==='Publication'?'file-text':type==='Annual Report'?'report':type==='Technical Bulletin'?'file-text':'newspaper'; }
async function handleResourceUpload(e){
  e.preventDefault();
  const form=e.target, file=form.querySelector('[name=file]').files[0];
  if(!file){toast('Please choose a document to upload.');return;}
  const resource={title:form.title.value.trim(), author:form.author.value.trim(), type:form.type.value, division:form.division.value, year:form.year.value||new Date().getFullYear(), description:form.description.value.trim(), fileName:file.name, fileType:file.type||'application/octet-stream', fileSize:file.size, blob:file, createdAt:new Date().toISOString()};
  try{await saveResource(resource); form.reset(); toast('Resource uploaded successfully to the E-Library.'); await renderAdminResources();}
  catch(err){console.error(err);toast('Upload failed. Try a smaller file or check browser storage permissions.');}
}
async function renderAdminResources(){
  const target=document.getElementById('adminResources'); if(!target)return;
  const resources=await getResources();
  const count=document.getElementById('resourceCount'); if(count) count.textContent=`${resources.length} resource${resources.length===1?'':'s'}`;
  if(!resources.length){target.innerHTML=`<div class="resource-empty"><div>${icon('book-open',40)}</div><h3>No resources uploaded yet</h3><p>Use the upload panel to add books, publications, research papers, reports and bulletins.</p></div>`;return;}
  target.innerHTML=resources.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(r=>`<article class="resource-row"><div class="resource-type-icon">${icon(resourceIcon(r.type),23)}</div><div class="resource-main"><div class="resource-title-line"><h3>${escapeHtml(r.title)}</h3><span>${escapeHtml(r.type)}</span></div><p>${escapeHtml(r.description||'No description provided.')}</p><small>${escapeHtml(r.author||'Unknown author')} • ${escapeHtml(r.year)} • ${escapeHtml(r.division||'General Collection')} • ${formatBytes(r.fileSize)}</small></div><div class="resource-actions"><button onclick="downloadResource(${r.id})" title="Download">${icon('download',16)}</button><button class="danger" onclick="removeResource(${r.id})" title="Delete">${icon('trash',16)}</button></div></article>`).join('');
}
function formatBytes(bytes){if(!bytes)return '0 KB';const units=['B','KB','MB','GB'];const i=Math.floor(Math.log(bytes)/Math.log(1024));return `${(bytes/Math.pow(1024,i)).toFixed(i?1:0)} ${units[i]}`;}
async function downloadResource(id){
 const role=localStorage.getItem('elibraryRole');
 if(role==='admin'){const r=await getResource(id);if(r)startResourceDownload(r);return;}
 const userEmail=localStorage.getItem('elibraryUserEmail')||'user@library.gh';
 const requests=readLocalRecords('crigDownloadRequests');
 const req=requests.find(x=>Number(x.resourceId)===Number(id)&&x.userEmail===userEmail&&x.status==='Approved');
 if(!req){toast('Please open and view this publication first, then request download approval from the administrator.');return;}
 const r=await getResource(id);if(r)startResourceDownload(r);
}
function startResourceDownload(r){const url=URL.createObjectURL(r.blob);const a=document.createElement('a');a.href=url;a.download=r.fileName||r.title;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
async function openResourceViewer(id){
 const r=await getResource(id);if(!r)return;
 const userEmail=localStorage.getItem('elibraryUserEmail')||'user@library.gh';
 const viewed=JSON.parse(localStorage.getItem('crigViewedResources')||'{}');viewed[userEmail]=viewed[userEmail]||[];if(!viewed[userEmail].includes(Number(id)))viewed[userEmail].push(Number(id));localStorage.setItem('crigViewedResources',JSON.stringify(viewed));
 const url=URL.createObjectURL(r.blob);const isPdf=(r.fileType||'').includes('pdf')||/\.pdf$/i.test(r.fileName||'');const isImage=(r.fileType||'').startsWith('image/');
 app.insertAdjacentHTML('beforeend',`<div class="modal-backdrop" id="resourceViewerModal"><section class="resource-viewer-modal"><header><div><span class="modal-kicker">PUBLICATION PREVIEW</span><h2>${escapeHtml(r.title)}</h2><p>${escapeHtml(r.author||'Library Collection')} · ${escapeHtml(r.year||'')}</p></div><button onclick="document.getElementById('resourceViewerModal')?.remove()">×</button></header><div class="resource-viewer-body">${isPdf?`<iframe title="Publication preview" src="${url}" style="width:100%;height:65vh;border:0"></iframe>`:isImage?`<img src="${url}" alt="${escapeHtml(r.title)}" style="max-width:100%;max-height:65vh;display:block;margin:auto">`:`<div class="resource-preview-fallback"><div>${icon('file-text',40)}</div><h3>Open and review this publication</h3><p>This file type may not preview inside the website. Open the document in a new tab to review it before requesting a download.</p><a href="${url}" target="_blank" rel="noopener">Open ${escapeHtml(r.fileName||'publication')} ↗</a></div>`}</div><footer><span>After reviewing the publication, you may request permission to download it.</span><button class="crig-btn" onclick="requestPublicationDownload(${Number(id)});document.getElementById('resourceViewerModal')?.remove()">Request download approval</button></footer></section></div>`);
}
function requestPublicationDownload(id){const userEmail=localStorage.getItem('elibraryUserEmail')||'user@library.gh';const viewed=JSON.parse(localStorage.getItem('crigViewedResources')||'{}');if(!(viewed[userEmail]||[]).includes(Number(id))){toast('Please open and view the publication first.');return;}const resourcesRequest=readLocalRecords('crigDownloadRequests');const existing=resourcesRequest.find(x=>Number(x.resourceId)===Number(id)&&x.userEmail===userEmail&&['Pending','Approved'].includes(x.status));if(existing){toast(existing.status==='Approved'?'Your download has already been approved. Return to the publication list to download it.':'Your download request is already waiting for admin approval.');return;}getResource(id).then(r=>{if(!r)return;resourcesRequest.push({id:'DL-'+Date.now(),resourceId:Number(id),title:r.title,userEmail,userName:localStorage.getItem('elibraryUserName')||userEmail,status:'Pending',requestedAt:new Date().toISOString()});writeLocalRecords('crigDownloadRequests',resourcesRequest);toast('Download request sent to the administrator.');loadUserResources();});}
function userDownloadButton(r){const userEmail=localStorage.getItem('elibraryUserEmail')||'user@library.gh';const requests=readLocalRecords('crigDownloadRequests');const req=requests.find(x=>Number(x.resourceId)===Number(r.id)&&x.userEmail===userEmail);const viewed=JSON.parse(localStorage.getItem('crigViewedResources')||'{}');if(req&&req.status==='Approved')return `<button onclick="downloadResource(${r.id})">${icon('download',16)} Download approved</button>`;if(req&&req.status==='Pending')return `<button disabled title="Waiting for admin approval">Request pending</button>`;return `<button onclick="openResourceViewer(${r.id})">${icon('book-open',16)} View publication</button>`;}
function readLocalRecords(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
function writeLocalRecords(key,items){localStorage.setItem(key,JSON.stringify(items));}
async function removeResource(id){if(!confirm('Delete this resource from the E-Library?'))return;await deleteResource(id);toast('Resource removed.');await renderAdminResources();}
let activeDivisionFilter = '';
let activeCategoryFilter = '';
async function loadUserResources(){
 const target=document.getElementById('userResources');if(!target)return;
 let resources=await getResources();
 if(activeDivisionFilter) resources=resources.filter(r=>(r.division||'General Collection')===activeDivisionFilter);
 if(activeCategoryFilter){const key=activeCategoryFilter.toLowerCase();const terms=key.includes('journal')||key.includes('book')?['book','journal']:key.includes('technical')?['technical bulletin']:key.includes('annual')?['annual report']:key.includes('progress')?['progress report']:key.includes('report')?['annual report','progress report']:key.includes('reference')?['reference']:key.includes('cocoa')?['cocoa']:key.includes('periodical')?['current periodical']:key.includes('management')?['management','book']:[];resources=resources.filter(r=>terms.some(t=>(r.type||'').toLowerCase().includes(t)||(r.title||'').toLowerCase().includes(t)||(r.description||'').toLowerCase().includes(t))||(r.title||'').toLowerCase().includes(key.split('/')[0]));}
 if(!resources.length){target.innerHTML=`<div class="resource-empty compact"><div>${icon('book-open',32)}</div><h3>${activeDivisionFilter||activeCategoryFilter?'No matching resources in this selection':'No publications uploaded yet'}</h3><p>${activeDivisionFilter?'The library has not uploaded a resource for this division yet. Try another division or return to all resources.':'New books, publications and research uploaded by the library administrator will appear here.'}</p><button class="borrower-secondary" onclick="clearLibraryFilters()">Show all resources</button></div>`;return;}
 target.innerHTML=resources.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(r=>`<article class="user-resource"><div class="user-resource-icon">${icon(resourceIcon(r.type),22)}</div><div><span>${escapeHtml(r.type)} · ${escapeHtml(r.division||'General Collection')}</span><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.author||'Library Collection')} • ${escapeHtml(r.year)}</p><small>${escapeHtml(r.description||'Available through the E.K. Tetteh Library digital collection.')}</small></div>${userDownloadButton(r)}</article>`).join('');
}
function clearLibraryFilters(){activeDivisionFilter='';activeCategoryFilter='';document.querySelectorAll('.division-item').forEach(x=>x.classList.remove('active'));document.getElementById('contentTitle').textContent='Explore our collection';document.getElementById('contentSubtitle').textContent='Discover trusted research, scholarly publications and institutional knowledge from the Cocoa Research Institute of Ghana.';loadUserResources();}

function showLoginForm(role) {
  const label = role === "admin" ? "Administrator" : "Library User";
  const demoUser = role === "admin" ? "admin@crig.gov.gh" : "user@library.gh";
  app.innerHTML = `
    <main class="auth-page">
      <section class="auth-welcome" aria-label="Welcome to the E.K. Tetteh Library">
        <video class="auth-welcome-video" autoplay muted loop playsinline controls preload="metadata" poster="assets/hero-library.JPG">
          <source src="assets/library-welcome.mp4" type="video/mp4">
          Your browser does not support HTML video.
        </video>
        <div class="auth-welcome-shade"></div>
        <div class="auth-welcome-copy">
          <span class="auth-welcome-kicker">COCOA RESEARCH INSTITUTE OF GHANA</span>
          <h2>Welcome to the<br>E. K. Tetteh Library</h2>
          <p>Discover the people, place and research behind Ghana's cocoa knowledge.</p>
          <span class="auth-welcome-caption">Research • Knowledge • Discovery</span>
        </div>
      </section>
      <div class="auth-card">
        <div class="auth-header">
          <button class="back-btn" onclick="homePage()">← Back to Home</button>
          ${logoMarkup()}
          <span class="auth-badge">${role === "admin" ? icon("shield",15) : icon("user",15)} ${label}</span>
        </div>
        <div class="auth-body">
          <h1>${role === "admin" ? "Admin Login" : "Users Login"}</h1>
          <p>Sign in to continue to the E.K. Tetteh Library.</p>
          <form onsubmit="handleLogin(event, '${role}')">
            <label>Email address<input id="email" type="email" value="${demoUser}" required autocomplete="username"></label>
            <label>Password<input id="password" type="password" value="library123" required autocomplete="current-password"></label>
            <div class="form-row"><label class="remember"><input type="checkbox" checked> Remember me</label><a href="#" onclick="event.preventDefault(); openPasswordReset('${role}')">Forgot password?</a></div>
            <button class="primary-btn" type="submit">Sign In ${icon("arrow",18)}</button>
          </form>
          <div class="demo-box"><strong>Demo access</strong><span>Email: ${demoUser}</span><span>Password: library123</span></div>
        </div>
      </div>
    </main>`;
}

function handleLogin(e, role) {
  e.preventDefault();
  const email=document.getElementById('email')?.value.trim().toLowerCase()||'';
  const password=document.getElementById('password')?.value||'';
  let account=null;
  if(role==='admin'){
    const admins=getAdminAccounts();account=admins.find(a=>a.email.toLowerCase()===email&&a.password===password);
  }else{
    const demoEmail='user@library.gh';const savedPassword=localStorage.getItem('elibraryPassword:user')||'library123';if(email===demoEmail&&password===savedPassword)account={email,name:'Library User',role:'user'};
  }
  if(!account){toast('The email or password is incorrect. Check your account details and try again.');return;}
  localStorage.setItem('elibraryLoggedIn','true');localStorage.setItem('elibraryRole',role);localStorage.setItem('elibraryUserEmail',account.email);localStorage.setItem('elibraryUserName',account.name||account.email);localStorage.setItem('elibraryAdminId',account.id||'');
  const history=readLocalRecords('crigLoginHistory');history.push({id:'LOGIN-'+Date.now(),email:account.email,name:account.name||account.email,role,loggedAt:new Date().toISOString(),userAgent:navigator.userAgent});writeLocalRecords('crigLoginHistory',history);
  role === 'admin' ? adminDashboard() : dashboard();
}
function openPasswordReset(role){
  const demoEmail=role==='admin'?'admin@crig.gov.gh':'user@library.gh';
  app.insertAdjacentHTML('beforeend',`<div class="modal-backdrop" id="passwordResetModal"><section class="chat-modal password-reset-modal"><div class="chat-modal-head"><div><span class="modal-kicker">ACCOUNT RECOVERY</span><h2>Reset your password</h2><p>Demo recovery for this browser. Enter the account email and choose a new password.</p></div><button type="button" onclick="document.getElementById('passwordResetModal')?.remove()">×</button></div><form class="password-reset-form" onsubmit="savePasswordReset(event,'${role}','${demoEmail}')"><label>Account email<input name="resetEmail" type="email" required placeholder="${demoEmail}"></label><label>New password<input name="newPassword" type="password" minlength="6" required placeholder="At least 6 characters"></label><label>Confirm new password<input name="confirmPassword" type="password" minlength="6" required placeholder="Re-enter new password"></label><button class="primary-btn" type="submit">Save new password</button></form></section></div>`);
}
function savePasswordReset(e,role,expectedEmail){e.preventDefault();const f=e.currentTarget;const email=f.elements.resetEmail.value.trim().toLowerCase();const pass=f.elements.newPassword.value;if(email!==expectedEmail){toast('That email does not match the demo account for this login.');return;}if(pass!==f.elements.confirmPassword.value){toast('The passwords do not match.');return;}localStorage.setItem('elibraryPassword:'+role,pass);if(role==='admin'){const admins=getAdminAccounts();const primary=admins.find(a=>a.id==='admin-1');if(primary){primary.password=pass;writeLocalRecords('crigAdminAccounts',admins);}}document.getElementById('passwordResetModal')?.remove();toast('Password reset successfully in this browser. You can now sign in with your new password.');}

function dashboard() {
  app.innerHTML = `
  <div class="shell">
    <header class="top-header">
      <div class="top-brand">${logoMarkup()}<div><h1>COCOA RESEARCH INSTITUTE OF GHANA</h1><h2>E. K. TETTEH LIBRARY</h2><span>Centre of Excellence</span></div></div>
      <div class="top-actions">
        <div class="search-box">${icon("search",18)}<input id="globalSearch" placeholder="Search publications, titles, authors..." oninput="filterCards(this.value)"><kbd>⌘ K</kbd></div>
        <button class="crig-btn user-borrow-button" onclick="openBorrowRequest()">${icon("book-open",16)} Borrow a Book</button><div class="user-chip" onclick="toggleUserMenu()">${icon("user",18)} <span>Library User</span> <b>⌄</b></div>
        <div id="userMenu" class="user-menu"><button onclick="toast('Profile settings will be connected to the library database.')">Profile</button><button onclick="logout()">Sign out</button></div>
      </div>
    </header>

    <div class="main-layout">
      <aside class="left-sidebar">
        <div class="section-title">${icon("book-open",20)} <span>Publication</span></div>
        <div class="sidebar-block about-sidebar-block">
          <div class="side-heading">${icon("book-open",17)} <span>About the Library</span></div>
          <div class="division-list">
            <button class="division-item" onclick="openCRIGLibraryPage()">${icon('layers',17)}<span>About CRIG Library</span><b>›</b></button>
            <button class="division-item" onclick="openEKTettehPage()">${icon('user',17)}<span>About E.K. Tetteh</span><b>›</b></button>
          </div>
        </div>
        <div class="sidebar-block division-sidebar-block">
          <div class="side-heading">${icon("leaf",17)} <span>Research Divisions</span></div>
          <div class="division-list">
            ${divisions.map((d,i)=>`<button class="division-item" title="${d[2]}" onclick="openDivisionPage('${d[0]}')">${icon(d[1],17)}<span>${d[0]}</span><b>›</b></button>`).join("")}
          </div>
        </div>
      </aside>

      <main class="content-area">
        <div class="welcome-row">
          <div><p class="overline">E-LIBRARY COLLECTION</p><h2 id="contentTitle">Explore our collection</h2><p id="contentSubtitle">Discover trusted research, scholarly publications and institutional knowledge from the Cocoa Research Institute of Ghana.</p></div>
          <div class="stats"><div><strong>5</strong><span>Collections</span></div><div><strong>7</strong><span>Divisions</span></div><div><strong>24/7</strong><span>Access</span></div></div>
        </div>
        <section class="category-grid" id="categoryGrid">
          ${categories.map(c=>`
          <button class="category-card" data-search="${c.title.toLowerCase()} ${c.desc.toLowerCase()}" onclick="openCategory('${c.title}')">
            <div class="card-icon">${icon(c.icon,42)}</div><h3>${c.title}</h3><p>${c.desc}</p><span class="circle-arrow">${icon("arrow",18)}</span>
          </button>`).join("")}
        </section>
        <section id="borrowRequestPanel" class="user-library-section borrow-request-panel" style="display:none"><div class="section-heading"><div><span class="overline">ONLINE BORROWING</span><h3>Request to Borrow a Library Item</h3><p>Complete this online form. Your request will remain pending until a library administrator reviews and approves it.</p></div><button class="borrower-secondary" onclick="closeBorrowRequest()">Close</button></div><form class="borrower-form user-borrow-form" onsubmit="submitBorrowRequest(event)"><div class="borrower-fields"><div class="borrower-field-column"><label>Full name<input name="borrower" required placeholder="Your full name"></label><label>Student / staff ID<input name="classNumber" required placeholder="Your institutional ID"></label><label>Email address<input name="email" type="email" required placeholder="you@example.com"></label><label>Phone number<input name="phone" type="tel" required placeholder="e.g. 024 000 0000"></label></div><div class="borrower-field-column"><label>Book / publication title<input name="title" required placeholder="Title you wish to borrow"></label><label>Author / researcher<input name="author" placeholder="Author if known"></label><label>Division<select name="division" required>${divisions.map(d=>`<option value="${d[0]}">${d[0]}</option>`).join('')}<option value="General Collection">General Collection</option></select></label><label>Number of volumes<input name="volumes" type="number" min="1" value="1" required></label></div></div><div class="borrower-fields request-dates"><div class="borrower-field-column"><label>Requested collection date<input name="borrowDate" type="date" required></label></div><div class="borrower-field-column"><label>Preferred return date and time<input name="returnAt" type="datetime-local" required></label></div></div><label>Reason / notes<textarea name="notes" rows="3" placeholder="Optional: add a short note for the librarian"></textarea></label><div class="borrower-reminder-note">${icon('bell',18)} <span>Once approved, the library will confirm the borrowing request and return schedule. Reminder delivery by email/SMS requires server integration.</span></div><div class="borrower-actions"><button class="crig-btn" type="submit">${icon('check',17)} Submit Borrowing Request</button><button class="borrower-secondary" type="reset">Clear Form</button></div></form><div id="myBorrowRequests" class="my-borrow-requests"></div></section>
        <section class="user-library-section user-news-section"><div class="section-heading"><div><span class="overline">NEWS & ANNOUNCEMENTS</span><h3>Latest Library News</h3><p>Announcements and updates published by the library administration.</p></div></div><div id="userNewsList" class="news-card-grid"></div></section>
        <section class="user-library-section graphic-news-section"><div class="section-heading"><div><span class="overline">AI-POWERED NEWS</span><h3>Latest from Graphic Online</h3><p>Automatically refreshed headlines and AI summaries for research and learning.</p></div><button class="borrower-secondary" onclick="refreshGraphicNews(true)">Refresh News</button></div><div id="graphicNewsUpdatedUser" class="graphic-news-updated"></div><div id="graphicNewsListUser" class="news-card-grid"><div class="news-empty"><strong>Loading latest headlines…</strong><p>News will appear here when the service is connected.</p></div></div><p class="graphic-news-credit">Source: Graphic Online. Read full stories on the publisher’s website. AI summaries may omit context.</p></section>
        <section class="user-library-section"><div class="section-heading"><div><span class="overline">RECENTLY ADDED</span><h3>Library Resources</h3><p>Browse books, publications, technical bulletins and research shared by the library administrator.</p></div></div><div id="userResources" class="user-resource-list"></div></section>
        <section class="empty-state" id="emptyState">
          <div class="empty-icon">${icon("search",58)}</div><h3>Select a category above to browse</h3><p>Our collection is organized for quick and easy research.</p>
        </section>
      </main>

      <aside class="right-sidebar">
        <div class="right-section-title">${icon("chat",22)} <span>Chat</span></div>
        <button class="chat-card" onclick="openChat()"><div class="chat-bubbles">${icon("chat",42)}</div><div><strong>Need Help?</strong><span>Chat with us</span></div><b>›</b></button>
        <div class="support-status"><span class="status-dot"></span><div><strong>Library Support</strong><small>Available to assist you</small></div></div>
        <div class="quick-links"><p>QUICK LINKS</p><button onclick="toast('Library policies opened.')">Library Policies</button><button onclick="toast('Research guide opened.')">Research Guide</button><button onclick="toast('Contact directory opened.')">Contact Library</button></div>
      </aside>
    </div>
    <section class="user-centre-video"><div><span class="overline">CENTRE OF EXCELLENCE</span><h2>Discover the E.K. Tetteh Library</h2><p>A closer look at the library supporting research and knowledge at CRIG.</p></div><video controls playsinline preload="metadata" poster="assets/hero-library.JPG"><source src="assets/library-welcome.mp4" type="video/mp4">Your browser does not support HTML video.</video></section>
    <footer class="site-footer professional-footer">
      <div class="footer-brand"><span class="footer-title">E. K. TETTEH LIBRARY</span><span>Centre of Excellence • Cocoa Research Institute of Ghana</span></div>
      <div class="footer-motto">Knowledge for a Sustainable Cocoa Industry</div>
      <div class="footer-meta"><span>Digital Library Portal</span><button onclick="logout()">Sign out</button></div>
    </footer>
  </div>
  <div id="toast" class="toast"></div>`;
  loadUserResources();
  renderMyBorrowRequests();
  renderNews('userNewsList');
  loadGraphicNews();
}


function returnFromAboutPage(){
  if(localStorage.getItem('elibraryLoggedIn')==='true') dashboard(); else homePage();
  window.scrollTo({top:0,behavior:'smooth'});
}
function aboutPageHeader(active){
  return `<header class="division-detail-nav"><button class="division-back" onclick="returnFromAboutPage()">← Back</button><div class="division-detail-brand">${logoMarkup()}<div><strong>COCOA RESEARCH INSTITUTE OF GHANA</strong><span>E. K. TETTEH LIBRARY · CENTRE OF EXCELLENCE</span></div></div><div class="about-page-nav-actions"><button class="division-nav-action" onclick="openCRIGLibraryPage()">About CRIG Library</button><button class="division-nav-action" onclick="openEKTettehPage()">About E.K. Tetteh</button></div></header>`;
}
function openCRIGLibraryPage(){
 app.innerHTML=`<main class="division-detail-page about-detail-page">${aboutPageHeader('library')}<section class="about-library-hero"><div class="about-library-shade"></div><div class="about-library-hero-copy"><span class="division-eyebrow">KNOWLEDGE · RESEARCH · DISCOVERY</span><p class="division-breadcrumb">HOME <span>/</span> ABOUT THE LIBRARY</p><h1>The CRIG Library</h1><p>A knowledge hub supporting agricultural research, scientific discovery and the sharing of trusted information about cocoa and other mandate crops in Ghana.</p><button onclick="dashboardIfLoggedInOrLogin()" class="about-hero-cta">Explore the E-Library ${icon('arrow',17)}</button></div></section><section class="about-library-content"><div class="about-library-intro"><div><span class="division-overline">ABOUT THE LIBRARY</span><h2>Connecting research with the people who need it.</h2></div><p>The E.K. Tetteh Library serves as an information resource for the Cocoa Research Institute of Ghana (CRIG). It helps researchers, students, technical officers and other information users discover literature and research outputs that support scientific work, learning and evidence-informed decisions.</p></div><div class="about-library-feature-grid"><article><div class="about-feature-icon">${icon('book-open',27)}</div><h3>Research collections</h3><p>Access books, journals, technical bulletins, reports, periodicals, reference materials and publications related to cocoa and other agricultural research areas.</p></article><article><div class="about-feature-icon">${icon('search',27)}</div><h3>Information discovery</h3><p>Browse by collection or research division, search publication details, and identify useful materials for study, field work and further research.</p></article><article><div class="about-feature-icon">${icon('users',27)}</div><h3>Research support</h3><p>The library connects users with information resources and provides a place to ask questions when help is needed locating publications or using the portal.</p></article></div><section class="about-library-section"><div><span class="division-overline">OUR ROLE</span><h2>Preserving knowledge. Supporting progress.</h2><p>The library contributes to CRIG's wider research mission by organizing and making information easier to discover. A well-managed collection helps research findings remain accessible and useful to scientists, students, extension professionals and future generations of researchers.</p><p>This digital portal is designed to make library resources easier to browse, support online discovery and provide a convenient starting point for finding institutional publications.</p></div><aside class="about-library-quote"><span>“</span><p>Knowledge becomes more powerful when it is organized, preserved and shared.</p><small>E. K. TETTEH LIBRARY</small></aside></section><section class="about-library-history"><div class="about-history-copy"><span class="division-overline">OUR HISTORY</span><h2>A library built around research and discovery</h2><p>The Library was established at Tafo in 1938 when the institute came into being as the Central Cocoa Research station of the Gold Coast Department of Agriculture.</p><p>This science and agriculture library serves researchers with specialized collections. Initially focused on cocoa, it now covers crops like coffee, shea, and cashew, plus computer science and business resources.</p><p>Library has very rich collection of Books on various Branches of Knowledge, serving as the Nerve Center for research, learning and information.</p></div><img src="assets/learning-library.jpg" alt="Placeholder photograph of a person learning in a library"></section><section class="about-library-pillars"><article class="about-library-pillar"><img src="assets/learning-library.jpg" alt="Placeholder photograph of someone studying"><div><span class="division-overline">OUR VISION</span><h2>VISION OF THE LIBRARY</h2><ul><li>To Serve as a Knowledge Hub of the College</li><li>To Inculcate Reading Habits among the Students and Research Community</li><li>To Help Students Enrich their Knowledge to Create a Better World for Themselves</li></ul></div></article><article class="about-library-pillar reverse"><img src="assets/learning-library.jpg" alt="Placeholder photograph of someone reading"><div><span class="division-overline">OUR OBJECTIVES</span><h2>OBJECTIVE OF THE LIBRARY</h2><ul><li>Provide information in an organized and coherent way.</li><li>Offer facilities and services to help researchers and students find and use the information they need.</li><li>Build an efficient library that adapts to changing research and academic needs.</li></ul></div></article></section><section class="about-collections-band"><div><span class="division-overline">EXPLORE OUR COLLECTIONS</span><h2>Find the information you need.</h2><p>Browse publications in the E-Library. Collection contents depend on materials uploaded by the library administrator.</p></div><div class="about-collection-links"><button onclick="dashboardIfLoggedInOrLogin('Journals/Books')">Journals & Books ${icon('arrow',15)}</button><button onclick="dashboardIfLoggedInOrLogin('Cocoa')">Cocoa ${icon('arrow',15)}</button><button onclick="dashboardIfLoggedInOrLogin('References')">References ${icon('arrow',15)}</button><button onclick="dashboardIfLoggedInOrLogin('Reports')">Reports ${icon('arrow',15)}</button></div></section></section><footer class="division-detail-footer"><span>© Cocoa Research Institute of Ghana · E. K. Tetteh Library</span><button onclick="returnFromAboutPage()">Return to the website ↑</button></footer></main>`;
 window.scrollTo({top:0,behavior:'smooth'});
}
function dashboardIfLoggedInOrLogin(collection){
 if(localStorage.getItem('elibraryLoggedIn')==='true'){dashboard();if(collection)setTimeout(()=>openCollectionPage(collection),60);}
 else showLoginForm('user');
}
function openEKTettehPage(){
 app.innerHTML=`<main class="division-detail-page about-detail-page ek-tetteh-page">${aboutPageHeader('ek')}<section class="ek-tetteh-hero"><div class="ek-tetteh-hero-copy"><span class="division-eyebrow">A LEGACY OF LIBRARY SERVICE</span><p class="division-breadcrumb">HOME <span>/</span> ABOUT E. K. TETTEH</p><h1>Ebenezer Komla <em>Tetteh</em></h1><p>Information scientist, agricultural librarian and author whose professional work supported the organization and sharing of agricultural research knowledge.</p><div class="ek-tetteh-hero-caption">REMEMBERING THE LIBRARY'S NAMESAKE</div></div><div class="ek-tetteh-portrait-wrap"><img src="assets/ek-tetteh-portrait.jpg" alt="Portrait of Ebenezer Komla Tetteh, known professionally as E.K. Tetteh"><span>E. K. TETTEH</span></div></section><article class="ek-biography-layout"><aside class="ek-biography-aside"><span class="division-overline">IN THIS PROFILE</span><a href="#ek-early">Early Life and Education</a><a href="#ek-crig">Career at CRIG</a><a href="#ek-international">International Attachments</a><a href="#ek-authorship">Authorship and Legacy</a><div class="ek-profile-note"><strong>Ebenezer Komla Tetteh</strong><p>Professionally known as E.K. Tetteh</p><span>Agricultural Librarian · Author</span></div></aside><div class="ek-biography-copy"><span class="division-overline">BIOGRAPHY</span><h2>Biography of Ebenezer Komla Tetteh</h2><p class="ek-biography-lead"><strong>Ebenezer Komla Tetteh</strong> (professionally known as <strong>E.K. Tetteh</strong>) is a distinguished Ghanaian information scientist, agricultural librarian, and author. As a pioneering figure in specialized institutional librarianship, his career fundamentally shaped how scientific knowledge and agricultural research data were organized and utilized during the foundational decades of modern Ghana’s cocoa economy.</p><section id="ek-early"><h3>Early Life and Education</h3><p>E.K. Tetteh was born in Ghana and pursued a career in the then-emerging field of professional information management. He became a standout product of the Ghana Library School, an elite training ground established in the mid-20th century to develop the country's intellectual infrastructure. Through rigorous professional examination, he earned his qualification as an Associate of the Library Association (<strong>A.I.A.</strong>), an internationally recognized credential that certified his mastery of cataloging, library administration, and information systems.</p></section><section id="ek-crig"><h3>Career at the Cocoa Research Institute of Ghana (CRIG)</h3><p>Tetteh dedicated the apex of his professional life to the development of Ghana's agricultural sector. He served for many years as the <strong>Chief Librarian</strong> at the <a href="https://www.crig.org.gh/" target="_blank" rel="noopener noreferrer">Cocoa Research Institute of Ghana (CRIG)</a> in New Tafo, Eastern Region.</p><p>At CRIG, Tetteh was tasked with managing a massive repository of specialized scientific documents, research papers, and technical literature on cocoa, coffee, and shea. His work directly supported agronomic scientists, plant breeders, and field extension agents trying to combat devastating crop pathogens (such as swollen shoot virus) and optimize crop yields for Ghana's most critical economic driver.</p></section><section id="ek-international"><h3>International Attachments and Professional Footprint</h3><p>Recognized for his specialization, Tetteh participated in high-level international professional exchanges. He was awarded attachments to prestigious academic and government libraries in Great Britain. Most notably, he completed an observation and study stint at the <strong>Tropical Products Institute in London</strong>, where he integrated advanced colonial and post-colonial methodologies of special-interest indexing into the library frameworks back home in Tafo.</p></section><section id="ek-authorship"><h3>Authorship and Literary Legacy</h3><p>Beyond maintaining reference catalogs, E.K. Tetteh actively co-authored documentation designed to distill complex agronomic research into actionable practices for the field. His most prominent publication includes:</p><div class="ek-publication-card"><div class="ek-publication-mark">${icon('book-open',29)}</div><div><span>FEATURED PUBLICATION · 1987</span><h4><em>A Guide to Cocoa Cultivation</em></h4><p>Co-authored with Michael Manu and published by the Ghana Cocoa Board (COCOBOD). This handbook became an essential guide for training agricultural extension workers and teaching commercial cocoa farmers standardized methods of field preparation, pest management, and post-harvest fermentation.</p></div></div></section><section id="ek-legacy"><h3>Retirement and Legacy</h3><p>Following decades of public service, E.K. Tetteh retired from his role at the Cocoa Research Institute. He is celebrated within the professional community as a foundational block in African academic librarianship. His life's work demonstrated that effective information indexing and dissemination are just as vital to the success of an agricultural industry as the fieldwork itself.</p></section><div class="ek-biography-note"><span>${icon('book-open',22)}</span><p>This page preserves and presents the biographical account provided for the E.K. Tetteh Library website. Additional archival records, photographs and bibliographic sources can further enrich this profile over time.</p></div></div></article><section class="ek-final-banner"><div><span class="division-overline">A LASTING CONTRIBUTION</span><h2>Honouring a legacy of knowledge and service.</h2><p>The E.K. Tetteh Library carries forward the values of organizing, preserving and sharing information in support of research.</p></div><button onclick="dashboardIfLoggedInOrLogin()">Explore the E-Library ${icon('arrow',16)}</button></section><footer class="division-detail-footer"><span>© Cocoa Research Institute of Ghana · E. K. Tetteh Library</span><button onclick="returnFromAboutPage()">Return to the website ↑</button></footer></main>`;
 window.scrollTo({top:0,behavior:'smooth'});
}

function openBorrowRequest(){const panel=document.getElementById('borrowRequestPanel');if(!panel)return;panel.style.display='block';panel.scrollIntoView({behavior:'smooth',block:'start'});const f=panel.querySelector('form');const today=new Date();const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);if(f&&!f.elements.borrowDate.value)f.elements.borrowDate.value=local;renderMyBorrowRequests();}
function closeBorrowRequest(){const panel=document.getElementById('borrowRequestPanel');if(panel)panel.style.display='none';}
function getBorrowRequests(){return JSON.parse(localStorage.getItem('libraryBorrowRequests')||'[]');}
function submitBorrowRequest(e){e.preventDefault();const f=e.currentTarget;const data=Object.fromEntries(new FormData(f).entries());const due=new Date(data.returnAt);const start=new Date(data.borrowDate+'T00:00');if(Number.isNaN(due.getTime())||due<=new Date()||due<=start){toast('Choose a future return date and time after the requested collection date.');return;}data.id='REQ-'+String(Date.now()).slice(-7);data.status='Pending';data.submittedAt=new Date().toISOString();const requests=getBorrowRequests();requests.push(data);localStorage.setItem('libraryBorrowRequests',JSON.stringify(requests));f.reset();const localNow=new Date();f.elements.borrowDate.value=new Date(localNow-localNow.getTimezoneOffset()*60000).toISOString().slice(0,10);renderMyBorrowRequests();toast('Borrowing request submitted. The library administrator will review it.');}
function renderMyBorrowRequests(){const el=document.getElementById('myBorrowRequests');if(!el)return;const requests=getBorrowRequests();if(!requests.length){el.innerHTML='<p class="request-note">Your borrowing requests and their approval status will appear here after you submit a request.</p>';return;}el.innerHTML='<h3 class="my-requests-title">My submitted requests</h3>'+[...requests].reverse().map(r=>`<article class="request-history-row"><div><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.id)} · Submitted ${new Date(r.submittedAt).toLocaleDateString()}</small></div><span class="request-status ${String(r.status).toLowerCase()}">${escapeHtml(r.status)}</span>${r.adminNote?`<p>${escapeHtml(r.adminNote)}</p>`:''}</article>`).join('');}

function openChat(){
  const messages = JSON.parse(localStorage.getItem("libraryMessages") || "[]");
  app.insertAdjacentHTML("beforeend", `
    <div class="modal-backdrop" id="chatModal">
      <div class="chat-modal">
        <div class="chat-modal-head"><div><span class="modal-kicker">LIBRARY SUPPORT</span><h2>Need Help? Chat with us</h2><p>Send a message to the E.K. Tetteh Library administrator.</p></div><button onclick="closeChat()">${icon("close",20)}</button></div>
        <div class="chat-thread" id="chatThread">${renderUserMessages(messages)}</div>
        <form class="chat-form" onsubmit="sendUserMessage(event)"><textarea id="chatMessage" rows="3" placeholder="Type your message here..." required></textarea><button class="primary-btn" type="submit">Send Message ${icon("arrow",17)}</button></form>
      </div>
    </div>`);
  document.getElementById("chatMessage")?.focus();
}

function renderUserMessages(messages){
  if(!messages.length) return `<div class="chat-empty"><div>${icon("chat",38)}</div><h3>Start a conversation</h3><p>Ask about publications, account access, research resources or anything else you need help with.</p></div>`;
  return messages.map(m=>`<div class="message-row user-message"><div class="message-avatar">${icon("user",16)}</div><div><div class="message-bubble">${escapeHtml(m.text)}</div><small>${new Date(m.time).toLocaleString()}</small></div></div>`).join("");
}

function sendUserMessage(e){
  e.preventDefault();
  const input=document.getElementById("chatMessage");
  const text=input.value.trim(); if(!text) return;
  const messages=JSON.parse(localStorage.getItem("libraryMessages") || "[]");
  messages.push({text,time:new Date().toISOString(),status:"unread"});
  localStorage.setItem("libraryMessages",JSON.stringify(messages));
  document.getElementById("chatThread").innerHTML=renderUserMessages(messages);
  input.value="";
  toast("Your message has been sent to the library administrator.");
}

function closeChat(){document.getElementById("chatModal")?.remove();}

function adminDashboard(){
  const messages=JSON.parse(localStorage.getItem("libraryMessages") || "[]");
  app.innerHTML=`
  <div class="admin-shell">
    <header class="admin-header"><div class="top-brand">${logoMarkup()}<div><h1>COCOA RESEARCH INSTITUTE OF GHANA</h1><h2>E. K. TETTEH LIBRARY</h2><span>Administration Portal</span></div></div><div class="admin-user">${icon("shield",18)} Administrator <button onclick="logout()">Sign out</button></div></header>
    <main class="admin-main">
      <div class="admin-hero"><div><p class="overline">ADMINISTRATION</p><h1>Library Management Centre</h1><p>Manage digital resources and respond to E-Library users.</p></div><div class="admin-stat"><strong id="adminTotal">${messages.length}</strong><span>Support Messages</span></div></div>
      <div class="admin-tabs"><button class="admin-tab active" onclick="showAdminTab('resources',this)">${icon('upload',17)} Upload Resources</button><button class="admin-tab" onclick="showAdminTab('catalogue',this)">${icon('book-open',17)} Catalogue</button><button class="admin-tab" onclick="showAdminTab('theses',this)">${icon('file-text',17)} Thesis Collection</button><button class="admin-tab" onclick="showAdminTab('borrowers',this)">${icon('user',17)} Borrow Requests <span id="borrowRequestBadge">0</span></button><button class="admin-tab" onclick="showAdminTab('support',this)">${icon('chat',17)} User Support <span>${messages.filter(m=>m.status==='unread').length}</span></button><button class="admin-tab" onclick="showAdminTab('admins',this)">${icon('shield',17)} Admin Accounts</button><button class="admin-tab" onclick="showAdminTab('logins',this)">${icon('user',17)} Login History</button><button class="admin-tab" onclick="showAdminTab('downloads',this)">${icon('download',17)} Download Requests</button><button class="admin-tab" onclick="showAdminTab('news',this)">${icon('newspaper',17)} News & Updates</button></div>
      <section id="adminResourcesTab" class="admin-tab-panel">
        <div class="admin-management-grid">
          <section class="admin-panel upload-panel"><div class="panel-heading"><div><span class="panel-kicker">DIGITAL COLLECTION</span><h2>Upload a New Resource</h2></div></div><form class="upload-form" onsubmit="handleResourceUpload(event)">
            <div class="form-grid"><label>Resource title<input name="title" placeholder="e.g. Cocoa Pest Management Handbook" required></label><label>Author / Researcher<input name="author" placeholder="Author or research team"></label></div>
            <div class="form-grid"><label>Resource type<select name="type"><option>Book</option><option>Publication</option><option>Research</option><option>Technical Bulletin</option><option>Annual Report</option><option>Progress Report</option><option>Reference</option><option>Cocoa</option><option>Thesis</option><option>Current Periodical</option></select></label><label>Year<input name="year" type="number" min="1900" max="2100" value="2026"></label></div>
            <label>Division / Collection<select name="division"><option>General Collection</option>${divisions.map(d=>`<option>${d[0]}</option>`).join('')}</select></label>
            <label>Description<textarea name="description" rows="3" placeholder="Brief description of the resource..."></textarea></label>
            <label class="file-drop"><span>${icon('upload',27)}</span><strong>Choose document</strong><small>PDF, DOC, DOCX, PPT, PPTX or other library files</small><input name="file" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv" required onchange="updateFileName(this)"><em id="selectedFile">No file selected</em></label>
            <button class="crig-btn" type="submit">${icon('upload',17)} Upload to E-Library</button>
          </form></section>
          <aside class="admin-panel collection-side"><div class="panel-heading"><div><span class="panel-kicker">COLLECTION GUIDE</span><h2>What you can upload</h2></div></div><div class="upload-type"><div>${icon('book-open',22)}</div><div><strong>Books</strong><small>Handbooks, manuals and reference books</small></div></div><div class="upload-type"><div>${icon('file-text',22)}</div><div><strong>Publications</strong><small>Journals, papers and institutional publications</small></div></div><div class="upload-type"><div>${icon('flask',22)}</div><div><strong>Research</strong><small>Research papers, studies and scientific reports</small></div></div><div class="upload-type"><div>${icon('report',22)}</div><div><strong>Reports & Bulletins</strong><small>Annual reports and technical bulletins</small></div></div><div class="admin-note"><strong>Meeting-ready demo</strong><p>Uploaded files are stored in this browser for demonstration. A production version should use secure server storage and a database.</p></div></aside>
        </div>
        <section class="admin-panel resource-library-panel"><div class="panel-heading"><div><span class="panel-kicker">E-LIBRARY</span><h2>Uploaded Resources</h2></div><span id="resourceCount" class="message-count">0 resources</span></div><div id="adminResources" class="resource-list"></div></section>
      </section>
      <section id="adminBorrowersTab" class="admin-tab-panel" style="display:none">
        <div class="borrower-page-heading"><div><span class="panel-kicker">ONLINE BORROWING & CIRCULATION</span><h2>Borrowing Requests</h2><p>Review requests submitted online by library users. Approve suitable requests or decline them with a clear decision.</p></div><div class="borrower-heading-logo">${logoMarkup()}</div></div>
        <div id="borrowerReminderBanner" class="borrower-reminder-banner" style="display:none"></div>
        <section class="admin-panel borrower-records-panel"><div class="panel-heading"><div><span class="panel-kicker">ACTION REQUIRED</span><h2>Requests awaiting review</h2><p>Confirm contact details and the requested return date before approval.</p></div><span class="message-count" id="borrowRequestCount">0 pending</span></div><div id="borrowRequestsList" class="borrower-record-list"></div></section>
        <section class="admin-panel borrower-records-panel"><div class="panel-heading"><div><span class="panel-kicker">APPROVED / DECLINED</span><h2>Request history</h2></div><span class="message-count" id="borrowHistoryCount">0 records</span></div><div id="borrowRequestHistory" class="borrower-record-list"></div></section>
        <section class="admin-panel borrower-records-panel"><div class="panel-heading"><div><span class="panel-kicker">ACTIVE LOANS</span><h2>Approved borrower register</h2></div><span class="message-count" id="borrowerRecordCount">0 records</span></div><div id="borrowerRecords" class="borrower-record-list"></div></section>
      </section>
      <section id="adminCatalogueTab" class="admin-tab-panel" style="display:none">
        <div class="borrower-page-heading"><div><span class="panel-kicker">LIBRARY CATALOGUING</span><h2>E. K. Tetteh Library Catalogue</h2><p>Create and maintain catalogue records using the fields in the original catalogue form.</p></div><div class="borrower-heading-logo">${logoMarkup()}</div></div>
        <section class="admin-panel catalogue-entry-panel"><div class="panel-heading"><div><span class="panel-kicker">ENTER DETAILS</span><h2>Catalogue Record</h2></div><span class="message-count" id="catalogueRecordCount">0 records</span></div>
          <form id="catalogueForm" class="catalogue-form" onsubmit="saveCatalogueRecord(event)"><input type="hidden" name="recordId"><div class="catalogue-id-row"><label>Record ID<input name="displayId" value="(New)" readonly></label><span>Leave the ID as New to create a record, or choose Edit from the table below.</span></div>
            <label>Author(s) / Editor(s)<input name="authors" required placeholder="Author or editor names"></label>
            <label>Title<input name="title" required placeholder="Full title of the publication"></label>
            <div class="catalogue-grid-two"><label>Date of Publication<input name="date" placeholder="e.g. 2024 or 15/03/2024"></label><label>Type of Publication<select name="type"><option>Book</option><option>Journal</option><option>Thesis</option><option>Research Paper</option><option>Technical Bulletin</option><option>Report</option><option>Reference</option><option>Other</option></select></label></div>
            <label>Publisher<input name="publisher" placeholder="Publisher / issuing organization"></label>
            <div class="catalogue-grid-three"><label>No. Copies<input name="copies" type="number" min="0" value="1"></label><label>ISBN / ISSN<input name="isbn" placeholder="ISBN or ISSN"></label><label>Class Number<input name="classNumber" placeholder="Class / shelf number"></label></div>
            <div class="catalogue-grid-two"><label>Edition<input name="edition" placeholder="Edition / volume"></label><label>Accessibility<select name="accessibility"><option>Open Access</option><option>In Library</option><option>Digital Copy Available</option><option>Restricted Access</option><option>Request Permission</option></select></label></div><label>Abstract entry method<select name="abstractMode" onchange="toggleAbstractEntry(this,'catalogueAbstractUpload')"><option value="typed">Type the abstract</option><option value="upload">Upload scanned abstract document or image</option></select></label><label id="catalogueAbstractTextLabel">Abstract / Preface<textarea name="abstract" rows="3" placeholder="Type the abstract or preface here"></textarea></label><label id="catalogueAbstractUpload" style="display:none" class="file-drop"><span>${icon('upload',24)}</span><strong>Upload scanned abstract</strong><small>PDF, DOC, DOCX, JPG, PNG or WEBP</small><input name="abstractFile" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,image/*"></label>
            <div class="catalogue-actions"><button class="crig-btn" type="submit">Save Catalogue Record</button><button class="borrower-secondary" type="button" onclick="resetCatalogueForm()">Clear Form</button></div>
          </form>
        </section>
        <section class="admin-panel catalogue-table-panel"><div class="panel-heading"><div><span class="panel-kicker">CATALOGUE DATABASE</span><h2>Saved Catalogue Records</h2></div><input class="catalogue-search" id="catalogueSearch" placeholder="Search title or author..." oninput="renderCatalogueRecords(this.value)"></div><div id="catalogueRecordsTable" class="catalogue-table-wrap"></div></section>
      </section>
      <section id="adminThesesTab" class="admin-tab-panel" style="display:none">
        <div class="borrower-page-heading"><div><span class="panel-kicker">ACADEMIC REPOSITORY</span><h2>Thesis Collection</h2><p>Register and manage student theses and dissertations. Saved records are available to users in the Thesis Collection page.</p></div><div class="borrower-heading-logo">${logoMarkup()}</div></div>
        <section class="admin-panel thesis-entry-panel"><div class="panel-heading"><div><span class="panel-kicker">ENTER DETAILS</span><h2>Thesis Record</h2></div><span class="message-count" id="thesisRecordCount">0 records</span></div>
          <form id="thesisForm" class="catalogue-form" onsubmit="saveThesisRecord(event)"><input type="hidden" name="recordId"><div class="catalogue-grid-two"><label>Author / Researcher<input name="author" required placeholder="Thesis author"></label><label>Type<select name="type"><option>PhD</option><option>MPhil</option><option>MSc</option><option>MA</option><option>BSc</option><option>Undergraduate Project</option><option>Other</option></select></label></div>
            <div class="catalogue-grid-two"><label>Class Number<input name="classNumber" placeholder="Library class number"></label><label>Institution<input name="institution" placeholder="University or institution"></label></div>
            <label>Thesis Topic / Research Title<textarea name="topic" rows="3" required placeholder="Full thesis or research topic"></textarea></label>
            <div class="catalogue-grid-three"><label>Year<input name="year" type="number" min="1900" max="2100" placeholder="e.g. 2024"></label><label>Accessibility<select name="accessibility"><option>In Library</option><option>Digital Copy Available</option><option>Restricted Access</option><option>Borrowable</option><option>Open Access</option></select></label><label>Borrower<input name="borrower" placeholder="Optional borrower name"></label></div><label>Abstract entry method<select name="abstractMode" onchange="toggleAbstractEntry(this,'thesisAbstractUpload')"><option value="typed">Type the abstract</option><option value="upload">Upload scanned abstract document or image</option></select></label><label id="thesisAbstractTextLabel">Abstract<textarea name="abstract" rows="4" placeholder="Type the full thesis abstract here"></textarea></label><label id="thesisAbstractUpload" style="display:none" class="file-drop"><span>${icon('upload',24)}</span><strong>Upload scanned abstract</strong><small>PDF, DOC, DOCX, JPG, PNG or WEBP</small><input name="abstractFile" type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,image/*"></label>
            <div class="catalogue-actions"><button class="crig-btn" type="submit">Save Thesis Record</button><button class="borrower-secondary" type="button" onclick="resetThesisForm()">Clear Form</button></div>
          </form>
        </section>
        <section class="admin-panel catalogue-table-panel"><div class="panel-heading"><div><span class="panel-kicker">THESIS DATABASE</span><h2>Saved Thesis Records</h2></div><input class="catalogue-search" id="thesisSearch" placeholder="Search author or topic..." oninput="renderThesisRecords(this.value)"></div><div id="thesisRecordsTable" class="catalogue-table-wrap"></div></section>
      </section>
      <section id="adminSupportTab" class="admin-tab-panel" style="display:none">
        <div class="admin-grid"><section class="admin-panel"><div class="panel-heading"><div><span class="panel-kicker">USER SUPPORT</span><h2>Need Help? Messages</h2></div><span class="message-count">${messages.length} message${messages.length===1?'':'s'}</span></div><div id="adminMessages" class="admin-messages">${renderAdminMessages(messages)}</div></section><aside class="admin-panel admin-side"><div class="panel-heading"><div><span class="panel-kicker">LIBRARY OVERVIEW</span><h2>At a glance</h2></div></div><div class="overview-item"><span>${icon('book-open',22)}</span><div><strong id="overviewResourceCount">0</strong><small>Uploaded resources</small></div></div><div class="overview-item"><span>${icon('leaf',22)}</span><div><strong>7</strong><small>Research divisions</small></div></div><div class="overview-item"><span>${icon('chat',22)}</span><div><strong>${messages.length}</strong><small>Support messages</small></div></div></aside></div>
      </section>
      <section id="adminAdminsTab" class="admin-tab-panel" style="display:none"><div class="admin-panel account-management-panel"><div class="panel-heading"><div><span class="panel-kicker">ADMINISTRATION ACCESS</span><h2>Manage Administrator Accounts</h2><p>Up to three administrator accounts can be created in this browser demo.</p></div><span id="adminAccountCount" class="message-count"></span></div><form class="upload-form" onsubmit="addAdminAccount(event)"><div class="form-grid"><label>Admin full name<input name="name" required placeholder="Full name"></label><label>Admin email<input name="email" type="email" required placeholder="name@crig.gov.gh"></label></div><label>Temporary password<input name="password" type="password" minlength="6" required placeholder="At least 6 characters"></label><button class="crig-btn" type="submit">Add Administrator</button></form><div id="adminAccountsList" class="admin-record-list"></div></div></section>
      <section id="adminLoginsTab" class="admin-tab-panel" style="display:none"><div class="admin-panel"><div class="panel-heading"><div><span class="panel-kicker">ACCESS MONITORING</span><h2>User & Admin Login History</h2><p>See the email, role and time recorded whenever an account signs in.</p></div><button class="borrower-secondary" onclick="printLoginHistory()">Print History</button></div><div id="loginHistoryList" class="admin-record-list"></div></div></section>
      <section id="adminDownloadsTab" class="admin-tab-panel" style="display:none"><div class="admin-panel"><div class="panel-heading"><div><span class="panel-kicker">CONTROLLED ACCESS</span><h2>Publication Download Requests</h2><p>Users must open a publication first and request permission. Approve or decline each request here.</p></div></div><div id="downloadRequestsList" class="admin-record-list"></div></div></section>
      <section id="adminNewsTab" class="admin-tab-panel" style="display:none"><div class="admin-panel"><div class="panel-heading"><div><span class="panel-kicker">PUBLIC ANNOUNCEMENTS</span><h2>Publish Library News</h2><p>Published news appears on the public home page and user dashboard.</p></div></div><form class="upload-form" onsubmit="publishNews(event)"><label>News headline<input name="title" required placeholder="e.g. New research publications available"></label><label>News details<textarea name="body" rows="4" required placeholder="Write the announcement for library users..."></textarea></label><label>Optional image<input name="image" type="file" accept="image/*"></label><button class="crig-btn" type="submit">Publish News</button></form><div id="adminNewsList" class="admin-record-list"></div></div></section>
    </main>
    <footer class="site-footer professional-footer admin-footer"><div class="footer-brand"><span class="footer-title">E. K. TETTEH LIBRARY</span><span>Administrator Portal • Cocoa Research Institute of Ghana</span></div><div class="footer-motto">Knowledge for a Sustainable Cocoa Industry</div><div class="footer-meta"><span>Secure Administration</span></div></footer>
  </div><div id="toast" class="toast"></div>`;
  renderAdminResources();
  renderCatalogueRecords();
  renderThesisRecords();
  checkBorrowerDueAlerts();
}
function readLocalRecords(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(e){return []}}
function writeLocalRecords(key,records){localStorage.setItem(key,JSON.stringify(records))}
function nextRecordId(records){return records.reduce((m,r)=>Math.max(m,Number(r.id)||0),0)+1}
async function toggleAbstractEntry(select,uploadId){const isUpload=select.value==='upload';const upload=document.getElementById(uploadId);const prefix=uploadId.startsWith('catalogue')?'catalogue':'thesis';const textLabel=document.getElementById(prefix+'AbstractTextLabel');if(upload)upload.style.display=isUpload?'block':'none';if(textLabel)textLabel.style.display=isUpload?'none':'block';}
function readFileDataUrl(file){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||''));reader.onerror=()=>reject(reader.error);reader.readAsDataURL(file);});}
async function saveCatalogueRecord(e){e.preventDefault();const form=e.target;const data=Object.fromEntries(new FormData(form).entries());const rows=readLocalRecords('crigCatalogueRecords');const id=data.recordId?Number(data.recordId):nextRecordId(rows);const old=rows.find(r=>Number(r.id)===id)||{};const file=form.elements.abstractFile?.files?.[0];const fileData=file?await readFileDataUrl(file):old.abstractFileData||'';const record={id,authors:data.authors.trim(),title:data.title.trim(),date:data.date.trim(),type:data.type,publisher:data.publisher.trim(),copies:Number(data.copies||0),isbn:data.isbn.trim(),classNumber:data.classNumber.trim(),edition:data.edition.trim(),accessibility:data.accessibility||'Open Access',abstractMode:data.abstractMode||'typed',abstract:data.abstract.trim(),abstractFileName:file?.name||old.abstractFileName||'',abstractFileData:fileData,updatedAt:new Date().toISOString()};const index=rows.findIndex(r=>Number(r.id)===id);if(index>=0)rows[index]=record;else rows.push(record);writeLocalRecords('crigCatalogueRecords',rows);resetCatalogueForm();renderCatalogueRecords();toast(index>=0?'Catalogue record updated.':'Catalogue record saved.');}
function resetCatalogueForm(){const f=document.getElementById('catalogueForm');if(!f)return;f.reset();f.elements.recordId.value='';f.elements.displayId.value='(New)';f.elements.copies.value='1';const mode=f.elements.abstractMode;if(mode){mode.value='typed';toggleAbstractEntry(mode,'catalogueAbstractUpload');}}
function editCatalogueRecord(id){const r=readLocalRecords('crigCatalogueRecords').find(x=>Number(x.id)===Number(id));const f=document.getElementById('catalogueForm');if(!r||!f)return;Object.entries({recordId:r.id,displayId:r.id,authors:r.authors,title:r.title,date:r.date,type:r.type,publisher:r.publisher,copies:r.copies,isbn:r.isbn,classNumber:r.classNumber,edition:r.edition,accessibility:r.accessibility,abstractMode:r.abstractMode||'typed',abstract:r.abstract}).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v??''});f.scrollIntoView({behavior:'smooth',block:'start'});}
function deleteCatalogueRecord(id){if(!confirm('Delete this catalogue record?'))return;writeLocalRecords('crigCatalogueRecords',readLocalRecords('crigCatalogueRecords').filter(r=>Number(r.id)!==Number(id)));renderCatalogueRecords();resetCatalogueForm();toast('Catalogue record deleted.');}
function renderCatalogueRecords(query=''){const target=document.getElementById('catalogueRecordsTable');if(!target)return;let rows=readLocalRecords('crigCatalogueRecords');const count=document.getElementById('catalogueRecordCount');if(count)count.textContent=`${rows.length} record${rows.length===1?'':'s'}`;const q=(query||'').toLowerCase().trim();if(q)rows=rows.filter(r=>[r.title,r.authors,r.type,r.publisher,r.isbn,r.classNumber].some(v=>String(v||'').toLowerCase().includes(q)));if(!rows.length){target.innerHTML='<div class="resource-empty compact"><h3>No catalogue records found</h3><p>Complete the form above to add the first catalogue record.</p></div>';return;}target.innerHTML=`<table class="catalogue-table"><thead><tr><th>ID</th><th>Author(s) / Editor(s)</th><th>Title</th><th>Publication Date</th><th>Type</th><th>Publisher</th><th>Copies</th><th>ISBN / ISSN</th><th>Class No.</th><th>Edition</th><th>Accessibility</th><th>Actions</th></tr></thead><tbody>${rows.sort((a,b)=>a.id-b.id).map(r=>`<tr><td>${r.id}</td><td>${escapeHtml(r.authors)}</td><td><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.abstract||'')}</small></td><td>${escapeHtml(r.date||'—')}</td><td>${escapeHtml(r.type)}</td><td>${escapeHtml(r.publisher||'—')}</td><td>${r.copies}</td><td>${escapeHtml(r.isbn||'—')}</td><td>${escapeHtml(r.classNumber||'—')}</td><td>${escapeHtml(r.edition||'—')}</td><td>${escapeHtml(r.accessibility||'—')}</td><td><div class="table-actions"><button onclick="printCatalogueReceipt(${r.id})">Print</button><button onclick="editCatalogueRecord(${r.id})">Edit</button><button class="danger-action" onclick="deleteCatalogueRecord(${r.id})">Delete</button></div></td></tr>`).join('')}</tbody></table>`;}
async function saveThesisRecord(e){e.preventDefault();const form=e.target;const data=Object.fromEntries(new FormData(form).entries());const rows=readLocalRecords('crigThesisRecords');const id=data.recordId?Number(data.recordId):nextRecordId(rows);const old=rows.find(r=>Number(r.id)===id)||{};const file=form.elements.abstractFile?.files?.[0];const fileData=file?await readFileDataUrl(file):old.abstractFileData||'';const record={id,author:data.author.trim(),type:data.type,classNumber:data.classNumber.trim(),topic:data.topic.trim(),institution:data.institution.trim(),year:data.year.trim(),accessibility:data.accessibility,borrower:data.borrower.trim(),abstractMode:data.abstractMode||'typed',abstract:data.abstract.trim(),abstractFileName:file?.name||old.abstractFileName||'',abstractFileData:fileData,updatedAt:new Date().toISOString()};const index=rows.findIndex(r=>Number(r.id)===id);if(index>=0)rows[index]=record;else rows.push(record);writeLocalRecords('crigThesisRecords',rows);resetThesisForm();renderThesisRecords();toast(index>=0?'Thesis record updated.':'Thesis record saved.');}
function resetThesisForm(){const f=document.getElementById('thesisForm');if(!f)return;f.reset();f.elements.recordId.value='';const mode=f.elements.abstractMode;if(mode){mode.value='typed';toggleAbstractEntry(mode,'thesisAbstractUpload');}}
function editThesisRecord(id){const r=readLocalRecords('crigThesisRecords').find(x=>Number(x.id)===Number(id));const f=document.getElementById('thesisForm');if(!r||!f)return;Object.entries({recordId:r.id,author:r.author,type:r.type,classNumber:r.classNumber,topic:r.topic,institution:r.institution,year:r.year,accessibility:r.accessibility,borrower:r.borrower,abstractMode:r.abstractMode||'typed',abstract:r.abstract}).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v??''});f.scrollIntoView({behavior:'smooth',block:'start'});}
function deleteThesisRecord(id){if(!confirm('Delete this thesis record?'))return;writeLocalRecords('crigThesisRecords',readLocalRecords('crigThesisRecords').filter(r=>Number(r.id)!==Number(id)));renderThesisRecords();resetThesisForm();toast('Thesis record deleted.');}
function renderThesisRecords(query=''){const target=document.getElementById('thesisRecordsTable');if(!target)return;let rows=readLocalRecords('crigThesisRecords');const count=document.getElementById('thesisRecordCount');if(count)count.textContent=`${rows.length} record${rows.length===1?'':'s'}`;const q=(query||'').toLowerCase().trim();if(q)rows=rows.filter(r=>[r.author,r.topic,r.type,r.institution,r.year,r.classNumber].some(v=>String(v||'').toLowerCase().includes(q)));if(!rows.length){target.innerHTML='<div class="resource-empty compact"><h3>No thesis records found</h3><p>Add a thesis using the form above. Saved records will also appear to users.</p></div>';return;}target.innerHTML=`<table class="catalogue-table"><thead><tr><th>ID</th><th>Author</th><th>Type</th><th>Class No.</th><th>Thesis Topic</th><th>Institution</th><th>Year</th><th>Accessibility</th><th>Abstract</th><th>Borrower</th><th>Actions</th></tr></thead><tbody>${rows.sort((a,b)=>a.id-b.id).map(r=>`<tr><td>${r.id}</td><td>${escapeHtml(r.author)}</td><td>${escapeHtml(r.type)}</td><td>${escapeHtml(r.classNumber||'—')}</td><td><strong>${escapeHtml(r.topic)}</strong></td><td>${escapeHtml(r.institution||'—')}</td><td>${escapeHtml(r.year||'—')}</td><td>${escapeHtml(r.accessibility)}</td><td>${escapeHtml(r.abstractMode==='upload'?(r.abstractFileName||'Scanned file uploaded'):(r.abstract||'—'))}</td><td>${escapeHtml(r.borrower||'—')}</td><td><div class="table-actions"><button onclick="printThesisReceipt(${r.id})">Print</button><button onclick="editThesisRecord(${r.id})">Edit</button><button class="danger-action" onclick="deleteThesisRecord(${r.id})">Delete</button></div></td></tr>`).join('')}</tbody></table>`;}
function renderUserThesisCollection(query=''){const target=document.getElementById('collectionPageResources');if(!target)return;let rows=readLocalRecords('crigThesisRecords');const q=(query||'').toLowerCase().trim();if(q)rows=rows.filter(r=>[r.author,r.topic,r.type,r.institution,r.year].some(v=>String(v||'').toLowerCase().includes(q)));const search=`<div class="thesis-user-search"><input id="thesisUserSearch" value="${escapeHtml(query)}" placeholder="Search author, topic, institution or year..." oninput="renderUserThesisCollection(this.value)">${icon('search',18)}</div>`;if(!rows.length){target.innerHTML=search+`<div class="resource-empty compact"><div>${icon('book-open',34)}</div><h3>No thesis records found</h3><p>${q?'Try a different search term.':'Theses and dissertations entered by the library administrator will appear here.'}</p></div>`;return;}target.innerHTML=search+`<div class="thesis-user-list">${rows.sort((a,b)=>Number(b.year||0)-Number(a.year||0)).map(r=>`<article class="thesis-user-card"><div class="thesis-card-icon">${icon('file-text',24)}</div><div class="thesis-card-content"><div class="thesis-card-meta"><span>${escapeHtml(r.type)}</span><span>${escapeHtml(r.year||'Year not listed')}</span></div><h3>${escapeHtml(r.topic)}</h3><p><strong>Author:</strong> ${escapeHtml(r.author)}${r.institution?` · ${escapeHtml(r.institution)}`:''}</p><small><strong>Class No.:</strong> ${escapeHtml(r.classNumber||'Not listed')} · <strong>Access:</strong> ${escapeHtml(r.accessibility||'Check with library')}</small>${r.abstractMode==='upload'&&r.abstractFileData?`<a class="thesis-abstract-file" href="${r.abstractFileData}" target="_blank" rel="noopener">View scanned abstract: ${escapeHtml(r.abstractFileName||'Open file')}</a>`:(r.abstract?`<p class="thesis-user-abstract"><strong>Abstract:</strong> ${escapeHtml(r.abstract)}</p>`:'')}${r.borrower?`<small><strong>Borrower:</strong> ${escapeHtml(r.borrower)}</small>`:''}</div></article>`).join('')}</div>`;}

function printDocument(title,rows){const w=window.open('','_blank','width=850,height=700');if(!w){toast('Please allow pop-ups to print this record.');return;}const safe=rows.map(([k,v])=>`<tr><th>${escapeHtml(k)}</th><td>${escapeHtml(String(v??'—'))}</td></tr>`).join('');w.document.write(`<!doctype html><html><head><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;color:#222;padding:32px}h1{color:#245b3a;font-size:22px}p{color:#555}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{border:1px solid #bbb;padding:10px;text-align:left;vertical-align:top}th{width:28%;background:#f1f5f2}@media print{button{display:none}}</style></head><body><h1>CRIG — E. K. Tetteh Library</h1><p>Library record / receipt</p><h2>${escapeHtml(title)}</h2><table>${safe}</table><p>Printed on ${new Date().toLocaleString()}</p><script>window.onload=()=>window.print()<\/script></body></html>`);w.document.close();}
function printCatalogueReceipt(id){const r=readLocalRecords('crigCatalogueRecords').find(x=>Number(x.id)===Number(id));if(!r)return;printDocument('Catalogue Receipt #'+r.id,[['Record ID',r.id],['Author(s) / Editor(s)',r.authors],['Title',r.title],['Publication Date',r.date],['Publication Type',r.type],['Publisher',r.publisher],['Number of Copies',r.copies],['ISBN / ISSN',r.isbn],['Class Number',r.classNumber],['Edition',r.edition],['Accessibility',r.accessibility],['Abstract',r.abstractMode==='upload'?(r.abstractFileName||'Scanned abstract uploaded'):r.abstract]]);}
function printThesisReceipt(id){const r=readLocalRecords('crigThesisRecords').find(x=>Number(x.id)===Number(id));if(!r)return;printDocument('Thesis Record #'+r.id,[['Record ID',r.id],['Author',r.author],['Degree / Type',r.type],['Class Number',r.classNumber],['Research Title',r.topic],['Institution',r.institution],['Year',r.year],['Accessibility',r.accessibility],['Abstract',r.abstractMode==='upload'?(r.abstractFileName||'Scanned abstract uploaded'):r.abstract],['Borrower',r.borrower]]);}
function printBorrowRequest(id){const r=getBorrowRequests().find(x=>x.id===id);if(!r)return;printDocument('Borrowing Request '+r.id,[['Request ID',r.id],['Status',r.status],['Full Name',r.borrower],['Student / Staff ID',r.classNumber],['Email',r.email],['Phone',r.phone],['Book / Publication Title',r.title],['Author / Researcher',r.author],['Division',r.division],['Number of Volumes',r.volumes],['Requested Collection Date',r.borrowDate],['Preferred Return Date & Time',new Date(r.returnAt).toLocaleString()],['Reason / Notes',r.notes],['Submitted At',new Date(r.submittedAt).toLocaleString()],['Admin Note',r.adminNote]]);}
function printBorrowerRecord(id){const b=getBorrowers().find(x=>x.id===id);if(!b)return;printDocument('Borrower Record '+b.id,[['Borrower ID',b.id],['Request ID',b.requestId],['Full Name',b.borrower],['Student / Staff ID',b.classNumber],['Email',b.email],['Phone',b.phone],['Book / Publication Title',b.title],['Author / Researcher',b.author],['Division',b.division],['Number of Volumes',b.volumes],['Collection Date',b.borrowDate],['Return Date & Time',new Date(b.returnAt).toLocaleString()],['Reminder',b.reminder],['Status',b.status]]);}
function checkBorrowerDueAlerts(){const key='libraryDueAlertDate';const today=new Date().toISOString().slice(0,10);if(localStorage.getItem(key)===today)return;const now=Date.now();const due=getBorrowers().filter(b=>{const t=new Date(b.returnAt).getTime();return t>now&&t-now<=24*60*60*1000;});if(due.length){localStorage.setItem(key,today);setTimeout(()=>alert(`CRIG Library reminder: ${due.length} borrower return(s) are due within 24 hours. Open Add Borrower to review and contact borrowers.`),500);}}

function getAdminAccounts(){let list=readLocalRecords('crigAdminAccounts');if(!list.length){list=[{id:'admin-1',name:'Library Administrator',email:'admin@crig.gov.gh',password:localStorage.getItem('elibraryPassword:admin')||'library123',createdAt:new Date().toISOString()}];writeLocalRecords('crigAdminAccounts',list);}return list;}
function addAdminAccount(e){e.preventDefault();const f=e.currentTarget;const list=getAdminAccounts();const name=f.elements.name.value.trim(),email=f.elements.email.value.trim().toLowerCase(),password=f.elements.password.value;if(list.length>=3){toast('The maximum of three admin accounts has been reached.');return;}if(list.some(a=>a.email.toLowerCase()===email)){toast('An administrator with this email already exists.');return;}list.push({id:'admin-'+Date.now(),name,email,password,createdAt:new Date().toISOString()});writeLocalRecords('crigAdminAccounts',list);f.reset();renderAdminAccounts();toast('Administrator account added. Share the login details securely.');}
function renderAdminAccounts(){const target=document.getElementById('adminAccountsList');if(!target)return;const list=getAdminAccounts();const count=document.getElementById('adminAccountCount');if(count)count.textContent=`${list.length} / 3 accounts`;target.innerHTML=list.map(a=>`<article class="admin-record-row"><div><strong>${escapeHtml(a.name)}</strong><small>${escapeHtml(a.email)} · Created ${new Date(a.createdAt).toLocaleString()}</small></div><span class="request-status approved">ADMIN</span>${a.id==='admin-1'?'<small>Primary account</small>':`<button class="danger-action" onclick="removeAdminAccount('${a.id}')">Remove</button>`}</article>`).join('');}
function removeAdminAccount(id){if(!confirm('Remove this administrator account?'))return;const list=getAdminAccounts().filter(a=>a.id!==id);writeLocalRecords('crigAdminAccounts',list);renderAdminAccounts();toast('Administrator account removed.');}
function renderLoginHistory(){const target=document.getElementById('loginHistoryList');if(!target)return;const rows=readLocalRecords('crigLoginHistory').slice().reverse();target.innerHTML=rows.length?rows.map(r=>`<article class="admin-record-row"><div><strong>${escapeHtml(r.name||r.email)}</strong><small>${escapeHtml(r.email)} · ${escapeHtml(r.role.toUpperCase())}</small></div><time>${new Date(r.loggedAt).toLocaleString()}</time></article>`).join(''):'<div class="no-messages"><h3>No sign-ins recorded yet</h3><p>Successful logins will be listed here.</p></div>';}
function printLoginHistory(){const rows=readLocalRecords('crigLoginHistory').slice().reverse();printDocument('Login History',rows.map((r,i)=>[`${i+1}. ${r.role}`,`${r.name||''} | ${r.email} | ${new Date(r.loggedAt).toLocaleString()}`]));}
function renderDownloadRequests(){const target=document.getElementById('downloadRequestsList');if(!target)return;const requests=readLocalRecords('crigDownloadRequests').slice().reverse();target.innerHTML=requests.length?requests.map(r=>`<article class="admin-record-row"><div><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.userName)} · ${escapeHtml(r.userEmail)} · Requested ${new Date(r.requestedAt).toLocaleString()}</small></div><span class="request-status ${r.status.toLowerCase()}">${escapeHtml(r.status)}</span><div class="borrower-record-actions">${r.status==='Pending'?`<button onclick="decideDownloadRequest('${r.id}','Approved')">Approve</button><button class="danger-action" onclick="decideDownloadRequest('${r.id}','Declined')">Decline</button>`:''}</div></article>`).join(''):'<div class="no-messages"><h3>No download requests yet</h3><p>Requests from users will appear here after they view a publication.</p></div>';}
function decideDownloadRequest(id,status){const list=readLocalRecords('crigDownloadRequests');const req=list.find(x=>x.id===id);if(!req)return;req.status=status;req.decidedAt=new Date().toISOString();req.decidedBy=localStorage.getItem('elibraryUserEmail')||'Administrator';writeLocalRecords('crigDownloadRequests',list);renderDownloadRequests();toast(`Download request ${status.toLowerCase()}.`);}
function getNews(){return readLocalRecords('crigLibraryNews');}
function publishNews(e){e.preventDefault();const f=e.currentTarget;const title=f.elements.title.value.trim(),body=f.elements.body.value.trim(),file=f.elements.image.files[0];const save=(imageData='')=>{const news=getNews();news.unshift({id:'NEWS-'+Date.now(),title,body,imageData,createdAt:new Date().toISOString(),author:localStorage.getItem('elibraryUserName')||'Library Administrator'});writeLocalRecords('crigLibraryNews',news);f.reset();renderAdminNews();renderNews('publicNewsList');renderNews('userNewsList');toast('News published to the public home page and user dashboard.');};if(file){if(file.size>2*1024*1024){toast('Please use a news image smaller than 2 MB.');return;}const reader=new FileReader();reader.onload=()=>save(reader.result);reader.readAsDataURL(file);}else save();}
function renderNews(targetId){const target=document.getElementById(targetId);if(!target)return;const news=getNews();target.innerHTML=news.length?news.map(n=>`<article class="news-card">${n.imageData?`<img src="${n.imageData}" alt="${escapeHtml(n.title)}">`:''}<div class="news-card-copy"><span>${new Date(n.createdAt).toLocaleDateString()} · LIBRARY NEWS</span><h3>${escapeHtml(n.title)}</h3><p>${escapeHtml(n.body)}</p></div></article>`).join(''):'<div class="news-empty"><strong>No news published yet</strong><p>Library news and announcements will appear here.</p></div>';}
let graphicNewsCache = [];
let graphicNewsLastLoaded = 0;
let graphicNewsLoading = false;
async function loadGraphicNews(force=false){
  const now=Date.now();
  if(graphicNewsLoading || (!force && now-graphicNewsLastLoaded<5*60*1000)) { if(graphicNewsCache.length) renderGraphicNewsLists(); return; }
  graphicNewsLoading=true;
  ['graphicNewsUpdated','graphicNewsUpdatedUser'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='Checking for latest headlines…';});
  try {
    const response=await fetch('/api/graphic-news'+(force?'?refresh=1':''),{headers:{'Accept':'application/json'}});
    const data=await response.json();
    if(!response.ok) throw new Error(data.error||'The news service is not available yet.');
    graphicNewsCache=Array.isArray(data.items)?data.items:[];
    graphicNewsLastLoaded=Date.now();
    renderGraphicNewsLists(data.updatedAt);
  } catch(err) {
    const msg='News service not connected. Start the website using the included backend and configure the feed/API key.';
    ['graphicNewsList','graphicNewsListUser'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=`<div class="news-empty"><strong>Latest news is temporarily unavailable</strong><p>${escapeHtml(msg)}</p><small>${escapeHtml(err.message||'')}</small></div>`;});
    ['graphicNewsUpdated','graphicNewsUpdatedUser'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='News connection unavailable';});
  } finally { graphicNewsLoading=false; }
}
function renderGraphicNewsLists(updatedAt){
  const html=graphicNewsCache.length?graphicNewsCache.map(item=>`<article class="graphic-news-card"><div class="graphic-news-card-top"><span class="graphic-news-tag">${escapeHtml(item.category||'GHANA NEWS')}</span><time>${escapeHtml(item.publishedLabel||'Recently published')}</time></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary||item.description||'Open the original article for details.')}</p><div class="graphic-news-card-footer"><span>Graphic Online · AI summary</span><a href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">Read original story ${icon('arrow',14)}</a></div></article>`).join(''):'<div class="news-empty"><strong>No headlines available</strong><p>The connected feed has not returned any stories yet.</p></div>';
  ['graphicNewsList','graphicNewsListUser'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=html;});
  const stamp=updatedAt?new Date(updatedAt):new Date();
  ['graphicNewsUpdated','graphicNewsUpdatedUser'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=`Last refreshed: ${stamp.toLocaleString()} · Auto-refreshes about every 30 minutes`;});
}
function refreshGraphicNews(showToast=false){graphicNewsLastLoaded=0;loadGraphicNews(true).then(()=>{if(showToast)toast('News refresh requested.');});}
setInterval(()=>{graphicNewsLastLoaded=0;loadGraphicNews(true);},30*60*1000);

function renderAdminNews(){const target=document.getElementById('adminNewsList');if(!target)return;const news=getNews();target.innerHTML=news.length?news.map(n=>`<article class="admin-record-row"><div><strong>${escapeHtml(n.title)}</strong><small>${new Date(n.createdAt).toLocaleString()} · ${escapeHtml(n.author)}</small><p>${escapeHtml(n.body)}</p></div><button class="danger-action" onclick="deleteNews('${n.id}')">Delete</button></article>`).join(''):'<p>No news posts have been published yet.</p>';}
function deleteNews(id){writeLocalRecords('crigLibraryNews',getNews().filter(n=>n.id!==id));renderAdminNews();renderNews('publicNewsList');renderNews('userNewsList');}

function showAdminTab(tab,btn){document.querySelectorAll('.admin-tab').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const panels={resources:'adminResourcesTab',catalogue:'adminCatalogueTab',theses:'adminThesesTab',support:'adminSupportTab',borrowers:'adminBorrowersTab',admins:'adminAdminsTab',logins:'adminLoginsTab',downloads:'adminDownloadsTab',news:'adminNewsTab'};Object.entries(panels).forEach(([key,id])=>{const el=document.getElementById(id);if(el)el.style.display=key===tab?'block':'none';});if(tab==='resources')renderAdminResources();if(tab==='catalogue')renderCatalogueRecords();if(tab==='theses')renderThesisRecords();if(tab==='borrowers'){renderBorrowRequests();renderBorrowers();}if(tab==='admins')renderAdminAccounts();if(tab==='logins')renderLoginHistory();if(tab==='downloads')renderDownloadRequests();if(tab==='news')renderAdminNews();}
function updateFileName(input){const el=document.getElementById('selectedFile');if(el)el.textContent=input.files[0]?input.files[0].name:'No file selected';}

function renderBorrowRequests(){
 const pendingEl=document.getElementById('borrowRequestsList'), historyEl=document.getElementById('borrowRequestHistory');if(!pendingEl||!historyEl)return;
 const requests=getBorrowRequests();const pending=requests.filter(r=>r.status==='Pending');const history=requests.filter(r=>r.status!=='Pending');
 const badge=document.getElementById('borrowRequestBadge');if(badge)badge.textContent=pending.length;
 const count=document.getElementById('borrowRequestCount');if(count)count.textContent=`${pending.length} pending`;
 const hcount=document.getElementById('borrowHistoryCount');if(hcount)hcount.textContent=`${history.length} records`;
 pendingEl.innerHTML=pending.length?pending.slice().reverse().map(r=>`<article class="borrower-record request-card"><div class="borrower-record-main"><span class="borrower-record-icon">${icon('user',22)}</span><div><strong>${escapeHtml(r.borrower)}</strong><small>${escapeHtml(r.id)} · ${escapeHtml(r.classNumber)} · ${escapeHtml(r.email)} · ${escapeHtml(r.phone)}</small><p><b>${escapeHtml(r.title)}</b> — ${escapeHtml(r.author||'Author not specified')}</p><small>${escapeHtml(r.division)} · ${escapeHtml(r.volumes)} volume(s) · Requested ${new Date(r.borrowDate+'T00:00').toLocaleDateString()}</small>${r.notes?`<p>${escapeHtml(r.notes)}</p>`:''}</div></div><div class="borrower-due"><small>Requested return</small><strong>${new Date(r.returnAt).toLocaleDateString()} · ${new Date(r.returnAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</strong><small>Submitted ${new Date(r.submittedAt).toLocaleString()}</small></div><div class="borrower-record-actions"><button onclick="printBorrowRequest('${r.id}')">Print</button><button onclick="decideBorrowRequest('${r.id}','Approved')">Approve</button><button class="danger-action" onclick="decideBorrowRequest('${r.id}','Declined')">Decline</button></div></article>`).join(''):`<div class="no-messages"><div>${icon('check',42)}</div><h3>No pending borrowing requests</h3><p>New requests submitted by users will appear here for review.</p></div>`;
 historyEl.innerHTML=history.length?history.slice().reverse().map(r=>`<article class="request-history-row"><div><strong>${escapeHtml(r.borrower)} — ${escapeHtml(r.title)}</strong><small>${escapeHtml(r.id)} · ${escapeHtml(r.email)} · ${escapeHtml(r.division)}</small><small>Return requested: ${new Date(r.returnAt).toLocaleString()}</small>${r.adminNote?`<p>${escapeHtml(r.adminNote)}</p>`:''}</div><span class="request-status ${r.status.toLowerCase()}">${r.status}</span></article>`).join(''):`<div class="no-messages compact-empty"><p>No decisions have been recorded yet.</p></div>`;
}
function decideBorrowRequest(id,status){const requests=getBorrowRequests();const r=requests.find(x=>x.id===id);if(!r)return;let note='';if(status==='Declined'){note=prompt('Optional reason for declining this request:')||'Please contact the library for further information.';}else{note=prompt('Optional approval note / collection instructions:')||'Your request has been approved. Please contact the library to confirm collection.';const borrowers=getBorrowers();if(!borrowers.some(b=>b.requestId===r.id)){borrowers.push({id:'CRIG-'+String(Date.now()).slice(-6),requestId:r.id,borrower:r.borrower,classNumber:r.classNumber,email:r.email,phone:r.phone,title:r.title,author:r.author,division:r.division,volumes:r.volumes,borrowDate:r.borrowDate,returnAt:r.returnAt,reminder:'email',status:'Approved',createdAt:new Date().toISOString(),reminderSent:false});localStorage.setItem('libraryBorrowers',JSON.stringify(borrowers));}}
r.status=status;r.adminNote=note;r.reviewedAt=new Date().toISOString();localStorage.setItem('libraryBorrowRequests',JSON.stringify(requests));renderBorrowRequests();renderBorrowers();toast(`Borrowing request ${status.toLowerCase()}.`);}

function getBorrowers(){return JSON.parse(localStorage.getItem('libraryBorrowers')||'[]');}
function saveBorrower(e){
  e.preventDefault();const f=e.currentTarget;const data=Object.fromEntries(new FormData(f).entries());
  const borrowers=getBorrowers();data.id=data.borrowerId.trim()||`CRIG-${String(Date.now()).slice(-6)}`;data.createdAt=new Date().toISOString();data.reminderSent=false;
  const due=new Date(data.returnAt);if(Number.isNaN(due.getTime())||due<=new Date()){toast('Please choose a return date and time in the future.');return;}
  borrowers.push(data);localStorage.setItem('libraryBorrowers',JSON.stringify(borrowers));f.reset();const dateField=f.querySelector('[name=borrowDate]');if(dateField)dateField.value=new Date().toISOString().slice(0,10);renderBorrowers();toast('Borrower record saved. Reminder is set for 24 hours before return.');
}
function renderBorrowers(){
 const list=document.getElementById('borrowerRecords');if(!list)return;const q=(document.getElementById('borrowerSearch')?.value||'').toLowerCase();const selected=document.getElementById('calendarDate')?.value||'';const all=getBorrowers();const now=Date.now();const dueSoon=all.filter(b=>{const t=new Date(b.returnAt).getTime();return t>now&&t-now<=24*60*60*1000;});
 const banner=document.getElementById('borrowerReminderBanner');const dueTomorrow=all.filter(b=>{const t=new Date(b.returnAt).getTime();return t>now&&t-now<=48*60*60*1000&&t-now>24*60*60*1000;});
 if(banner){if(dueSoon.length){banner.style.display='flex';banner.innerHTML=`${icon('bell',22)} <div><strong>${dueSoon.length} return${dueSoon.length===1?'':'s'} due within 24 hours</strong><p>${dueSoon.map(b=>escapeHtml(b.borrower)+' — '+escapeHtml(b.title)).join(' • ')}</p></div>`;}else{banner.style.display='none';}}
 const bc=document.getElementById('borrowerCount');if(bc)bc.textContent=all.length;const ds=document.getElementById('dueSoonCount');if(ds)ds.textContent=dueSoon.length;const rc=document.getElementById('borrowerRecordCount');if(rc)rc.textContent=`${all.length} record${all.length===1?'':'s'}`;
 const filtered=all.filter(b=>(!q||[b.id,b.borrower,b.title,b.author,b.phone].join(' ').toLowerCase().includes(q))&&(!selected||b.returnAt.slice(0,10)===selected));
 if(!filtered.length){list.innerHTML=`<div class="no-messages"><div>${icon('user',42)}</div><h3>No borrower records found</h3><p>Add a borrower using the form above, or change your search/date filter.</p></div>`;return;}
 list.innerHTML=[...filtered].reverse().map(b=>{const due=new Date(b.returnAt);const overdue=due.getTime()<now;return `<article class="borrower-record"><div class="borrower-record-main"><span class="borrower-record-icon">${icon('user',22)}</span><div><strong>${escapeHtml(b.borrower)}</strong><small>${escapeHtml(b.id)} · ${escapeHtml(b.division||'General Collection')}</small><p><b>${escapeHtml(b.title)}</b> — ${escapeHtml(b.author||'Author not entered')}</p></div></div><div class="borrower-due ${overdue?'overdue':''}"><small>${overdue?'Past due':'Return date & time'}</small><strong>${due.toLocaleDateString()} · ${due.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</strong><small>${escapeHtml(b.reminder||'both')} reminder</small></div><div class="borrower-record-actions"><button onclick="printBorrowerRecord('${b.id}')">Print</button><button onclick="contactBorrower('${b.id}')">Send reminder</button><button class="danger-action" onclick="deleteBorrower('${b.id}')">Delete</button></div></article>`;}).join('');
}
function deleteBorrower(id){if(!confirm('Delete this borrower record?'))return;localStorage.setItem('libraryBorrowers',JSON.stringify(getBorrowers().filter(b=>b.id!==id)));renderBorrowers();toast('Borrower record deleted.');}
function contactBorrower(id){const b=getBorrowers().find(x=>x.id===id);if(!b)return;const due=new Date(b.returnAt);const body=`Reminder from E.K. Tetteh Library (CRIG): ${b.title} is due for return on ${due.toLocaleDateString()} at ${due.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}. Please return it on time.`;if(b.email){window.location.href=`mailto:${encodeURIComponent(b.email)}?subject=${encodeURIComponent('E.K. Tetteh Library book return reminder')}&body=${encodeURIComponent(body)}`;}else if(b.phone){window.location.href=`sms:${encodeURIComponent(b.phone)}?body=${encodeURIComponent(body)}`;}else{toast('No email or phone number is saved for this borrower.');return;}toast('Opened your email/SMS app with a reminder draft.');}

function renderAdminMessages(messages){
  if(!messages.length) return `<div class="no-messages"><div>${icon("chat",45)}</div><h3>No support messages yet</h3><p>Messages sent through “Need Help? Chat with us” will appear here.</p></div>`;
  return [...messages].reverse().map((m,i)=>`<article class="admin-message ${m.status==='unread'?'unread':''}"><div class="admin-message-top"><div class="sender"><span class="message-avatar">${icon("user",16)}</span><div><strong>Library User</strong><small>User support request</small></div></div><time>${new Date(m.time).toLocaleString()}</time></div><p>${escapeHtml(m.text)}</p><div class="admin-message-actions"><span class="message-status">${m.status==='unread'?'NEW':'READ'}</span><button onclick="markMessageRead(${messages.length-1-i})">Mark as read</button><button onclick="replyToUser(${messages.length-1-i})">Reply</button></div></article>`).join("");
}

function markMessageRead(index){
  const messages=JSON.parse(localStorage.getItem("libraryMessages") || "[]");
  if(messages[index]) messages[index].status="read";
  localStorage.setItem("libraryMessages",JSON.stringify(messages)); adminDashboard();
}
function replyToUser(index){
  const messages=JSON.parse(localStorage.getItem("libraryMessages") || "[]");
  const subject=messages[index]?.text ? `Regarding: ${messages[index].text.slice(0,45)}` : "Library support";
  const reply=prompt(`Reply to the user (${subject}):`);
  if(reply && reply.trim()) toast("Reply drafted. Connect this action to your email/database backend for delivery.");
}
function escapeHtml(str){return String(str).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

const divisionProfiles = {
"Plant Pathology": {
 image:"https://images.unsplash.com/photo-1599708153386-62bf9f22a8e1?auto=format&fit=crop&w=1800&q=85",
 eyebrow:"CROP HEALTH · DISEASE MANAGEMENT",
 intro:"The Plant Pathology Division of the Cocoa Research Institute of Ghana (CRIG) conducts basic and applied research into the management of diseases affecting the Institute’s mandate crops: cocoa, coffee, kola, shea and cashew.",
 mission:"To provide farmers with cost-effective and environmentally friendly disease-control strategies that fit their resources and help sustain production of CRIG’s mandate crops.",
 sections:[
 {title:"Virology Section",text:"The Virology Section investigates virus diseases of mandate crops, with particular emphasis on the epidemiology and control of cacao swollen shoot virus disease (CSSVD). Its work includes maintaining a collection of CSSV isolates and developing practical diagnostic, surveillance and management knowledge.",items:["Diagnosing CSSVD through visual inspection and serological, biochemical and molecular methods.","Studying the molecular diversity of CSSVD-associated badnaviruses in Ghana.","Investigating infected tissues using histochemical, cytopathological, biochemical and molecular methods.","Assessing cocoa germplasm for resistance or tolerance to CSSV in laboratory, screenhouse and field settings.","Investigating alternative hosts, vectors, micronutrient effects, soil fertility, shade and disease severity.","Educating stakeholders on CSSVD status and appropriate management practices."]},
 {title:"Mycology Section",text:"The Mycology Section studies fungal diseases of economic importance on CRIG mandate crops, with special interest in Phytophthora pod rot (black pod disease), canker and host–pathogen interactions.",items:["Diagnosing disease samples from farms and experimental plots.","Identifying and characterising pathogens using morphological, physiological and molecular tools.","Studying disease epidemiology to develop effective management strategies.","Investigating cultural, chemical and biological disease-control methods.","Screening crop germplasm for resistance to major diseases.","Evaluating fungicide efficacy and spray equipment, and communicating recommendations through technical bulletins, annual reports and scientific publications.","Studying fungicide effects on the cocoa ecosystem and fungal spoilage of cocoa, coffee, shea, cashew and kola products.","Providing disease education and sensitisation for stakeholders."]},
 {title:"Collaboration & farmer support",text:"The Division collaborates with other CRIG scientific divisions, research institutions, universities and development partners to develop farmer-centred, affordable and environmentally responsible disease-management strategies. Scientists and technical staff also engage with farmers, extension officers, visiting researchers and students."}
 ]},
"Plant Breeding": {
 image:"https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1800&q=85", eyebrow:"GENETICS · VARIETY DEVELOPMENT",
 intro:"The Plant Breeding Division develops improved varieties of CRIG mandate crops—cocoa, coffee, kola, cashew and shea—for cultivation by farmers. Conventional and molecular breeding approaches are used to improve yield, resilience, establishment and product quality.",
 mission:"To develop, test and deliver productive, well-adapted planting materials that match growing environments and meet farmer and industry needs.",
 sections:[
 {title:"Cocoa improvement",text:"Research aims to deliver productive, resilient cocoa planting materials with strong bean yield and desirable quality traits.",items:["Testing under-utilised cocoa clones as parents for high-yielding varieties.","Developing clones and hybrids with improved yield and resistance or tolerance to major pests and diseases.","Evaluating varieties for establishment, early bearing and performance across locations.","Developing high-yielding varieties with fine-flavour attributes and assessing profitability."]},
 {title:"Coffee, kola, cashew & shea",text:"The Division also works to improve the planting materials and production potential of Ghana’s other mandate crops.",items:["Coffee: selecting robusta materials for yield, cup quality and tolerance to drought or nutritional stress.","Kola: conserving and evaluating germplasm for yield, compatibility, early bearing and nut quality.","Cashew: evaluating clones and hybrids for establishment, yield, nut quality and pest/disease tolerance.","Shea: collecting germplasm and developing propagation techniques, hybrids and clones."]},
 {title:"Crop Improvement Thrust",text:"The research thrust combines crop genomics, genetics and breeding with tissue culture and physiological approaches to resilience. Priorities include characterising germplasm diversity, identifying useful traits and biomolecules, exploiting complementary parent lines, and validating varieties in multi-location, participatory field trials."}
 ]},
"Soil Science": {image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85",eyebrow:"SOIL HEALTH · PLANT NUTRITION",intro:"The Soil Science Division conducts basic and strategic research into soil fertility and plant nutrition for CRIG mandate crops. Its work helps explain how soil properties influence crop establishment, health, productivity and sustainable land use.",mission:"To generate evidence-based soil and nutrient-management knowledge that supports productive, sustainable cocoa and other mandate-crop systems.",sections:[{title:"Research focus",text:"Soil research connects field conditions with crop performance and practical management recommendations.",items:["Assessing soil fertility and physical and chemical properties in crop-growing environments.","Investigating nutrient availability, plant nutrition and responses to soil amendments.","Studying relationships among soil condition, crop growth and yield.","Supporting sustainable soil-management practices and evidence-based recommendations for farmers."]},{title:"Knowledge for practice",text:"The Division’s research supports extension, field trials and collaboration across CRIG so that soil-management guidance reflects local conditions and the needs of mandate crops."}]},
"Entomology": {image:"https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1800&q=85",eyebrow:"INSECT SCIENCE · CROP PROTECTION",intro:"The Entomology Division studies insect pests and other insects associated with CRIG mandate crops. Its work supports the identification, monitoring and management of pests that affect crop health, farm productivity and the sustainability of cocoa systems.",mission:"To develop practical, environmentally responsible insect-pest management approaches that protect crops and support farmers.",sections:[{title:"Research and monitoring",text:"Entomological research examines pest biology, ecology, crop interactions and opportunities for more effective control.",items:["Identifying and monitoring insect pests affecting cocoa and other mandate crops.","Studying pest life cycles, population dynamics and crop damage.","Evaluating integrated pest-management approaches and control options.","Investigating beneficial insects and ecological factors relevant to crop protection.","Sharing research findings and management guidance with farmers and extension stakeholders."]},{title:"Integrated crop protection",text:"The Division’s work complements plant pathology, agronomy and other research areas to support coordinated, evidence-led crop protection."}]},
"Agronomy": {image:"https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=85",eyebrow:"CROP PRODUCTION · FARM SYSTEMS",intro:"The Agronomy Division develops and evaluates practical approaches to the cultivation and management of cocoa and other mandate crops. Its research links crop establishment, field management and production practices with reliable farm performance.",mission:"To develop cost-effective, farmer-focused agronomic practices that improve crop establishment, productivity and the sustainability of mandate-crop farms.",sections:[{title:"Research and field practice",text:"Agronomy translates research into crop-management approaches that can be tested and applied under real farm conditions.",items:["Evaluating crop establishment and field-management practices.","Studying shade, spacing, pruning and other factors that influence crop performance where relevant to the production system.","Assessing production practices for yield, efficiency and sustainability.","Supporting on-farm demonstrations and practical guidance for growers.","Collaborating with other divisions to address connected soil, pest, disease and crop-growth challenges."]},{title:"Farmer-centred innovation",text:"The Division’s work is oriented toward practical solutions to farmers’ concerns and the responsible use of research evidence in the field."}]},
"Physio/Biochem": {image:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1800&q=85",eyebrow:"PLANT FUNCTION · BIOCHEMISTRY",intro:"The Physiology and Biochemistry research area investigates the biological and chemical processes that influence the growth, development, stress response and quality of CRIG mandate crops.",mission:"To build scientific understanding of crop function and biochemical traits that can inform crop improvement, resilience and product quality.",sections:[{title:"Plant physiology",text:"Physiological studies help explain how crops grow and respond to their environment.",items:["Investigating plant growth, development and responses to environmental stress.","Examining physiological traits associated with adaptation and crop performance.","Supporting research into resilience under changing production conditions."]},{title:"Biochemistry and quality",text:"Biochemical research explores compounds and processes relevant to crop health and product characteristics.",items:["Studying biochemical traits associated with stress tolerance and product quality.","Contributing laboratory evidence to crop-improvement and post-harvest research.","Collaborating across scientific divisions to interpret biological responses and support practical recommendations."]}]},
"SSSU": {image:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85",eyebrow:"SOCIAL SCIENCE · SUSTAINABILITY",intro:"The SSSU supports the translation of CRIG research into outcomes that are socially acceptable, environmentally responsible and economically viable. Its work considers the people, institutions and practical conditions that influence the adoption and impact of agricultural technologies.",mission:"To help ensure research innovations respond to stakeholder needs and can be adopted sustainably in real-world farming and community settings.",sections:[{title:"Research and engagement",text:"Socio-economic and stakeholder-focused work helps connect scientific findings with the realities of farming communities.",items:["Examining farmer needs, perspectives and the adoption of research recommendations.","Studying social and economic factors that influence production choices and technology uptake.","Supporting stakeholder engagement, extension and communication of research findings.","Considering the economic, social and environmental dimensions of sustainable crop systems.","Collaborating with scientific divisions to strengthen the relevance and impact of CRIG technologies."]},{title:"From research to impact",text:"By considering affordability, acceptability and practical use, the unit contributes to research that can deliver meaningful benefits for farmers and the wider cocoa value chain."}]}
};
function openDivisionPage(name){
 const d=divisionProfiles[name]||{image:"https://images.unsplash.com/photo-1523742815154-0b8f7f3c7f4f?auto=format&fit=crop&w=1800&q=85",eyebrow:"CRIG RESEARCH DIVISION",intro:`Explore research, publications and institutional knowledge associated with the ${name} Division at the Cocoa Research Institute of Ghana.`,mission:"Supporting science-led, sustainable and farmer-focused research across CRIG mandate crops.",sections:[{title:"Research and knowledge",text:divisions.find(x=>x[0]===name)?.[2]||"This division contributes to CRIG's research mission.",items:["Explore publications and reports assigned to this division in the E-Library.","Use the library search to find relevant research outputs.","Contact library support for assistance locating a resource."]}]};
 const sections=d.sections.map(sec=>`<section class="division-detail-section"><div class="division-section-heading"><span class="division-section-mark"></span><h2>${sec.title}</h2></div><p>${sec.text}</p>${sec.items?`<ul>${sec.items.map(item=>`<li>${item}</li>`).join('')}</ul>`:''}</section>`).join('');
 app.innerHTML=`<main class="division-detail-page"><header class="division-detail-nav"><button class="division-back" onclick="dashboard()">← Back to E-Library</button><div class="division-detail-brand">${logoMarkup()}<div><strong>COCOA RESEARCH INSTITUTE OF GHANA</strong><span>E. K. TETTEH LIBRARY · CENTRE OF EXCELLENCE</span></div></div><button class="division-nav-action" onclick="dashboard();setTimeout(()=>document.getElementById('globalSearch')?.focus(),80)">Explore resources ↗</button></header><section class="division-hero" style="--division-image:url('${d.image}')"><div class="division-hero-shade"></div><div class="division-hero-content"><span class="division-eyebrow">${d.eyebrow}</span><p class="division-breadcrumb">RESEARCH DIVISIONS <span> / </span> ${name.toUpperCase()}</p><h1>${name==='Physio/Biochem'?'Physiology & Biochemistry':name} <em>Division</em></h1><p>${d.intro}</p><a class="division-hero-link" href="#division-overview">Discover the division <span>↓</span></a></div><div class="division-hero-caption">RESEARCH FOR SUSTAINABLE COCOA</div></section><section id="division-overview" class="division-detail-content"><div class="division-content-main"><div class="division-overline">ABOUT THE DIVISION</div><h2>Science that supports <span>sustainable agriculture.</span></h2><p class="division-intro-copy">${d.intro}</p><div class="division-mission"><span class="mission-icon">✳</span><div><small>OUR PURPOSE</small><p>${d.mission}</p></div></div>${sections}<div class="division-collab-card"><div class="collab-icon">${icon('users',26)}</div><div><h3>Research works best together</h3><p>CRIG’s research divisions contribute complementary expertise. Explore the E-Library collection to find related studies, technical bulletins, reports and publications.</p><button onclick="dashboard();setTimeout(()=>{activeDivisionFilter='${name}';activeCategoryFilter='';loadUserResources();const t=document.getElementById('contentTitle');if(t)t.textContent='${name} resources';},100)">View ${name} resources ${icon('arrow',16)}</button></div></div></div><aside class="division-detail-aside"><div class="division-aside-image" style="background-image:url('${d.image}')"></div><div class="division-aside-card"><span class="division-overline">EXPLORE THE COLLECTION</span><h3>Research from ${name}</h3><p>Find books, research papers, reports and technical publications uploaded to the E.K. Tetteh Library.</p><button onclick="dashboard();setTimeout(()=>{activeDivisionFilter='${name}';activeCategoryFilter='';loadUserResources();},100)">Browse publications ${icon('arrow',16)}</button></div><div class="division-aside-note">${icon('book-open',20)}<span>Knowledge for a sustainable cocoa industry.</span></div></aside></section><footer class="division-detail-footer"><span>© Cocoa Research Institute of Ghana · E. K. Tetteh Library</span><button onclick="dashboard()">Return to the library ↑</button></footer></main>`;
 window.scrollTo({top:0,behavior:'smooth'});
}
function selectDivision(el, name) { openDivisionPage(name); }

function toggleReportsMenu(){
 const menu=document.getElementById('reportsSubmenu'); const arrow=document.getElementById('reportsChevron');
 if(!menu)return; const opening=menu.style.display==='none'; menu.style.display=opening?'grid':'none'; if(arrow)arrow.textContent=opening?'⌃':'⌄';
}
function collectionMatches(resource,title){
 const type=(resource.type||'').toLowerCase(), name=(resource.title||'').toLowerCase(), desc=(resource.description||'').toLowerCase();
 const key=title.toLowerCase();
 if(key==='reports')return type.includes('report')||name.includes('report')||desc.includes('report');
 if(key==='annual report')return type.includes('annual report')||name.includes('annual report');
 if(key==='progress report')return type.includes('progress report')||name.includes('progress report');
 if(key==='journals/books')return ['book','journal'].some(t=>type.includes(t)||name.includes(t));
 if(key==='technical bulletin')return type.includes('technical bulletin')||name.includes('technical bulletin');
 if(key==='references')return type.includes('reference')||name.includes('reference')||desc.includes('reference');
 if(key==='cocoa')return type.includes('cocoa')||name.includes('cocoa')||desc.includes('cocoa');
 if(key==='current periodicals')return type.includes('current periodical')||name.includes('periodical');
 if(key==='management books')return (type.includes('book')||name.includes('book'))&&(name.includes('management')||desc.includes('management'));
 return type.includes(key)||name.includes(key)||desc.includes(key);
}
async function openCollectionPage(title){
 activeDivisionFilter=''; activeCategoryFilter=title; window.scrollTo({top:0,behavior:'smooth'});
 const isReport=title==='Reports';
 app.innerHTML=`<main class="division-detail-page collection-detail-page"><header class="division-detail-nav"><button class="division-back" onclick="dashboard()">← Back to E-Library</button><div class="division-detail-brand">${logoMarkup()}<div><strong>COCOA RESEARCH INSTITUTE OF GHANA</strong><span>E. K. TETTEH LIBRARY · CENTRE OF EXCELLENCE</span></div></div><button class="division-nav-action" onclick="dashboard()">All collections ↗</button></header><section class="collection-page-hero"><span class="division-eyebrow">E. K. TETTEH LIBRARY · COLLECTIONS</span><p class="division-breadcrumb">HOME / COLLECTIONS / ${title.toUpperCase()}</p><h1>${title==='Annual Report'?'Annual Report':title==='Progress Report'?'Progress Report':title==='Cocoa'?'Cocoa Collection':title}</h1><p>${collectionDescription(title)}</p>${isReport?`<div class="report-subnav"><button onclick="openCollectionPage('Annual Report')">1. Annual Report</button><button onclick="openCollectionPage('Progress Report')">2. Progress Report</button></div>`:''}</section><section class="collection-page-content"><div class="collection-results-heading"><div><span class="division-overline">BROWSE THE LIBRARY</span><h2>${title==='Annual Report'?'Annual Reports':title==='Progress Report'?'Progress Reports':title}</h2><p>Resources uploaded by the library administrator will appear here. Select a record to view or download it.</p></div><button class="borrower-secondary" onclick="dashboard()">← Return to dashboard</button></div><div id="collectionPageResources" class="user-resource-list"><div class="resource-empty compact"><p>Loading collection…</p></div></div></section><footer class="division-detail-footer"><span>© Cocoa Research Institute of Ghana · E. K. Tetteh Library</span><button onclick="dashboard()">Return to the library ↑</button></footer></main>`;
 await renderCollectionPageResources(title);
}
function collectionDescription(title){const descriptions={'Journals/Books':'Explore books, academic journals and scholarly works available through the E.K. Tetteh Library.','Technical Bulletin':'Browse technical bulletins and practical research guidance published by CRIG.','Cocoa':'Explore cocoa-related research, cultivation, crop protection, quality and industry resources.','References':'Find reference materials, guides and supporting resources for research and study.','Reports':'Browse institutional reports. Choose Annual Report or Progress Report to narrow your search.','Annual Report':'Review annual reports documenting institutional activities, research progress and achievements.','Progress Report':'Browse progress reports describing ongoing work, milestones and research developments.','Current Periodicals':'Discover current periodicals and recent serial publications.','Management Books':'Browse books on management, administration, leadership and organizational practice.','Thesis Collection':'Search academic theses, dissertations and student research projects registered in the E.K. Tetteh Library.'};return descriptions[title]||'Browse resources available in the E.K. Tetteh Library.';}
async function renderCollectionPageResources(title){
 const target=document.getElementById('collectionPageResources');if(!target)return;
 if(title==='Thesis Collection'){renderUserThesisCollection();return;}
 let resources=await getResources(); resources=resources.filter(r=>collectionMatches(r,title));
 if(!resources.length){target.innerHTML=`<div class="resource-empty compact"><div>${icon('book-open',34)}</div><h3>No resources in this collection yet</h3><p>When the library administrator uploads ${title.toLowerCase()} resources, they will be listed here.</p><button class="borrower-secondary" onclick="dashboard()">Back to all collections</button></div>`;return;}
 target.innerHTML=resources.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(r=>`<article class="user-resource"><div class="user-resource-icon">${icon(resourceIcon(r.type),22)}</div><div><span>${escapeHtml(r.type)} · ${escapeHtml(r.division||'General Collection')}</span><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.author||'Library Collection')} • ${escapeHtml(r.year)}</p><small>${escapeHtml(r.description||'Available through the E.K. Tetteh Library digital collection.')}</small></div>${userDownloadButton(r)}</article>`).join('');
}
function openCategory(title){openCollectionPage(title);}

function filterCards(q) {
  q = q.toLowerCase().trim();
  document.querySelectorAll(".category-card").forEach(c=>{
    c.style.display = !q || c.dataset.search.includes(q) ? "block" : "none";
  });
  if(q) {
    document.getElementById("contentTitle").textContent = `Search results for “${q}”`;
    document.getElementById("contentSubtitle").textContent = "Matching publication categories are shown below.";
  }
}

function toggleUserMenu(){ document.getElementById("userMenu")?.classList.toggle("show"); }
function toast(msg){ const t=document.getElementById("toast"); if(!t)return; t.textContent=msg; t.classList.add("show"); clearTimeout(window.__toast); window.__toast=setTimeout(()=>t.classList.remove("show"),2800); }
function logout(){ localStorage.removeItem("elibraryLoggedIn"); localStorage.removeItem("elibraryRole"); localStorage.removeItem("elibraryAdminId"); homePage(); }

document.addEventListener("keydown", e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(); document.getElementById("globalSearch")?.focus();}
});

getAdminAccounts();
if(localStorage.getItem("elibraryLoggedIn")==="true") {
  localStorage.getItem("elibraryRole")==="admin" ? adminDashboard() : dashboard();
} else loginScreen();
