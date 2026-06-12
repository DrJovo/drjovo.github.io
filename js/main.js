/* Navigation, scroll reveal, and small touches. */

(function () {
  /* ---- Mobile menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the menu after choosing a destination.
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Reveal on scroll (skipped if reduced motion is preferred) ---- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });

    // Also reveal cards injected later (the report library).
    const grid = document.getElementById("report-grid");
    if (grid) {
      new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          m.addedNodes.forEach(function (node) {
            if (node.nodeType === 1 && node.classList.contains("reveal")) {
              io.observe(node);
            }
          });
        });
      }).observe(grid, { childList: true });
    }
  }

  /* ---- Active nav link while scrolling ---- */
  const sections = document.querySelectorAll("main section[id], footer[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    const byHash = {};
    navAnchors.forEach(function (a) { byHash[a.getAttribute("href")] = a; });

    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        const link = byHash["#" + entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) { a.classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Footer year ---- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
