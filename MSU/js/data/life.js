/* Practical Life Preparation */
window.PAGES.life = {
  id: "life",
  title: "Life Skills",
  icon: "🌱",
  subtitle: "The transition that derails freshmen is rarely academic at first — it's logistics and self-management. These are the skills to have before September.",
  sections: [
    {
      type: "prose", id: "life-laundry", title: "Laundry", icon: "🧺",
      blocks: [
        { k: "ul", items: [
          "Learn before you go: sort lights/darks, pick water temps, know which things can't go in the dryer, and use less detergent than you think (pods/sheets fix this).",
          "Wash sheets and towels roughly weekly.",
          "Dorm machines are shared and often card-operated — go off-peak (weekday mornings) and set a timer so you're not the person whose wet clothes get dumped on the table.",
          "Bring a mesh bag for small items. Don't let laundry pile up for weeks — and pull clothes out promptly to avoid wrinkles and mildew."
        ]}
      ]
    },
    {
      type: "prose", id: "life-meals", title: "Meals & nutrition", icon: "🍎",
      blocks: [
        { k: "ul", items: [
          "You'll have a dining plan, so the skill is eating <em>well</em>, not just eating: get protein and vegetables, not just the unlimited dessert bar.",
          "Keep cheap, healthy snacks (fruit, nuts, yogurt) in your room.",
          "Don't skip breakfast before a morning exam. Protein and sleep help your GPA more than late-night pizza.",
          "Learn 2–3 things you can make in a dorm (overnight oats, microwave eggs) for late nights, and carry a reusable water bottle."
        ]}
      ]
    },
    {
      type: "prose", id: "life-sleep", title: "Sleep", icon: "😴",
      blocks: [
        { k: "p", html: "This is academic infrastructure, not a luxury — for an engineering load it's the difference between solving a problem and staring at it." },
        { k: "ul", items: [
          "Aim for 7–9 hours on a consistent schedule; treat all-nighters as a failure of planning, not a strategy.",
          "Use blue-light filters in the evening.",
          "If your roommate's schedule differs, get blackout/eye-mask gear, earplugs, or a white-noise app.",
          "Bozeman winters are dark — a sunrise/light alarm can genuinely help."
        ]}
      ]
    },
    {
      type: "prose", id: "life-time", title: "Time management", icon: "⏱️",
      blocks: [
        { k: "p", html: "The shift from high school is that <strong>no one tells you to study</strong> and most of the work is unsupervised. Two habits cover 80% of it:" },
        { k: "ol", items: [
          "Put every deadline from every syllabus into <strong>one calendar</strong> in week one.",
          "Treat your week like a schedule, with blocks for classes, study, gym, meals, and downtime."
        ]},
        { k: "p", html: "Break big tasks into smaller steps. Engineering rewards starting early; &ldquo;I'll do it the night before&rdquo; breaks the first time a problem set is genuinely hard." }
      ]
    },
    {
      type: "prose", id: "life-org", title: "Organization", icon: "🗂️",
      blocks: [
        { k: "ul", items: [
          "One folder system (digital — see Online Resources), one calendar, one task list.",
          "Keep your physical space functional enough to find things and study at your desk.",
          "Back up files regularly and set up auto-sync (e.g., OneDrive) so a computer failure never loses your notes.",
          "A cluttered space and scattered files quietly cost you hours."
        ]}
      ]
    },
    {
      type: "prose", id: "life-health", title: "Health & fitness", icon: "🏃",
      blocks: [
        { k: "ul", items: [
          "Know where the campus health center and counseling services are <em>now</em>, before you need them.",
          "Build in exercise — the rec center is free and a real stress valve (go off-peak; it gets crowded).",
          "Hydrate (altitude + dry air), get a flu shot, and manage the 'freshman plague' with hand-washing and not sharing drinks.",
          "<strong>Mental health is part of this.</strong> The workload, the new environment, and the dark winter are a real combination — asking for help early is a strength, and counseling services exist precisely for this."
        ]}
      ]
    },
    {
      type: "prose", id: "life-transport", title: "Transportation", icon: "🚌",
      blocks: [
        { k: "ul", items: [
          "Bozeman's <strong>Streamline</strong> bus is fare-free and useful around town and campus (verify current routes).",
          "You likely <strong>don't need a car</strong> as a freshman — parking is limited/permitted and winter driving is its own skill. If you bring one, get the permit and budget for snow tires/chains.",
          "Bozeman is bike- and pedestrian-friendly — but note that <strong>Langford (and Hapner) have no secure bike storage</strong>, so a bike lives in your room or locked up outside. Register it with campus police; theft happens.",
          "For everything close, you'll walk — which is exactly why the good boots and coat matter."
        ]}
      ]
    },
    {
      type: "prose", id: "life-social", title: "Social adjustment & balance", icon: "🫂",
      blocks: [
        { k: "ul", items: [
          "This is as important as academics for whether you stay and thrive. Leave your door open the first weeks and say yes to floor events early, even when you'd rather not.",
          "Join <strong>one</strong> club (engineering org, outdoor, intramural) — shared activity makes friends faster than trying to 'find friends.' A study group doubles as a friend group.",
          "Homesickness is normal and fades; give it a few weeks before judging.",
          "You can't do everything every week. Protect the non-negotiables (sleep, ~3 movement sessions, some social time), pick one main extracurricular, and plan <em>around</em> heavy exam/project weeks instead of pretending they won't come. Downtime isn't wasted — it keeps the rest sustainable."
        ]}
      ]
    },
    {
      type: "prose", id: "life-mistakes", title: "Common freshman mistakes to avoid", icon: "🚧",
      blocks: [
        { k: "callout", variant: "warn", title: "The avoidable ones",
          html: "<ul style=\"margin:6px 0 0;padding-left:1.1em\">" +
            "<li>Falling behind in calc/physics early and never catching up — get help in week 2, not week 8.</li>" +
            "<li>Skipping office hours and tutoring out of pride.</li>" +
            "<li>Over-buying dorm stuff before knowing the room and roommate.</li>" +
            "<li>Treating engineering like high school: passive studying, late starts, all-nighters.</li>" +
            "<li>Ignoring the MSU email or missing financial-aid / registration deadlines.</li>" +
            "<li>Isolating in your room — loneliness tanks grades and mood.</li>" +
            "<li>Underestimating Bozeman winter (the clothing and the dark).</li>" +
            "<li>No backups — until the laptop dies the night before a deadline.</li>" +
          "</ul>" }
      ]
    }
  ]
};
