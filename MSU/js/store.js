/* ============================================================
   store.js — persistence layer (localStorage, namespaced)
   Works on file:// — no fetch, no modules.
   All state is cached in memory and written through on change.
   ============================================================ */
(function () {
  "use strict";

  var PREFIX = "bl_";          // Bobcat Launchpad
  var VERSION = 1;
  var SLICES = ["theme", "checked", "starred", "notes", "custom", "collapsed", "claimed", "favorites", "prefs", "profile"];

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(PREFIX + key);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); return true; }
    catch (e) { if (window.console) console.warn("Bobcat Launchpad: could not save", key, e); return false; }
  }

  var caches = {};
  function map(name) {
    if (!caches[name]) caches[name] = read(name, {}) || {};
    return caches[name];
  }
  function saveMap(name) { write(name, caches[name]); }

  var available = (function () {
    try { localStorage.setItem(PREFIX + "_t", "1"); localStorage.removeItem(PREFIX + "_t"); return true; }
    catch (e) { return false; }
  })();

  var Store = {
    available: available,

    /* ---- theme ---- */
    getTheme: function () { return read("theme", "light"); },
    setTheme: function (t) { write("theme", t); },

    /* ---- generic boolean maps (checked / starred / claimed / collapsed / favorites) ---- */
    isOn: function (name, id) { return !!map(name)[id]; },
    setOn: function (name, id, on) {
      var m = map(name);
      if (on) m[id] = 1; else delete m[id];
      saveMap(name);
    },
    toggle: function (name, id) {
      var m = map(name);
      var now = !m[id];
      if (now) m[id] = 1; else delete m[id];
      saveMap(name);
      return now;
    },
    countOn: function (name, ids) {
      var m = map(name), n = 0;
      for (var i = 0; i < ids.length; i++) if (m[ids[i]]) n++;
      return n;
    },

    /* ---- checked convenience ---- */
    isChecked: function (id) { return !!map("checked")[id]; },

    /* ---- notes ---- */
    getNote: function (id) { return map("notes")[id] || ""; },
    setNote: function (id, text) {
      var m = map("notes");
      if (text && text.trim()) m[id] = text; else delete m[id];
      saveMap("notes");
    },

    /* ---- custom checklist items ---- */
    getCustom: function (listId) { return (map("custom")[listId] || []).slice(); },
    addCustom: function (listId, item) {
      var m = map("custom");
      if (!m[listId]) m[listId] = [];
      m[listId].push(item);
      saveMap("custom");
    },
    removeCustom: function (listId, itemId) {
      var m = map("custom");
      if (!m[listId]) return;
      m[listId] = m[listId].filter(function (it) { return it.id !== itemId; });
      saveMap("custom");
    },

    /* ---- prefs (move-in date, filters, etc.) ---- */
    getPref: function (k, d) { var p = read("prefs", {}) || {}; return (k in p) ? p[k] : d; },
    setPref: function (k, v) { var p = read("prefs", {}) || {}; p[k] = v; write("prefs", p); },

    /* ---- profile (personal info) ---- */
    getProfile: function (k, d) { var p = map("profile"); return (k in p) ? p[k] : d; },
    setProfile: function (k, v) { var m = map("profile"); m[k] = v; saveMap("profile"); },
    getProfileCustom: function () { return (map("profile").__custom || []).slice(); },
    setProfileCustom: function (arr) { var m = map("profile"); m.__custom = arr; saveMap("profile"); },
    getProfileLinks: function () { return (map("profile").__links || []).slice(); },
    setProfileLinks: function (arr) { var m = map("profile"); m.__links = arr; saveMap("profile"); },
    getProfileContacts: function () { return (map("profile").__contacts || []).slice(); },
    setProfileContacts: function (arr) { var m = map("profile"); m.__contacts = arr; saveMap("profile"); },
    getProfileContactCats: function () { return (map("profile").__contactCats || []).slice(); },
    setProfileContactCats: function (arr) { var m = map("profile"); m.__contactCats = arr; saveMap("profile"); },
    getProfileCustomCats: function () { return (map("profile").__customCats || []).slice(); },
    setProfileCustomCats: function (arr) { var m = map("profile"); m.__customCats = arr; saveMap("profile"); },

    /* ---- backup / restore ---- */
    exportAll: function () {
      var out = { app: "Bobcat Launchpad", version: VERSION, exportedAt: new Date().toISOString(), data: {} };
      SLICES.forEach(function (k) { var v = read(k, null); if (v !== null) out.data[k] = v; });
      return out;
    },
    importAll: function (obj) {
      if (!obj || typeof obj !== "object" || !obj.data) throw new Error("This doesn't look like a Bobcat Launchpad backup.");
      SLICES.forEach(function (k) { if (obj.data[k] !== undefined && obj.data[k] !== null) write(k, obj.data[k]); });
      caches = {};
    },
    resetProgress: function () {
      ["checked", "starred", "claimed"].forEach(function (k) { try { localStorage.removeItem(PREFIX + k); } catch (e) {} });
      caches = {};
    },
    resetEverything: function () {
      SLICES.forEach(function (k) { try { localStorage.removeItem(PREFIX + k); } catch (e) {} });
      caches = {};
    }
  };

  window.Store = Store;
})();
