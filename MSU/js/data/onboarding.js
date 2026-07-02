/* Montana State University onboarding, portals & resources */
window.PAGES.onboarding = {
  id: "onboarding",
  title: "MSU Onboarding",
  icon: "🎟️",
  subtitle: "The administrative tasks, portals, and people that turn an acceptance into a class schedule. Hitting these deadlines is the most avoidable freshman disaster.",
  sections: [
    {
      type: "prose",
      id: "onb-verify",
      title: "Read this first",
      icon: "⚠️",
      blocks: [
        { k: "callout", variant: "warn", title: "Confirm every date on official MSU pages",
          html: "The specific dates below come from the research and are marked &ldquo;verify.&rdquo; They could change — always confirm on your MyMSU admissions checklist and the official pages (<a href=\"https://www.montana.edu\" target=\"_blank\" rel=\"noopener\">montana.edu</a>, <a href=\"https://www.montana.edu/reslife\" target=\"_blank\" rel=\"noopener\">montana.edu/reslife</a>) before you rely on them." },
        { k: "callout", variant: "tip", title: "Your Langford move-in at a glance",
          html: "<strong>Move-in days:</strong> Sunday, Aug 23 &amp; Monday, Aug 24, 2026 — hourly time slots from 8 a.m. (last slot 7 p.m. on the 23rd, 5 p.m. on the 24th). <strong>Sign-ups open</strong> in the Housing Portal on <strong>Wed, July 1, 2026 at 9 a.m. MDT</strong>. <strong>Mail &amp; packages</strong> aren't accepted before <strong>Aug 17</strong>. <strong>Meal plans begin Aug 23.</strong> Verify on MSU's housing move-in page." }
      ]
    },
    {
      type: "checklist",
      id: "onb-tasks",
      title: "Onboarding tasks & deadlines",
      icon: "✅",
      allowAdd: true,
      intro: "Everything an incoming freshman handles over the summer. Tick them off as you complete each one.",
      groups: [
        { id: "onb-g-tasks", name: "Summer admin tasks", items: [
          { id: "onb-enroll", label: "essential", warn: true, text: "Confirm enrollment / pay your enrollment deposit", note: "Work through your MyMSU admissions checklist top to bottom." },
          { id: "onb-email", label: "essential", warn: true, text: "Set up your NetID + MSU email — then check it constantly", note: "It becomes the official channel for everything; missing an email means missing a deadline." },
          { id: "onb-fafsa", label: "essential", warn: true, text: "Finish FAFSA + financial aid, and accept your awards", note: "FAFSA opens Oct 1 (studentaid.gov). Review your aid package and accept the awards you want." },
          { id: "onb-housing", label: "essential", warn: true, text: "Sign up for your move-in time slot", note: "You're already placed in Langford 205-B (a double). The next housing step is your move-in slot — sign-ups open in the Housing Portal on Wed, July 1, 2026 at 9 a.m. MDT, with hourly slots across Aug 23–24. montana.edu/reslife." },
          { id: "onb-placement", label: "essential", warn: true, text: "Take the ALEKS math placement (re-test if it bumps you up)", note: "Required before you can register for math — and placing higher protects your timeline." },
          { id: "onb-immun", label: "essential", warn: true, text: "Submit immunization records (2 MMR shots + TB clearance)", note: "MSU won't let you register for classes until these are on file. Use the student health portal." },
          { id: "onb-transcripts", label: "essential", warn: true, text: "Submit final transcript + AP/IB/dual-enrollment scores", note: "For transfer credit. Also accept any scholarships you've been offered." },
          { id: "onb-orientation", label: "essential", warn: true, text: "Register for orientation and attend a session", note: "Research: registration opens Feb 18, 2026; sessions on June 8, June 22, July 13, or Aug 23, 2026. Finish the pre-orientation modules by your session's deadline (e.g., ~July 8 for a July session)." },
          { id: "onb-register", label: "essential", warn: true, text: "Register for classes early once eligible", note: "The earlier you register, the more likely you get the sections you need." },
          { id: "onb-billing", label: "essential", warn: true, text: "Set up tuition payment / billing", note: "Know your due dates and how to pay; check statements regularly." },
          { id: "onb-dining", label: "recommended", warn: true, text: "Confirm your dining plan", note: "You're set on the 7-Day Blue meal plan — all hall residents need one, and meal plans begin Aug 23, 2026." },
          { id: "onb-parking", label: "optional", warn: true, text: "Sort parking (permit) if bringing a car", note: "Permits are required; plan for winter tires/chains. You likely don't need a car as a freshman." }
        ]}
      ]
    },
    {
      type: "prose",
      id: "onb-portals",
      title: "The portals & systems you'll live in",
      icon: "🖥️",
      blocks: [
        { k: "links", items: [
          { name: "MyMSU", url: "https://www.montana.edu/uit/mymsu/", desc: "The administrative hub: registration, grades, financial aid, billing, records." },
          { name: "Residence Life", url: "https://www.montana.edu/reslife", desc: "Housing application, what-to-bring list, bed sizes and appliance limits." },
          { name: "Ask Us / Contact", url: "https://www.montana.edu/contactus", desc: "The directory and help desk for questions." },
          { name: "Campus Map", url: "https://www.montana.edu/map", desc: "Learn the layout and walk your routes." }
        ]},
        { k: "callout", variant: "warn", title: "Confirm the current LMS and email format",
          html: "Your course content/grades live in a Learning Management System — recent sources point to <strong>D2L Brightspace</strong>, though older notes mention Canvas (ecat1.montana.edu). Bookmark whichever is current. Your MSU email runs on Microsoft/Office 365; the student address format is typically <code>firstname.lastname@student.montana.edu</code> — verify yours." },
        { k: "subhead", text: "Don't forget these", ico: "🔔" },
        { k: "ul", items: [
          "<strong>Campus Wi-Fi / UIT help desk</strong> — get your devices on the network during move-in.",
          "<strong>The MSU mobile app</strong> — check for schedule, dining, bus, and alerts.",
          "<strong>Emergency alerts</strong> — make sure you're enrolled; weather closures are a real thing in Montana."
        ]}
      ]
    },
    {
      type: "prose",
      id: "onb-engineering",
      title: "The engineering side specifically",
      icon: "⚙️",
      blocks: [
        { k: "ul", items: [
          "<strong>Norm Asbjornson College of Engineering (NACOE)</strong> is the home of your degree — look for first-year advising, an intro-to-engineering course, and any required software or laptop guidance.",
          "<strong>Computer Engineering</strong> lives in/with the <strong>Department of Electrical &amp; Computer Engineering</strong>, and computing is served by the <strong>Gianforte School of Computing</strong>. Confirm your home department and <strong>who your academic advisor is</strong> — your advisor approves your schedule and is your single most useful human contact. (Research names Shelli Spannring as a freshman advisor — verify.) Schedule advising in March/April to pick fall classes.",
          "<strong>Pull up the CompE four-year plan / curriculum flowchart</strong> in the course catalog and read it. Knowing which math/physics gates which engineering course lets you avoid a delayed graduation.",
          "<strong>Join one engineering org freshman fall</strong> — IEEE student branch, robotics, an ACM/computing club, the Society of Women Engineers, or a project team. It's where you build skills, friends, and a résumé."
        ]},
        { k: "links", items: [
          { name: "NACOE (Engineering)", url: "https://www.coe.montana.edu", desc: "Your college — advising, courses, software guidance." },
          { name: "Course Catalog", url: "https://catalog.montana.edu", desc: "Find the CompE four-year plan and prerequisites." },
          { name: "Engineering clubs", url: "https://www.coe.montana.edu/club", desc: "Student organizations and project teams." }
        ]}
      ]
    },
    {
      type: "prose",
      id: "onb-resources",
      title: "Campus resources that help freshmen adapt fast",
      icon: "🤝",
      blocks: [
        { k: "ul", items: [
          "<strong>Academic advising (engineering-specific)</strong> — schedule a meeting early each term.",
          "<strong>Tutoring & the math learning center</strong> — free help for the gateway courses (calc, physics, programming) that wash people out. MSU's SmartyCats offers peer tutoring for 300+ courses, plus a Learning Strategist for study-skills workshops. Use it <em>before</em> you're drowning.",
          "<strong>Writing center</strong> — yes, engineers write (lab reports, proposals).",
          "<strong>Counseling &amp; psychological services + campus health center</strong> — know where they are before you need them. Student Health offers low-cost medical and confidential mental-health support.",
          "<strong>Disability / accessibility services</strong> — if you have any accommodation needs, set this up early; it's confidential and helpful.",
          "<strong>Career services</strong> — start a résumé and visit the engineering career fair freshman year, even just to observe. Use Handshake to find on-campus jobs and internships.",
          "<strong>Rec center &amp; outdoor programs</strong> — a free gym plus skiing/hiking/gear rental. A real perk of Bozeman and the easiest way to make friends and stay sane."
        ]},
        { k: "links", items: [
          { name: "Student Success Center", url: "https://www.montana.edu/aycss/", desc: "Tutoring, advising, and workshops (Allen Yarnell Center)." },
          { name: "Access & Success", url: "https://www.montana.edu/access-success/", desc: "Academic support and success coaching." },
          { name: "Handshake", url: "https://joinhandshake.com", desc: "MSU's career portal for jobs and internships." }
        ]}
      ]
    }
  ]
};
