/* ============================================================
   icons.js — a small, consistent line-icon set (SVG).
   Replaces emoji used as UI chrome so the interface reads as
   hand-built rather than decorated with system emoji.
   Stroke-based, inherit color via currentColor. Exposed as
   window.Icons.ic(name, size) and available to render.js + app.js.
   ============================================================ */
(function () {
  "use strict";

  // 24×24 viewBox path data (Feather-ish). Keep strokes simple and even.
  var P = {
    home:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.2V21h14V9.2"/><path d="M9.5 21v-6h5v6"/>',
    user:      '<circle cx="12" cy="8" r="3.6"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>',
    bed:       '<path d="M2.5 19V7"/><path d="M2.5 12h14a4 4 0 0 1 4 4v3"/><path d="M2.5 19h19"/><path d="M6.5 12v-2h3.5v2"/>',
    pencil:    '<path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16v4z"/><path d="M14.5 5.5 18.5 9.5"/>',
    laptop:    '<rect x="4" y="5" width="16" height="11" rx="1.6"/><path d="M2 20h20"/>',
    shirt:     '<path d="M8.5 3.5 4.5 6l1.8 3 1.7-1v9.5h8V8l1.7 1 1.8-3-4-2.5-2 2h-2.5z"/>',
    cap:       '<path d="M2.5 8.5 12 4.5l9.5 4-9.5 4z"/><path d="M6.5 10.7V15c0 1.4 11 1.4 11 0v-4.3"/><path d="M21.5 8.7v4.6"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3.5h6v1"/><path d="M9 13l2 2 4-4.2"/>',
    calendar:  '<rect x="4" y="5" width="16" height="15.5" rx="2"/><path d="M4 9.5h16"/><path d="M8.5 3v4M15.5 3v4"/>',
    tag:       '<path d="M3.5 12.2V4.5H11L20.5 14 14 20.5 4.5 11z"/><circle cx="7.6" cy="8.1" r="1.2"/>',
    wallet:    '<rect x="3" y="6" width="18" height="13" rx="2.2"/><path d="M3 10.5h18"/><path d="M16.5 14.5h1.8"/>',
    link:      '<path d="M9.2 14.8 14.8 9.2"/><path d="M10.8 6.6 12.4 5a3.6 3.6 0 0 1 5 5l-1.6 1.6"/><path d="M13.2 17.4 11.6 19a3.6 3.6 0 0 1-5-5l1.6-1.6"/>',
    leaf:      '<path d="M4.5 19.5C4.5 10 12 4.5 20 4.5c0 8-5.8 15-15.5 15z"/><path d="M5 19c3.5-7 7.5-9.5 11-11.5"/>',
    search:    '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.2-4.2"/>',
    sliders:   '<path d="M4 7h11M18.5 7H20"/><path d="M4 12h4M11.5 12H20"/><path d="M4 17h9M16.5 17H20"/><circle cx="16.5" cy="7" r="1.8"/><circle cx="9.5" cy="12" r="1.8"/><circle cx="14.5" cy="17" r="1.8"/>',
    theme:     '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/>',
    spark:     '<path d="M12 2.5 14.4 9.6 21.5 12l-7.1 2.4L12 21.5l-2.4-7.1L2.5 12l7.1-2.4z"/>',
    plus:      '<path d="M12 5v14M5 12h14"/>',
    trash:     '<path d="M4 6.5h16"/><path d="M9 6.5V4.5h6v2"/><path d="M6.5 6.5 7.5 20h9l1-13.5"/>',
    external:  '<path d="M14 4.5h5.5V10"/><path d="M19.5 4.5 11 13"/><path d="M18 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5"/>',
    lock:      '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    alert:     '<path d="M12 4.5 21 20H3z"/><path d="M12 10v4.2"/><path d="M12 17.2h.01"/>',
    check:     '<path d="M5 12.5 9.5 17 19 7"/>',
    contacts:  '<rect x="4" y="4.5" width="16" height="15" rx="2"/><circle cx="12" cy="11" r="2.4"/><path d="M8.5 16.5a3.6 3.6 0 0 1 7 0"/><path d="M4 9h1.6M4 15h1.6"/>',
    note:      '<path d="M6 3.5h9L19.5 8v12.5H6z"/><path d="M14.5 3.5V8H19"/><path d="M9 12.5h6M9 16h4"/>',
    award:     '<circle cx="12" cy="9" r="5.2"/><path d="M8.5 13 7 20.5l5-2.7 5 2.7-1.5-7.5"/>',
    ruler:     '<path d="M4 8.5 8.5 4l11.5 11.5L15.5 20z"/><path d="M9 7.5l1.8 1.8M11.5 10l1.8 1.8M14 12.5l1.8 1.8"/>',
    rocket:    '<path d="M12 3c3 1.4 5 4.6 5 8.5l-2.3 2.3H9.3L7 11.5C7 7.6 9 4.4 12 3z"/><circle cx="12" cy="9.5" r="1.5"/><path d="M9.3 13.8 6.5 15c-.4 1.2-.5 3-.5 3s1.8-.1 3-.5l1-2.2M14.7 13.8 17.5 15c.4 1.2.5 3 .5 3s-1.8-.1-3-.5l-1-2.2"/>'
  };

  function ic(name, size) {
    var s = size || 18;
    var body = P[name] || "";
    return '<svg class="ic" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" '
      + 'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + body + "</svg>";
  }

  window.Icons = { ic: ic, has: function (n) { return !!P[n]; } };
})();
