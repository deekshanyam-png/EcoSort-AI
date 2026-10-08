/**
 * EcoSort AI - Core Application Script
 * Implements interactive navigation, file uploads, AI processing sequences,
 * Explainable AI canvas overlays, interactive diagrams, and custom charts.
 */

// 1. MOCK WASTE DATABASE (DEMO DATA) WITH INLINE HIGH-FIDELITY SVGS
const rawSvgAssets = {
  plastic_bottle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" rx="12" fill="#0f1524"/>
  <defs>
    <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f0ff" stroke-opacity="0.8"/>
      <stop offset="100%" stop-color="#00ff66" stroke-opacity="0.2"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <path d="M180,70 L220,70 L225,95 L245,115 L245,230 C245,240 235,250 225,250 L175,250 C165,250 155,240 155,230 L155,115 L175,95 Z" fill="none" stroke="url(#cyan-glow)" stroke-width="4" filter="url(#glow)"/>
  <rect x="185" y="50" width="30" height="20" rx="2" fill="#00f0ff" filter="url(#glow)"/>
  <line x1="190" y1="50" x2="190" y2="70" stroke="#0f1524" stroke-width="2"/>
  <line x1="195" y1="50" x2="195" y2="70" stroke="#0f1524" stroke-width="2"/>
  <line x1="200" y1="50" x2="200" y2="70" stroke="#0f1524" stroke-width="2"/>
  <line x1="205" y1="50" x2="205" y2="70" stroke="#0f1524" stroke-width="2"/>
  <line x1="210" y1="50" x2="210" y2="70" stroke="#0f1524" stroke-width="2"/>
  <path d="M190,160 L210,160 L200,180 Z" fill="none" stroke="#00ff66" stroke-width="2" stroke-linejoin="round"/>
  <path d="M200,150 L200,165" stroke="#00ff66" stroke-width="2"/>
  <path d="M160,190 Q180,185 200,190 T240,190 L240,230 C240,240 230,245 220,245 L180,245 C170,245 160,240 160,230 Z" fill="#00f0ff" fill-opacity="0.15"/>
</svg>`,

  banana_peel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" rx="12" fill="#0f1524"/>
  <defs>
    <linearGradient id="banana-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffaa00"/>
      <stop offset="60%" stop-color="#ffdd00"/>
      <stop offset="100%" stop-color="#885500"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <path d="M200,80 C190,80 185,60 185,45 L215,45 C215,60 210,80 200,80 Z" fill="#665511"/>
  <path d="M190,80 C150,110 110,150 90,200 C110,195 155,180 180,130 C190,110 192,90 190,80 Z" fill="url(#banana-grad)" filter="url(#glow)"/>
  <path d="M210,80 C250,110 290,150 310,200 C290,195 245,180 220,130 C210,110 208,90 210,80 Z" fill="url(#banana-grad)" filter="url(#glow)"/>
  <path d="M200,80 C200,120 180,180 200,240 C210,180 200,120 200,80 Z" fill="#ffdd00" filter="url(#glow)"/>
  <path d="M90,200 C88,205 85,210 92,208 Z" fill="#442200"/>
  <path d="M310,200 C312,205 315,210 308,208 Z" fill="#442200"/>
  <path d="M200,240 C198,245 195,250 202,248 Z" fill="#442200"/>
</svg>`,

  newspaper: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" rx="12" fill="#0f1524"/>
  <defs>
    <filter id="glow-cyan">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="110" y="70" width="180" height="150" rx="4" fill="#1e293b" transform="rotate(-3, 200, 150)"/>
  <rect x="100" y="60" width="190" height="160" rx="4" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
  <rect x="115" y="75" width="160" height="15" fill="#475569" rx="2"/>
  <line x1="115" y1="105" x2="190" y2="105" stroke="#94a3b8" stroke-width="3"/>
  <line x1="115" y1="115" x2="180" y2="115" stroke="#94a3b8" stroke-width="3"/>
  <line x1="115" y1="125" x2="190" y2="125" stroke="#94a3b8" stroke-width="3"/>
  <line x1="115" y1="135" x2="170" y2="135" stroke="#94a3b8" stroke-width="3"/>
  <rect x="115" y="150" width="75" height="50" rx="2" fill="#cbd5e1" stroke="#94a3b8"/>
  <circle cx="152" cy="175" r="10" fill="#94a3b8"/>
  <line x1="205" y1="105" x2="275" y2="105" stroke="#94a3b8" stroke-width="3"/>
  <line x1="205" y1="115" x2="275" y2="115" stroke="#94a3b8" stroke-width="3"/>
  <line x1="205" y1="125" x2="260" y2="125" stroke="#94a3b8" stroke-width="3"/>
  <line x1="205" y1="135" x2="275" y2="135" stroke="#94a3b8" stroke-width="3"/>
  <line x1="205" y1="145" x2="270" y2="145" stroke="#94a3b8" stroke-width="3"/>
  <line x1="205" y1="155" x2="275" y2="155" stroke="#94a3b8" stroke-width="3"/>
  <line x1="205" y1="165" x2="250" y2="165" stroke="#94a3b8" stroke-width="3"/>
</svg>`,

  aluminum_can: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" rx="12" fill="#0f1524"/>
  <defs>
    <linearGradient id="can-metal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="25%" stop-color="#cbd5e1"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="75%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <filter id="glow-amber">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <ellipse cx="200" cy="80" rx="45" ry="12" fill="#94a3b8" stroke="#cbd5e1" stroke-width="2"/>
  <ellipse cx="200" cy="80" rx="35" ry="8" fill="#475569"/>
  <path d="M200,80 L195,73 L205,73 Z" fill="#cbd5e1"/>
  <circle cx="200" cy="74" r="3" fill="#334155"/>
  <path d="M155,80 C155,90 155,200 155,210 C155,220 175,225 200,225 C225,225 245,220 245,210 L245,80 Z" fill="url(#can-metal)" stroke="#cbd5e1" stroke-width="1"/>
  <path d="M155,120 Q200,100 245,130 L245,170 Q200,140 155,160 Z" fill="#ffaa00" fill-opacity="0.4" filter="url(#glow-amber)"/>
  <text x="200" y="150" font-family="var(--font-main)" font-size="14" font-weight="bold" fill="#f8fafc" text-anchor="middle">SODA</text>
  <ellipse cx="200" cy="210" rx="45" ry="12" fill="none" stroke="#cbd5e1" stroke-width="2"/>
</svg>`,

  glass_bottle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" rx="12" fill="#0f1524"/>
  <defs>
    <linearGradient id="glass-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#00f0ff" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="glow-glass">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="175" y="60" width="50" height="15" rx="3" fill="#a855f7" filter="url(#glow-glass)"/>
  <rect x="180" y="75" width="40" height="15" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.8"/>
  <path d="M180,90 L220,90 C240,90 250,105 250,120 L250,220 C250,235 240,245 220,245 L180,245 C160,245 150,235 150,220 L150,120 C150,105 160,90 180,90 Z" fill="url(#glass-glow)" stroke="#a855f7" stroke-width="3" filter="url(#glow-glass)"/>
  <path d="M162,130 C160,150 160,200 162,215" stroke="#f8fafc" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <path d="M238,130 C240,150 240,200 238,215" stroke="#f8fafc" stroke-width="1" stroke-linecap="round" opacity="0.3"/>
</svg>`,

  old_mobile: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <rect width="400" height="300" rx="12" fill="#0f1524"/>
  <defs>
    <filter id="glow-magenta">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect x="143" y="53" width="114" height="194" rx="16" fill="#1e293b"/>
  <rect x="140" y="50" width="120" height="200" rx="18" fill="#334155" stroke="#475569" stroke-width="2"/>
  <rect x="146" y="65" width="108" height="155" rx="4" fill="#0b0f19" stroke="#1e293b" stroke-width="1"/>
  <path d="M160,90 L240,170 M160,170 L240,90" stroke="#ff3366" stroke-width="2" opacity="0.7" filter="url(#glow-magenta)"/>
  <circle cx="200" cy="130" r="25" fill="none" stroke="#ff3366" stroke-width="1.5" opacity="0.5"/>
  <circle cx="200" cy="58" r="4" fill="#0b0f19" stroke="#475569"/>
  <circle cx="200" cy="235" r="8" fill="none" stroke="#475569" stroke-width="2"/>
</svg>`
};

