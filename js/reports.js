/* ==========================================================================
   Lab Report Library
   --------------------------------------------------------------------------
   HOW TO ADD A REPORT (the easy way):
     1. Drop the PDF into the  reports/  folder.
     2. Commit + push.
   That's it. When the site runs on GitHub Pages, it asks the GitHub API for
   everything inside reports/ and builds a card for each PDF automatically,
   turning the filename into a clean title.

   OPTIONAL: to give a report a nicer title, description, or tags, add an
   entry to REPORT_META below, keyed by the exact filename.
   ========================================================================== */

// Optional, per-file details. Files NOT listed here still show up —
// they just get an auto-generated title from the filename.
const REPORT_META = {
  "Kleven__Jonathan_-_Local_AI.pdf": {
    title: "Hosting a Local AI Model with a Web Interface",
    course: "Cisco Networking Academy · Year 2",
    pages: 30,
    tags: ["Python", "Ollama", "Docker", "Flask"],
    description:
      "Running an LLM locally with Ollama and Docker, exposing it through OpenWebUI, " +
      "then building a custom Flask chat interface with streaming responses, " +
      "SQL-backed memory, and AI-assisted function routing."
  },
  "Kleven__Jonathan_-_Route_Redistribution_With_BGP.pdf": {
    title: "Multi-Protocol Route Redistribution with eBGP",
    course: "Cisco Networking Academy · Year 2",
    pages: 18,
    tags: ["BGP", "OSPF", "EIGRP", "IS-IS"],
    description:
      "Six routers, three interior protocols, one backbone: redistributing OSPF, " +
      "EIGRP, and IS-IS routes through eBGP with route-maps, weight, and local " +
      "preference — verified end to end in IPv4 and IPv6."
  }
};

// Fallback list used when the GitHub API can't be reached
// (e.g., previewing the site locally). Filenames only.
const FALLBACK_FILES = Object.keys(REPORT_META);

const REPORTS_DIR = "reports";

/* ---------------------------------------------------------------------- */

(function () {
  const grid = document.getElementById("report-grid");
  const status = document.getElementById("report-status");
  if (!grid) return;

  init();

  async function init() {
    const files = await listReportFiles();
    render(files);
  }

  /** Figure out the owner/repo from the GitHub Pages URL, if any. */
  function detectRepo() {
    const host = window.location.hostname;
    if (!host.endsWith(".github.io")) return null;
    const owner = host.split(".")[0];
    // Drop a trailing file component (e.g. /index.html) before reading the path.
    const path = window.location.pathname.replace(/\/[^/]*\.[^/]*$/, "");
    const firstSegment = path.split("/").filter(Boolean)[0];
    // Project site (username.github.io/repo/) vs user site (username.github.io/)
    const repo = firstSegment || host;
    return { owner, repo };
  }

  /** List every .pdf in reports/ — GitHub API first, fallback list otherwise. */
  async function listReportFiles() {
    const repoInfo = detectRepo();
    let apiFiles = [];

    if (repoInfo) {
      const cacheKey = "report-list:" + repoInfo.owner + "/" + repoInfo.repo;
      const cached = readCache(cacheKey);
      if (cached) {
        apiFiles = cached;
      } else {
        try {
          const url =
            "https://api.github.com/repos/" +
            encodeURIComponent(repoInfo.owner) + "/" +
            encodeURIComponent(repoInfo.repo) +
            "/contents/" + REPORTS_DIR;
          const res = await fetch(url, {
            headers: { Accept: "application/vnd.github+json" }
          });
          if (res.ok) {
            const items = await res.json();
            apiFiles = items
              .filter(function (item) {
                return item.type === "file" && /\.pdf$/i.test(item.name);
              })
              .map(function (item) { return item.name; });
            writeCache(cacheKey, apiFiles);
          }
        } catch (err) {
          /* Offline, rate-limited, or local preview — fall through. */
        }
      }
    }

    // Union of API results and the known fallback list, de-duplicated.
    const all = new Set(FALLBACK_FILES);
    apiFiles.forEach(function (name) { all.add(name); });
    return sortFiles(Array.from(all));
  }

  /** Known (curated) files keep their declared order; new files follow A→Z. */
  function sortFiles(files) {
    const knownOrder = Object.keys(REPORT_META);
    return files.sort(function (a, b) {
      const ia = knownOrder.indexOf(a);
      const ib = knownOrder.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return prettify(a).localeCompare(prettify(b));
    });
  }

  /** "Kleven__Jonathan_-_Multi_Area_OSPF.pdf" → "Multi Area OSPF" */
  function prettify(filename) {
    let t = filename
      .replace(/\.pdf$/i, "")
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    t = t.replace(/^kleven\s*,?\s*jonathan\s*[-–—]?\s*/i, "");
    return t || filename;
  }

  function render(files) {
    files.forEach(function (filename, index) {
      const meta = REPORT_META[filename] || {};
      const title = meta.title || prettify(filename);
      const tags = meta.tags || ["Lab Report"];
      const href = REPORTS_DIR + "/" + encodeURIComponent(filename);

      const card = document.createElement("article");
      card.className = "report-card reveal";

      const tagRow = document.createElement("div");
      tagRow.className = "report-tags";
      tags.forEach(function (t) {
        const el = document.createElement("span");
        el.className = "tag";
        el.textContent = t;
        tagRow.appendChild(el);
      });

      const h3 = document.createElement("h3");
      h3.textContent = title;

      const desc = document.createElement("p");
      desc.className = "desc";
      desc.textContent =
        meta.description ||
        "Full lab write-up: purpose, background, configurations, verification, and lessons learned.";

      const metaLine = document.createElement("p");
      metaLine.className = "report-meta";
      const bits = [];
      if (meta.course) bits.push(meta.course);
      if (meta.pages) bits.push(meta.pages + " pages");
      bits.push("PDF");
      metaLine.textContent = bits.join(" · ");

      const actions = document.createElement("div");
      actions.className = "report-actions";

      const open = document.createElement("a");
      open.className = "btn small";
      open.href = href;
      open.target = "_blank";
      open.rel = "noopener";
      open.textContent = "Open report";

      const dl = document.createElement("a");
      dl.className = "btn small ghost";
      dl.href = href;
      dl.setAttribute("download", "");
      dl.textContent = "Download";

      actions.appendChild(open);
      actions.appendChild(dl);

      card.appendChild(tagRow);
      card.appendChild(h3);
      card.appendChild(desc);
      card.appendChild(metaLine);
      card.appendChild(actions);
      grid.appendChild(card);

      // Stagger the reveal slightly for cards added after page load.
      requestAnimationFrame(function () {
        setTimeout(function () { card.classList.add("in"); }, 40 * index);
      });
    });

    if (status) {
      status.textContent =
        files.length + (files.length === 1 ? " report" : " reports") +
        " in the library · more on the way";
    }
  }

  /* -- tiny sessionStorage cache (10 min) to stay friendly with API limits -- */
  function readCache(key) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.t > 10 * 60 * 1000) return null;
      return data.v;
    } catch (e) { return null; }
  }
  function writeCache(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: value }));
    } catch (e) { /* storage unavailable — fine */ }
  }
})();
