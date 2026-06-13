/* ==========================================================================
   Lab Report Library
   --------------------------------------------------------------------------
   HOW TO ADD A REPORT (the easy way):
     1. Drop the PDF into the  reports/  folder.
     2. Commit + push.
   That's it. On GitHub Pages the site lists everything inside reports/ and
   builds a card for each PDF automatically, turning the filename into a clean
   title.

   OPTIONAL, per report:
     - title / description / tags / course  → nicer card text
     - order                                → position in the grid (1 = first)
     - repo                                 → paste a GitHub repository URL to
                                              show a "Repository" button
   Entries are matched to files by filename. Close-but-not-exact filenames
   (extra words, different separators) are matched automatically — but if a
   card ever shows a generic title, make the entry's key match the filename.
   ========================================================================== */

const REPORT_META = {
  "Kleven__Jonathan_-_Booting_Windows_11_and_Installing_Essential_Software.pdf": {
    order: 1,
    title: "Booting Windows 11 & Installing Essential Software",
    course: "Cisco Networking Academy",
    tags: ["Windows 11", "Rufus", "PuTTY", "Wireshark"],
    repo: "", // paste a GitHub repository URL here to show a Repository button
    description:
      "A clean Windows 11 install from a Rufus-built bootable USB — BIOS boot menu, " +
      "partitioning, updates — then the full networking toolkit: PuTTY, Cisco Packet " +
      "Tracer, Wireshark with Npcap, NVIDIA drivers, and Microsoft 365. The foundation " +
      "every later lab is built on."
  },

  "Kleven__Jonathan_-_Routing_with_Multi-Area_OSPF.pdf": {
    order: 2,
    title: "Routing with Multi-Area OSPF",
    course: "Cisco Networking Academy",
    tags: ["OSPF", "OSPFv3", "IPv4/IPv6", "Cisco IOS"],
    repo: "",
    description:
      "A three-area OSPF design across five routers and two multilayer switches, " +
      "running OSPFv2 and OSPFv3 side by side. Covers Area Border Routers, dual-stack " +
      "SDM templates, and the troubleshooting that followed — duplicate IPv6 addresses, " +
      "routed-port quirks, and a stubborn router-ID error."
  },

  "Kleven__Jonathan_-_Local_AI.pdf": {
    order: 3,
    title: "Local AI Model with a Web Interface",
    course: "Cisco Networking Academy",
    tags: ["Python", "Ollama", "Docker", "Flask"],
    repo: "",
    description:
      "Hosting an LLM locally with Ollama and Docker, exposing it through OpenWebUI, " +
      "then building a custom Flask chat app from scratch — streaming responses, " +
      "SQL-backed multi-user memory, and AI-assisted intent routing for live weather " +
      "and web scraping."
  },

  "Kleven__Jonathan_-_Route_Redistribution_With_BGP.pdf": {
    order: 4,
    title: "Multi-Protocol Route Redistribution with eBGP",
    course: "Cisco Networking Academy",
    tags: ["BGP", "OSPF", "EIGRP", "IS-IS"],
    repo: "",
    description:
      "Six routers, four autonomous systems, three interior protocols: redistributing " +
      "OSPF, EIGRP, and IS-IS routes through an eBGP backbone with route-maps, weight, " +
      "and local preference — verified end to end in both IPv4 and IPv6."
  },

  "Kleven__Jonathan_-_Layer_2_Network_Attacks_and_Mitigations.pdf": {
    order: 5,
    title: "Layer 2 Network Attacks & Mitigations",
    course: "Cisco Networking Academy",
    tags: ["Port Security", "ARP Spoofing", "VLAN Hopping", "Linux"],
    repo: "",
    description:
      "MAC flooding with macof, an ARP-spoofing man-in-the-middle, and VLAN hopping " +
      "with Yersinia — each staged on real hardware from a dual-boot Kubuntu machine, " +
      "then shut down with port security, a static ARP access-list, and hardened " +
      "access ports."
  },

  "Kleven__Jonathan_-_AWS_IAM_VPC_EC2.pdf": {
    order: 6,
    title: "AWS IAM, VPC & EC2 Configuration and Deployment",
    course: "AWS Cloud Coursework",
    tags: ["AWS", "IAM", "VPC", "EC2"],
    repo: "",
    description:
      "Three foundational AWS builds: IAM users, groups, and policies tested account " +
      "by account; a custom VPC with public and private subnets, a NAT gateway, and " +
      "security groups; and an EC2 web server launched with a bootstrap script, " +
      "protection settings, and live resizing."
  },

  "Kleven__Jonathan_-_AWS_EBS_RDS_Auto_Scaling.pdf": {
    order: 7,
    title: "AWS EBS & RDS with Auto Scaling and Load Balancing",
    course: "AWS Cloud Coursework",
    tags: ["AWS", "EBS", "RDS", "Auto Scaling"],
    repo: "",
    description:
      "Attaching, snapshotting, and restoring EBS volumes; deploying a Multi-AZ MySQL " +
      "RDS database behind locked-down security groups; and wiring an Application Load " +
      "Balancer to an Auto Scaling group that provisioned new instances on cue during " +
      "a CPU load test."
  }
};

// Files known to be in the reports/ folder. Every report listed in
// REPORT_META above is included automatically, so all of them appear even
// when the GitHub API can't be reached (local preview, rate limits, etc.).
// Add a filename here only if it has NO entry in REPORT_META above and you
// still want it guaranteed to show without relying on the API.
const FALLBACK_FILES = Object.keys(REPORT_META);

const REPORTS_DIR = "reports";

/* ---------------------------------------------------------------------- */

