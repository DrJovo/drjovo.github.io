/* ============================================================
   render.js — builds HTML for every page/section type and
   keeps progress indicators in sync. Pure rendering + helpers;
   event handling lives in app.js (delegated).
   ============================================================ */
(function () {
  "use strict";

  var LABEL_ORDER = ["essential", "recommended", "optional", "skip"];
  var CALLOUT_ICON = { warn: "⚠️", tip: "💡", info: "ℹ️", rule: "📌" };

  /* sections of the page currently on screen — used for live progress updates */
  var currentSections = [];

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function stripHTML(s) { return String(s == null ? "" : s).replace(/<[^>]*>/g, ""); }
  function host(url) {
    try { return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]; }
    catch (e) { return url; }
  }
  function badge(labelKey) {
    var L = window.LABELS[labelKey];
    if (!L) return "";
    return '<span class="badge ' + L.cls + '"><span class="dot"></span>' + L.name + "</span>";
  }
  function pct(done, total) { return total ? Math.round((done / total) * 100) : 0; }

  /* gather every checklist item id on a page (data + custom) */
  function sectionItemIds(section) {
    var ids = [];
    (section.groups || []).forEach(function (g) {
      g.items.forEach(function (it) { ids.push(it.id); });
    });
    Store.getCustom(section.id).forEach(function (it) { ids.push(it.id); });
    return ids;
  }
  function pageItemIds(pageId) {
    var page = window.PAGES[pageId];
    var ids = [];
    if (!page) return ids;
    (page.sections || []).forEach(function (s) {
      if (s.type === "checklist") ids = ids.concat(sectionItemIds(s));
    });
    return ids;
  }
  function pageProgress(pageId) {
    var ids = pageItemIds(pageId);
    var done = Store.countOn("checked", ids);
    return { done: done, total: ids.length, pct: pct(done, ids.length) };
  }
  function overallProgress() {
    var ids = [];
    (window.TRACKED_PAGES || []).forEach(function (p) { ids = ids.concat(pageItemIds(p)); });
    var done = Store.countOn("checked", ids);
    return { done: done, total: ids.length, pct: pct(done, ids.length) };
  }

  /* ---------------- checklist ---------------- */
  function checkItem(item, listId, isCustom) {
    var checked = Store.isChecked(item.id);
    var starred = Store.isOn("starred", item.id);
    var text = isCustom ? esc(item.text) : item.text;
    var cls = "check-item" + (checked ? " done" : "") + (starred ? " starred" : "");
    return '<div class="' + cls + '" id="anchor-' + esc(item.id) + '" data-item="' + esc(item.id) + '">'
      + '<input type="checkbox" class="check-box" data-act="check" data-id="' + esc(item.id) + '"'
        + (checked ? " checked" : "") + ' aria-label="' + esc(stripHTML(item.text)) + '" />'
      + '<div class="item-main">'
        + '<div class="item-top">'
          + '<span class="item-text">' + text + "</span>"
          + (!isCustom && item.label ? badge(item.label) : "")
          + (item.warn ? '<span class="warn-flag" title="Time-sensitive or MSU-specific — verify on official pages">⚠️</span>' : "")
          + (isCustom ? '<span class="tag-custom">added</span>' : "")
        + "</div>"
        + (item.note ? '<div class="item-note">' + item.note + "</div>" : "")
      + "</div>"
      + '<div class="item-actions">'
        + '<button class="icon-btn star-btn' + (starred ? " starred" : "") + '" data-act="star" data-id="' + esc(item.id) + '" title="Mark as a priority" aria-label="Mark as a priority">' + (starred ? "★" : "☆") + "</button>"
        + (isCustom ? '<button class="icon-btn" data-act="del-custom" data-list="' + esc(listId) + '" data-id="' + esc(item.id) + '" title="Delete this item" aria-label="Delete item">🗑️</button>' : "")
      + "</div>"
    + "</div>";
  }

  function checklist(section) {
    var listId = section.id;
    var disabled = Store.getPref("filter_" + listId, {}) || {};
    var hideDone = !!Store.getPref("hide_" + listId, false);

    var ids = sectionItemIds(section);
    var done = Store.countOn("checked", ids);
    var total = ids.length;
    var p = pct(done, total);

    var groupMeta = [];
    var groupsHTML = "";

    function passes(it, isCustom) {
      if (hideDone && Store.isChecked(it.id)) return false;
      if (!isCustom && it.label && disabled[it.label]) return false;
      return true;
    }

    (section.groups || []).forEach(function (g) {
      var gids = g.items.map(function (it) { return it.id; });
      var gdone = Store.countOn("checked", gids);
      groupMeta.push({ groupId: g.id, ids: gids });
      var visible = g.items.filter(function (it) { return passes(it, false); });
      if (!visible.length) return;
      var isCollapsed = Store.isOn("collapsed", g.id);
      groupsHTML += '<div class="checklist-group">'
        + '<div class="group-head' + (isCollapsed ? " collapsed" : "") + '" data-act="collapse" data-id="' + esc(g.id) + '" role="button" tabindex="0" aria-expanded="' + (!isCollapsed) + '">'
          + '<span class="gh-caret">▾</span>'
          + '<span class="gh-title">' + esc(g.name) + "</span>"
          + '<span class="gh-count" id="gcount-' + esc(g.id) + '">' + gdone + "/" + gids.length + "</span>"
        + "</div>"
        + '<div class="group-items">' + visible.map(function (it) { return checkItem(it, listId, false); }).join("") + "</div>"
      + "</div>";
    });

    /* custom items group */
    var customs = Store.getCustom(listId).filter(function (it) { return passes(it, true); });
    if (customs.length) {
      groupsHTML += '<div class="checklist-group">'
        + '<div class="group-head" data-act="collapse" data-id="' + esc(listId) + '-custom" role="button" tabindex="0">'
          + '<span class="gh-caret">▾</span><span class="gh-title">➕ Your additions</span>'
        + "</div>"
        + '<div class="group-items">' + customs.map(function (it) { return checkItem(it, listId, true); }).join("") + "</div>"
      + "</div>";
    }

    currentSections.push({ sectionId: listId, ids: ids, groups: groupMeta });

    var chips = LABEL_ORDER.map(function (k) {
      var off = disabled[k] ? " off" : "";
      return '<button class="chip c-' + k + off + '" data-act="filter" data-list="' + esc(listId) + '" data-label="' + k + '">'
        + '<span class="dot"></span>' + window.LABELS[k].name + "</button>";
    }).join("");

    var tools = '<div class="section-tools">'
      + '<div class="filter-chips">' + chips + "</div>"
      + '<button class="chip" data-act="hide-completed" data-list="' + esc(listId) + '" style="margin-left:auto">'
        + (hideDone ? "👁️ Show completed" : "🙈 Hide completed") + "</button>"
    + "</div>";

    var addRow = section.allowAdd
      ? '<div class="add-row"><input type="text" placeholder="Add your own item and press Enter…" data-add-input="' + esc(listId) + '" aria-label="Add a custom item" maxlength="160" />'
        + '<button class="btn btn-sm" data-act="add-custom" data-list="' + esc(listId) + '">Add</button></div>'
      : "";

    var noteId = "note_" + listId;
    var noteVal = Store.getNote(noteId);
    var notes = '<div class="notes-box"><label>📝 My notes for this list</label>'
      + '<textarea data-autogrow data-act="note" data-id="' + esc(noteId) + '" placeholder="Jot anything — sizes, prices, links, reminders…">' + esc(noteVal) + "</textarea>"
      + '<div class="notes-saved" data-saved="' + esc(noteId) + '"></div></div>';

    return '<section class="panel" id="sec-' + esc(listId) + '">'
      + '<div class="panel-head">'
        + '<div class="ph-title">' + (section.icon ? section.icon + " " : "") + esc(section.title) + "</div>"
        + '<div class="ph-meta">'
          + '<span class="progress-label" id="proglabel-' + esc(listId) + '">' + done + " / " + total + "</span>"
          + '<div class="progress' + (p === 100 && total ? " complete" : "") + '" style="width:120px" id="progwrap-' + esc(listId) + '"><i id="prog-' + esc(listId) + '" style="width:' + p + '%"></i></div>'
        + "</div>"
      + "</div>"
      + tools
      + (section.intro ? '<div class="panel-intro">' + section.intro + "</div>" : "")
      + '<div class="panel-body" style="padding-top:6px">' + (groupsHTML || '<div class="empty-state"><span class="es-ico">🫧</span>Nothing matches your filters.</div>') + addRow + "</div>"
      + notes
    + "</section>";
  }

  /* ---------------- prose ---------------- */
  function block(b) {
    switch (b.k) {
      case "p": return "<p>" + b.html + "</p>";
      case "subhead": return '<div class="subhead">' + (b.ico ? b.ico + " " : "") + esc(b.text) + "</div>";
      case "ul": return "<ul>" + b.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
      case "ol": return "<ol>" + b.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ol>";
      case "callout": return callout(b.variant, b.title, b.html);
      case "links": return '<div class="link-grid">' + b.items.map(linkCard).join("") + "</div>";
      default: return "";
    }
  }
  function callout(variant, title, html) {
    return '<div class="callout ' + variant + '"><span class="co-ico">' + (CALLOUT_ICON[variant] || "•") + "</span>"
      + '<div class="co-body">' + (title ? '<div class="co-title">' + esc(title) + "</div>" : "") + html + "</div></div>";
  }
  function linkCard(item) {
    return '<a class="link-card" href="' + esc(item.url) + '" target="_blank" rel="noopener">'
      + '<span class="lc-arrow">↗</span>'
      + '<span class="lc-name">' + esc(item.name) + (item.free ? ' <span class="free-tag">FREE</span>' : "") + "</span>"
      + '<span class="lc-host">' + esc(host(item.url)) + "</span>"
      + (item.desc ? '<span class="lc-desc">' + esc(item.desc) + "</span>" : "")
    + "</a>";
  }
  function prose(section) {
    var headHTML = section.hideTitle
      ? ""
      : '<div class="panel-head"><div class="ph-title">' + (section.icon ? section.icon + " " : "") + esc(section.title) + "</div></div>";
    return '<section class="panel" id="sec-' + esc(section.id) + '">'
      + headHTML
      + '<div class="panel-body prose">' + section.blocks.map(block).join("") + "</div>"
    + "</section>";
  }

  /* ---------------- resources ---------------- */
  function resources(section) {
    var body = "";
    section.groups.forEach(function (g) {
      body += '<div class="subhead" style="margin-top:18px">' + esc(g.name) + "</div>";
      if (g.note) body += callout("tip", "", esc(g.note));
      body += '<div class="link-grid">' + g.items.map(linkCard).join("") + "</div>";
    });
    return '<section class="panel" id="sec-' + esc(section.id) + '">'
      + '<div class="panel-head"><div class="ph-title">' + (section.icon ? section.icon + " " : "") + esc(section.title) + "</div></div>"
      + '<div class="panel-body">' + (section.intro ? '<p class="muted" style="margin-bottom:4px">' + esc(section.intro) + "</p>" : "") + body + "</div>"
    + "</section>";
  }

  /* ---------------- discounts ---------------- */
  function toolCard(item) {
    var claimed = Store.isOn("claimed", item.id);
    var stars = "";
    for (var i = 1; i <= 5; i++) stars += i <= item.stars ? "★" : "☆";
    return '<div class="tool-card' + (claimed ? " claimed" : "") + '" id="anchor-' + esc(item.id) + '" data-tool="' + esc(item.id) + '">'
      + '<div class="tc-head"><span class="tc-name">' + esc(item.name) + "</span>"
        + '<span class="tc-stars" title="' + item.stars + " of 5 for a CompE freshman\">" + stars + "</span></div>"
      + '<div class="tc-what">' + esc(item.what) + "</div>"
      + (item.note ? '<div class="tc-note">' + esc(item.note) + "</div>" : "")
      + '<div class="tc-foot">'
        + '<span class="badge neutral">' + esc(item.free) + "</span>"
        + (item.url ? '<a class="btn btn-sm" href="' + esc(item.url) + '" target="_blank" rel="noopener">Open ↗</a>' : "")
        + '<label class="claim-toggle"><input type="checkbox" data-act="claim" data-id="' + esc(item.id) + '"' + (claimed ? " checked" : "") + " /> Claimed</label>"
      + "</div>"
    + "</div>";
  }
  function discounts(section) {
    var ids = section.items.map(function (i) { return i.id; });
    var claimed = Store.countOn("claimed", ids);
    return '<section class="panel" id="sec-' + esc(section.id) + '">'
      + '<div class="panel-head"><div class="ph-title">' + (section.icon ? section.icon + " " : "") + esc(section.title) + "</div>"
        + '<div class="ph-meta"><span class="progress-label" id="claimcount-' + esc(section.id) + '">' + claimed + " / " + ids.length + " claimed</span></div></div>"
      + (section.intro ? '<div class="panel-intro">' + esc(section.intro) + "</div>" : "")
      + '<div class="panel-body"><div class="grid grid-2">' + section.items.map(toolCard).join("") + "</div></div>"
    + "</section>";
  }

  /* ---------------- certifications ---------------- */
  function scoreTier(s) {
    if (s >= 8.5) return "hi";
    if (s >= 7) return "good";
    if (s >= 5) return "mid";
    return "low";
  }
  function certChip(ico, text) { return '<span class="cc-chip">' + ico + " " + esc(text) + "</span>"; }
  function certCard(item) {
    var head, foot, meta = "";
    if (item.earned) {
      head = '<span class="cc-score earned">✓ Earned</span>';
      meta = '<div class="cc-meta">' + certChip("🏢", item.issuer) + "</div>";
      foot = '<div class="cc-foot">'
        + (item.url ? '<a class="btn btn-sm" href="' + esc(item.url) + '" target="_blank" rel="noopener">Details ↗</a>' : "")
        + '<span class="cc-earned-note">' + esc(item.earnedNote || "Completed") + "</span></div>";
    } else {
      var targeting = Store.isOn("targeting", item.id);
      head = '<span class="cc-score tier-' + scoreTier(item.score) + '">' + item.score + "/10</span>";
      var chips = "";
      if (item.issuer) chips += certChip("🏢", item.issuer);
      if (item.cost) chips += certChip("💵", item.cost + " exam");
      if (item.study) chips += certChip("📘", item.study + " study");
      if (item.prep) chips += certChip("⏱️", item.prep);
      meta = '<div class="cc-meta">' + chips + "</div>";
      foot = '<div class="cc-foot">'
        + (item.url ? '<a class="btn btn-sm" href="' + esc(item.url) + '" target="_blank" rel="noopener">Learn more ↗</a>' : "")
        + '<label class="claim-toggle cc-track"><input type="checkbox" data-act="track" data-id="' + esc(item.id) + '"' + (targeting ? " checked" : "") + " /> Targeting</label></div>";
    }
    var cls = "cert-card" + (item.earned ? " earned" : (Store.isOn("targeting", item.id) ? " targeting" : ""));
    return '<div class="' + cls + '" id="anchor-' + esc(item.id) + '" data-cert="' + esc(item.id) + '">'
      + '<div class="cc-head">'
        + (item.rank ? '<span class="cc-rank">#' + item.rank + "</span>" : "")
        + '<span class="cc-name">' + esc(item.name) + "</span>"
        + head
      + "</div>"
      + (item.tag ? '<div class="cc-tag">' + esc(item.tag) + "</div>" : "")
      + meta
      + (item.why || item.validates ? '<div class="cc-why">' + esc(item.why || item.validates) + "</div>" : "")
      + foot
    + "</div>";
  }
  function certs(section) {
    var ids = [];
    section.groups.forEach(function (g) { g.items.forEach(function (it) { if (!it.earned) ids.push(it.id); }); });
    var n = Store.countOn("targeting", ids);
    var body = "";
    section.groups.forEach(function (g) {
      body += '<div class="subhead cert-subhead">' + esc(g.name) + "</div>";
      if (g.note) body += callout("tip", "", esc(g.note));
      body += '<div class="grid grid-2">' + g.items.map(certCard).join("") + "</div>";
    });
    return '<section class="panel" id="sec-' + esc(section.id) + '">'
      + '<div class="panel-head"><div class="ph-title">' + (section.icon ? section.icon + " " : "") + esc(section.title) + "</div>"
        + '<div class="ph-meta"><span class="progress-label" id="trackcount-' + esc(section.id) + '">' + n + " / " + ids.length + " targeting</span></div></div>"
      + (section.intro ? '<div class="panel-intro">' + esc(section.intro) + "</div>" : "")
      + '<div class="panel-body">' + body + "</div>"
    + "</section>";
  }

  /* ---------------- page assembly ---------------- */
  function pageHead(page) {
    return '<header class="page-head">'
      + '<div class="page-eyebrow">' + esc(navGroupFor(page.id)) + "</div>"
      + '<h1 class="page-title"><span class="pt-ico">' + (page.icon || "") + "</span>" + esc(page.title) + "</h1>"
      + (page.subtitle ? '<p class="page-sub">' + esc(page.subtitle) + "</p>" : "")
    + "</header>";
  }
  function navGroupFor(pageId) {
    var g = "";
    (window.NAV || []).forEach(function (grp) {
      grp.items.forEach(function (it) { if (it.id === pageId && grp.group) g = grp.group; });
    });
    return g;
  }

  function renderPage(pageId) {
    currentSections = [];
    var page = window.PAGES[pageId];
    if (!page) return '<div class="empty-state"><span class="es-ico">🤔</span>Page not found.</div>';
    var html = '<div class="page">' + pageHead(page);
    (page.sections || []).forEach(function (s) {
      if (s.type === "checklist") html += checklist(s);
      else if (s.type === "prose") html += prose(s);
      else if (s.type === "resources") html += resources(s);
      else if (s.type === "discounts") html += discounts(s);
      else if (s.type === "certs") html += certs(s);
    });
    html += "</div>";
    return html;
  }

  /* ---------------- live progress updates ---------------- */
  function refreshItemRow(id) {
    var row = document.querySelector('[data-item="' + cssEsc(id) + '"]');
    if (!row) return;
    var checked = Store.isChecked(id);
    row.classList.toggle("done", checked);
    var box = row.querySelector(".check-box");
    if (box) box.checked = checked;
  }
  function cssEsc(s) { return String(s).replace(/"/g, '\\"'); }

  function updateProgress() {
    /* per-section bars + group counts on current page */
    currentSections.forEach(function (sec) {
      var done = Store.countOn("checked", sec.ids);
      var total = sec.ids.length, p = pct(done, total);
      var bar = document.getElementById("prog-" + sec.sectionId);
      var lbl = document.getElementById("proglabel-" + sec.sectionId);
      var wrap = document.getElementById("progwrap-" + sec.sectionId);
      if (bar) bar.style.width = p + "%";
      if (lbl) lbl.textContent = done + " / " + total;
      if (wrap) wrap.classList.toggle("complete", p === 100 && total > 0);
      sec.groups.forEach(function (g) {
        var gc = document.getElementById("gcount-" + g.groupId);
        if (gc) gc.textContent = Store.countOn("checked", g.ids) + "/" + g.ids.length;
      });
    });
    /* nav badges */
    (window.TRACKED_PAGES || []).forEach(function (pid) {
      var pr = pageProgress(pid);
      var b = document.getElementById("nav-badge-" + pid);
      if (b) {
        b.textContent = pr.done + "/" + pr.total;
        var link = b.closest(".nav-link");
        if (link) link.classList.toggle("complete", pr.pct === 100 && pr.total > 0);
      }
    });
    /* sidebar mini + dashboard ring/cards */
    updateOverall();
  }

  function updateOverall() {
    var ov = overallProgress();
    var mini = document.getElementById("miniProgress");
    if (mini) {
      mini.innerHTML = '<div style="display:flex;justify-content:space-between;font-size:.72rem;font-weight:600;color:var(--text-muted);margin-bottom:5px">'
        + "<span>Overall progress</span><span>" + ov.pct + "%</span></div>"
        + '<div class="progress' + (ov.pct === 100 ? " complete" : "") + '"><i style="width:' + ov.pct + '%"></i></div>';
    }
    var ring = document.getElementById("ovRingFill");
    var ringPct = document.getElementById("ovPct");
    if (ring) {
      var C = 2 * Math.PI * 52;
      ring.style.strokeDasharray = C;
      ring.style.strokeDashoffset = C * (1 - ov.pct / 100);
    }
    if (ringPct) ringPct.textContent = ov.pct + "%";
    /* dashboard stat cards */
    (window.TRACKED_PAGES || []).forEach(function (pid) {
      var pr = pageProgress(pid);
      var frac = document.getElementById("statfrac-" + pid);
      var bar = document.getElementById("statbar-" + pid);
      var card = document.getElementById("statcard-" + pid);
      if (frac) frac.textContent = pr.done + " / " + pr.total;
      if (bar) bar.style.width = pr.pct + "%";
      if (card) card.classList.toggle("done", pr.pct === 100 && pr.total > 0);
    });
  }

  /* expose */
  window.Render = {
    renderPage: renderPage,
    updateProgress: updateProgress,
    updateOverall: updateOverall,
    refreshItemRow: refreshItemRow,
    pageProgress: pageProgress,
    overallProgress: overallProgress,
    esc: esc,
    stripHTML: stripHTML,
    badge: badge,
    callout: callout
  };
})();