const getSvgDataUri = (svgStr) => `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgStr)))}`;

const wasteDatabase = {
  plastic_bottle: {
    title: "Plastic Bottle",
    category: "Plastic Waste",
    confidence: 96,
    probabilities: [
      { name: "Plastic", val: 96, color: "cyan" },
      { name: "Metal", val: 3, color: "amber" },
      { name: "Glass", val: 1, color: "red" }
    ],
    actionEmoji: "♻",
    actionTitle: "Recycle This Item",
    actionDesc: "Rinse out any remaining liquid, compress the bottle, remove the cap (sort separately if required by your municipality), and place it in the designated plastics recycling container.",
    recyclability: 92,
    pollutionRisk: "High (Non-biodegradable)",
    decompositionTime: "450 Years",
    carbonImpact: "Moderate (CO2 Offset by recycling)",
    xaiExplanation: "The model detected high-confidence edge symmetry representing a cylindrical PET container, transparent material reflection vectors, and a circular texture hotspot corresponding to the capping threads.",
    hotspots: [
      { type: "rect", x: 0.25, y: 0.15, w: 0.5, h: 0.7, label: "PET Outline (96%)" },
      { type: "circle", cx: 0.5, cy: 0.2, r: 0.08, label: "Thread Cap (91%)" }
    ],
    imgSrc: getSvgDataUri(rawSvgAssets.plastic_bottle)
  },
  banana_peel: {
    title: "Banana Peel",
    category: "Organic Waste",
    confidence: 98,
    probabilities: [
      { name: "Organic", val: 98, color: "emerald" },
      { name: "Paper", val: 2, color: "cyan" },
      { name: "Plastic", val: 0, color: "red" }
    ],
    actionEmoji: "🍂",
    actionTitle: "Compost Bin",
    actionDesc: "Discard the peel directly into a household compost heap or a green municipal organics bin. Avoid placing it in standard landfill containers where lack of oxygen prevents clean breakdown.",
    recyclability: 99,
    pollutionRisk: "Very Low",
    decompositionTime: "2-5 Weeks",
    carbonImpact: "Minimal (Carbon positive when composted)",
    xaiExplanation: "The model detected organic low-frequency curvature filters, distinctive yellow/brown pigment bands, and a fibrous texture classification on the leaf endings.",
    hotspots: [
      { type: "rect", x: 0.15, y: 0.25, w: 0.7, h: 0.5, label: "Organic Fibers (98%)" }
    ],
    imgSrc: getSvgDataUri(rawSvgAssets.banana_peel)
  },
  newspaper: {
    title: "Old Newspaper",
    category: "Paper Waste",
    confidence: 94,
    probabilities: [
      { name: "Paper", val: 94, color: "cyan" },
      { name: "Organic", val: 4, color: "emerald" },
      { name: "Plastic", val: 2, color: "red" }
    ],
    actionEmoji: "♻",
    actionTitle: "Separate & Recycle",
    actionDesc: "Flatten and bundle with other paper products or cardboards. Store in a dry area and place in the paper collection container. Do not recycle if soaked in oil or food grease.",
    recyclability: 95,
    pollutionRisk: "Low",
    decompositionTime: "2-6 Weeks",
    carbonImpact: "Moderate (Reduces logging requirements)",
    xaiExplanation: "AI mapped dense linear lines corresponding to text columns, low-gloss paper sheet contour boundaries, and typical square-cut sheet corners.",
    hotspots: [
      { type: "rect", x: 0.2, y: 0.2, w: 0.6, h: 0.6, label: "Text Pattern (94%)" }
    ],
    imgSrc: getSvgDataUri(rawSvgAssets.newspaper)
  },
  aluminum_can: {
    title: "Aluminum Soda Can",
    category: "Metal Waste",
    confidence: 97,
    probabilities: [
      { name: "Metal", val: 97, color: "amber" },
      { name: "Glass", val: 2, color: "cyan" },
      { name: "Plastic", val: 1, color: "red" }
    ],
    actionEmoji: "♻",
    actionTitle: "Crush & Recycle",
    actionDesc: "Rinse out soda residues to prevent pests. Optionally crush the can to optimize volume sorting efficiency, then discard in the metals or mixed dry-recyclables container.",
    recyclability: 98,
    pollutionRisk: "High (Indefinite lifecycle)",
    decompositionTime: "80-200 Years",
    carbonImpact: "Low (Saves 95% energy vs raw smelting)",
    xaiExplanation: "The neural network isolated specular reflections matching metallic surfaces, cylindrical aspect limits, and top-facing geometry matching a pop-tab mechanism.",
    hotspots: [
      { type: "rect", x: 0.3, y: 0.2, w: 0.4, h: 0.6, label: "Reflective Can (97%)" },
      { type: "circle", cx: 0.5, cy: 0.25, r: 0.1, label: "Pop Tab (93%)" }
    ],
    imgSrc: getSvgDataUri(rawSvgAssets.aluminum_can)
  },
  glass_bottle: {
    title: "Glass Jar",
    category: "Glass Waste",
    confidence: 95,
    probabilities: [
      { name: "Glass", val: 95, color: "cyan" },
      { name: "Plastic", val: 4, color: "emerald" },
      { name: "Metal", val: 1, color: "amber" }
    ],
    actionEmoji: "🍾",
    actionTitle: "Clean & Recycle",
    actionDesc: "Thoroughly wash out food residues. Remove metal lids or caps (sort with metals). Drop in the glass bin. Clear glass is highly recyclable and can be recycled indefinitely.",
    recyclability: 96,
    pollutionRisk: "Medium (Physical hazard)",
    decompositionTime: "1 Million Years",
    carbonImpact: "Moderate (Reduces glass-furnace carbon)",
    xaiExplanation: "The feature extraction layers identified transparent refraction lines, sharp edges displaying double specular highlights, and outline contours of a circular neck structure.",
    hotspots: [
      { type: "rect", x: 0.25, y: 0.2, w: 0.5, h: 0.65, label: "Refractive Silhouette (95%)" }
    ],
    imgSrc: getSvgDataUri(rawSvgAssets.glass_bottle)
  },
  old_mobile: {
    title: "Old Smart Phone",
    category: "Electronic Waste (E-Waste)",
    confidence: 93,
    probabilities: [
      { name: "E-Waste", val: 93, color: "purple" },
      { name: "Plastic", val: 5, color: "cyan" },
      { name: "Metal", val: 2, color: "amber" }
    ],
    actionEmoji: "🔌",
    actionTitle: "Take to E-Waste Hub",
    actionDesc: "DO NOT place in general waste or dry recycling. Electronics contain heavy materials (lithium, lead) that pollute soils. Take the device to a municipal e-waste kiosk or certified retailer box.",
    recyclability: 82,
    pollutionRisk: "Critical (Heavy metals leakage)",
    decompositionTime: "1000+ Years",
    carbonImpact: "High (Recovers rare copper and gold)",
    xaiExplanation: "The model registered rectangular structural edges, non-organic glass display panels, circular camera lenses, and a USB charging slot form pattern.",
    hotspots: [
      { type: "rect", x: 0.25, y: 0.15, w: 0.5, h: 0.7, label: "Bezel Frame (93%)" },
      { type: "circle", cx: 0.45, cy: 0.25, r: 0.05, label: "Lens Matrix (88%)" }
    ],
    imgSrc: getSvgDataUri(rawSvgAssets.old_mobile)
  }
};