(function () {
  const grid = document.getElementById("report-grid");
  const status = document.getElementById("report-status");
  if (!grid) return;

  init();

  async function init() {
    let files = [];
    try {
      files = await listReportFiles();
    } catch (err) {
      // Last-resort: show every known report even if discovery breaks.
      files = sortFiles(Object.keys(REPORT_META));
    }
    if (!files.length) files = sortFiles(Object.keys(REPORT_META));
    render(files);
  }

  /* ------------------------- file discovery --------------------------- */

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
            if (Array.isArray(items)) {
              apiFiles = items
                .filter(function (item) {
                  return item && item.type === "file" && /\.pdf$/i.test(item.name);
                })
                .map(function (item) { return item.name; });
              writeCache(cacheKey, apiFiles);
            }
          }
        } catch (err) {
          /* Offline, rate-limited, or local preview — fall through. */
        }
      }
    }

    // Merge the always-present fallback list with anything the API found.
    // A report can be referenced two ways at once — by its REPORT_META key
    // (placeholder) and by the real uploaded filename — so collapse entries
    // that resolve to the same report, keeping the real file when present.
    const seen = new Map();      // metadata entry  -> chosen filename
    const standalone = new Set(); // files with no metadata, keyed by filename

    function consider(name, isReal) {
      const meta = findMeta(name);
      if (meta) {
        const existing = seen.get(meta);
        // Prefer a real (API) filename over a fallback/key placeholder.
        if (!existing || isReal) seen.set(meta, name);
      } else {
        standalone.add(name);
      }
    }

    FALLBACK_FILES.forEach(function (name) { consider(name, false); });
    apiFiles.forEach(function (name) { consider(name, true); });

    const files = Array.from(seen.values()).concat(Array.from(standalone));
    return sortFiles(files);
  }

  /* ----------------------- metadata matching --------------------------- */

  const STOPWORDS = { and: 1, with: 1, the: 1, a: 1, an: 1, of: 1, for: 1, to: 1 };

  function normalize(name) {
    return name
      .toLowerCase()
      .replace(/\.pdf$/i, "")
      .replace(/kleven|jonathan/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  function tokens(name) {
    return name
      .toLowerCase()
      .replace(/\.pdf$/i, "")
      .replace(/kleven|jonathan/g, " ")
      .split(/[^a-z0-9]+/)
      .filter(function (t) { return t && !STOPWORDS[t]; });
  }

  /** Find the metadata entry for a filename — exact first, then fuzzy. */
  function findMeta(filename) {
    if (REPORT_META[filename]) return REPORT_META[filename];

    const keys = Object.keys(REPORT_META);
    const n = normalize(filename);

    // Normalized equality or containment (long strings only).
    for (let i = 0; i < keys.length; i++) {
      const k = normalize(keys[i]);
      if (!k || !n) continue;
      if (k === n) return REPORT_META[keys[i]];
      if (k.length >= 8 && n.length >= 8 && (k.includes(n) || n.includes(k))) {
        return REPORT_META[keys[i]];
      }
    }

    // Token overlap: most distinctive words shared → same report.
    const ft = tokens(filename);
    for (let i = 0; i < keys.length; i++) {
      const kt = tokens(keys[i]);
      const small = Math.min(ft.length, kt.length);
      if (small < 2) continue;
      let common = 0;
      ft.forEach(function (t) { if (kt.indexOf(t) !== -1) common++; });
      if (common >= 2 && common >= small * 0.7) return REPORT_META[keys[i]];
    }
    return null;
  }

  function sortFiles(files) {
    return files
      .map(function (f) { return { f: f, meta: findMeta(f) }; })
      .sort(function (a, b) {
        const oa = a.meta && a.meta.order != null ? a.meta.order : 999;
        const ob = b.meta && b.meta.order != null ? b.meta.order : 999;
        if (oa !== ob) return oa - ob;
        return prettify(a.f).localeCompare(prettify(b.f));
      })
      .map(function (x) { return x.f; });
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

  /* ----------------------------- rendering ------------------------------ */

  function render(files) {
    // Idempotent: remove any cards from a previous render before drawing.
    grid.querySelectorAll(".report-card").forEach(function (el) { el.remove(); });

    // Final guard against duplicates: one card per resolved report. A report
    // matched to a REPORT_META entry is keyed by that entry; unmatched files
    // are keyed by filename. This collapses any duplicates no matter how they
    // arrived (fallback + API, a stale cached file list, etc.).
    const drawn = new Set();
    let index = 0;

    files.forEach(function (filename) {
      const meta = findMeta(filename) || {};
      const key = meta.title ? "meta:" + meta.title : "file:" + filename;
      if (drawn.has(key)) return;
      drawn.add(key);

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
      actions.appendChild(open);

      const dl = document.createElement("a");
      dl.className = "btn small ghost";
      dl.href = href;
      dl.setAttribute("download", "");
      dl.textContent = "Download";
      actions.appendChild(dl);

      if (meta.repo) {
        const repo = document.createElement("a");
        repo.className = "btn small ghost";
        repo.href = meta.repo;
        repo.target = "_blank";
        repo.rel = "noopener";
        repo.textContent = "Repository";
        actions.appendChild(repo);
      }

      card.appendChild(tagRow);
      card.appendChild(h3);
      card.appendChild(desc);
      card.appendChild(metaLine);
      card.appendChild(actions);
      grid.appendChild(card);

      // Stagger the reveal slightly for cards added after page load.
      const i = index++;
      requestAnimationFrame(function () {
        setTimeout(function () { card.classList.add("in"); }, 40 * i);
      });
    });

    if (status) {
      const count = drawn.size;
      status.textContent =
        count + (count === 1 ? " report" : " reports") + " in the library";
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
