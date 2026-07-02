/* Curated online resources, grouped by job */
window.PAGES.resources = {
  id: "resources",
  title: "Online Resources",
  icon: "🔗",
  subtitle: "The genuinely good picks for each job. Pick one tool per category and stick with it — tool-hopping is procrastination in disguise.",
  sections: [
    {
      type: "prose",
      id: "res-tip",
      title: "",
      hideTitle: true,
      blocks: [
        { k: "callout", variant: "tip",
          html: "Everything here is free or has a strong free tier. Links open in a new tab. Your own MSU orientation materials and success center are always the most relevant — treat individual Reddit posts as candid advice to take with a grain of salt." }
      ]
    },
    {
      type: "resources",
      id: "res-list",
      title: "The library",
      icon: "📚",
      groups: [
        { name: "College transition & student success", items: [
          { name: "College Info Geek", url: "https://collegeinfogeek.com", desc: "Practical study habits and college advice." },
          { name: "r/EngineeringStudents", url: "https://www.reddit.com/r/EngineeringStudents/", desc: "Candid advice from people in the trenches." },
          { name: "r/college", url: "https://www.reddit.com/r/college/", desc: "General college life Q&A." },
          { name: "r/MSUcats", url: "https://www.reddit.com/r/MSUcats/", desc: "The Montana State student community." },
          { name: "Lifehacker", url: "https://lifehacker.com", desc: "Tips on time management and avoiding procrastination." }
        ]},
        { name: "Programming & coding practice", items: [
          { name: "CS50x (Harvard)", url: "https://cs50.harvard.edu/x", desc: "The best on-ramp to CS — free.", free: true },
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Free, project-based curriculum.", free: true },
          { name: "Exercism", url: "https://exercism.org", desc: "Free, mentored practice in many languages.", free: true },
          { name: "learncpp.com", url: "https://www.learncpp.com", desc: "The C++ reference for CompE.", free: true },
          { name: "The Missing Semester (MIT)", url: "https://missing.csail.mit.edu", desc: "Terminal, Git, and tooling.", free: true },
          { name: "Codecademy", url: "https://www.codecademy.com", desc: "Interactive coding lessons." },
          { name: "Boot.dev", url: "https://www.boot.dev", desc: "Backend/Python path — 3 months free with the Student Pack." },
          { name: "LeetCode", url: "https://leetcode.com", desc: "Save it for later — it's for interviews, not fundamentals." }
        ]},
        { name: "Engineering math & physics review", items: [
          { name: "Khan Academy", url: "https://www.khanacademy.org", desc: "Structured lessons + practice.", free: true },
          { name: "Professor Leonard", url: "https://www.youtube.com/@ProfessorLeonard", desc: "Full, rigorous math lectures.", free: true },
          { name: "The Organic Chemistry Tutor", url: "https://www.youtube.com/@TheOrganicChemistryTutor", desc: "Fast problem walkthroughs.", free: true },
          { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown", desc: "Deep visual intuition for math.", free: true },
          { name: "Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu", desc: "Excellent free notes + problems.", free: true },
          { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", desc: "Free real courses in math, physics, circuits.", free: true },
          { name: "Brilliant", url: "https://brilliant.org", desc: "Interactive problem-solving (some free content)." }
        ]},
        { name: "Computer-engineering intuition", items: [
          { name: "Ben Eater", url: "https://eater.net", desc: "Build an 8-bit computer on breadboards — CompE gold.", free: true },
          { name: "Nand to Tetris", url: "https://www.nand2tetris.org", desc: "Build a whole computer from logic gates up.", free: true },
          { name: "Crash Course Computer Science", url: "https://www.youtube.com/playlist?list=PL8dPuuaLjXtNlUrzyH5r6jN9ulIgZBpdo", desc: "Fast, broad overview of the field.", free: true }
        ]},
        { name: "Note-taking (pick one)", note: "Don't run three note apps at once — choose one and build the habit.", items: [
          { name: "Obsidian", url: "https://obsidian.md", desc: "Local, link-your-ideas — strong for building an engineering knowledge base.", free: true },
          { name: "OneNote", url: "https://www.onenote.com", desc: "Free with MSU Office; handwriting-friendly.", free: true },
          { name: "Notion", url: "https://www.notion.so", desc: "Flexible all-in-one notes + docs." },
          { name: "Google Keep", url: "https://keep.google.com", desc: "Fast, lightweight quick capture.", free: true }
        ]},
        { name: "Tasks & project management (pick one)", note: "Simpler is more sustainable — a calendar plus one to-do list covers most people.", items: [
          { name: "Todoist", url: "https://todoist.com", desc: "Clean, fast to-do app." },
          { name: "Trello", url: "https://trello.com", desc: "Visual, board-style projects." },
          { name: "ClickUp", url: "https://clickup.com", desc: "Heavier all-in-one project tool." },
          { name: "Google Calendar", url: "https://calendar.google.com", desc: "Put every deadline in one place.", free: true }
        ]},
        { name: "Focus & anti-distraction", note: "Use these only if distraction is a real problem — for many people, phone-in-another-room is enough and free.", items: [
          { name: "Forest", url: "https://www.forestapp.cc", desc: "Gamified focus timer." },
          { name: "Cold Turkey", url: "https://getcoldturkey.com", desc: "Hard website/app blocking for crunch time." },
          { name: "Freedom", url: "https://freedom.to", desc: "Cross-device distraction blocking." },
          { name: "Noisli", url: "https://www.noisli.com", desc: "Ambient background sound." }
        ]},
        { name: "File organization & cloud backup", note: "Do this before you have anything to lose. One folder structure — School/Year/Semester/CourseCode/ — decided now and followed always. Keep two copies in two places, and keep all code in Git.", items: [
          { name: "OneDrive", url: "https://onedrive.live.com", desc: "Free 1TB via MSU — your synced primary.", free: true },
          { name: "Google Drive", url: "https://drive.google.com", desc: "Free 15GB — a solid alternative or secondary.", free: true },
          { name: "Backblaze", url: "https://www.backblaze.com", desc: "Cheap, automatic second backup." },
          { name: "Dropbox", url: "https://www.dropbox.com", desc: "Free tier for syncing files." },
          { name: "GitHub", url: "https://github.com", desc: "Version control + backup + portfolio for code.", free: true }
        ]},
        { name: "Personal finance & budgeting", note: "A simple method beats a fancy app — track what comes in vs. out, and set up a no-fee student checking account. The full MSU aid/billing breakdown lives on the MSU Finances tab.", items: [
          { name: "MSU Financial Aid", url: "https://www.montana.edu/financialaid/", desc: "Aid offers, eligibility, FAFSA, and tools." },
          { name: "MSU Student Accounts", url: "https://www.montana.edu/ubs/studentaccounts/", desc: "Billing, payments, confirming your bill, refunds." },
          { name: "MSU Financial Education", url: "https://www.montana.edu/aycss/financialedu/", desc: "Budgeting, coaching, and paying-for-school resources." },
          { name: "YNAB", url: "https://www.ynab.com", desc: "You Need A Budget — has a student discount." },
          { name: "r/personalfinance wiki", url: "https://www.reddit.com/r/personalfinance/wiki/index/", desc: "The 'flowchart' is a genuinely good free primer.", free: true }
        ]},
        { name: "Career, social & campus", items: [
          { name: "Handshake", url: "https://joinhandshake.com", desc: "MSU's career portal for jobs & internships." },
          { name: "Meetup", url: "https://www.meetup.com", desc: "Clubs and hobbies around Bozeman." },
          { name: "Streamline Bus", url: "https://streamlinebus.com", desc: "Bozeman's fare-free transit (verify routes).", free: true },
          { name: "MSU News / MSUToday", url: "https://www.montana.edu/news/", desc: "Campus updates and events." },
          { name: "MSU computing clubs", url: "https://www.coe.montana.edu/club", desc: "ACM/IEEE student chapters and project teams." }
        ]}
      ]
    }
  ]
};
