# Jonathan Kleven — Portfolio

A single-page portfolio for showcasing certifications, networking lab reports,
projects, and contact info. Plain HTML/CSS/JS — no build step, no framework —
designed to run for free on **GitHub Pages**.

This repository hosts **more than one site**. The portfolio lives at the repo
root (so it's served at `drjovo.github.io`), and each additional standalone site
gets its **own top-level folder** (served at `drjovo.github.io/<folder>/`).

Live structure:

```
├── index.html              ← the portfolio (the whole site)  → drjovo.github.io
├── css/style.css           ← portfolio styling
├── js/main.js              ← nav, scroll effects
├── js/reports.js           ← the lab report library (see below)
├── js/projects.js          ← project entries with repo links (see below)
├── reports/                ← ★ drop lab report PDFs here ★
├── assets/
│   ├── favicon.svg
│   └── resume/Jonathan_Kleven_Resume.pdf
│
├── MSU/                     ← separate site: "Bobcat Launchpad" → drjovo.github.io/MSU/
│   ├── index.html          ←   self-contained (its own css/ and js/)
│   ├── css/                ←   unlisted — no link from the portfolio, and
│   └── js/                 ←   noindex'd, so it's only reachable by typing the URL
│
├── .gitignore
└── .nojekyll
```

> **Adding another site later:** create a new top-level folder (e.g. `blog/`)
> with its own `index.html` and assets, using **relative** paths so it works
> under a subpath. It'll be live at `drjovo.github.io/<folder>/`. Keep each
> site's files inside its own folder — don't mix them with the portfolio's
> root-level `css/`, `js/`, or `assets/`.

---

## 🚀 Deploying to GitHub Pages (one-time setup)

**Option A — User site (recommended): `https://drjovo.github.io`**

1. Create a repository named exactly **`DrJovo.github.io`** (your username + `.github.io`).
2. Upload everything in this folder to the **root** of that repository
   (drag-and-drop works on github.com → *Add file → Upload files*).
3. Go to **Settings → Pages** and make sure *Source* is set to
   **Deploy from a branch → `main` → `/ (root)`**.
4. Wait ~1 minute. The site is live at `https://drjovo.github.io`.

**Option B — Project site: `https://drjovo.github.io/portfolio`**

Same steps, but the repo can have any name (e.g., `portfolio`). The site works
either way — the report library auto-detects which kind of repo it's in.

---

## 📄 Adding a new lab report (the whole point)

1. **Drop the PDF into the `reports/` folder.**
2. Commit + push (or upload through the GitHub website).

Done. The site asks GitHub for the contents of `reports/`, builds a card for
every PDF it finds, and turns the filename into a clean title automatically:

```
Kleven__Jonathan_-_Multi_Area_OSPF.pdf   →   "Multi Area OSPF"
```

> Tip: name files with underscores instead of spaces, and the
> `Kleven__Jonathan_-_` prefix is stripped from titles automatically.

### Entries: titles, descriptions, tags, order, and repo links

`js/reports.js` has a `REPORT_META` block — one entry per report, keyed by
filename:

```js
"Kleven__Jonathan_-_Multi_Area_OSPF.pdf": {
  order: 2,                     // position in the grid (1 = first)
  title: "Routing with Multi-Area OSPF",
  course: "Cisco Networking Academy",
  tags: ["OSPF", "IPv4/IPv6", "Cisco IOS"],
  repo: "https://github.com/DrJovo/repo-name",  // shows a "Repository" button
  description: "One or two sentences about what the lab covers."
},
```

- All seven labs already have entries with summaries and an `order` set.
- **`repo` is empty on each entry** — paste a GitHub repository URL into any
  of them and a "Repository" button appears on that card.
- Entries are matched to files by filename, with fuzzy matching as a backup —
  small naming differences (extra words, different separators) still match.
  If a card ever shows a generic title, rename the entry's key to the exact
  filename of the PDF you uploaded.
- Reports **without** an entry still appear — auto-generated title, generic
  description, and sorted after the ordered ones.

### Local preview note

When you open `index.html` straight from your computer (not on GitHub Pages),
the GitHub API isn't available; the library shows the files listed in
`FALLBACK_FILES`. On the live site, every PDF in `reports/` appears.

---

## 🛠 Adding a project

Projects live in `js/projects.js` — same idea as the reports. Copy the
template at the bottom of the `PROJECTS` list, fill it in, and push:

```js
{
  title: "Project Name",
  description: "What it does and what's interesting about how it's built.",
  tags: ["Python", "Flask"],
  repo: "https://github.com/DrJovo/repo-name",  // "View repository" button
  link: ""                                      // optional live/demo URL
},
```

Cards appear in the order they're listed. The seeded "Portfolio Website"
entry points at `DrJovo/DrJovo.github.io` — update it if your repo is named
differently.

---

## ✏️ Other easy edits

| What                | Where                                                  |
| ------------------- | ------------------------------------------------------ |
| Resume PDF          | Replace `assets/resume/Jonathan_Kleven_Resume.pdf`     |
| Wording / sections  | `index.html` (each section is clearly commented)       |
| Colors & fonts      | The `:root` block at the top of `css/style.css`        |
| Lab report entries  | `REPORT_META` in `js/reports.js`                       |
| Project entries     | `PROJECTS` in `js/projects.js`                         |

---

A custom portfolio site. 🏔️