// 2. STATE MANAGEMENT
let activeTab = "overview";
let currentSelectedSample = null;
let uploadedFile = null;
let processingInterval = null;
let currentSampleKey = null;
let customImageSrc = null;

// 3. PAGE INITIALIZATION & TAB ROUTING
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupUploadArea();
  setupPipelineNodes();
  initNeuralNetCanvas();
  initAnalyticsCharts();
  
  // Header buttons
  document.getElementById("header-cta-btn").addEventListener("click", () => switchTab("analyze"));
  document.getElementById("mobile-header-cta-btn").addEventListener("click", () => {
    toggleMobileDrawer(false);
    switchTab("analyze");
  });
  document.getElementById("logo-btn").addEventListener("click", () => switchTab("overview"));
});

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  
  // Tab buttons click
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const tabId = link.getAttribute("data-tab");
      if (link.hasAttribute("disabled")) return;
      
      toggleMobileDrawer(false);
      switchTab(tabId);
    });
  });
  
  // Hamburger button
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileDrawer.classList.contains("open");
    toggleMobileDrawer(!isOpen);
  });
}

function toggleMobileDrawer(open) {
  const drawer = document.querySelector(".mobile-drawer");
  const btn = document.querySelector(".mobile-menu-btn");
  if (open) {
    drawer.classList.add("open");
    btn.classList.add("active");
  } else {
    drawer.classList.remove("open");
    btn.classList.remove("active");
  }
}

