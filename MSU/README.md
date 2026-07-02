# 🎓 Bobcat Launchpad

A personal, offline-friendly prep hub for an incoming **Montana State University · Computer Engineering · Fall 2026** freshman. It turns two research documents (dorm checklists, academic prep, MSU onboarding, timelines, discounts, resources, and life skills) into one clean, trackable website.

Everything you check off, star, claim, or note is **saved automatically in your browser** so it's still there next time you open it.

---

## 🚀 How to open it

**Easiest:** double-click **`index.html`** — it runs straight from your computer, no internet or install required.

> Your progress is saved per-browser via `localStorage`. If you open the file in a different browser (or use a private window), it starts fresh. Use **Settings → Export backup** to move your data between browsers/computers.

**Optional (local server),** if your browser is strict about local files:

```bash
# from this folder
python -m http.server 8000
# then visit http://localhost:8000
```

---

## ✨ Features

- **Persistent checklists** — tick items and they stay ticked. Per-list progress bars + an overall completion ring on the dashboard.
- **7 themes** — Light, Dark, Midnight, Bobcat (MSU blue & gold), Forest, Sepia, and a High-Contrast mode. Click 🎨 in the header.
- **Global search** (`/`) — jump to any item, resource, tool, or section instantly.
- **Filters & focus** — filter any checklist by Essential / Recommended / Optional / Skip, hide completed items, and collapse sections.
- **Make it yours** — add your own custom checklist items, star priorities, and jot notes on every list.
- **Track your tools** — mark each student discount/free tool as "claimed."
- **Countdown** — set your move-in date and watch the days tick down.
- **Backup & restore** — export all your data to a file and import it later (Settings).

---

## 🗂️ What's inside (the pages)

| Section | Page | What it holds |
|---|---|---|
| Getting Started | **Dashboard** | Countdown, overall progress, top priorities, key portals, label legend |
| Shopping & Packing | **Dorm Essentials** | Residence-hall buying checklist + the "don't over-buy" rule |
| | **School Supplies** | Everyday academic kit |
| | **Tech & CompE Gear** | Laptop spec, accessories, lab-kit cautions, software to set up |
| | **Clothing & Weather** | The Bozeman-winter survival list |
| Preparation | **Academic Prep** | Math/physics/programming review + study habits + a summer checklist |
| | **MSU Onboarding** | Deadlines, portals, the engineering department, campus resources |
| | **Timeline & Plan** | A phase-by-phase action plan from now through your first month |
| Resources & Life | **Student Discounts** | .edu free tools & discounts, with claim tracking |
| | **Online Resources** | A curated link library grouped by job |
| | **Life Skills** | Laundry, meals, sleep, time management, health, and more |

---

## 🔒 Password protection (for GitHub Pages)

The site can require a password before it opens — handy when hosting it publicly (e.g., `drjovo.github.io/MSU`). It's **on by default** with the password **`admin`**. Manage it in **Settings → Privacy & access** (turn on/off, change the password, or "Lock now").

**Set the shared password before you deploy:** open `js/auth.js` and change the `DEFAULT_PW` constant (currently `"admin"`) to whatever you'll hand out, then push. That's the password every visitor's browser uses by default. (Changing it inside Settings only affects the device you're on.)

> **Honest heads-up:** this is a *client-side deterrent*, not real security. A technical visitor can bypass a static-site gate, and a **public** GitHub repo exposes the source regardless. The password is stored only as a salted PBKDF2-SHA256 hash (never plaintext). For genuine privacy, use a **private** repo plus a host with real authentication (Cloudflare Access, Netlify password protection, etc.).

## ⚠️ A note on dates & links

The research that built this couldn't browse live MSU pages, so anything marked **⚠️** (specific dates, exact URLs, the current LMS, your advisor's name) should be **confirmed on official Montana State pages** — `montana.edu`, `montana.edu/reslife`, `catalog.montana.edu`, `coe.montana.edu` — before you rely on it.

---

## 🛠️ Tech notes

Pure HTML/CSS/JavaScript — **no build step, no dependencies, no framework**. It uses classic scripts (not ES modules) and no `fetch`, so it works directly from the `file://` protocol. Content lives in plain data files under `js/data/`, so adding or editing items is straightforward.

```
index.html
css/   variables.css (themes) · base.css · layout.css · components.css
js/    store.js · render.js · search.js · app.js
js/data/  config.js + one file per content area
```
