/* Prioritized timeline & action plan (merged from both files) */
window.PAGES.timeline = {
  id: "timeline",
  title: "Timeline & Action Plan",
  icon: "🗓️",
  subtitle: "A prioritized, phase-by-phase plan from now through your first month of classes. Check things off as you go — each phase tracks its own progress.",
  sections: [
    {
      type: "prose",
      id: "tl-intro",
      title: "How to use this",
      icon: "🧭",
      blocks: [
        { k: "callout", variant: "tip",
          html: "Work top-to-bottom within each phase — items are roughly in priority order. Phases are timed relative to <strong>move-in</strong>; set your move-in date on the Dashboard or in Settings to keep the countdown accurate. Items marked ⚠️ are time-sensitive or MSU-specific — verify them." }
      ]
    },
    {
      type: "checklist",
      id: "tl-list",
      title: "The plan",
      icon: "✅",
      allowAdd: true,
      groups: [
        { id: "tl-g-3mo", name: "🟢 ~3 months before move-in", items: [
          { id: "tl1-enroll", label: "essential", warn: true, text: "Confirm enrollment & pay any deposit; finish your admissions checklist", note: "Includes accepting scholarships and submitting final transcripts." },
          { id: "tl1-email", label: "essential", warn: true, text: "Set up your MSU email / NetID and start checking it", note: "" },
          { id: "tl1-fafsa", label: "essential", warn: true, text: "Finish FAFSA / financial aid and accept your awards", note: "FAFSA opens Oct 1." },
          { id: "tl1-housing", label: "essential", warn: true, text: "Submit your housing application + deposit; do roommate matching", note: "✓ You're placed in Langford 205-B (a double). The piece that's left is getting your roommate's number and splitting the shared items." },
          { id: "tl1-aleks", label: "essential", warn: true, text: "Take the ALEKS math placement (re-test if it bumps you up)", note: "Single best academic move — place as high as you legitimately can." },
          { id: "tl1-immun", label: "essential", warn: true, text: "Submit immunization records / forms", note: "Required before class registration." },
          { id: "tl1-orient", label: "essential", warn: true, text: "Register for an orientation session", note: "Research: registration opens Feb 18." },
          { id: "tl1-tools", label: "recommended", text: "Claim the GitHub Student Pack + JetBrains license", note: "Free and fast — your highest-value CompE tools." },
          { id: "tl1-math", label: "recommended", text: "Start a light math review (precalc → early calc)", note: "The single best summer investment." },
          { id: "tl1-budget", label: "recommended", text: "Set a budget; plan how you'll pay tuition / rent", note: "" },
          { id: "tl1-buy", label: "recommended", text: "Buy the major essentials: Twin XL bedding, laptop, warm coat, backpack, calculator", note: "Don't buy banned items or non-essentials yet." }
        ]},
        { id: "tl-g-1mo", name: "🟡 ~1 month before", items: [
          { id: "tl2-modules", label: "essential", warn: true, text: "Complete the pre-orientation modules by their deadline", note: "Check your session's date." },
          { id: "tl2-register", label: "essential", warn: true, text: "Register for classes early once eligible", note: "" },
          { id: "tl2-plan", label: "recommended", warn: true, text: "Look up your CompE 4-year plan and find / email your advisor", note: "catalog.montana.edu — know which course gates which." },
          { id: "tl2-immun", label: "essential", warn: true, text: "Submit immunization records & final transcript (if not done)", note: "" },
          { id: "tl2-roommate", label: "recommended", text: "Contact your roommate; split the fridge/microwave/rug/fan; set up a group chat", note: "Saves money and clutter." },
          { id: "tl2-slot", label: "essential", warn: true, text: "Sign up for your Langford move-in time slot", note: "The Housing Portal opens sign-ups Wed, July 1, 2026 at 9 a.m. MDT — slots run hourly across Aug 23–24. Grab one early." },
          { id: "tl2-reslife", label: "recommended", warn: true, text: "Check the Res Life 'what to bring' page + appliance limits", note: "You already know Langford's specs (Twin XL, ~10′9″ × 16′, wired internet). Skim the page mainly for the banned-items and wattage rules. montana.edu/reslife." },
          { id: "tl2-ship", label: "optional", text: "Plan any shipments — packages aren't accepted before Aug 17, 2026", note: "If you're mailing anything ahead to the hall, time it so it doesn't arrive before then." },
          { id: "tl2-essentials", label: "recommended", text: "Buy essentials from the shopping lists (bedding, towels, surge protector…)", note: "" },
          { id: "tl2-winter", label: "recommended", text: "Sort your winter coat + boots (or plan to buy locally in September)", note: "" },
          { id: "tl2-coding", label: "recommended", text: "Continue math review; start CS50x or Python if new to coding", note: "" },
          { id: "tl2-backup", label: "recommended", text: "Set up cloud backup + a folder structure + a password manager", note: "Do it before you have anything to lose." },
          { id: "tl2-travel", label: "recommended", text: "Arrange travel to Bozeman (book flights early / plan the drive)", note: "" },
          { id: "tl2-banking", label: "optional", text: "Get a physical / fill prescriptions; set up a no-fee student bank account", note: "" }
        ]},
        { id: "tl-g-week", name: "🟠 The week before move-in", items: [
          { id: "tl3-movein", label: "essential", warn: true, text: "Confirm your move-in time & logistics", note: "Move-in is Aug 23–24, 2026, hourly slots from 8 a.m. Arriving after your slot (or after the 24th)? Check in at the Langford front desk — it's staffed 24/7." },
          { id: "tl3-toolkit", label: "recommended", text: "Install your toolkit: VS Code, Git, terminal basics; update your laptop", note: "" },
          { id: "tl3-wifi", label: "recommended", warn: true, text: "Get your devices ready for campus Wi-Fi / IT", note: "" },
          { id: "tl3-schedule", label: "recommended", warn: true, text: "Verify dining plan + first-week schedule + class locations", note: "Walk your route once you arrive." },
          { id: "tl3-accounts", label: "recommended", text: "Confirm MyMSU / LMS / email logins; download apps; print orientation tickets", note: "" },
          { id: "tl3-pack", label: "recommended", text: "Pack by the checklist; label your bins; don't over-pack", note: "" },
          { id: "tl3-bag", label: "recommended", text: "Pre-pack a 'first-day' bag (toiletries, a change of clothes, snacks)", note: "" },
          { id: "tl3-stock", label: "recommended", text: "Stock meds, snacks, and your water bottle", note: "" },
          { id: "tl3-rest", label: "optional", text: "Rest well; review your schedule and map the campus", note: "" }
        ]},
        { id: "tl-g-first", name: "🔵 First month of classes", items: [
          { id: "tl4-syllabus", label: "essential", text: "Read every syllabus; put all deadlines into one calendar in week one", note: "" },
          { id: "tl4-office", label: "essential", text: "Go to office hours in weeks 1–2, before you 'need' to", note: "The most underused resource in college." },
          { id: "tl4-problemsets", label: "essential", text: "Start problem sets the day they're assigned", note: "They hide their difficulty until you're stuck." },
          { id: "tl4-tutor", label: "recommended", warn: true, text: "Find the tutoring / math center and use it early", note: "Before you're drowning, not after." },
          { id: "tl4-group", label: "recommended", text: "Form a study group by week 2", note: "" },
          { id: "tl4-club", label: "recommended", text: "Join one club (IEEE / computing / outdoor / intramural)", note: "Just one, freshman fall." },
          { id: "tl4-routine", label: "recommended", text: "Establish sleep + gym + meal routines now while it's easy", note: "" },
          { id: "tl4-advisor", label: "recommended", warn: true, text: "Meet your advisor to sanity-check your schedule and plan spring", note: "" },
          { id: "tl4-roomfit", label: "optional", text: "Buy the deferred room-fit items (monitor, rug) now you've seen the space", note: "" },
          { id: "tl4-wellness", label: "recommended", text: "Maintain wellness; beat homesickness by getting involved socially", note: "" },
          { id: "tl4-budgetmon", label: "optional", text: "Track spending vs. budget; consider a part-time campus job / work-study", note: "" }
        ]}
      ]
    }
  ]
};