function switchTab(tabId) {
  if (tabId === "results" && !currentSampleKey) return; // Do not switch to empty results
  
  activeTab = tabId;
  
  // Update section visibility
  const sections = document.querySelectorAll(".tab-content");
  sections.forEach(sec => {
    if (sec.id === `tab-${tabId}`) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  });
  
  // Update header navigation active states
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.getAttribute("data-tab") === tabId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Special triggers for canvases or animation grids on activation
  if (tabId === "architecture") {
    // Redraw or activate canvas timers
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 50);
  }
  
  // Scroll to top of viewport
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 4. UPLOAD FLOW & SAMPLE CHIPS
function setupUploadArea() {
  const dropZone = document.getElementById("drop-zone");
  const fileInput = document.getElementById("file-input");
  const removeBtn = document.getElementById("remove-file-btn");
  const analyzeBtn = document.getElementById("analyze-btn");
  const cameraBtn = document.getElementById("camera-btn");
  const sampleChips = document.querySelectorAll(".sample-chip");
  const retryBtn = document.getElementById("error-retry-btn");

  // Trigger file dialog
  window.triggerFileSelect = () => {
    fileInput.click();
  };

  // Drag over / Drag leave
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  // Drop event
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleImageSelection(e.dataTransfer.files[0]);
    }
  });

  // Change input
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleImageSelection(e.target.files[0]);
    }
  });

  // Remove file
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetUploadState();
  });

  // Analyze click
  analyzeBtn.addEventListener("click", () => {
    if (currentSampleKey) {
      runAIClassification(currentSampleKey);
    }
  });

  // Camera mock capture
  cameraBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Select a phone sample to simulate mobile camera shot
    selectSample("old_mobile", "Camera_Capture_#482.jpg");
  });

  // Chips click
  sampleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const sampleId = chip.getAttribute("data-sample");
      selectSample(sampleId);
    });
  });

  // Retry click
  retryBtn.addEventListener("click", () => {
    resetUploadState();
  });
}

