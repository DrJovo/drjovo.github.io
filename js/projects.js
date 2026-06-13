/* ==========================================================================
   Projects
   --------------------------------------------------------------------------
   HOW TO ADD A PROJECT:
     Copy one of the entry blocks below, fill it in, and push. Each card
     shows a "View repository" button that opens the GitHub link.

   Fields:
     title        → card heading
     description  → one or two sentences about the project
     tags         → short labels (languages, tools)
     repo         → GitHub repository URL  → "View repository" button
     link         → optional live/demo URL → extra "Live site" button
   Cards appear in the order they're listed here.
   ========================================================================== */

const PROJECTS = [
  {
    title: "Portfolio Website",
    description:
      "This site — hand-built HTML, CSS, and JavaScript on GitHub Pages. The lab " +
      "library and project list are data-driven, and the library discovers new report " +
      "PDFs automatically through the GitHub API.",
    tags: ["HTML/CSS", "JavaScript", "GitHub Pages"],
    repo: "https://github.com/DrJovo/DrJovo.github.io",
    link: ""
  }

  /* Template — copy, un-comment, and fill in:
  ,{
    title: "Project Name",
    description: "What it does and what's interesting about how it's built.",
    tags: ["Python", "Flask"],
    repo: "https://github.com/DrJovo/repo-name",
    link: ""
  }
  */
];

/* ---------------------------------------------------------------------- */

(function () {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  if (!PROJECTS.length) {
    const empty = document.createElement("p");
    empty.className = "report-status";
    empty.textContent = "Projects are on the way — check GitHub in the meantime.";
    grid.appendChild(empty);
    return;
  }

  PROJECTS.forEach(function (project, index) {
    const card = document.createElement("article");
    card.className = "project-card reveal";

    const tagRow = document.createElement("div");
    tagRow.className = "report-tags";
    (project.tags || []).forEach(function (t) {
      const el = document.createElement("span");
      el.className = "tag";
      el.textContent = t;
      tagRow.appendChild(el);
    });

    const h3 = document.createElement("h3");
    h3.textContent = project.title;

    const desc = document.createElement("p");
    desc.textContent = project.description || "";

    const actions = document.createElement("div");
    actions.className = "report-actions";

    if (project.repo) {
      const repo = document.createElement("a");
      repo.className = "btn small";
      repo.href = project.repo;
      repo.target = "_blank";
      repo.rel = "noopener";
      repo.textContent = "View repository";
      actions.appendChild(repo);
    }

    if (project.link) {
      const live = document.createElement("a");
      live.className = "btn small ghost";
      live.href = project.link;
      live.target = "_blank";
      live.rel = "noopener";
      live.textContent = "Live site";
      actions.appendChild(live);
    }

    card.appendChild(tagRow);
    card.appendChild(h3);
    card.appendChild(desc);
    card.appendChild(actions);
    grid.appendChild(card);

    requestAnimationFrame(function () {
      setTimeout(function () { card.classList.add("in"); }, 40 * index);
    });
  });
})();
