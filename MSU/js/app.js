/* ============================================================
   app.js — controller: routing, navigation, theme, dashboard,
   settings, and all delegated event handling.
   ============================================================ */
(function () {
  "use strict";

  var DEFAULT_MOVEIN = "2026-08-23"; // Jonathan's Langford Hall move-in day
  var DEFAULT_BIO = "Incoming Computer Engineering freshman at Montana State (Fall 2026). I'm aiming for a career in aircraft computer systems — avionics and embedded engineering, ideally in aviation or defense. I learn by building, breaking, and documenting real systems: hands-on networking and cloud labs (CCNA + AWS Cloud Practitioner), a self-hosted local AI assistant built from scratch, and games shipped in Unity jams. Off the keyboard, I'm into aviation photography and getting outside.";
  var pendingAnchor = null;
  var noteTimers = {};
  var toastTimer;
  var editingLinkId = null; // custom link whose label is currently being edited
  var editingContactId = null; // contact whose name is currently being edited
  var editingCatId = null; // profile category whose name is currently being edited
  // SVG copy icon — centers reliably (unlike a text glyph) and inherits color via currentColor
  var COPY_ICON = '<svg class="copy-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
  var DEFAULT_CONTACTS = [
    { name: "Office of Financial Aid & Education", phone: "(406) 994-2845", email: "finaid@montana.edu", location: "Sherrick Hall 112 (temporary walk-in); mailing 21 Montana Hall, P.O. Box 174160, Bozeman, MT 59717-4160; Mon–Fri 8 a.m.–5 p.m." },
    { name: "Student Accounts", phone: "(406) 994-1991", email: "studentaccounts@montana.edu", location: "Room 121, 1st floor, Montana Hall; mailing P.O. Box 172640, Bozeman, MT 59717-2640; Mon–Fri 8 a.m.–5 p.m." },
    { name: "Office of Financial Education", phone: "(406) 994-4388", email: "makechange@montana.edu", location: "152 Strand Union Building; P.O. Box 174180, Bozeman, MT 59717-4180" },
    { name: "Allen Yarnell Center for Student Success", phone: "", email: "aycss@montana.edu", location: "Strand Union Building (broader student-success contact)" },
    { name: "Financial Aid — Admissions roadmap", phone: "(406) 994-2845", email: "finaid@montana.edu", location: "General financial-aid questions" }
  ];

  var main, navEl, toastEl, themeBtn, themePop, searchInput, searchResults, scrim, menuBtn;
  var META = {}; // pageId -> {icon,label} from NAV

  function $(id) { return document.getElementById(id); }
  function cssEsc(s) { return String(s).replace(/"/g, '\\"'); }
  function isTyping(t) {
    return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
  }
  function isMobile() { return window.matchMedia("(max-width: 860px)").matches; }

  /* ---------------- init ---------------- */
  function init() {
    main = $("main"); navEl = $("nav"); toastEl = $("toast");
    themeBtn = $("themeBtn"); themePop = $("themePopover");
    searchInput = $("globalSearch"); searchResults = $("searchResults");
    scrim = $("scrim"); menuBtn = $("menuBtn");

    (window.NAV || []).forEach(function (g) { g.items.forEach(function (it) { META[it.id] = it; }); });

    applyTheme(Store.getTheme()); // theme the gate too

    /* optional password gate (see js/auth.js) before the app is built */
    if (window.Auth) {
      Auth.ensureSeed().then(function () {
        if (Auth.isEnabled() && !Auth.isUnlocked()) Auth.showGate(startApp);
        else startApp();
      });
    } else {
      startApp();
    }
  }

  function startApp() {
    if (Store.getPref("sidebarCollapsed", false)) document.body.classList.add("sidebar-collapsed");
    seedProfileDefaults();
    buildNav();
    Search.build();
    Search.init(searchInput, searchResults, navigateTo);
    wireEvents();

    window.addEventListener("hashchange", function () {
      mount(currentRoute(), true);
      if (pendingAnchor) { scrollToAnchor(pendingAnchor); pendingAnchor = null; }
    });

    mount(currentRoute(), true);

    if (!Store.available) {
      toast("Storage is blocked in this browser — your changes won't be saved.");
    }
  }

  /* ---------------- routing ---------------- */
  function currentRoute() {
    var h = (location.hash || "").replace(/^#\/?/, "").split("?")[0];
    return h || "dashboard";
  }
  function viewHTML(route) {
    if (route === "dashboard") return renderDashboard();
    if (route === "profile") return renderProfile();
    if (route === "settings") return renderSettings();
    if (window.PAGES[route]) return Render.renderPage(route);
    return '<div class="page"><div class="empty-state"><span class="es-ico">🧭</span>That page doesn\'t exist. <a href="#/dashboard">Back to the dashboard</a>.</div></div>';
  }
  function autoGrow(el) { el.style.height = "auto"; el.style.height = (el.scrollHeight + 2) + "px"; }
  function mount(route, scroll) {
    main.innerHTML = viewHTML(route);
    setActiveNav(route);
    Render.updateProgress();
    main.querySelectorAll("[data-autogrow]").forEach(autoGrow);
    if (route === "dashboard") updateCountdown();
    if (scroll) window.scrollTo(0, 0);
    closeMenu();
  }
  function refresh(focusSel) {
    var y = window.scrollY;
    mount(currentRoute(), false);
    window.scrollTo(0, y);
    if (focusSel) { var e = document.querySelector(focusSel); if (e) e.focus(); }
  }
  function navigateTo(page, anchor) {
    if (currentRoute() === page) {
      if (anchor) scrollToAnchor(anchor);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    pendingAnchor = anchor || null;
    location.hash = "#/" + page;
  }
  function scrollToAnchor(id) {
    var el = $(id);
    if (!el) { window.scrollTo(0, 0); return; }
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    setTimeout(function () { el.classList.remove("flash"); }, 1700);
  }

  /* ---------------- navigation sidebar ---------------- */
  function buildNav() {
    var html = "";
    (window.NAV || []).forEach(function (grp) {
      html += '<div class="nav-group">';
      if (grp.group) html += '<div class="nav-group-title">' + grp.group + "</div>";
      grp.items.forEach(function (it) {
        var tracked = (window.TRACKED_PAGES || []).indexOf(it.id) >= 0;
        html += '<a class="nav-link" data-nav="' + it.id + '" href="#/' + it.id + '">'
          + '<span class="nav-ico">' + it.icon + "</span>"
          + '<span class="nav-label">' + it.label + "</span>"
          + (tracked ? '<span class="nav-badge" id="nav-badge-' + it.id + '">0/0</span>' : "")
        + "</a>";
      });
      html += "</div>";
    });
    navEl.innerHTML = html;
  }
  function setActiveNav(route) {
    var links = navEl.querySelectorAll(".nav-link");
    links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("data-nav") === route); });
  }

  /* ---------------- dashboard ---------------- */
  function daysUntil(s) {
    var t = new Date(s + "T00:00:00");
    if (isNaN(t.getTime())) return null;
    var n = new Date(); n.setHours(0, 0, 0, 0);
    return Math.round((t - n) / 86400000);
  }
  function fmtDate(s) {
    var t = new Date(s + "T00:00:00");
    if (isNaN(t.getTime())) return s;
    return t.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  }
  function countdownText(days) {
    if (days === null) return { num: "—", unit: "set a date" };
    if (days > 1) return { num: String(days), unit: "days to move-in" };
    if (days === 1) return { num: "1", unit: "day to move-in" };
    if (days === 0) return { num: "🎉", unit: "move-in is today!" };
    return { num: "🎓", unit: "you've made it in" };
  }
  function updateCountdown() {
    var moveIn = Store.getPref("moveIn", DEFAULT_MOVEIN);
    var c = countdownText(daysUntil(moveIn));
    var num = $("cdNum"), unit = $("cdUnit"), sub = $("cdSub");
    if (num) num.textContent = c.num;
    if (unit) unit.textContent = c.unit;
    if (sub) sub.textContent = fmtDate(moveIn);
  }

  function renderDashboard() {
    var moveIn = Store.getPref("moveIn", DEFAULT_MOVEIN);
    var c = countdownText(daysUntil(moveIn));
    var ov = Render.overallProgress();
    var C = 2 * Math.PI * 52;

    var hero = '<div class="hero">'
      + '<div class="hero-text">'
        + '<div class="page-eyebrow">Welcome back, ' + Render.esc(Store.getProfile("name", "Jonathan")) + "</div>"
        + "<h1>Let's get you to Montana 🐾</h1>"
        + '<div class="countdown"><span class="cd-num" id="cdNum">' + c.num + '</span><span class="cd-unit" id="cdUnit">' + c.unit + "</span></div>"
        + '<div class="countdown-meta">Move-in day: <strong id="cdSub">' + fmtDate(moveIn) + "</strong>"
          + ' &nbsp;·&nbsp; <input type="date" data-act="movein" value="' + moveIn + '" style="height:30px;padding:0 8px" aria-label="Set your move-in date" /></div>'
      + "</div>"
      + '<div class="ring-wrap"><div class="ring">'
        + '<svg width="116" height="116" viewBox="0 0 120 120">'
          + '<circle class="ring-bg" cx="60" cy="60" r="52" fill="none" stroke-width="11"></circle>'
          + '<circle class="ring-fg" id="ovRingFill" cx="60" cy="60" r="52" fill="none" stroke-width="11" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - ov.pct / 100)) + '"></circle>'
        + "</svg>"
        + '<div class="ring-num"><span class="ring-pct" id="ovPct">' + ov.pct + '%</span><span class="ring-cap">complete</span></div>'
      + "</div></div>"
    + "</div>";

    var prio = (window.PRIORITIES || []).map(function (p) {
      var checked = Store.isChecked(p.id);
      return '<div class="check-item' + (checked ? " done" : "") + '" data-item="' + p.id + '">'
        + '<input type="checkbox" class="check-box" data-act="check" data-id="' + p.id + '"' + (checked ? " checked" : "") + ' aria-label="' + Render.esc(p.text) + '" />'
        + '<div class="item-main"><div class="item-top"><span class="item-text"><strong>' + Render.esc(p.text) + "</strong></span></div>"
        + '<div class="item-note">' + Render.esc(p.note) + "</div></div>"
      + "</div>";
    }).join("");
    var prioPanel = '<section class="panel"><div class="panel-head"><div class="ph-title">⭐ Top priorities</div>'
      + '<div class="ph-meta muted" style="font-size:.82rem">If you only do a few things</div></div>'
      + '<div class="panel-body" style="padding:8px 12px">' + prio + "</div></section>";

    var cards = (window.TRACKED_PAGES || []).map(function (pid) {
      var m = META[pid] || { icon: "•", label: pid };
      var pr = Render.pageProgress(pid);
      return '<a class="stat-card" id="statcard-' + pid + '" href="#/' + pid + '">'
        + '<div class="sc-top"><span class="sc-ico">' + m.icon + '</span><span class="sc-name">' + m.label + '</span>'
        + '<span class="sc-frac" id="statfrac-' + pid + '">' + pr.done + " / " + pr.total + "</span></div>"
        + '<div class="progress"><i id="statbar-' + pid + '" style="width:' + pr.pct + '%"></i></div>'
      + "</a>";
    }).join("");
    var cardsPanel = '<section class="panel"><div class="panel-head"><div class="ph-title">📊 Your progress</div></div>'
      + '<div class="panel-body"><div class="grid grid-3">' + cards + "</div></div></section>";

    var qlinks = (window.QUICKLINKS || []).map(function (l) {
      return '<a class="quick-link" href="' + l.url + '" target="_blank" rel="noopener" title="' + Render.esc(l.note || "") + '">'
        + '<span class="ql-ico">' + l.ico + "</span>" + Render.esc(l.label) + " ↗</a>";
    }).join("");
    var linksPanel = '<section class="panel"><div class="panel-head"><div class="ph-title">🔗 Key portals</div>'
      + '<div class="ph-meta muted" style="font-size:.78rem">verify exact URLs on montana.edu</div></div>'
      + '<div class="panel-body"><div class="quick-links">' + qlinks + "</div></div></section>";

    var legendItems = Object.keys(window.LABELS).map(function (k) {
      return '<div class="legend-item">' + Render.badge(k) + '<span class="muted">' + window.LABELS[k].blurb + "</span></div>";
    }).join("");
    var legendPanel = '<section class="panel"><div class="panel-head"><div class="ph-title">🏷️ How to read the labels</div></div>'
      + '<div class="panel-body"><div class="legend">' + legendItems + "</div>"
      + Render.callout("info", "", "<strong>⚠️ marks anything time-sensitive or MSU-specific.</strong> Those dates and details come from research — confirm them on official Montana State pages before you rely on them. Everything you check off is saved locally in this browser; use Settings to back it up.")
      + "</div></section>";

    var housing = '<section class="panel placement-panel"><div class="panel-head"><div class="ph-title">🏠 Your housing</div>'
      + '<div class="ph-meta"><a class="placement-link" href="https://www.montana.edu/housing/halls/langford.html" target="_blank" rel="noopener">Langford guide ↗</a></div></div>'
      + '<div class="panel-body"><div class="placement-chips">'
        + '<span class="cc-chip">🏛️ ' + Render.esc(Store.getProfile("hall", "Langford Hall")) + "</span>"
        + '<span class="cc-chip">🚪 Room ' + Render.esc(Store.getProfile("room", "Lng 205-B")) + "</span>"
        + '<span class="cc-chip">👥 ' + Render.esc(Store.getProfile("roomType", "Double") + " room") + "</span>"
        + '<span class="cc-chip">🍽️ ' + Render.esc(Store.getProfile("mealPlan", "7-Day Blue meal plan")) + "</span>"
        + '<span class="cc-chip">🎓 Engineering LLC hall</span>'
        + '<span class="cc-chip">📍 Rendezvous Dining nearby</span>'
      + "</div></div></section>";

    return '<div class="page">' + hero + housing
      + '<div class="grid grid-2" style="align-items:start">'
        + "<div>" + prioPanel + "</div>"
        + "<div>" + cardsPanel + linksPanel + "</div>"
      + "</div>"
      + legendPanel
    + "</div>";
  }

  /* ---------------- profile ---------------- */
  function collectCertIds() {
    var ids = [], p = window.PAGES.certs;
    if (p) (p.sections || []).forEach(function (s) { if (s.type === "certs") (s.groups || []).forEach(function (g) { g.items.forEach(function (it) { if (!it.earned) ids.push(it.id); }); }); });
    return ids;
  }
  function collectDiscountIds() {
    var ids = [], p = window.PAGES.discounts;
    if (p) (p.sections || []).forEach(function (s) { if (s.type === "discounts") s.items.forEach(function (it) { ids.push(it.id); }); });
    return ids;
  }
  function pfStat(num, label) {
    return '<div class="pf-stat"><span class="pf-stat-num">' + num + '</span><span class="pf-stat-lbl">' + label + "</span></div>";
  }
  function pfField(key, label, opts) {
    opts = opts || {};
    var val = Store.getProfile(key, opts.def || "");
    var id = "pf-input-" + key;
    var copyBtn = opts.copy ? '<button class="copy-btn" data-act="copy" data-copy-sel="#' + id + '" title="Copy" aria-label="Copy ' + Render.esc(label) + '">' + COPY_ICON + '</button>' : "";
    return '<label class="pf-field"><span class="pf-label">' + Render.esc(label) + (opts.hint ? ' <span class="pf-hint">' + Render.esc(opts.hint) + "</span>" : "") + "</span>"
      + '<span class="pf-input-row">'
        + '<input class="pf-input" id="' + id + '" type="' + (opts.type || "text") + '" value="' + Render.esc(val) + '" placeholder="' + Render.esc(opts.ph || "") + '" data-act="profile" data-key="' + key + '" autocomplete="off" />'
        + copyBtn
      + "</span></label>";
  }
  function pcField(cid, field, label, val, opts) {
    opts = opts || {};
    var id = "pc-" + cid + "-" + field;
    var copyBtn = opts.copy ? '<button class="copy-btn" data-act="copy" data-copy-sel="#' + id + '" title="Copy" aria-label="Copy ' + Render.esc(label) + '">' + COPY_ICON + '</button>' : "";
    return '<label class="pf-field' + (opts.wide ? " pf-field-wide" : "") + '"><span class="pf-label">' + Render.esc(label) + "</span>"
      + '<span class="pf-input-row">'
        + '<input class="pf-input" id="' + id + '" type="text" value="' + Render.esc(val || "") + '" data-act="pcontact" data-id="' + cid + '" data-field="' + field + '" autocomplete="off" />'
        + copyBtn
      + "</span></label>";
  }
  function profilePanel(title, icon, inner, meta) {
    return '<section class="panel"><div class="panel-head"><div class="ph-title">' + icon + " " + title + "</div>"
      + (meta ? '<div class="ph-meta muted" style="font-size:.75rem">' + meta + "</div>" : "")
      + '</div><div class="panel-body">' + inner + "</div></section>";
  }

  function renderProfile() {
    var name = Store.getProfile("name", "Jonathan");
    var netid = Store.getProfile("netid", "");
    var email = netid.trim() ? netid.trim() + "@student.montana.edu" : "";
    var moveIn = Store.getPref("moveIn", DEFAULT_MOVEIN);
    var ov = Render.overallProgress();
    var certsT = Store.countOn("targeting", collectCertIds());
    var toolsC = Store.countOn("claimed", collectDiscountIds());
    var initial = (name.trim().charAt(0) || "🐾").toUpperCase();

    var header = '<div class="pf-header">'
      + '<div class="pf-avatar">' + Render.esc(initial) + "</div>"
      + '<div class="pf-id"><h1 class="pf-name">' + Render.esc(name || "Your name") + "</h1>"
        + '<div class="pf-sub">' + Render.esc(Store.getProfile("major", "Computer Engineering")) + " · Montana State · " + Render.esc(Store.getProfile("term", "Fall 2026")) + "</div></div>"
    + "</div>";

    var cd = countdownText(daysUntil(moveIn));
    var stats = '<div class="pf-stats">'
      + pfStat(cd.num, cd.unit)
      + pfStat(ov.pct + "%", "checklist complete")
      + pfStat(ov.done + " / " + ov.total, "items done")
      + pfStat(certsT, "certs targeting")
      + pfStat(toolsC, "tools claimed")
    + "</div>";

    var identity = '<div class="pf-fields">'
      + pfField("name", "Preferred name", { def: "Jonathan" })
      + pfField("netid", "NetID", { ph: "e.g. m45h263", copy: true })
      + '<label class="pf-field"><span class="pf-label">Montana email <span class="pf-hint">auto from NetID</span></span>'
        + '<span class="pf-input-row"><span class="pf-derived" id="pf-montana-email" data-copy="' + Render.esc(email) + '">'
          + (email ? Render.esc(email) : '<span class="pf-placeholder">your-netid@student.montana.edu</span>') + "</span>"
        + '<button class="copy-btn" data-act="copy" data-copy-sel="#pf-montana-email" title="Copy email" aria-label="Copy Montana email">' + COPY_ICON + '</button></span></label>'
      + pfField("studentid", "Student ID", { ph: "e.g. -00XXXXXXX", copy: true })
      + pfField("personalEmail", "Personal email", { ph: "you@example.com", copy: true })
      + pfField("phone", "Phone", { ph: "(425) 555-0123", copy: true })
    + "</div>";

    var academic = '<div class="pf-fields">'
      + pfField("major", "Major", { def: "Computer Engineering" })
      + pfField("college", "College", { def: "Norm Asbjornson College of Engineering" })
      + pfField("term", "Entry term", { def: "Fall 2026" })
      + pfField("advisor", "Academic advisor", { ph: "find on MyMSU" })
      + pfField("focus", "Focus / interests", { ph: "e.g. embedded systems, avionics" })
    + "</div>";

    var housingInner = '<div class="pf-fields">'
      + pfField("hall", "Residence hall", { def: "Langford Hall" })
      + pfField("room", "Room", { def: "Lng 205-B" })
      + pfField("roomType", "Room type", { def: "Double" })
      + pfField("mealPlan", "Meal plan", { def: "7-Day Blue meal plan" })
      + '<label class="pf-field"><span class="pf-label">Move-in date</span><span class="pf-input-row"><input class="pf-input" type="date" value="' + moveIn + '" data-act="movein" aria-label="Move-in date" /></span></label>'
    + "</div>";

    var plinks = Store.getProfileLinks();
    var linkRows = plinks.map(function (l) {
      var uid = "pf-link-" + l.id + "-url";
      var editing = (editingLinkId === l.id) || !l.label;
      var labelHTML = editing
        ? '<input class="pf-input pf-link-label" value="' + Render.esc(l.label) + '" placeholder="Label — type a name and press Enter" data-act="pflink" data-id="' + l.id + '" data-field="label" autocomplete="off" />'
        : '<span class="pf-label pf-link-locked" data-act="edit-plink" data-id="' + l.id + '" role="button" tabindex="0" title="Click to rename">' + Render.esc(l.label) + "</span>";
      return '<div class="pf-link-row" data-plid="' + l.id + '">'
        + labelHTML
        + '<div class="pf-link-urlrow">'
          + '<input class="pf-input pf-link-url" id="' + uid + '" value="' + Render.esc(l.url) + '" placeholder="https://…" data-act="pflink" data-id="' + l.id + '" data-field="url" autocomplete="off" />'
          + '<button class="copy-btn" data-act="copy" data-copy-sel="#' + uid + '" title="Copy link" aria-label="Copy link">' + COPY_ICON + '</button>'
          + '<button class="icon-btn" data-act="del-plink" data-id="' + l.id + '" title="Delete link" aria-label="Delete link">🗑️</button>'
        + "</div>"
      + "</div>";
    }).join("");
    var links = '<div class="pf-fields">'
      + pfField("github", "GitHub", { def: "https://github.com/DrJovo", copy: true })
      + pfField("portfolio", "Portfolio", { def: "https://drjovo.github.io", copy: true })
    + "</div>"
      + (linkRows ? '<div class="pf-links-list">' + linkRows + "</div>" : "")
      + '<button class="btn btn-sm pf-add-link" data-act="add-plink">➕ Add a link</button>';

    var bio = '<textarea class="pf-bio" data-autogrow data-act="profile" data-key="bio" placeholder="A line or two about you — your goals, what you\'re excited about, anything worth noting.">'
      + Render.esc(Store.getProfile("bio", DEFAULT_BIO)) + "</textarea>";

    var customInner = renderCategorized("custom");
    var contactsInner = renderCategorized("contacts");

    return '<div class="page">'
      + '<header class="page-head"><div class="page-eyebrow">Getting Started</div>'
        + '<h1 class="page-title"><span class="pt-ico">🪪</span>Profile</h1>'
        + '<p class="page-sub">Your personal info in one place. Everything saves automatically and rides along in your Settings backup.</p></header>'
      + header
      + stats
      + '<div class="grid grid-2" style="align-items:start">'
        + "<div>" + profilePanel("Identity", "🪪", identity) + "</div>"
        + "<div>" + profilePanel("Academic", "🎓", academic) + profilePanel("Housing", "🏠", housingInner) + "</div>"
      + "</div>"
      + '<div class="grid grid-2" style="align-items:start">'
        + "<div>" + profilePanel("Links", "🔗", links) + "</div>"
        + "<div>" + profilePanel("About me", "📝", bio) + "</div>"
      + "</div>"
      + profilePanel("Custom notes", "✨", customInner)
      + profilePanel("Contacts", "📇", contactsInner)
    + "</div>";
  }

  function updateDerivedEmail(netid) {
    var em = $("pf-montana-email"); if (!em) return;
    var e = netid.trim() ? netid.trim() + "@student.montana.edu" : "";
    if (e) em.textContent = e; else em.innerHTML = '<span class="pf-placeholder">your-netid@student.montana.edu</span>';
    em.setAttribute("data-copy", e);
  }
  function saveProfileField(el) {
    var key = el.getAttribute("data-key"), val = el.value;
    Store.setProfile(key, val); // small data — save immediately so a re-render never drops an edit
    if (key === "netid") updateDerivedEmail(val);
    if (key === "name") {
      var nm = document.querySelector(".pf-name"); if (nm) nm.textContent = val || "Your name";
      var av = document.querySelector(".pf-avatar"); if (av) av.textContent = (val.trim().charAt(0) || "🐾").toUpperCase();
    }
  }
  function saveProfileCustom(el) {
    var id = el.getAttribute("data-id"), field = el.getAttribute("data-field"), val = el.value;
    var arr = Store.getProfileCustom();
    for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) { arr[i][field] = val; break; } }
    Store.setProfileCustom(arr);
  }
  function addProfileField() {
    var arr = Store.getProfileCustom();
    var id = "pf-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    arr.push({ id: id, label: "", value: "" });
    Store.setProfileCustom(arr);
    refresh('.pf-custom-row[data-pfid="' + id + '"] .pf-custom-label');
  }
  function delProfileField(id) {
    Store.setProfileCustom(Store.getProfileCustom().filter(function (f) { return f.id !== id; }));
    refresh();
    toast("Field removed");
  }
  function saveProfileLink(el) {
    var id = el.getAttribute("data-id"), field = el.getAttribute("data-field");
    var arr = Store.getProfileLinks();
    for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) { arr[i][field] = el.value; break; } }
    Store.setProfileLinks(arr);
  }
  function addProfileLink() {
    var arr = Store.getProfileLinks();
    var id = "pl-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    arr.push({ id: id, label: "", url: "" });
    Store.setProfileLinks(arr);
    refresh('.pf-link-row[data-plid="' + id + '"] .pf-link-label');
  }
  function delProfileLink(id) {
    if (editingLinkId === id) editingLinkId = null;
    Store.setProfileLinks(Store.getProfileLinks().filter(function (l) { return l.id !== id; }));
    refresh();
    toast("Link removed");
  }
  function lockProfileLink(el) {
    if (!el.value.trim()) return;       // need a name before locking it in as a header
    saveProfileLink(el);
    editingLinkId = null;
    refresh("#pf-link-" + el.getAttribute("data-id") + "-url");
  }
  function editProfileLink(id) {
    editingLinkId = id;
    refresh('.pf-link-row[data-plid="' + id + '"] .pf-link-label');
  }
  function seedProfileDefaults() {
    // Seed the MSU finance offices once.
    if (!Store.getPref("contactsSeeded", false)) {
      if (Store.getProfileContacts().length === 0) {
        Store.setProfileContacts(DEFAULT_CONTACTS.map(function (c, i) {
          return { id: "pc-seed-" + i, cat: "cc-finance", name: c.name, phone: c.phone, email: c.email, location: c.location };
        }));
      }
      Store.setPref("contactsSeeded", true);
    }
    // Seed the "Finance" contact category once; file any uncategorized contacts into it.
    if (!Store.getPref("contactCatsSeeded", false)) {
      var ccats = Store.getProfileContactCats();
      if (!ccats.some(function (c) { return c.id === "cc-finance"; })) ccats.unshift({ id: "cc-finance", name: "Finance" });
      Store.setProfileContactCats(ccats);
      var citems = Store.getProfileContacts(), cch = false;
      citems.forEach(function (it) { if (!it.cat) { it.cat = "cc-finance"; cch = true; } });
      if (cch) Store.setProfileContacts(citems);
      Store.setPref("contactCatsSeeded", true);
    }
    // Seed the "Miscellaneous" custom-notes category once; file any uncategorized notes into it.
    if (!Store.getPref("customCatsSeeded", false)) {
      var ncats = Store.getProfileCustomCats();
      if (!ncats.some(function (c) { return c.id === "cn-misc"; })) ncats.unshift({ id: "cn-misc", name: "Miscellaneous" });
      Store.setProfileCustomCats(ncats);
      var nitems = Store.getProfileCustom(), nch = false;
      nitems.forEach(function (it) { if (!it.cat) { it.cat = "cn-misc"; nch = true; } });
      if (nch) Store.setProfileCustom(nitems);
      Store.setPref("customCatsSeeded", true);
    }
  }
  function saveProfileContact(el) {
    var id = el.getAttribute("data-id"), field = el.getAttribute("data-field");
    var arr = Store.getProfileContacts();
    for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) { arr[i][field] = el.value; break; } }
    Store.setProfileContacts(arr);
  }
  function addProfileContact() {
    var arr = Store.getProfileContacts();
    var id = "pc-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    arr.push({ id: id, name: "", phone: "", email: "", location: "" });
    Store.setProfileContacts(arr);
    editingContactId = id;
    refresh('.pf-contact[data-pcid="' + id + '"] .pf-contact-name');
  }
  function delProfileContact(id) {
    if (editingContactId === id) editingContactId = null;
    Store.setProfileContacts(Store.getProfileContacts().filter(function (c) { return c.id !== id; }));
    refresh();
    toast("Contact removed");
  }
  function lockProfileContact(el) {
    if (!el.value.trim()) return;       // need a name before locking it in as a header
    saveProfileContact(el);
    editingContactId = null;
    refresh("#pc-" + el.getAttribute("data-id") + "-phone");
  }
  function editProfileContact(id) {
    editingContactId = id;
    refresh('.pf-contact[data-pcid="' + id + '"] .pf-contact-name');
  }

  /* ---------------- profile categories (contacts + custom notes) ---------------- */
  function catStore(kind) {
    return kind === "contacts"
      ? { getCats: Store.getProfileContactCats, setCats: Store.setProfileContactCats, getItems: Store.getProfileContacts, setItems: Store.setProfileContacts, prefix: "cc-", itemPrefix: "pc-" }
      : { getCats: Store.getProfileCustomCats, setCats: Store.setProfileCustomCats, getItems: Store.getProfileCustom, setItems: Store.setProfileCustom, prefix: "cn-", itemPrefix: "pf-" };
  }
  function renderContactItem(c) {
    var nameHTML = (editingContactId === c.id || !c.name)
      ? '<input class="pf-input pf-contact-name" value="' + Render.esc(c.name) + '" placeholder="Name — type and press Enter" data-act="pcontact" data-id="' + c.id + '" data-field="name" autocomplete="off" />'
      : '<span class="pf-label pf-link-locked pf-contact-header" data-act="edit-pcontact" data-id="' + c.id + '" role="button" tabindex="0" title="Click to rename">' + Render.esc(c.name) + "</span>";
    return '<div class="pf-contact" data-pcid="' + c.id + '">'
      + '<div class="pf-contact-namerow">' + nameHTML
        + '<button class="icon-btn" data-act="del-pcontact" data-id="' + c.id + '" title="Delete contact" aria-label="Delete contact">🗑️</button></div>'
      + '<div class="pf-contact-grid">'
        + pcField(c.id, "phone", "Phone", c.phone, { copy: true })
        + pcField(c.id, "email", "Email", c.email, { copy: true })
        + pcField(c.id, "location", "Location", c.location, { copy: true, wide: true })
      + "</div>"
    + "</div>";
  }
  function renderCustomItem(f) {
    return '<div class="pf-custom-row" data-pfid="' + f.id + '">'
      + '<input class="pf-input pf-custom-label" value="' + Render.esc(f.label) + '" placeholder="Label" data-act="pfcustom" data-id="' + f.id + '" data-field="label" autocomplete="off" />'
      + '<input class="pf-input pf-custom-value" value="' + Render.esc(f.value) + '" placeholder="Value" data-act="pfcustom" data-id="' + f.id + '" data-field="value" autocomplete="off" />'
      + '<button class="icon-btn" data-act="del-pfield" data-id="' + f.id + '" title="Delete field" aria-label="Delete field">🗑️</button>'
    + "</div>";
  }
  function renderCategorized(kind) {
    var s = catStore(kind);
    var cats = s.getCats();
    var items = s.getItems();
    var renderItem = kind === "contacts" ? renderContactItem : renderCustomItem;
    var addLabel = kind === "contacts" ? "➕ Add a contact" : "➕ Add a field";
    var emptyMsg = kind === "contacts" ? "No contacts here yet." : "No fields here yet.";

    var byCat = {};
    items.forEach(function (it) { var key = it.cat || "__uncat"; (byCat[key] = byCat[key] || []).push(it); });

    var html = '<div class="pf-cat-list">';
    cats.forEach(function (cat) {
      var list = byCat[cat.id] || [];
      var editing = (editingCatId === cat.id) || !cat.name;
      var collapsed = !editing && Store.isOn("collapsed", cat.id);
      var head;
      if (editing) {
        head = '<div class="pf-cat-head pf-cat-head-edit">'
          + '<input class="pf-input pf-cat-name" value="' + Render.esc(cat.name) + '" placeholder="Category name — press Enter" data-act="pcatname" data-kind="' + kind + '" data-id="' + cat.id + '" autocomplete="off" />'
          + '<button class="icon-btn" data-act="cat-del" data-kind="' + kind + '" data-id="' + cat.id + '" title="Remove category" aria-label="Remove category">🗑️</button>'
        + "</div>";
      } else {
        head = '<div class="pf-cat-head' + (collapsed ? " collapsed" : "") + '" data-act="collapse" data-id="' + cat.id + '" role="button" tabindex="0" aria-expanded="' + (!collapsed) + '">'
          + '<span class="cat-caret">▾</span>'
          + '<span class="pf-cat-title">' + Render.esc(cat.name) + "</span>"
          + '<span class="cat-count">' + list.length + "</span>"
          + '<button class="icon-btn cat-mini" data-act="cat-rename" data-id="' + cat.id + '" title="Rename category" aria-label="Rename category">✏️</button>'
          + '<button class="icon-btn cat-mini" data-act="cat-del" data-kind="' + kind + '" data-id="' + cat.id + '" title="Delete category" aria-label="Delete category">🗑️</button>'
        + "</div>";
      }
      html += '<div class="pf-cat" data-catid="' + cat.id + '">' + head
        + '<div class="pf-cat-items">' + (list.length ? list.map(renderItem).join("") : '<p class="muted pf-cat-empty">' + emptyMsg + "</p>") + "</div>"
      + "</div>";
    });

    var uncat = byCat["__uncat"] || [];
    if (uncat.length) {
      var ukey = kind + "-uncat";
      var ucol = Store.isOn("collapsed", ukey);
      html += '<div class="pf-cat pf-cat-uncat" data-catid="' + ukey + '">'
        + '<div class="pf-cat-head' + (ucol ? " collapsed" : "") + '" data-act="collapse" data-id="' + ukey + '" role="button" tabindex="0">'
          + '<span class="cat-caret">▾</span><span class="pf-cat-title">Uncategorized</span><span class="cat-count">' + uncat.length + "</span></div>"
        + '<div class="pf-cat-items">' + uncat.map(renderItem).join("") + "</div>"
      + "</div>";
    }
    html += "</div>";

    var opts = cats.length
      ? cats.map(function (c) { return '<button class="pf-cat-opt" data-act="add-item-to" data-kind="' + kind + '" data-cat="' + c.id + '">' + Render.esc(c.name || "(unnamed)") + "</button>"; }).join("")
      : '<div class="pf-cat-dropdown-empty">Add a category first.</div>';
    html += '<div class="pf-cat-actions">'
      + '<button class="btn btn-sm" data-act="add-cat" data-kind="' + kind + '">🗂️ Add category</button>'
      + '<div class="pf-add-wrap"><button class="btn btn-sm" data-act="add-item-menu" data-kind="' + kind + '">' + addLabel + "</button>"
        + '<div class="pf-cat-dropdown" id="dropdown-' + kind + '" hidden><div class="pf-cat-dropdown-title">Add to which category?</div>' + opts + "</div></div>"
    + "</div>";
    return html;
  }
  function addCategory(kind) {
    var s = catStore(kind), cats = s.getCats();
    var id = s.prefix + Date.now() + "-" + Math.floor(Math.random() * 1000);
    cats.push({ id: id, name: "" });
    s.setCats(cats);
    editingCatId = id;
    refresh('.pf-cat[data-catid="' + id + '"] .pf-cat-name');
  }
  function saveCategoryName(el) {
    var kind = el.getAttribute("data-kind"), id = el.getAttribute("data-id");
    var s = catStore(kind), cats = s.getCats();
    for (var i = 0; i < cats.length; i++) { if (cats[i].id === id) { cats[i].name = el.value; break; } }
    s.setCats(cats);
  }
  function lockCategoryName(el) {
    if (!el.value.trim()) return;       // need a name before it locks into a header
    saveCategoryName(el);
    editingCatId = null;
    refresh();
  }
  function renameCategory(id) {
    editingCatId = id;
    refresh('.pf-cat[data-catid="' + id + '"] .pf-cat-name');
  }
  function closeDropdowns() { document.querySelectorAll(".pf-cat-dropdown").forEach(function (d) { d.hidden = true; }); }
  function toggleAddDropdown(kind) {
    var dd = $("dropdown-" + kind); if (!dd) return;
    var willOpen = dd.hidden;
    closeDropdowns();
    if (!willOpen) return;
    var btn = document.querySelector('[data-act="add-item-menu"][data-kind="' + kind + '"]');
    dd.hidden = false; // show first so we can measure it
    if (btn) {
      var r = btn.getBoundingClientRect();
      dd.style.left = Math.round(r.left) + "px";
      dd.style.top = Math.round(r.bottom + 4) + "px";
      var ddr = dd.getBoundingClientRect();
      if (ddr.bottom > window.innerHeight - 8) dd.style.top = Math.round(r.top - ddr.height - 4) + "px"; // flip above
      if (ddr.right > window.innerWidth - 8) dd.style.left = Math.round(window.innerWidth - ddr.width - 8) + "px";
    }
  }
  function addItemMenu(kind) {
    if (!catStore(kind).getCats().length) { addItemToCategory(kind, null); return; }
    toggleAddDropdown(kind);
  }
  function addItemToCategory(kind, catId) {
    var s = catStore(kind), items = s.getItems();
    var id = s.itemPrefix + Date.now() + "-" + Math.floor(Math.random() * 1000);
    items.push(kind === "contacts"
      ? { id: id, cat: catId, name: "", phone: "", email: "", location: "" }
      : { id: id, cat: catId, label: "", value: "" });
    s.setItems(items);
    if (catId) Store.setOn("collapsed", catId, false); // make sure the target category is expanded
    closeDropdowns();
    if (kind === "contacts") editingContactId = id;
    var sel = kind === "contacts"
      ? '.pf-contact[data-pcid="' + id + '"] .pf-contact-name'
      : '.pf-custom-row[data-pfid="' + id + '"] .pf-custom-label';
    refresh(sel);
  }
  function openDeleteCatModal(kind, catId) {
    var s = catStore(kind);
    var cat = s.getCats().filter(function (c) { return c.id === catId; })[0];
    if (!cat) return;
    var inCat = s.getItems().filter(function (it) { return it.cat === catId; });
    var others = s.getCats().filter(function (c) { return c.id !== catId && c.name; });
    var noun = kind === "contacts" ? "contact" : "field";
    var name = cat.name || "this category";
    var body = '<div class="modal-title">Delete &ldquo;' + Render.esc(name) + "&rdquo;?</div>";
    if (!inCat.length) {
      body += '<p class="muted">This category is empty.</p>'
        + '<div class="modal-actions"><button class="btn" data-act="modal-cancel">Cancel</button>'
        + '<button class="btn btn-danger" data-act="cat-del-go" data-kind="' + kind + '" data-id="' + catId + '" data-mode="empty">Delete category</button></div>';
    } else {
      var sel = '<select class="pf-input modal-select" id="cat-move-target">'
        + others.map(function (c) { return '<option value="' + c.id + '">' + Render.esc(c.name) + "</option>"; }).join("")
        + '<option value="__uncat">Uncategorized</option></select>';
      body += "<p>This category holds <strong>" + inCat.length + "</strong> " + noun + (inCat.length > 1 ? "s" : "") + ". What should happen to them?</p>"
        + '<div class="modal-opts">'
          + '<label class="modal-opt"><input type="radio" name="catdel" value="move" checked /> <span>Move them to:</span> ' + sel + "</label>"
          + '<label class="modal-opt"><input type="radio" name="catdel" value="delete" /> <span>Delete the category <strong>and</strong> all its ' + noun + "s</span></label>"
        + "</div>"
        + '<div class="modal-actions"><button class="btn" data-act="modal-cancel">Cancel</button>'
        + '<button class="btn btn-danger" data-act="cat-del-go" data-kind="' + kind + '" data-id="' + catId + '">Confirm</button></div>';
    }
    showModal(body);
  }
  function confirmDeleteCat(btn) {
    var kind = btn.getAttribute("data-kind"), catId = btn.getAttribute("data-id"), mode = btn.getAttribute("data-mode");
    var s = catStore(kind);
    if (mode !== "empty") {
      var radios = document.getElementsByName("catdel"), choice = "delete";
      for (var i = 0; i < radios.length; i++) { if (radios[i].checked) { choice = radios[i].value; break; } }
      var items = s.getItems();
      if (choice === "delete") {
        items = items.filter(function (it) { return it.cat !== catId; });
      } else {
        var t = (document.getElementById("cat-move-target") || {}).value || "__uncat";
        var moveTo = t === "__uncat" ? null : t;
        items.forEach(function (it) { if (it.cat === catId) it.cat = moveTo; });
      }
      s.setItems(items);
    }
    s.setCats(s.getCats().filter(function (c) { return c.id !== catId; }));
    closeModal();
    refresh();
    toast("Category deleted");
  }
  function showModal(inner) {
    closeModal();
    var ov = document.createElement("div");
    ov.className = "modal-overlay"; ov.id = "appModal";
    ov.innerHTML = '<div class="modal" role="dialog" aria-modal="true">' + inner + "</div>";
    document.body.appendChild(ov);
  }
  function closeModal() { var m = $("appModal"); if (m) m.remove(); }

  /* ---------------- password protection (see js/auth.js) ---------------- */
  function authToggle(on) {
    if (!window.Auth) return;
    Auth.setEnabled(on).then(function () { refresh(); toast(on ? "Password protection is on" : "Password protection is off"); });
  }
  function authChange() {
    if (!window.Auth) return;
    var cur = ($("authCurrent") || {}).value || "";
    var nw = ($("authNew") || {}).value || "";
    if (!nw.trim()) { toast("Enter a new password"); return; }
    Auth.verify(cur).then(function (ok) {
      if (!ok) { toast("Current password is incorrect"); return; }
      Auth.changePassword(nw).then(function () {
        if ($("authCurrent")) $("authCurrent").value = "";
        if ($("authNew")) $("authNew").value = "";
        toast("Password changed on this device ✓");
      });
    });
  }
  function authLock() {
    if (!window.Auth) return;
    Auth.lock();
    toast("Locked");
    location.reload();
  }

  function copyFromSelector(btn) {
    var sel = btn.getAttribute("data-copy-sel");
    var node = sel ? document.querySelector(sel) : null;
    var text = "";
    if (node) {
      var dc = node.getAttribute("data-copy");
      if (dc !== null) text = dc;
      else if (node.tagName === "INPUT") text = node.value;
      else text = node.textContent;
    }
    text = (text || "").trim();
    if (!text) { toast("Nothing to copy yet"); return; }
    copyText(text);
  }
  function copyText(text) {
    function fallback() {
      try {
        var ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        document.execCommand("copy"); ta.remove(); toast("Copied ✓");
      } catch (e) { toast("Couldn't copy — select it and copy manually."); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast("Copied ✓"); }, fallback);
    } else fallback();
  }

  /* ---------------- settings ---------------- */
  function themeOptions() {
    var cur = Store.getTheme();
    return (window.THEMES || []).map(function (t) {
      var sw = "background:linear-gradient(135deg," + t.swatch[0] + " 0 50%," + t.swatch[1] + " 50% 100%)";
      return '<div class="theme-opt' + (t.id === cur ? " active" : "") + '" data-act="theme" data-theme="' + t.id + '" role="button" tabindex="0">'
        + '<span class="theme-swatch" style="' + sw + '"></span><span class="theme-name">' + t.name + "</span>"
        + (t.id === cur ? '<span class="theme-check">✓</span>' : "")
      + "</div>";
    }).join("");
  }
  function renderSettings() {
    var moveIn = Store.getPref("moveIn", DEFAULT_MOVEIN);
    var ov = Render.overallProgress();
    var checkedCount = ov.done;

    return '<div class="page">'
      + '<header class="page-head"><div class="page-eyebrow">Getting Started</div>'
      + '<h1 class="page-title"><span class="pt-ico">⚙️</span>Settings</h1>'
      + '<p class="page-sub">Personalize the app and manage your saved data. Everything lives in this browser only.</p></header>'

      + '<section class="panel"><div class="panel-head"><div class="ph-title">🎨 Appearance</div></div>'
      + '<div class="panel-body"><p class="muted" style="margin-bottom:10px">Pick a theme — your choice is remembered.</p>'
      + '<div class="theme-list" id="themeGrid" style="max-width:520px">' + themeOptions() + "</div></div></section>"

      + '<section class="panel"><div class="panel-head"><div class="ph-title">🗓️ Move-in date</div></div>'
      + '<div class="panel-body"><div class="setting-row"><div><div class="sr-label">Your move-in day</div>'
      + '<div class="sr-desc">Drives the countdown on the dashboard. Confirm the real date with MSU Residence Life.</div></div>'
      + '<div class="sr-control"><input type="date" data-act="movein" value="' + moveIn + '" /></div></div></div></section>'

      + '<section class="panel"><div class="panel-head"><div class="ph-title">🔒 Privacy &amp; access</div></div>'
      + '<div class="panel-body">'
      + '<div class="setting-row"><div><div class="sr-label">Password protection</div>'
      + '<div class="sr-desc">Require a password to open the site — meant for when it\'s hosted on GitHub Pages.</div></div>'
      + '<div class="sr-control"><label class="claim-toggle"><input type="checkbox" data-act="auth-toggle"' + ((window.Auth && Auth.isEnabled()) ? " checked" : "") + ' /> ' + ((window.Auth && Auth.isEnabled()) ? "On" : "Off") + '</label></div></div>'
      + '<div class="setting-row"><div><div class="sr-label">Change password</div><div class="sr-desc">Enter your current password, then a new one. Updates this device.</div></div>'
      + '<div class="sr-control auth-change-fields"><input type="password" id="authCurrent" placeholder="Current" autocomplete="off" /><input type="password" id="authNew" placeholder="New" autocomplete="off" /><button class="btn btn-sm" data-act="auth-change">Change</button></div></div>'
      + '<div class="setting-row"><div><div class="sr-label">Lock now</div><div class="sr-desc">Require the password again on the next visit.</div></div>'
      + '<div class="sr-control"><button class="btn btn-sm" data-act="auth-lock">🔒 Lock</button></div></div>'
      + Render.callout("warn", "How secure is this, really?", "This is a client-side gate for a static site — it keeps casual visitors out, but a technical person can bypass it, and a <strong>public</strong> GitHub repo exposes the source either way. The shared password that ships with your deployed site is <code>DEFAULT_PW</code> in <code>js/auth.js</code> (currently <strong>admin</strong>) — change it there before you push to set what you hand out. Changing it here only affects this device. For real privacy, use a private repo plus a host with real authentication.")
      + "</div></section>"

      + '<section class="panel"><div class="panel-head"><div class="ph-title">💾 Your data</div></div>'
      + '<div class="panel-body">'
      + '<div class="setting-row"><div><div class="sr-label">Back up</div><div class="sr-desc">Download everything (checkmarks, notes, custom items, claimed tools) as a file.</div></div>'
      + '<div class="sr-control"><button class="btn btn-primary" data-act="export">⬇️ Export backup</button></div></div>'
      + '<div class="setting-row"><div><div class="sr-label">Restore</div><div class="sr-desc">Load a backup file you exported earlier (replaces current data).</div></div>'
      + '<div class="sr-control"><button class="btn" data-act="import-trigger">⬆️ Import backup</button>'
      + '<input type="file" id="importFile" accept="application/json,.json" data-act="import-file" hidden /></div></div>'
      + '<div class="setting-row"><div><div class="sr-label">Reset progress</div><div class="sr-desc">Uncheck every box and clear stars & claimed tools. Keeps your notes and custom items.</div></div>'
      + '<div class="sr-control"><button class="btn btn-danger" data-act="reset-progress">Reset progress</button></div></div>'
      + '<div class="setting-row"><div><div class="sr-label">Reset everything</div><div class="sr-desc">Wipe all saved data and start fresh.</div></div>'
      + '<div class="sr-control"><button class="btn btn-danger" data-act="reset-all">Erase all data</button></div></div>'
      + "</div></section>"

      + '<section class="panel"><div class="panel-head"><div class="ph-title">ℹ️ About</div></div>'
      + '<div class="panel-body prose"><p><strong>Bobcat Launchpad</strong> — a personal prep hub built for Jonathan: incoming Montana State Computer Engineering (Fall 2026), Langford Hall, Room Lng 205-B. Built from your research files and tailored to your hall and goals.</p>'
      + "<p class=\"muted\">You've checked off <strong>" + checkedCount + "</strong> tracked items so far (" + ov.pct + "% overall). Storage is " + (Store.available ? "working ✓" : "<span style=\"color:var(--c-essential)\">blocked ✗</span>") + ". Data is stored only in this browser on this device — export a backup before clearing your browser data or switching computers.</p>"
      + "</div></section>"
    + "</div>";
  }

  /* ---------------- theme ---------------- */
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    Store.setTheme(t);
  }
  function fillThemePopover() {
    themePop.innerHTML = '<div class="popover-title">Appearance</div><div class="theme-list">' + themeOptions() + "</div>";
  }
  function toggleThemePop() {
    if (themePop.hidden) { fillThemePopover(); themePop.hidden = false; }
    else themePop.hidden = true;
  }
  function setTheme(t) {
    applyTheme(t);
    fillThemePopover();
    var grid = $("themeGrid");
    if (grid) grid.innerHTML = themeOptions();
    var name = (window.THEMES.filter(function (x) { return x.id === t; })[0] || {}).name || t;
    toast("Theme: " + name);
    themePop.hidden = true;
  }

  /* ---------------- custom items / filters ---------------- */
  function addCustom(listId) {
    var input = document.querySelector('[data-add-input="' + cssEsc(listId) + '"]');
    if (!input) return;
    var text = input.value.trim();
    if (!text) { input.focus(); return; }
    var id = "custom-" + listId + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    Store.addCustom(listId, { id: id, text: text });
    Search.build();
    refresh('[data-add-input="' + cssEsc(listId) + '"]');
    toast("Added to your list ✓");
  }
  function delCustom(listId, id) {
    Store.removeCustom(listId, id);
    Store.setOn("checked", id, false);
    Store.setOn("starred", id, false);
    Search.build();
    refresh();
    toast("Removed");
  }
  function toggleFilter(listId, label) {
    var key = "filter_" + listId;
    var cur = Store.getPref(key, {}) || {};
    if (cur[label]) delete cur[label]; else cur[label] = 1;
    Store.setPref(key, cur);
    refresh();
  }
  function toggleHide(listId) {
    var key = "hide_" + listId;
    Store.setPref(key, !Store.getPref(key, false));
    refresh();
  }
  function toggleCollapse(el) {
    var id = el.getAttribute("data-id");
    var collapsed = Store.toggle("collapsed", id);
    el.classList.toggle("collapsed", collapsed);
    el.setAttribute("aria-expanded", String(!collapsed));
  }
  function toggleStar(id, btn) {
    var now = Store.toggle("starred", id);
    btn.classList.toggle("starred", now);
    btn.textContent = now ? "★" : "☆";
    var row = document.querySelector('[data-item="' + cssEsc(id) + '"]');
    if (row) row.classList.toggle("starred", now);
  }
  function updateClaimUI() {
    document.querySelectorAll(".tool-card").forEach(function (card) {
      var box = card.querySelector('input[data-act="claim"]');
      if (box) card.classList.toggle("claimed", box.checked);
    });
    var label = document.querySelector('[id^="claimcount-"]');
    if (label) {
      var boxes = document.querySelectorAll('input[data-act="claim"]');
      var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
      label.textContent = n + " / " + boxes.length + " claimed";
    }
  }
  function updateTrackUI() {
    document.querySelectorAll(".cert-card").forEach(function (card) {
      var box = card.querySelector('input[data-act="track"]');
      if (box) card.classList.toggle("targeting", box.checked);
    });
    var label = document.querySelector('[id^="trackcount-"]');
    if (label) {
      var boxes = document.querySelectorAll('input[data-act="track"]');
      var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
      label.textContent = n + " / " + boxes.length + " targeting";
    }
  }

  /* ---------------- data management ---------------- */
  function exportData() {
    try {
      var json = JSON.stringify(Store.exportAll(), null, 2);
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = "bobcat-launchpad-backup.json";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast("Backup downloaded ✓");
    } catch (e) { toast("Couldn't create the backup."); }
  }
  function triggerImport() { var f = $("importFile"); if (f) f.click(); }
  function handleImportFile(file) {
    if (!file) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        Store.importAll(JSON.parse(r.result));
        applyTheme(Store.getTheme());
        Search.build();
        mount(currentRoute(), true);
        toast("Backup restored ✓");
      } catch (e) { toast("That file isn't a valid backup."); }
    };
    r.onerror = function () { toast("Couldn't read that file."); };
    r.readAsText(file);
  }
  function resetProgress() {
    if (!window.confirm("Uncheck every box and clear stars & claimed tools?\nYour notes and custom items will be kept.")) return;
    Store.resetProgress(); mount(currentRoute(), false); toast("Progress reset");
  }
  function resetAll() {
    if (!window.confirm("Erase ALL saved data — checkmarks, notes, custom items, theme?\nThis cannot be undone.")) return;
    Store.resetEverything(); applyTheme("light"); location.hash = "#/dashboard"; mount("dashboard", true); toast("Everything reset");
  }

  /* ---------------- events ---------------- */
  function wireEvents() {
    /* clicks */
    document.addEventListener("click", function (ev) {
      if (ev.target.closest(".nav-link")) closeMenu();
      var el = ev.target.closest("[data-act]");
      if (el) {
        var act = el.getAttribute("data-act");
        if (act === "star") { ev.preventDefault(); toggleStar(el.getAttribute("data-id"), el); }
        else if (act === "collapse") toggleCollapse(el);
        else if (act === "filter") toggleFilter(el.getAttribute("data-list"), el.getAttribute("data-label"));
        else if (act === "hide-completed") toggleHide(el.getAttribute("data-list"));
        else if (act === "add-custom") addCustom(el.getAttribute("data-list"));
        else if (act === "del-custom") delCustom(el.getAttribute("data-list"), el.getAttribute("data-id"));
        else if (act === "theme") setTheme(el.getAttribute("data-theme"));
        else if (act === "export") exportData();
        else if (act === "import-trigger") triggerImport();
        else if (act === "reset-progress") resetProgress();
        else if (act === "reset-all") resetAll();
        else if (act === "copy") copyFromSelector(el);
        else if (act === "add-pfield") addProfileField();
        else if (act === "del-pfield") delProfileField(el.getAttribute("data-id"));
        else if (act === "add-plink") addProfileLink();
        else if (act === "del-plink") delProfileLink(el.getAttribute("data-id"));
        else if (act === "edit-plink") editProfileLink(el.getAttribute("data-id"));
        else if (act === "add-pcontact") addProfileContact();
        else if (act === "del-pcontact") delProfileContact(el.getAttribute("data-id"));
        else if (act === "edit-pcontact") editProfileContact(el.getAttribute("data-id"));
        else if (act === "add-cat") addCategory(el.getAttribute("data-kind"));
        else if (act === "cat-rename") renameCategory(el.getAttribute("data-id"));
        else if (act === "cat-del") openDeleteCatModal(el.getAttribute("data-kind"), el.getAttribute("data-id"));
        else if (act === "cat-del-go") confirmDeleteCat(el);
        else if (act === "add-item-menu") addItemMenu(el.getAttribute("data-kind"));
        else if (act === "add-item-to") addItemToCategory(el.getAttribute("data-kind"), el.getAttribute("data-cat"));
        else if (act === "modal-cancel") closeModal();
        else if (act === "auth-change") authChange();
        else if (act === "auth-lock") authLock();
      }
      /* close theme popover on outside click */
      if (!themePop.hidden && !themePop.contains(ev.target) && ev.target !== themeBtn) themePop.hidden = true;
      /* close category dropdowns when clicking outside the add area */
      if (!ev.target.closest(".pf-add-wrap")) closeDropdowns();
      /* close the modal when clicking its backdrop */
      if (ev.target.id === "appModal") closeModal();
    });

    /* changes (checkboxes, claim, date, file) */
    document.addEventListener("change", function (ev) {
      var el = ev.target.closest("[data-act]");
      if (!el) return;
      var act = el.getAttribute("data-act");
      if (act === "check") {
        Store.setOn("checked", el.getAttribute("data-id"), el.checked);
        Render.refreshItemRow(el.getAttribute("data-id"));
        Render.updateProgress();
      } else if (act === "claim") {
        Store.setOn("claimed", el.getAttribute("data-id"), el.checked);
        updateClaimUI();
      } else if (act === "track") {
        Store.setOn("targeting", el.getAttribute("data-id"), el.checked);
        updateTrackUI();
      } else if (act === "movein") {
        Store.setPref("moveIn", el.value || DEFAULT_MOVEIN);
        updateCountdown();
        if (currentRoute() === "profile") refresh();
      } else if (act === "import-file") {
        handleImportFile(el.files && el.files[0]);
        el.value = "";
      } else if (act === "auth-toggle") {
        authToggle(el.checked);
      }
    });

    /* text inputs (debounced): checklist notes, profile fields, custom fields */
    document.addEventListener("input", function (ev) {
      var el = ev.target.closest("[data-act]");
      if (!el) return;
      var act = el.getAttribute("data-act");
      if (act === "note") {
        var id = el.getAttribute("data-id");
        clearTimeout(noteTimers[id]);
        noteTimers[id] = setTimeout(function () {
          Store.setNote(id, el.value);
          var s = document.querySelector('[data-saved="' + cssEsc(id) + '"]');
          if (s) { s.textContent = "Saved ✓"; setTimeout(function () { if (s) s.textContent = ""; }, 1500); }
        }, 400);
      } else if (act === "profile") {
        saveProfileField(el);
      } else if (act === "pfcustom") {
        saveProfileCustom(el);
      } else if (act === "pflink") {
        saveProfileLink(el);
      } else if (act === "pcontact") {
        saveProfileContact(el);
      } else if (act === "pcatname") {
        saveCategoryName(el);
      }
      if (el.hasAttribute("data-autogrow")) autoGrow(el);
    });

    /* keyboard: add-item Enter, activate role=button, "/" focuses search */
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        var addInput = ev.target.closest("[data-add-input]");
        if (addInput) { ev.preventDefault(); addCustom(addInput.getAttribute("data-add-input")); return; }
        var linkLabel = ev.target.closest('[data-act="pflink"][data-field="label"]');
        if (linkLabel) { ev.preventDefault(); lockProfileLink(linkLabel); return; }
        var contactName = ev.target.closest('[data-act="pcontact"][data-field="name"]');
        if (contactName) { ev.preventDefault(); lockProfileContact(contactName); return; }
        var catName = ev.target.closest('[data-act="pcatname"]');
        if (catName) { ev.preventDefault(); lockCategoryName(catName); return; }
      }
      if (ev.key === "Enter" || ev.key === " ") {
        var btn = ev.target.closest('[data-act][role="button"]');
        if (btn) { ev.preventDefault(); btn.click(); return; }
      }
      if (ev.key === "/" && !isTyping(ev.target)) { ev.preventDefault(); searchInput.focus(); }
      if (ev.key === "Escape") { closeMenu(); closeModal(); closeDropdowns(); }
    });

    /* header theme button */
    themeBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleThemePop(); });

    /* sidebar toggle: off-canvas on mobile, collapse on desktop */
    menuBtn.addEventListener("click", toggleSidebar);
    scrim.addEventListener("click", closeMenu);

    /* leaving mobile width: drop the off-canvas overlay state */
    window.addEventListener("resize", function () { if (!isMobile()) closeMenu(); closeDropdowns(); });
    /* a fixed-position dropdown shouldn't float free while the page scrolls */
    window.addEventListener("scroll", function () { closeDropdowns(); });
  }

  function toggleSidebar() {
    if (isMobile()) {
      if (document.body.classList.contains("nav-open")) closeMenu(); else openMenu();
    } else {
      var collapsed = !document.body.classList.contains("sidebar-collapsed");
      document.body.classList.toggle("sidebar-collapsed", collapsed);
      Store.setPref("sidebarCollapsed", collapsed);
    }
  }

  function openMenu() { document.body.classList.add("nav-open"); scrim.hidden = false; }
  function closeMenu() { document.body.classList.remove("nav-open"); scrim.hidden = true; }

  /* ---------------- toast ---------------- */
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    void toastEl.offsetWidth;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
      setTimeout(function () { toastEl.hidden = true; }, 260);
    }, 2300);
  }

  /* ---------------- go ---------------- */
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.App = { navigateTo: navigateTo, toast: toast };
})();