function handleImageSelection(file) {
  // Check types
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    showUploadError("We couldn’t process this image. Please upload a clear image of a waste item.");
    return;
  }
  
  // Check sizes (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    showUploadError("This image exceeds the 10MB limit. Please upload a smaller compressed sample.");
    return;
  }
  
  uploadedFile = file;
  
  // Show image preview
  const reader = new FileReader();
  reader.onload = (e) => {
    // Map random file to a mockup database match for sorting logic
    // Just map to plastic bottle if it is not selected via chips, or randomize it!
    const keys = Object.keys(wasteDatabase);
    const mockKey = keys[Math.floor(Math.random() * keys.length)];
    
    document.getElementById("preview-image").src = e.target.result;
    document.getElementById("file-name-lbl").textContent = file.name;
    document.getElementById("file-size-lbl").textContent = formatBytes(file.size);
    
    // Save image source to render on results page instead of static SVG
    customImageSrc = e.target.result;
    currentSampleKey = mockKey;
    
    // Toggle previews
    document.getElementById("drop-zone").classList.add("hidden");
    document.getElementById("error-card").classList.add("hidden");
    document.getElementById("preview-card").classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function showUploadError(message) {
  document.getElementById("error-message-lbl").textContent = message;
  document.getElementById("drop-zone").classList.add("hidden");
  document.getElementById("preview-card").classList.add("hidden");
  document.getElementById("error-card").classList.remove("hidden");
}

function selectSample(sampleId, filename = null) {
  const sampleData = wasteDatabase[sampleId];
  if (!sampleData) return;
  
  currentSampleKey = sampleId;
  uploadedFile = null;
  customImageSrc = null;
  
  // Populate preview
  document.getElementById("preview-image").src = sampleData.imgSrc;
  document.getElementById("file-name-lbl").textContent = filename || `${sampleId.replace("_", "-")}-val-set.png`;
  document.getElementById("file-size-lbl").textContent = "384 KB (Compressed Tensor)";
  
  // Show preview
  document.getElementById("drop-zone").classList.add("hidden");
  document.getElementById("error-card").classList.add("hidden");
  document.getElementById("preview-card").classList.remove("hidden");
}

function resetUploadState() {
  uploadedFile = null;
  currentSampleKey = null;
  customImageSrc = null;
  document.getElementById("file-input").value = "";
  
  document.getElementById("drop-zone").classList.remove("hidden");
  document.getElementById("preview-card").classList.add("hidden");
  document.getElementById("error-card").classList.add("hidden");
}

// 5. RUN AI CLASSIFICATION (PROCESSING SIMULATOR)
function runAIClassification(sampleKey) {
  const overlay = document.getElementById("processing-overlay");
  const statusMsg = document.getElementById("processing-state-msg");
  const pctLbl = document.getElementById("process-pct");
  
  // Show full screen animation
  overlay.classList.remove("hidden");
  
  // Reset sequence visual indicators
  const steps = [
    { threshold: 0, id: "seq-step-1", text: "Image Received" },
    { threshold: 16, id: "seq-step-2", text: "Preprocessing Image (Resize & Normalize)" },
    { threshold: 36, id: "seq-step-3", text: "Extracting Visual Features (Contours & Texture)" },
    { threshold: 56, id: "seq-step-4", text: "Running CNN Layers (Activation Filters)" },
    { threshold: 76, id: "seq-step-5", text: "Classifying Waste Target Classes" },
    { threshold: 91, id: "seq-step-6", text: "Generating Action Recommendations" }
  ];
  
  steps.forEach(s => {
    const el = document.getElementById(s.id);
    el.className = "sequence-node";
  });
  
  let progress = 0;
  statusMsg.textContent = "Initializing WasteNet Engine...";
  
  // Particle generation inside scanner screen
  generateProcessingParticles();
  
  // Timer driven loader
  processingInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 3;
    if (progress > 100) progress = 100;
    
    // Update labels
    pctLbl.textContent = `${progress}%`;
    
    // Trace step sequence
    steps.forEach((step, idx) => {
      const nodeEl = document.getElementById(step.id);
      if (progress >= step.threshold) {
        // Current or done
        nodeEl.classList.add("active");
        statusMsg.textContent = step.text;
        
        // Mark previous as done
        if (idx > 0) {
          const prevNode = document.getElementById(steps[idx - 1].id);
          prevNode.classList.remove("active");
          prevNode.classList.add("done");
        }
      }
    });
    
    if (progress === 100) {
      clearInterval(processingInterval);
      setTimeout(() => {
        // Final transition
        overlay.classList.add("hidden");
        
        // Enable navigation tab and display results
        enableResultsTab(sampleKey);
        resetUploadState();
      }, 500);
    }
  }, 120);
}

function generateProcessingParticles() {
  const container = document.getElementById("overlay-particles");
  container.innerHTML = "";
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement("div");
    dot.style.position = "absolute";
    dot.style.width = `${Math.random() * 6 + 2}px`;
    dot.style.height = dot.style.width;
    dot.style.borderRadius = "50%";
    dot.style.backgroundColor = i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-emerald)";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.opacity = Math.random() * 0.5 + 0.2;
    dot.style.transform = `scale(${Math.random()})`;
    // Inline animation simulation
    dot.animate([
      { transform: "translateY(0) scale(1)", opacity: 0.8 },
      { transform: `translateY(-${Math.random() * 80 + 30}px) scale(0.2)`, opacity: 0 }
    ], {
      duration: Math.random() * 1500 + 1000,
      iterations: Infinity,
      delay: Math.random() * 1000
    });
    container.appendChild(dot);
  }
}

// 6. POPULATE RESULTS VIEW
function enableResultsTab(sampleKey) {
  const resultsBtn = document.getElementById("results-nav-btn");
  const mobileResultsBtn = document.getElementById("mobile-results-nav-btn");
  
  // Enable buttons
  resultsBtn.removeAttribute("disabled");
  mobileResultsBtn.removeAttribute("disabled");
  
  // Populate content details
  populateResultsContent(sampleKey);
  
  // Switch
  switchTab("results");
}

