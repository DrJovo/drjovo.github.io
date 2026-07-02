/* School Supplies & Productivity */
window.PAGES.supplies = {
  id: "supplies",
  title: "School Supplies",
  icon: "✏️",
  subtitle: "The everyday academic kit. Engineering means a lot of handwritten problem-solving, so paper still matters — but don't over-buy before you know each course's rules.",
  sections: [
    {
      type: "checklist",
      id: "supplies-list",
      title: "Supplies checklist",
      icon: "✅",
      allowAdd: true,
      groups: [
        { id: "sup-g-core", name: "Core academic kit", items: [
          { id: "sup-laptop", label: "essential", text: "A reliable laptop", note: "Your primary tool — full specs and CompE-specific advice live on the Tech & CompE Gear page." },
          { id: "sup-backpack", label: "essential", text: "Good backpack (laptop compartment, weatherproof-ish)", note: "You'll carry a laptop + textbooks across a snowy campus every day. Worth spending on." },
          { id: "sup-notebooks", label: "essential", text: "Refillable notebooks + pens/pencils", note: "Engineering = lots of handwritten problem-solving. Graph or dot-grid notebooks are great for circuits and diagrams." },
          { id: "sup-calc", label: "essential", warn: true, text: "Scientific calculator", note: "Check each course's allowed calculator BEFORE buying a $120 graphing one. Many engineering exams allow only a basic scientific model (e.g., TI-30XS) — and some allow none. Don't overbuy." }
        ]},
        { id: "sup-g-study", name: "Study aids", items: [
          { id: "sup-whiteboard", label: "recommended", text: "Small whiteboard + markers", note: "Underrated for working problems and studying with classmates." },
          { id: "sup-stationery", label: "recommended", text: "Stapler, tape, sticky notes, highlighters", note: "The little desk supplies you'll reach for constantly." },
          { id: "sup-folders", label: "optional", text: "Folders / a binder per class", note: "Many people go fully digital — do what matches your brain." },
          { id: "sup-planner", label: "optional", text: "Paper planner", note: "Only if you'll actually use it; otherwise your phone calendar wins." }
        ]},
        { id: "sup-g-digital", name: "Digital organization", items: [
          { id: "sup-calendar", label: "recommended", text: "Set up one calendar app", note: "Google Calendar or Outlook (your MSU email includes Outlook). Put every class and deadline in one place." },
          { id: "sup-todo", label: "recommended", text: "Pick one to-do / task app", note: "Todoist or Trello, etc. One system you'll stick with beats three you won't." },
          { id: "sup-notes", label: "recommended", text: "Pick one note-taking app", note: "Notion, OneNote, or Obsidian — see Online Resources for the trade-offs." }
        ]}
      ]
    }
  ]
};
