/* ============================================================
   config.js — global config: labels, themes, navigation,
   quick links, and dashboard priorities.
   Data pages register themselves on window.PAGES (object by id).
   ============================================================ */
window.PAGES = window.PAGES || {};

/* Label legend used across all checklists */
window.LABELS = {
  essential:   { name: "Essential",    cls: "essential",   blurb: "Buy/do it — you'll regret skipping it." },
  recommended: { name: "Recommended",  cls: "recommended", blurb: "High value for most people; skip only if money's tight." },
  optional:    { name: "Optional",     cls: "optional",    blurb: "Nice, situational — buy after you've moved in." },
  skip:        { name: "Skip for now", cls: "skip",        blurb: "Don't waste money/effort yet." }
};

/* Selectable appearance themes (id must match css/variables.css) */
window.THEMES = [
  { id: "light",    name: "Light",    swatch: ["#ffffff", "#2563eb"] },
  { id: "dark",     name: "Dark",     swatch: ["#171e27", "#5b9aff"] },
  { id: "midnight", name: "Midnight", swatch: ["#0d1424", "#38bdf8"] },
  { id: "bobcat",   name: "Bobcat",   swatch: ["#00224d", "#bda35a"] },
  { id: "forest",   name: "Forest",   swatch: ["#13201a", "#4ade80"] },
  { id: "sepia",    name: "Sepia",    swatch: ["#faf3e2", "#9a5b27"] },
  { id: "contrast", name: "Contrast", swatch: ["#000000", "#ffd400"] }
];

/* Sidebar navigation. Labels/icons live here so nav is independent of page load order. */
window.NAV = [
  { group: "Getting Started", items: [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "profile",   label: "Profile",   icon: "🪪" }
  ]},
  { group: "Shopping & Packing", items: [
    { id: "dorm",     label: "Dorm Essentials",   icon: "🛏️" },
    { id: "supplies", label: "School Supplies",    icon: "✏️" },
    { id: "tech",     label: "Tech & CompE Gear",  icon: "💻" },
    { id: "clothing", label: "Clothing & Weather", icon: "🧥" }
  ]},
  { group: "Preparation", items: [
    { id: "academics",  label: "Academic Prep",  icon: "📐" },
    { id: "onboarding", label: "MSU Onboarding", icon: "🎟️" },
    { id: "timeline",   label: "Timeline & Plan", icon: "🗓️" },
    { id: "certs",      label: "Certifications", icon: "📜" }
  ]},
  { group: "Resources & Life", items: [
    { id: "discounts", label: "Student Discounts", icon: "🎁" },
    { id: "finances",  label: "MSU Finances",      icon: "💵" },
    { id: "resources", label: "Online Resources",  icon: "🔗" },
    { id: "life",      label: "Life Skills",       icon: "🌱" }
  ]}
];

/* Key portals / sites — shown on the Dashboard. Verify exact URLs on montana.edu. */
window.QUICKLINKS = [
  { label: "MyMSU", url: "https://www.montana.edu/uit/mymsu/", ico: "🔐", note: "Registration, grades, aid, billing" },
  { label: "Canvas", url: "https://montana.instructure.com",  ico: "📚", note: "MSU LMS via Instructure Canvas" },
  { label: "Residence Life", url: "https://www.montana.edu/reslife", ico: "🏠", note: "Housing + what to bring" },
  { label: "Langford Hall", url: "https://www.montana.edu/housing/halls/langford.html", ico: "🏛️", note: "Your residence hall guide" },
  { label: "Course Catalog", url: "https://catalog.montana.edu", ico: "📘", note: "CompE 4-year plan" },
  { label: "Engineering (NACOE)", url: "https://www.coe.montana.edu", ico: "⚙️", note: "Your college" },
  { label: "Paying for School", url: "https://www.montana.edu/aycss/financialedu/pay_for_school.html", ico: "💵", note: "MSU resources for finances" },
  { label: "QuikPAY", url: "https://quikpayasp.com/montana/qp/messageboard/index.do?dm=msubz_sa_payer", ico: "💳", note: "Make payments and manage finances" },
  { label: "GitHub Education", url: "https://education.github.com", ico: "🐙", note: "Claim the Student Pack" },
  { label: "Campus Map", url: "https://www.montana.edu/map", ico: "🗺️", note: "Find your way" }
];

/* Top priorities (merged from both research files) — checkable on the Dashboard. */
window.PRIORITIES = [
  { id: "prio-deadlines", text: "Hit every administrative deadline", note: "Email, FAFSA, housing, math placement, registration, immunizations. Missing one is the most avoidable freshman disaster." },
  { id: "prio-math",      text: "Be math-ready", note: "Spend real summer hours on precalc → early calculus, and place as high as you legitimately can (ALEKS). This protects your whole engineering timeline." },
  { id: "prio-tools",     text: "Claim your top free tools now", note: "GitHub Student Developer Pack + JetBrains + MSU Office 365 — your highest-value free tools as a CompE student." },
  { id: "prio-dorm",      text: "Don't over-buy for the dorm", note: "Langford 205-B is a double — get your roommate's number and split the fridge, microwave, rug, and fan. Langford's front desk also lends tools, kitchen gear, and vacuums, so borrow before buying." },
  { id: "prio-winter",    text: "Respect Bozeman winter", note: "A genuinely warm waterproof coat and traction boots are not optional." },
  { id: "prio-habits",    text: "Build the 4 habits from day one", note: "Office hours, early problem-set starts, protected sleep, and one club — what separates engineering students who thrive." },
  { id: "prio-tech",      text: "Set up your technology", note: "MyMSU, MSU email, Office 365 — and check that email constantly; it's the official channel for everything." },
  { id: "prio-buys",      text: "Secure your major purchases", note: "Twin XL bedding, a reliable laptop, and cold-weather clothing top the list." }
];

/* Pages that carry trackable checklists (used for overall progress + dashboard cards) */
window.TRACKED_PAGES = ["dorm", "supplies", "tech", "clothing", "academics", "onboarding", "timeline"];