function populateResultsContent(sampleKey) {
  const data = wasteDatabase[sampleKey];
  if (!data) return;
  
  // Core Identifications
  document.getElementById("result-title-lbl").textContent = data.title;
  document.getElementById("result-category-lbl").textContent = data.category;
  document.getElementById("result-confidence-lbl").textContent = `${data.confidence}%`;
  
  // Circular Dash Array progress for confidence
  // Circumference = 2 * PI * r = 2 * 3.14159 * 40 = 251.2
  const circleFill = document.getElementById("conf-fill-circle");
  const offset = 251.2 - (251.2 * data.confidence) / 100;
  circleFill.style.strokeDashoffset = offset;
  
  // Set category colors
  if (data.category.includes("Organic")) {
    circleFill.setAttribute("stroke", "var(--accent-emerald)");
  } else if (data.category.includes("Metal")) {
    circleFill.setAttribute("stroke", "var(--accent-amber)");
  } else if (data.category.includes("Electronic")) {
    circleFill.setAttribute("stroke", "var(--accent-purple)");
  } else {
    circleFill.setAttribute("stroke", "var(--accent-cyan)");
  }

  // Load preview image
  const imgElement = document.getElementById("results-input-img");
  imgElement.src = customImageSrc ? customImageSrc : data.imgSrc;
  
  // AI Decisions Breakdown bars
  const probContainer = document.getElementById("prob-bars-container");
  probContainer.innerHTML = "";
  data.probabilities.forEach(prob => {
    const row = document.createElement("div");
    row.className = "prob-bar-row";
    row.innerHTML = `
      <div class="prob-meta">
        <span class="prob-class-lbl">${prob.name}</span>
        <span class="prob-pct-lbl">${prob.val}%</span>
      </div>
      <div class="prob-track">
        <div class="prob-fill bg-${prob.color}" style="width: 0%"></div>
      </div>
    `;
    probContainer.appendChild(row);
    
    // Animate widths
    setTimeout(() => {
      row.querySelector(".prob-fill").style.width = `${prob.val}%`;
    }, 100);
  });
  
  // Recommended action info
  document.getElementById("action-badge-icon").textContent = data.actionEmoji;
  document.getElementById("action-heading-lbl").textContent = data.actionTitle;
  document.getElementById("action-desc-lbl").textContent = data.actionDesc;
  
  // Environmental stats card details
  document.getElementById("env-recyclability-lbl").textContent = `${data.recyclability}%`;
  document.getElementById("env-recyclability-bar").style.width = `${data.recyclability}%`;
  document.getElementById("env-pollution-lbl").textContent = data.pollutionRisk;
  document.getElementById("env-decomp-lbl").textContent = data.decompositionTime;
  document.getElementById("env-carbon-lbl").textContent = data.carbonImpact;
  
  // Explainable AI text
  document.getElementById("xai-explanation-lbl").textContent = data.xaiExplanation;
  
  // Draw hotspots onto XAI canvas overlays
  imgElement.onload = () => {
    drawXAIOverlay(data);
  };
  // Trigger redraw if already loaded
  if (imgElement.complete) {
    drawXAIOverlay(data);
  }
}

function drawXAIOverlay(data) {
  const canvas = document.getElementById("xai-overlay-canvas");
  const img = document.getElementById("results-input-img");
  
  // Match coordinates
  canvas.width = img.clientWidth;
  canvas.height = img.clientHeight;
  
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw bounding boxes from coordinates ratio
  data.hotspots.forEach(spot => {
    ctx.strokeStyle = "rgba(0, 240, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    
    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = "var(--accent-cyan)";
    
    if (spot.type === "rect") {
      const rx = spot.x * canvas.width;
      const ry = spot.y * canvas.height;
      const rw = spot.w * canvas.width;
      const rh = spot.h * canvas.height;
      
      ctx.strokeRect(rx, ry, rw, rh);
      
      // Label text
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(0, 240, 255, 0.85)";
      ctx.font = "bold 11px var(--font-mono)";
      ctx.fillText(spot.label, rx + 6, ry + 16);
    } else if (spot.type === "circle") {
      ctx.strokeStyle = "rgba(0, 255, 102, 0.8)";
      ctx.shadowColor = "var(--accent-emerald)";
      const cx = spot.cx * canvas.width;
      const cy = spot.cy * canvas.height;
      const r = spot.r * Math.min(canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(0, 255, 102, 0.85)";
      ctx.font = "bold 11px var(--font-mono)";
      ctx.fillText(spot.label, cx - r + 4, cy - 4);
    }
  });
  
  // Set tagline value
  document.getElementById("xai-tag-element").textContent = `Detect: ${data.category} Patterns`;
}

// 7. PIPELINE DETAILS VIEW TOGGLER
function setupPipelineNodes() {
  const nodes = document.querySelectorAll(".pipeline-node");
  const titleEl = document.getElementById("pane-title");
  const descEl = document.getElementById("pane-desc");
  
  const pipelineInfos = {
    1: {
      title: "1. User Image Input",
      desc: "Workflow initiates when a user supplies a standard file structure (JPEG, PNG, WEBP) either via standard upload, drag actions, or camera capture mocking. Supported sizing thresholds are restricted to 10MB to maintain local memory budgets."
    },
    2: {
      title: "2. Image Validation Checks",
      desc: "The interface applies client-side format and boundary verifiers, filtering corrupt headers, invalid dimensions, or oversized buffers before sending the matrix values to the model memory allocation blocks."
    },
    3: {
      title: "3. Preprocessing Layers",
      desc: "Converts the raw graphic canvas to flat tensor variables, resizes spatial grids to 224 x 224 pixel grids, and scales RGB indices from [0, 255] to a normalized distribution of [-1, 1] matching weights requirements."
    },
    4: {
      title: "4. Feature Contours Extraction",
      desc: "Runs mathematical convolution filters to detect contrast patterns. Early stages map localized edges, curvature bends, texture depths, and reflective gradient coordinates."
    },
    5: {
      title: "5. MobileNet CNN Core Stack",
      desc: "Propagates feature mappings through deep bottleneck layers. Weights evaluate spatial representations, separating synthetic geometries (metal lines, plastic silhouettes) from organic curvature layouts."
    },
    6: {
      title: "6. Classification Softmax Layer",
      desc: "Collates dense neural connections into a final multi-class distribution map, calculating logits for each waste group and producing the confidence score list."
    },
    7: {
      title: "7. Expert Rules Engine",
      desc: "Accepts high-confidence classifications and executes matching functions against the global material data catalog. Identifies recyclability rating margins, safety protocols, and degradation rates."
    },
    8: {
      title: "8. AI Recycling Report Output",
      desc: "Packages model logits and environmental action strategies into a final human-readable dashboard showing predicted categories, XAI bounding contours, and sorting directions."
    }
  };
  
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      // Remove active from all nodes and connectors
      nodes.forEach(n => n.classList.remove("active-node"));
      
      // Add active to current
      node.classList.add("active-node");
      
      const pipeId = node.getAttribute("data-pipe-id");
      const info = pipelineInfos[pipeId];
      
      if (info) {
        titleEl.textContent = info.title;
        descEl.textContent = info.desc;
      }
    });
  });
}

