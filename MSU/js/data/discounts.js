/* .edu Discounts, Free Tools & Student Benefits */
window.PAGES.discounts = {
  id: "discounts",
  title: "Student Discounts & Free Tools",
  icon: "🎁",
  subtitle: "Your school email unlocks a lot — and for a CompE student the developer tools are the highlight. Tick the box on each one as you claim it.",
  sections: [
    {
      type: "prose",
      id: "disc-intro",
      title: "Before you start",
      icon: "💡",
      blocks: [
        { k: "callout", variant: "warn",
          html: "Programs and terms change constantly — <strong>confirm current eligibility on each vendor's student page</strong> before counting on an offer. Two good places to verify student status: <a href=\"https://www.myunidays.com\" target=\"_blank\" rel=\"noopener\">UNiDAYS</a> and <a href=\"https://www.studentbeans.com\" target=\"_blank\" rel=\"noopener\">Student Beans</a>." },
        { k: "callout", variant: "tip", title: "Reality check",
          html: "The real value here is the <strong>developer/engineering tools</strong> (GitHub Pack, JetBrains, MATLAB, Office) — not the entertainment discounts. Claim those first." }
      ]
    },
    {
      type: "discounts",
      id: "disc-tools",
      title: "The tools",
      icon: "🧰",
      intro: "★ ratings reflect how worth-it each one is for a Computer Engineering freshman.",
      items: [
        { id: "disc-github", name: "GitHub Student Developer Pack", what: "A bundle of free dev tools: GitHub Pro, a free domain, cloud credits (DigitalOcean/Azure), Copilot for students, DataCamp, Heroku, Boot.dev & more.", free: "Free", stars: 5, note: "The #1 thing to claim — do it day one. Verify at education.github.com.", url: "https://education.github.com" },
        { id: "disc-jetbrains", name: "JetBrains IDEs", what: "Full professional IDEs — CLion, PyCharm Pro, IntelliJ, and the rest.", free: "Free", stars: 5, note: "CLion is great for the C/C++ that's CompE bread and butter. Free with .edu verification.", url: "https://www.jetbrains.com/community/education/" },
        { id: "disc-office", name: "Microsoft Office 365", what: "Word, Excel, PowerPoint, Outlook, OneNote, Teams + 1TB OneDrive.", free: "Free via MSU", stars: 5, note: "Don't pay for Office — get it through your MSU account.", url: "https://www.microsoft.com/en-us/education/products/office" },
        { id: "disc-matlab", name: "MATLAB + Simulink", what: "Engineering computation and simulation.", free: "Often free ⚠️", stars: 5, note: "Frequently free via a campus-wide license — check MSU's software portal before buying.", url: "https://www.mathworks.com/academia/students.html" },
        { id: "disc-backup", name: "Cloud backup", what: "OneDrive (via MSU), Google Drive, or Backblaze for file storage & backup.", free: "Free + paid", stars: 5, note: "Non-negotiable — keep two copies in two places. See Online Resources for the strategy.", url: "https://onedrive.live.com" },
        { id: "disc-password", name: "Password manager", what: "Secure password storage (Bitwarden free, or 1Password student).", free: "Free / student offer", stars: 5, note: "Set this up regardless — security hygiene matters for a future engineer.", url: "https://bitwarden.com" },
        { id: "disc-autodesk", name: "Autodesk (Fusion 360, AutoCAD)", what: "CAD and 3D design tools.", free: "Free (education)", stars: 4, note: "Education license with verification. Useful for hardware/design projects.", url: "https://www.autodesk.com/education/edu-software/overview" },
        { id: "disc-notion", name: "Notion", what: "Notes, docs, and project/task management.", free: "Free + edu perks", stars: 4, note: "A strong all-in-one if you'll actually commit to it.", url: "https://www.notion.so/product/notion-for-education" },
        { id: "disc-overleaf", name: "Overleaf", what: "Online LaTeX editor for clean lab reports.", free: "Free tier ⚠️", stars: 4, note: "Sometimes upgraded via your school — for math-heavy documents.", url: "https://www.overleaf.com" },
        { id: "disc-prime", name: "Amazon Prime Student", what: "Free shipping, video, and student deals.", free: "6 months free ⚠️", stars: 4, note: "Then ~50% off. Genuinely useful for dorm shopping + textbooks.", url: "https://www.amazon.com/primestudent" },
        { id: "disc-figma", name: "Figma", what: "Design, diagramming, and UI.", free: "Free (education)", stars: 3, note: "Useful for projects and posters.", url: "https://www.figma.com/education/" },
        { id: "disc-wolfram", name: "Wolfram Alpha Pro", what: "Step-by-step math and engineering.", free: "Student discount ⚠️", stars: 3, note: "A helpful study aid — not a substitute for learning.", url: "https://www.wolframalpha.com/pro" },
        { id: "disc-adobe", name: "Adobe Creative Cloud", what: "Photoshop, Illustrator, and the rest.", free: "Free or ~60% off ⚠️", stars: 3, note: "MSU may provide it free as an Adobe Creative Campus — verify; otherwise a steep student discount. Only if you'll use it.", url: "https://www.adobe.com/creativecloud/buy/students.html" },
        { id: "disc-zoom", name: "Zoom", what: "Video meetings.", free: "Free via MSU", stars: 3, note: "MSU's license removes the 40-minute cap when you're logged in — handy for study-group calls.", url: "https://zoom.us" },
        { id: "disc-google", name: "Google Workspace", what: "Gmail + 15GB of Drive (personal account).", free: "Free", stars: 3, note: "Good for an extra independent backup of assignments and photos.", url: "https://workspace.google.com" },
        { id: "disc-spotify", name: "Spotify Premium (Student)", what: "Music — often bundled with Hulu in the US.", free: "Discount ⚠️", stars: 3, note: "Worth it if you stream daily.", url: "https://www.spotify.com/us/student/" },
        { id: "disc-apple", name: "Apple education pricing", what: "Discounts on Macs and iPads.", free: "Discount ⚠️", stars: 3, note: "Usually with a back-to-school promo. Only if you're buying anyway.", url: "https://www.apple.com/us-edu/store" },
        { id: "disc-courses", name: "Coursera / Udemy", what: "Online courses.", free: "Sometimes discounted", stars: 2, note: "Various e-learning discounts when you sign up with a .edu account.", url: "https://www.coursera.org" }
      ]
    }
  ]
};
