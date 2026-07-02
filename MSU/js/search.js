/* ============================================================
   search.js — builds a flat search index across all pages and
   drives the header search dropdown (mouse + keyboard).
   ============================================================ */
(function () {
  "use strict";

  var index = [];
  var built = false;

  function add(entry) { index.push(entry); }

  function build() {
    index = [];
    Object.keys(window.PAGES).forEach(function (pid) {
      var page = window.PAGES[pid];
      add({ page: pid, pageTitle: page.title, icon: page.icon, anchor: null, title: page.title, sub: page.subtitle || "" });
      (page.sections || []).forEach(function (s) {
        if (s.type === "checklist") {
          (s.groups || []).forEach(function (g) {
            g.items.forEach(function (it) {
              add({ page: pid, pageTitle: page.title, icon: page.icon, anchor: "anchor-" + it.id,
                title: Render.stripHTML(it.text), sub: Render.stripHTML(it.note || "") + " · " + g.name });
            });
          });
        } else if (s.type === "prose") {
          if (s.title) add({ page: pid, pageTitle: page.title, icon: page.icon, anchor: "sec-" + s.id, title: s.title, sub: "" });
          (s.blocks || []).forEach(function (b) {
            if (b.k === "subhead") add({ page: pid, pageTitle: page.title, icon: page.icon, anchor: "sec-" + s.id, title: b.text, sub: s.title || "" });
            else if (b.k === "ul" || b.k === "ol") b.items.forEach(function (li) {
              add({ page: pid, pageTitle: page.title, icon: page.icon, anchor: "sec-" + s.id, title: Render.stripHTML(li), sub: s.title || "" });
            });
            else if (b.k === "p") add({ page: pid, pageTitle: page.title, icon: page.icon, anchor: "sec-" + s.id, title: Render.stripHTML(b.html), sub: s.title || "" });
          });
        } else if (s.type === "resources") {
          (s.groups || []).forEach(function (g) {
            g.items.forEach(function (it) {
              add({ page: pid, pageTitle: page.title, icon: "🔗", anchor: "sec-" + s.id, title: it.name, sub: it.desc || g.name });
            });
          });
        } else if (s.type === "discounts") {
          s.items.forEach(function (it) {
            add({ page: pid, pageTitle: page.title, icon: "🎁", anchor: "anchor-" + it.id, title: it.name, sub: it.what || "" });
          });
        } else if (s.type === "certs") {
          (s.groups || []).forEach(function (g) {
            g.items.forEach(function (it) {
              add({ page: pid, pageTitle: page.title, icon: "📜", anchor: "anchor-" + it.id, title: it.name, sub: it.why || it.validates || "" });
            });
          });
        }
      });
    });
    built = true;
  }

  function query(q) {
    if (!built) build();
    q = q.trim().toLowerCase();
    if (!q) return [];
    var tokens = q.split(/\s+/);
    var out = [];
    for (var i = 0; i < index.length; i++) {
      var e = index[i];
      var hay = (e.title + " " + e.sub + " " + e.pageTitle).toLowerCase();
      var ok = true;
      for (var t = 0; t < tokens.length; t++) { if (hay.indexOf(tokens[t]) === -1) { ok = false; break; } }
      if (!ok) continue;
      var tl = e.title.toLowerCase();
      var score = tl === q ? 0 : tl.indexOf(q) === 0 ? 1 : tl.indexOf(q) !== -1 ? 2 : 3;
      out.push({ e: e, score: score });
    }
    out.sort(function (a, b) { return a.score - b.score || a.e.title.length - b.e.title.length; });
    return out.slice(0, 12).map(function (o) { return o.e; });
  }

  function highlight(text, q) {
    var esc = Render.esc(text);
    if (!q) return esc;
    var idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return esc;
    // re-escape around the match using the original text slices
    var a = Render.esc(text.slice(0, idx));
    var m = Render.esc(text.slice(idx, idx + q.length));
    var b = Render.esc(text.slice(idx + q.length));
    return a + "<mark>" + m + "</mark>" + b;
  }

  function init(input, results, onPick) {
    var active = -1;
    var current = [];

    function close() { results.hidden = true; results.innerHTML = ""; active = -1; }
    function open() {
      var q = input.value;
      current = query(q);
      if (!q.trim()) { close(); return; }
      if (!current.length) {
        results.innerHTML = '<div class="search-empty">No matches for &ldquo;' + Render.esc(q) + "&rdquo;</div>";
        results.hidden = false; active = -1; return;
      }
      results.innerHTML = current.map(function (e, i) {
        return '<a class="search-result" data-i="' + i + '">'
          + '<span class="sr-ico">' + (e.icon || "•") + "</span>"
          + '<span class="sr-main"><span class="sr-title">' + highlight(e.title, q.trim()) + "</span>"
          + '<span class="sr-page">' + Render.esc(e.pageTitle) + (e.sub ? " · " + Render.esc(e.sub.slice(0, 60)) : "") + "</span></span>"
        + "</a>";
      }).join("") + '<div class="search-hint">Up to 12 results · ↑↓ to navigate · ↵ to open · esc to close</div>';
      results.hidden = false;
      active = -1;
    }

    function pick(i) {
      var e = current[i];
      if (!e) return;
      close(); input.blur();
      onPick(e.page, e.anchor);
    }
    function setActive(n) {
      var nodes = results.querySelectorAll(".search-result");
      if (!nodes.length) return;
      if (n < 0) n = nodes.length - 1;
      if (n >= nodes.length) n = 0;
      active = n;
      nodes.forEach(function (el, i) { el.classList.toggle("active", i === active); });
      nodes[active].scrollIntoView({ block: "nearest" });
    }

    input.addEventListener("input", open);
    input.addEventListener("focus", function () { if (input.value.trim()) open(); });
    input.addEventListener("keydown", function (ev) {
      if (results.hidden) { if (ev.key === "ArrowDown") open(); return; }
      if (ev.key === "ArrowDown") { ev.preventDefault(); setActive(active + 1); }
      else if (ev.key === "ArrowUp") { ev.preventDefault(); setActive(active - 1); }
      else if (ev.key === "Enter") { ev.preventDefault(); pick(active < 0 ? 0 : active); }
      else if (ev.key === "Escape") { close(); input.blur(); }
    });
    results.addEventListener("mousedown", function (ev) {
      var r = ev.target.closest(".search-result");
      if (r) { ev.preventDefault(); pick(parseInt(r.getAttribute("data-i"), 10)); }
    });
    document.addEventListener("click", function (ev) {
      if (!results.hidden && !results.contains(ev.target) && ev.target !== input) close();
    });

    return { close: close };
  }

  window.Search = { build: build, query: query, init: init };
})();