// 8. CANVAS-BASED INTERACTIVE NEURAL NETWORK VISUALIZER
let nnCanvas, nnCtx, nnNodes = [], nnConnections = [], animationFrameId = null;

function initNeuralNetCanvas() {
  nnCanvas = document.getElementById("nn-visualizer-canvas");
  if (!nnCanvas) return;
  nnCtx = nnCanvas.getContext("2d");
  
  // Set pixel densities
  scaleCanvasForDPI(nnCanvas, nnCtx);
  
  // Generate network topology layers
  // Layer sizes: Input (5), Conv (7), Features (6), Softmax Output (6)
  const layerSizes = [4, 6, 5, 4];
  const layerXPositions = [80, 280, 520, 780];
  const colors = ["var(--accent-cyan)", "var(--accent-emerald)", "var(--accent-amber)", "var(--accent-purple)"];
  
  nnNodes = [];
  nnConnections = [];
  
  // Build Nodes
  layerSizes.forEach((size, layerIdx) => {
    const x = layerXPositions[layerIdx];
    const verticalGap = (nnCanvas.height - 80) / (size - 1 || 1);
    
    for (let nodeIdx = 0; nodeIdx < size; nodeIdx++) {
      const y = (size === 1) ? nnCanvas.height / 2 : 40 + nodeIdx * verticalGap;
      nnNodes.push({
        id: `${layerIdx}-${nodeIdx}`,
        layer: layerIdx,
        x: x,
        y: y,
        baseColor: colors[layerIdx],
        excitation: 0.1,
        pulseDelay: Math.random() * 1000
      });
    }
  });
  
  // Build Connections between layers
  nnNodes.forEach(source => {
    nnNodes.forEach(target => {
      if (target.layer === source.layer + 1) {
        nnConnections.push({
          source: source,
          target: target,
          signalProgress: Math.random(),
          signalSpeed: Math.random() * 0.01 + 0.005,
          weight: Math.random() * 0.8 + 0.2
        });
      }
    });
  });
  
  // Start drawing loops
  drawNeuralNet();
  
  // Excite nodes on mouse move
  nnCanvas.addEventListener("mousemove", (e) => {
    const rect = nnCanvas.getBoundingClientRect();
    // Translate mouse coordinates to local bounds
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    nnNodes.forEach(node => {
      const dist = Math.hypot(node.x - mouseX, node.y - mouseY);
      if (dist < 40) {
        node.excitation = 0.9;
      }
    });
  });
}

