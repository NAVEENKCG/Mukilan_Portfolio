const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'oppenoffice.com', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Rebrand text
html = html.replace(/Oppenheim Architecture/gi, 'Mukilan Architecture');
html = html.replace(/Oppenheim/g, 'Mukilan');
html = html.replace(/oppenheim/g, 'mukilan');
html = html.replace(/OPPENHEIM/g, 'MUKILAN');

// 2. Replace the SVG logos
// The original logo has width="440" height="103" viewBox="0 0 440 103"
const logoRegex = /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" xmlns:xlink="http:\/\/www\.w3\.org\/1999\/xlink" width="440" height="103" viewBox="0 0 440 103">[\s\S]*?<\/svg>/g;

const newLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="103" viewBox="0 0 440 103">
  <text x="0" y="50" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="currentColor" letter-spacing="-0.03em">MUKILAN</text>
  <text x="0" y="85" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="800" fill="currentColor" letter-spacing="-0.03em">ARCHITECTURE</text>
</svg>`;

html = html.replace(logoRegex, newLogo);

// 3. Replace Meta description with Resume Bio
const oldDesc = "Working out of Miami and Basel, mukilan crafts buildings by carefully balancing the needs of the individual and the attributes of the location.";
const newDesc = "Mukilan E V - Executive Architect @ Pinnacle FutureBuild Pvt. Limited. BIM Architect & Conceptual designer. Designing Experience-Driven Environments that Connect People with Nature.";
html = html.replace(new RegExp(oldDesc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), newDesc);


// 4. Inject Resume Modal and Floating Button
const resumeOverlay = `
<style>
  /* Glassmorphism Resume Modal adhering to global rules */
  :root {
    --accent: #d4af37; /* Warm highlight */
  }
  #mukilan-resume-btn {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 50;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    color: #fff;
    padding: 12px 24px;
    border-radius: 9999px;
    font-family: 'Outfit', sans-serif;
    font-weight: 500;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  #mukilan-resume-btn:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.18);
    transform: translateY(-4px) scale(1.04);
  }
  
  #mukilan-resume-modal {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(5, 10, 24, 0.8);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  #mukilan-resume-modal.active {
    opacity: 1;
    pointer-events: auto;
  }
  
  .resume-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.10);
    border-radius: 24px;
    padding: 40px;
    max-width: 800px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    color: #fff;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transform: translateY(40px);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  #mukilan-resume-modal.active .resume-card {
    transform: translateY(0);
  }
  
  .resume-card h1 {
    font-family: 'Clash Display', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 8px 0;
    letter-spacing: -0.03em;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(135deg, #fff, var(--accent));
    opacity: 1 !important;
  }
  .resume-card h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(255,255,255,0.8);
    margin: 0 0 32px 0;
    opacity: 1 !important;
  }
  .resume-section {
    margin-bottom: 32px;
  }
  .resume-section h3 {
    font-family: 'Clash Display', sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    opacity: 1 !important;
  }
  .resume-item {
    margin-bottom: 24px;
  }
  .resume-item h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    opacity: 1 !important;
  }
  .resume-item .meta {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.6);
    margin: 0 0 8px 0;
  }
  .resume-item p {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.7);
    margin: 0;
    opacity: 1 !important;
  }
  
  .close-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: transparent;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .close-btn:hover {
    transform: scale(1.1);
  }
</style>

<button id="mukilan-resume-btn" onclick="document.getElementById('mukilan-resume-modal').classList.add('active')">
  Profile & Resume
</button>

<div id="mukilan-resume-modal">
  <button class="close-btn" onclick="document.getElementById('mukilan-resume-modal').classList.remove('active')">&times;</button>
  <div class="resume-card">
    <h1>Mukilan E V</h1>
    <h2>Executive Architect @ Pinnacle FutureBuild Pvt. Limited<br>BIM Architect | Conceptual Designer | Experience-Driven Environments</h2>
    
    <div class="resume-section">
      <h3>Experience</h3>
      <div class="resume-item">
        <h4>Executive Architect</h4>
        <div class="meta">Pinnacle | July 2026 - Present | Durgapur, India</div>
      </div>
      <div class="resume-item">
        <h4>Research Advisory</h4>
        <div class="meta">NLC India Limited | Dec 2025 | Neyveli Township</div>
        <p>Worked on the design and development of the New Guest House near LSN Township, Barsingsar, contributing to concept generation, site-responsive planning and sustainable design integration. Developed architectural plans, spatial layouts and detailed design strategies while incorporating net-zero and nature-integrated design principles to enhance environmental and user performance.</p>
      </div>
      <div class="resume-item">
        <h4>Intern Architect</h4>
        <div class="meta">Mindspace Architects | Dec 2024 - June 2025 | Bengaluru, India</div>
      </div>
      <div class="resume-item">
        <h4>Architectural Intern</h4>
        <div class="meta">LP Builders | June 2024 - July 2024 | Vadalur, India</div>
      </div>
      <div class="resume-item">
        <h4>Architectural Intern</h4>
        <div class="meta">L&T Construction | Dec 2023 - Jan 2024 | Chennai, India</div>
      </div>
    </div>
    
    <div class="resume-section">
      <h3>Education</h3>
      <div class="resume-item">
        <h4>National Institute of Technology, Tiruchirappalli</h4>
        <div class="meta">Bachelor of Architecture - BArch | Dec 2021 - May 2026</div>
      </div>
      <div class="resume-item">
        <h4>Jayapriya Vidyalaya Senior Secondary School (CBSE)</h4>
        <div class="meta">Computer Science | July 2018 - March 2020</div>
      </div>
    </div>
    
    <div class="resume-section">
      <h3>Top Skills</h3>
      <div class="resume-item">
        <p>Concept Development • User Experience Design (UED) • Rhinoceros</p>
      </div>
    </div>
    
  </div>
</div>
`;

// Inject before closing body
html = html.replace('</body>', resumeOverlay + '\n</body>');

// 5. Add custom fonts to head
const fonts = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Outfit:wght@400;500&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700,800&display=swap" rel="stylesheet">
`;
html = html.replace('</head>', fonts + '\n</head>');


fs.writeFileSync(indexPath, html, 'utf8');
console.log('Rebranding applied successfully!');
