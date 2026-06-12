# Jonathan Kleven — Portfolio

A single-page portfolio for showcasing certifications, networking lab reports,
projects, and contact info. Plain HTML/CSS/JS — no build step, no framework —
designed to run for free on **GitHub Pages**.

Live structure:

```
├── index.html              ← the whole site
├── css/style.css           ← all styling
├── js/main.js              ← nav, scroll effects
├── js/reports.js           ← the lab report library (see below)
├── reports/                ← ★ drop lab report PDFs here ★
├── assets/
│   ├── favicon.svg
│   └── resume/Jonathan_Kleven_Resume.pdf
└── .nojekyll
```

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

Done. The site asks GitHub for the contents of `reports/` and builds a card for
every PDF it finds, turning the filename into a clean title automatically:

```
Kleven__Jonathan_-_Multi_Area_OSPF.pdf   →   "Multi Area OSPF"
```

> Tip: name files with underscores instead of spaces, and the
> `Kleven__Jonathan_-_` prefix is stripped from titles automatically.

### Optional: nicer titles, descriptions, and tags

Open `js/reports.js` and add an entry to `REPORT_META`, keyed by the exact
filename:

```js
"Kleven__Jonathan_-_Multi_Area_OSPF.pdf": {
  title: "Multi-Area OSPF Design",
  course: "Cisco Networking Academy · Year 2",
  pages: 22,
  tags: ["OSPF", "IPv4/IPv6", "Cisco IOS"],
  description: "One or two sentences about what the lab covers."
},
```

Reports **without** a `REPORT_META` entry still appear — they just use the
auto-generated title and a generic description.

### Local preview note

When you open `index.html` straight from your computer (not on GitHub Pages),
the GitHub API isn't used; the library shows the files listed in `REPORT_META`.
On the live site, every PDF in `reports/` appears whether or not it has a
metadata entry.

---

## ✏️ Other easy edits

| What                | Where                                                  |
| ------------------- | ------------------------------------------------------ |
| Resume PDF          | Replace `assets/resume/Jonathan_Kleven_Resume.pdf`     |
| Wording / sections  | `index.html` (each section is clearly commented)       |
| Colors & fonts      | The `:root` block at the top of `css/style.css`        |
| Traceroute hops     | The `.terminal` block in `index.html`                  |

---

Built by hand, like the labs. 🤠