function drawNeuralNet() {
  if (activeTab !== "architecture") {
    // Save cycles when tab is inactive
    animationFrameId = requestAnimationFrame(drawNeuralNet);
    return;
  }
  
  nnCtx.fillStyle = "#030508";
  nnCtx.fillRect(0, 0, nnCanvas.width, nnCanvas.height);
  
  // Draw connections
  nnConnections.forEach(con => {
    const gradient = nnCtx.createLinearGradient(con.source.x, con.source.y, con.target.x, con.target.y);
    gradient.addColorStop(0, `rgba(0, 240, 255, ${0.05 * con.weight})`);
    gradient.addColorStop(1, `rgba(0, 255, 102, ${0.05 * con.weight})`);
    
    nnCtx.strokeStyle = gradient;
    nnCtx.lineWidth = 1;
    nnCtx.beginPath();
    nnCtx.moveTo(con.source.x, con.source.y);
    nnCtx.lineTo(con.target.x, con.target.y);
    nnCtx.stroke();
    
    // Draw running signal particles
    con.signalProgress += con.signalSpeed;
    if (con.signalProgress > 1) {
      con.signalProgress = 0;
      // Excite target slightly when signal arrives
      con.target.excitation = Math.min(1, con.target.excitation + 0.05);
    }
    
    const px = con.source.x + (con.target.x - con.source.x) * con.signalProgress;
    const py = con.source.y + (con.target.y - con.source.y) * con.signalProgress;
    
    nnCtx.fillStyle = con.source.baseColor;
    nnCtx.beginPath();
    nnCtx.arc(px, py, 2, 0, 2 * Math.PI);
    nnCtx.fill();
  });
  
  // Draw Nodes
  nnNodes.forEach(node => {
    // Decay excitation value
    node.excitation = Math.max(0.1, node.excitation - 0.015);
    
    // Pulsing aura base
    const auraRadius = 6 + node.excitation * 12;
    nnCtx.fillStyle = node.baseColor.replace(")", `, ${0.1 + node.excitation * 0.3})`).replace("var(--", "rgba(");
    
    // Manual fallback for custom CSS vars parsing in canvas
    if (node.baseColor.includes("cyan")) {
      nnCtx.fillStyle = `rgba(0, 240, 255, ${0.1 + node.excitation * 0.4})`;
      nnCtx.shadowColor = "rgba(0, 240, 255, 0.5)";
    } else if (node.baseColor.includes("emerald")) {
      nnCtx.fillStyle = `rgba(0, 255, 102, ${0.1 + node.excitation * 0.4})`;
      nnCtx.shadowColor = "rgba(0, 255, 102, 0.5)";
    } else if (node.baseColor.includes("amber")) {
      nnCtx.fillStyle = `rgba(255, 170, 0, ${0.1 + node.excitation * 0.4})`;
      nnCtx.shadowColor = "rgba(255, 170, 0, 0.5)";
    } else {
      nnCtx.fillStyle = `rgba(168, 85, 247, ${0.1 + node.excitation * 0.4})`;
      nnCtx.shadowColor = "rgba(168, 85, 247, 0.5)";
    }
    
    nnCtx.beginPath();
    nnCtx.arc(node.x, node.y, auraRadius, 0, 2 * Math.PI);
    nnCtx.fill();
    
    // Inner core node
    nnCtx.shadowBlur = node.excitation * 10;
    nnCtx.fillStyle = node.baseColor.includes("cyan") ? "#00f0ff" : 
                      node.baseColor.includes("emerald") ? "#00ff66" : 
                      node.baseColor.includes("amber") ? "#ffaa00" : "#a855f7";
    nnCtx.beginPath();
    nnCtx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
    nnCtx.fill();
    nnCtx.shadowBlur = 0;
  });
  
  animationFrameId = requestAnimationFrame(drawNeuralNet);
}

// 9. DASHBOARD CHARTS (CANVAS-BASED CUSTOM IMPLEMENTATION)
function initAnalyticsCharts() {
  const canvas = document.getElementById("distribution-chart-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  // Data set matching distribution model
  const dataPoints = [
    { label: "Plastic", percentage: 32, color: "#00f0ff" },
    { label: "Paper", percentage: 20, color: "#00ff66" },
    { label: "Glass", percentage: 15, color: "#a855f7" },
    { label: "Metal", percentage: 18, color: "#ffaa00" },
    { label: "Organic", percentage: 10, color: "#64748b" },
    { label: "E-Waste", percentage: 5, color: "#ff3366" }
  ];
  
  // Render loop
  function drawDistributionChart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const chartHeight = 180;
    const barSpacing = 16;
    const totalBars = dataPoints.length;
    const barWidth = (canvas.width - (barSpacing * (totalBars + 1))) / totalBars;
    
    // Draw background grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = 30 + i * (chartHeight / 4);
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(canvas.width - 20, y);
      ctx.stroke();
      
      // Percentage values labels
      ctx.fillStyle = "var(--text-muted)";
      ctx.font = "10px var(--font-mono)";
      ctx.fillText(`${100 - i * 25}%`, 6, y + 4);
    }
    
    // Draw Bars
    dataPoints.forEach((data, index) => {
      const x = 30 + barSpacing + index * (barWidth + barSpacing);
      const computedHeight = (data.percentage / 100) * chartHeight;
      const y = 30 + chartHeight - computedHeight;
      
      // Draw actual column bar
      ctx.fillStyle = data.color;
      // Border radius rounded bars using custom arc paths
      drawRoundedRect(ctx, x, y, barWidth, computedHeight, 4);
      
      // Hover overlay check simulation (drawn cleanly)
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(x, 30, barWidth, chartHeight);
      
      // Draw top label details
      ctx.fillStyle = "var(--text-primary)";
      ctx.font = "bold 11px var(--font-mono)";
      ctx.textAlign = "center";
      ctx.fillText(`${data.percentage}%`, x + barWidth / 2, y - 8);
      
      // Draw category bottom labels
      ctx.fillStyle = "var(--text-secondary)";
      ctx.font = "11px var(--font-main)";
      ctx.fillText(data.label, x + barWidth / 2, 30 + chartHeight + 20);
    });
  }
  
  drawDistributionChart();
  
  // Handle simple resizing triggers
  window.addEventListener("resize", () => {
    scaleCanvasForDPI(canvas, ctx);
    drawDistributionChart();
  });
}

// Helper utilities for high resolution retina displays
function scaleCanvasForDPI(canvas, ctx) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
  const ratio = devicePixelRatio / backingStoreRatio;
  
  const width = canvas.offsetWidth || canvas.width;
  const height = canvas.offsetHeight || canvas.height;
  
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  ctx.scale(ratio, ratio);
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 10. DEMO LAUNCHER MARKETING CTA
window.triggerDemoFlow = () => {
  switchTab("analyze");
  // Pre-select plastic bottle sample
  setTimeout(() => {
    selectSample("plastic_bottle");
  }, 100);
};
