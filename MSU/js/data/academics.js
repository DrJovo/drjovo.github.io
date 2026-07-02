/* Academic Prep for Computer Engineering */
window.PAGES.academics = {
  id: "academics",
  title: "Academic Prep",
  icon: "📐",
  subtitle: "You don't need to pre-learn your degree. The goal of summer prep is narrow: be math-ready, and get comfortable with the everyday tools so you're learning concepts in week one — not fighting your terminal.",
  sections: [
    {
      type: "prose",
      id: "acad-overview",
      title: "Why this matters",
      icon: "🎯",
      blocks: [
        { k: "callout", variant: "info",
          html: "Computer Engineering sits between Electrical Engineering and Computer Science, so you'll do <strong>real circuits and physics</strong> <em>and</em> <strong>real programming</strong>. The students who struggle are rarely &ldquo;not smart enough&rdquo; — they study like it's high school. The habits below matter as much as the content." },
        { k: "callout", variant: "tip", title: "You're starting ahead",
          html: "You've already done AP Calculus and both AP Physics C courses, plus real CCNA networking and AWS cloud work — so this summer is less about learning from scratch and more about two things: <strong>making your math placement land as high as it legitimately can</strong> (line up your AP credit and the ALEKS test) and getting your everyday <strong>tools</strong> second-nature. Treat the review sections below as a refresher, not a first pass." }
      ]
    },
    {
      type: "checklist",
      id: "acad-list",
      title: "Summer prep checklist",
      icon: "✅",
      allowAdd: true,
      intro: "A prioritized, trackable version of everything on this page. Math first — it's the highest-leverage thing you can do.",
      groups: [
        { id: "acad-g-prep", name: "This summer", items: [
          { id: "acad-placement", label: "essential", warn: true, text: "Find your math placement (ALEKS PPL) and take it", note: "MSU (last known) uses ALEKS PPL to decide whether you start in precalc, Calc I, etc. Confirm the process and whether you can re-test to place higher — one course higher can save a whole semester." },
          { id: "acad-precalc", label: "essential", text: "Lock down precalc / trig fluency", note: "Functions, the unit circle, trig identities, logs & exponentials, algebra you can do without thinking. Calc is hard only when your algebra is shaky." },
          { id: "acad-calc", label: "recommended", text: "Preview Calculus I", note: "Limits, derivatives, basic integration. Familiarity, not mastery — so lectures feel like review, not first contact." },
          { id: "acad-physics", label: "recommended", text: "Light physics preview (mechanics → E&M concepts)", note: "Kinematics, Newton's laws, energy; then skim charge/current/voltage/fields — you'll see those again in circuits." },
          { id: "acad-coding", label: "recommended", text: "Start coding (CS50x or Python if new; C if you've coded before)", note: "Type the code, break it, fix it. Use Exercism or freeCodeCamp for guided practice. Save LeetCode for later." },
          { id: "acad-terminal", label: "recommended", text: "Get comfortable with the command line", note: "Basic navigation: cd, ls, mkdir, running programs. Non-negotiable for CompE." },
          { id: "acad-git", label: "recommended", text: "Learn Git & GitHub basics", note: "add / commit / push and what a repo is. It's your version control, backup, and portfolio." },
          { id: "acad-vscode", label: "optional", text: "Install VS Code", note: "The free, friendly editor most students use." },
          { id: "acad-linux", label: "optional", text: "Try a little Linux (WSL or a VM)", note: "Even just running Ubuntu via WSL on Windows builds comfort." },
          { id: "acad-latex", label: "optional", text: "Learn LaTeX basics via Overleaf", note: "For clean lab reports and math-heavy assignments — learn once, reuse forever." },
          { id: "acad-anki", label: "optional", text: "Set up Anki for spaced repetition", note: "For the memorization layer (formulas, definitions, syntax) so working memory is free for problem-solving." }
        ]}
      ]
    },
    {
      type: "prose",
      id: "acad-math",
      title: "Math — the highest-leverage thing you can do",
      icon: "➗",
      blocks: [
        { k: "p", html: "CompE is gated by the calculus sequence, and where you start matters a lot. Brush up on algebra, trig, and especially calculus (derivatives, integrals) and linear algebra." },
        { k: "callout", variant: "warn", title: "Find out your math placement first",
          html: "Confirm the current placement process (ALEKS PPL) and whether you can re-test to place higher at <a href=\"https://www.montana.edu\" target=\"_blank\" rel=\"noopener\">montana.edu</a> → admissions / math department. Placing one course higher can save you a semester." },
        { k: "ul", items: [
          "<strong>Lock down precalc/trig:</strong> functions, the unit circle, identities, logs/exponentials, fluent algebra.",
          "<strong>Preview Calculus I:</strong> limits, derivatives, basic integration — familiarity, not mastery.",
          "If you've taken AP Calculus, review limits, derivatives, and integrals to keep them fresh."
        ]},
        { k: "subhead", text: "Best free resources", ico: "📚" },
        { k: "links", items: [
          { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Precalc + Calc 1 with practice and placement-style review.", free: true },
          { name: "Professor Leonard", url: "https://www.youtube.com/@ProfessorLeonard", desc: "Full, rigorous lectures on YouTube.", free: true },
          { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", desc: "Fast, targeted problem walkthroughs.", free: true },
          { name: "3Blue1Brown — Essence of Calculus", url: "https://www.youtube.com/@3blue1brown", desc: "Intuition; watch alongside, not instead of, practice.", free: true },
          { name: "Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu", desc: "Excellent free notes + problems.", free: true },
          { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", desc: "Free real course materials for calculus.", free: true }
        ]}
      ]
    },
    {
      type: "prose",
      id: "acad-physics",
      title: "Physics",
      icon: "🧲",
      blocks: [
        { k: "p", html: "CompE programs require calculus-based physics — mechanics, then E&M (electricity & magnetism is directly relevant to your circuits courses). Don't grind it now, but a light preview helps. College physics assumes a solid intro: F = ma, Ohm's law, circuit basics, and vector math." },
        { k: "ul", items: [
          "<strong>Mechanics first:</strong> kinematics, Newton's laws, energy.",
          "<strong>Skim E&M concepts:</strong> charge, current, voltage, fields.",
          "Reviewing AP Physics 1/2 material, if you took it, is plenty."
        ]},
        { k: "links", items: [
          { name: "Khan Academy — Physics", url: "https://www.khanacademy.org/science/physics", desc: "Structured review with practice.", free: true },
          { name: "MIT OCW 8.01 / 8.02", url: "https://ocw.mit.edu", desc: "Mechanics and E&M, free.", free: true },
          { name: "Flipping Physics", url: "https://www.flippingphysics.com", desc: "Friendly, visual physics lessons.", free: true },
          { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", desc: "Fast problem help for physics too.", free: true }
        ]}
      ]
    },
    {
      type: "prose",
      id: "acad-programming",
      title: "Programming",
      icon: "⌨️",
      blocks: [
        { k: "p", html: "You'll likely start in <strong>Python or C/C++</strong>. C and C++ matter a lot in CompE because of embedded systems and hardware-near programming, but the first course is often gentler. The best summer investment is becoming comfortable thinking like a programmer." },
        { k: "ul", items: [
          "<strong>Never coded?</strong> Do Harvard's CS50x (eases you in via C then Python) or &ldquo;Automate the Boring Stuff with Python.&rdquo; Either is plenty.",
          "<strong>Coded a bit?</strong> Start getting comfortable with <strong>C</strong> specifically — pointers, memory, compilation — because that's what trips up CompE students later.",
          "<strong>Practice, don't just watch:</strong> type the code, break it, fix it. (Save LeetCode for later — it's for interviews, not fundamentals.)"
        ]},
        { k: "links", items: [
          { name: "CS50x (Harvard)", url: "https://cs50.harvard.edu/x", desc: "Free, world-class on-ramp to CS.", free: true },
          { name: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com", desc: "Free, gentle intro to Python.", free: true },
          { name: "learncpp.com", url: "https://www.learncpp.com", desc: "The excellent, free C++ reference for CompE.", free: true },
          { name: "Exercism", url: "https://exercism.org", desc: "Free, mentored coding practice.", free: true },
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free, project-based curriculum.", free: true }
        ]}
      ]
    },
    {
      type: "prose",
      id: "acad-fundamentals",
      title: "CompE fundamentals (optional but motivating)",
      icon: "🔌",
      blocks: [
        { k: "p", html: "None of this is required before classes, but it builds intuition that makes your first two years click — and it's genuinely interesting." },
        { k: "ul", items: [
          "<strong>Binary & number systems:</strong> binary, hex, two's complement. Quick to learn, used constantly.",
          "<strong>Digital logic:</strong> AND/OR/NOT gates, truth tables, how logic builds into adders and memory.",
          "Refresh general computer knowledge — how a computer actually works."
        ]},
        { k: "links", items: [
          { name: "Ben Eater", url: "https://eater.net", desc: "Builds an 8-bit computer on breadboards — the best 'why computers work' intuition. CompE gold.", free: true },
          { name: "Nand to Tetris", url: "https://www.nand2tetris.org", desc: "Build a whole computer from logic gates up. Even doing part of it is illuminating.", free: true },
          { name: "Crash Course Computer Science", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo", desc: "Fast, broad, painless overview of the field.", free: true }
        ]}
      ]
    },
    {
      type: "prose",
      id: "acad-tools",
      title: "Tools to start using now",
      icon: "🛠️",
      blocks: [
        { k: "p", html: "Learning these in August beats learning them mid-crisis in October." },
        { k: "ul", items: [
          "<strong>The command line / terminal</strong> — basic navigation and running programs. Non-negotiable for CompE.",
          "<strong>Git & GitHub</strong> — version control; learn add/commit/push and what a repo is. Sign up with your school email (see Student Discounts).",
          "<strong>VS Code</strong> — a free, friendly editor most students use.",
          "<strong>A little Linux comfort</strong> — even just Ubuntu in a VM or WSL on Windows.",
          "<strong>LaTeX (via Overleaf)</strong> — for clean lab reports and math-heavy assignments."
        ]},
        { k: "links", items: [
          { name: "The Missing Semester (MIT)", url: "https://missing.csail.mit.edu", desc: "The best crash course in terminal, Git, and tooling.", free: true },
          { name: "GitHub", url: "https://github.com", desc: "Sign up with your .edu email for the Student Pack.", free: true },
          { name: "VS Code", url: "https://code.visualstudio.com", desc: "Free, cross-platform code editor.", free: true },
          { name: "Overleaf", url: "https://www.overleaf.com", desc: "Online LaTeX editor — learn the basics once.", free: true }
        ]}
      ]
    },
    {
      type: "prose",
      id: "acad-habits",
      title: "Study habits that separate students who thrive",
      icon: "🧠",
      blocks: [
        { k: "ul", items: [
          "<strong>Do problems, don't reread.</strong> Active recall and practice beat highlighting and re-watching every time. Re-deriving something beats re-reading it.",
          "<strong>Start problem sets the day they're assigned.</strong> Engineering homework hides its difficulty until you're stuck — and you will get stuck. Early start = time to get help.",
          "<strong>Office hours are the cheat code.</strong> They're nearly empty and run by the people who write your exams. Go even when you're &ldquo;fine.&rdquo;",
          "<strong>Form a study group by week 2.</strong> Explaining a concept is how you learn it; a group catches misunderstandings early.",
          "<strong>Spaced repetition with Anki</strong> for the memorization layer, so working memory is free for problem-solving.",
          "<strong>Protect sleep over all-nighters.</strong> Sleep is when learning consolidates; a rested brain solves problems an exhausted one can't."
        ]},
        { k: "callout", variant: "tip",
          html: "MSU offers free help for exactly the gateway courses that wash people out — SmartyCats peer tutoring, the math learning center, and success coaching. Use them <em>before</em> you're drowning, not after. (See MSU Onboarding.)" }
      ]
    }
  ]
};
