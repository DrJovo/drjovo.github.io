/* ============================================================
   auth.js — optional client-side password gate.

   ⚠️ HONEST SECURITY NOTE
   This is a *deterrent* for a static site, NOT real security.
   Anyone technical can bypass a client-side gate (the HTML/JS and
   all page content are downloaded to the browser, and a public
   GitHub repo exposes the source directly). Use this only to keep
   casual visitors out of the live URL. For real access control use
   a private repo + a host with real auth (Cloudflare Access,
   Netlify password protection, etc.).

   Best practices applied within those limits:
   - The password is never stored in plaintext — only a salted
     PBKDF2-SHA256 hash (150k iterations) is kept, in localStorage.
   - Verification re-derives the hash and compares in constant time.

   The DEFAULT password is "admin". To set the password that ships
   with your deployed site (the one you hand to allowed people),
   change DEFAULT_PW below before you push, OR change it per-device
   in Settings → Privacy & access.
   ============================================================ */
(function () {
  "use strict";

  var DEFAULT_PW = "admin";        // shared default password for a fresh browser
  var DEFAULT_ENABLED = true;      // protection is ON by default (so the deployed site is gated)
  var ITER = 150000;
  var AUTH_KEY = "bl_auth";
  var UNLOCK_KEY = "bl_unlocked";

  function readCfg() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; } catch (e) { return null; } }
  function writeCfg(c) { try { localStorage.setItem(AUTH_KEY, JSON.stringify(c)); return true; } catch (e) { return false; } }

  function hasCrypto() { return !!(window.crypto && window.crypto.subtle && window.crypto.getRandomValues); }

  function b64(bytes) { var s = ""; var a = new Uint8Array(bytes); for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }
  function unb64(str) { var s = atob(str), a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i); return a; }
  function randSalt() { var a = new Uint8Array(16); window.crypto.getRandomValues(a); return a; }

  /* weak fallback only if Web Crypto is unavailable (very old browsers) */
  function weakHash(str) { var h = 5381; for (var i = 0; i < str.length; i++) { h = (((h << 5) + h) + str.charCodeAt(i)) | 0; } return "w" + (h >>> 0).toString(16); }

  function derive(password, saltBytes, iter) {
    var enc = new TextEncoder();
    return window.crypto.subtle.importKey("raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveBits"])
      .then(function (km) {
        return window.crypto.subtle.deriveBits({ name: "PBKDF2", salt: saltBytes, iterations: iter, hash: "SHA-256" }, km, 256);
      })
      .then(function (bits) { return b64(bits); });
  }

  function makeCred(password, enabled) {
    if (hasCrypto()) {
      var salt = randSalt();
      return derive(password, salt, ITER).then(function (hash) {
        return { enabled: enabled, algo: "pbkdf2", salt: b64(salt), iter: ITER, hash: hash };
      });
    }
    return Promise.resolve({ enabled: enabled, algo: "weak", hash: weakHash(password) });
  }

  function constEq(a, b) {
    if (a.length !== b.length) return false;
    var r = 0; for (var i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return r === 0;
  }

  function ensureSeed() {
    if (readCfg()) return Promise.resolve();
    return makeCred(DEFAULT_PW, DEFAULT_ENABLED).then(writeCfg);
  }

  function isEnabled() { var c = readCfg(); return c ? !!c.enabled : DEFAULT_ENABLED; }
  function isUnlocked() { try { return sessionStorage.getItem(UNLOCK_KEY) === "1" || localStorage.getItem(UNLOCK_KEY) === "1"; } catch (e) { return false; } }
  function setUnlocked(remember) { try { if (remember) localStorage.setItem(UNLOCK_KEY, "1"); else sessionStorage.setItem(UNLOCK_KEY, "1"); } catch (e) {} }
  function lock() { try { sessionStorage.removeItem(UNLOCK_KEY); localStorage.removeItem(UNLOCK_KEY); } catch (e) {} }

  function verify(password) {
    var c = readCfg();
    if (!c) return Promise.resolve(password === DEFAULT_PW);
    if (c.algo === "weak") return Promise.resolve(weakHash(password) === c.hash);
    return derive(password, unb64(c.salt), c.iter || ITER).then(function (h) { return constEq(h, c.hash); });
  }

  function setEnabled(on) {
    var c = readCfg();
    if (c) { c.enabled = !!on; writeCfg(c); return Promise.resolve(); }
    return makeCred(DEFAULT_PW, !!on).then(writeCfg);
  }

  function changePassword(newPw) {
    return makeCred(newPw, isEnabled()).then(writeCfg);
  }

  /* ---------------- the gate UI ---------------- */
  function showGate(onUnlock) {
    var gate = document.createElement("div");
    gate.className = "auth-gate";
    gate.id = "authGate";
    gate.innerHTML =
      '<div class="auth-card">'
      + '<div class="auth-logo">🔒</div>'
      + '<h1>Bobcat Launchpad</h1>'
      + '<p>This site is private. Enter the password to continue.</p>'
      + '<form id="authForm" autocomplete="off">'
      + '<input type="password" id="authPw" placeholder="Password" autocomplete="current-password" />'
      + '<div class="auth-error" id="authError" hidden>Incorrect password — try again.</div>'
      + '<label class="auth-remember"><input type="checkbox" id="authRemember" checked /> Keep me unlocked on this device</label>'
      + '<button type="submit" class="btn btn-primary">Unlock</button>'
      + '</form>'
      + '</div>';
    document.body.appendChild(gate);
    var pw = gate.querySelector("#authPw");
    var err = gate.querySelector("#authError");
    var card = gate.querySelector(".auth-card");
    setTimeout(function () { pw.focus(); }, 30);

    gate.querySelector("#authForm").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var val = pw.value;
      verify(val).then(function (ok) {
        if (ok) {
          setUnlocked(gate.querySelector("#authRemember").checked);
          gate.remove();
          if (typeof onUnlock === "function") onUnlock();
        } else {
          err.hidden = false;
          pw.value = ""; pw.focus();
          card.classList.remove("auth-shake"); void card.offsetWidth; card.classList.add("auth-shake");
        }
      });
    });
  }

  window.Auth = {
    ensureSeed: ensureSeed,
    isEnabled: isEnabled,
    isUnlocked: isUnlocked,
    lock: lock,
    setEnabled: setEnabled,
    changePassword: changePassword,
    verify: verify,
    showGate: showGate
  };
})();
