/* Summer certification game plan — scored for Jonathan's profile
   (already holds CCNA + AWS Cloud Practitioner). */
window.PAGES.certs = {
  id: "certs",
  title: "Certifications",
  icon: "📜",
  subtitle: "A summer-certification game plan, scored for your background — you already hold the CCNA and AWS Cloud Practitioner, so these are the credentials that build on them. Toggle the ones you're targeting.",
  sections: [
    {
      type: "prose",
      id: "cert-how",
      title: "How to read the scores",
      icon: "🎯",
      blocks: [
        { k: "callout", variant: "info",
          html: "Each score is a fit rating <strong>for your situation</strong> — CCNA + AWS Cloud Practitioner, with interests in embedded systems, networking, cloud, and automation — not a universal ranking. <strong>10</strong> = unusually strong fit · <strong>7–9</strong> = genuinely useful · <strong>4–6</strong> = useful in a narrower way · <strong>1–3</strong> = not the best use of time right now." },
        { k: "callout", variant: "rule", title: "Bottom line",
          html: "The best single use of a summer is <strong>AWS Solutions Architect – Associate</strong>. If you want to explore AI credentials, do it <em>after</em> a stronger cloud / security / automation cert — not instead of one." },
        { k: "callout", variant: "warn",
          html: "Exam prices, formats, and renewal rules change — confirm the details on each official page before you register. Almost all of these can be studied for at little or no cost using free vendor training and your GitHub Student Pack." }
      ]
    },
    {
      type: "certs",
      id: "cert-list",
      title: "Your certification map",
      icon: "🗺️",
      intro: "Grouped by how well each fits your goals, then by score. Flip \"Targeting\" on the ones you plan to chase this summer.",
      groups: [
        { name: "✅ Already earned", items: [
          { id: "cert-ccna", earned: true, name: "Cisco CCNA", issuer: "Cisco", earnedNote: "Earned June 2025",
            validates: "Routing & switching, IP services, security fundamentals, and network automation — the foundation everything below builds on.",
            url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html" },
          { id: "cert-awsccp", earned: true, name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", earnedNote: "Earned May 2026",
            validates: "Cloud concepts, core AWS services, security & compliance, and cloud economics. Your jumping-off point into the AWS associate tier.",
            url: "https://aws.amazon.com/certification/certified-cloud-practitioner/" }
        ]},
        { name: "🏆 Top picks for your summer", note: "The highest-value next steps for your exact background.", items: [
          { id: "cert-saa", rank: 1, score: 10, name: "AWS Certified Solutions Architect – Associate", issuer: "AWS",
            cost: "$150", study: "$0–$60", prep: "40–80 hrs · ~4–6 wks", tag: "Best next AWS step after Cloud Practitioner",
            validates: "Designing distributed systems on AWS with the Well-Architected Framework — security, reliability, performance, and cost.",
            why: "The clearest escalation from your Cloud Practitioner. For internships it shows you can build real systems, not just name products. If you do only one cert this summer, do this one.",
            url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" },
          { id: "cert-secplus", rank: 2, score: 9, name: "CompTIA Security+", issuer: "CompTIA",
            cost: "$404", study: "$0–$400", prep: "40–80 hrs · ~4–6 wks", tag: "Broadly recognized baseline security signal",
            validates: "Core security concepts, security operations, risk, identity & access, and secure network/app/device fundamentals (SY0-701).",
            why: "The most recognizable non-cloud cert to add. You already have networking and security labs, so it makes your résumé easy to parse — and it's DoD-approved, which matters for the defense/aerospace internships you're aiming at.",
            url: "https://www.comptia.org/en-us/certifications/security/" },
          { id: "cert-ccnaauto", rank: 3, score: 9, name: "Cisco CCNA Automation", issuer: "Cisco",
            cost: "$300", study: "$0+", prep: "40–80 hrs", tag: "Extends your CCNA into automation",
            validates: "Software & design fundamentals, APIs, app deployment & security, and infrastructure / Cisco-platform automation (200-901 CCNAAUTO).",
            why: "One of the cleanest fits for your background — it layers programmable infrastructure onto the networking identity you already have, and you'll reach it faster than most because you already know the networking half.",
            url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html" },
          { id: "cert-awsdev", rank: 4, score: 8.5, name: "AWS Certified Developer – Associate", issuer: "AWS",
            cost: "$150", study: "$0–$60", prep: "35–70 hrs · ~3–5 wks", tag: "For software-leaning cloud internships",
            validates: "Application deployment, AWS SDKs, serverless services, security, debugging, observability, and CI/CD-adjacent workflows.",
            why: "The better pick if you want internships that lean software over infrastructure. Fits your Flask app, GitHub Pages work, and local-AI tooling especially well — it's more code-facing than Solutions Architect.",
            url: "https://aws.amazon.com/certification/certified-developer-associate/" },
          { id: "cert-gcpace", rank: 5, score: 8.5, name: "Google Associate Cloud Engineer", issuer: "Google Cloud",
            cost: "$125", study: "$0–$29/mo", prep: "40–70 hrs · ~4–6 wks", tag: "Practical GCP counterpart to your AWS skills",
            validates: "Deploying applications, monitoring operations, and managing projects & services on Google Cloud (valid 3 yrs).",
            why: "The most practical GCP cert for where you are — it gives you cloud breadth beyond AWS, which pays off if a future internship or employer runs on Google Cloud instead.",
            url: "https://cloud.google.com/learn/certification/cloud-engineer" }
        ]},
        { name: "🧩 Solid, more specialized options", items: [
          { id: "cert-linux", rank: 6, score: 8, name: "CompTIA Linux+", issuer: "CompTIA",
            cost: "$369", study: "$0–$400", prep: "40–70 hrs", tag: "Strong systems foundation for CE & embedded",
            validates: "Managing, securing, automating, and troubleshooting Linux — plus containers and orchestration (XK0-005).",
            why: "Linux shows up everywhere in embedded, systems, infrastructure, and networking — exactly your trajectory. You're already comfortable on Kubuntu, which makes this cheaper to prepare for than it looks.",
            url: "https://www.comptia.org/en-us/certifications/linux/" },
          { id: "cert-ghactions", rank: 7, score: 7.5, name: "GitHub Actions", issuer: "GitHub · Microsoft",
            cost: "$99", study: "$0", prep: "10–20 hrs", tag: "CI/CD credibility around your projects",
            validates: "Building workflows, automation, and CI/CD pipelines with GitHub Actions.",
            why: "The GitHub credential actually worth your time — it shows you can engineer real pipelines and automation around your projects, and you can study by wiring Actions into your own repos. Strongest paired with your portfolio.",
            url: "https://learn.microsoft.com/en-us/credentials/certifications/github-actions/" },
          { id: "cert-gcpdataeng", rank: 8, score: 7, name: "Google Professional Data Engineer", issuer: "Google Cloud",
            cost: "$200", study: "$0–$29/mo", prep: "70–120 hrs", tag: "Strong credential, but data-focused",
            validates: "Designing data storage, pipelines, governance, and processing on Google Cloud (valid 2 yrs).",
            why: "Respected, but aligned to data engineering more than computer engineering broadly. Worth it only if you know you want data-infrastructure or analytics-pipeline work; Google recommends real industry experience first.",
            url: "https://cloud.google.com/learn/certification/data-engineer" }
        ]},
        { name: "🤖 AI literacy & lighter / situational credentials", note: "Useful in specific cases, but most are weaker employer signals than the picks above. Chase at most one AI badge — and only after a stronger cert, or if it's nearly free.", items: [
          { id: "cert-awsai", rank: 9, score: 6.5, name: "AWS Certified AI Practitioner", issuer: "AWS",
            cost: "$100", study: "$0+", prep: "15–30 hrs · ~1–2 wks", tag: "AI literacy — foundational",
            validates: "Foundational AI/ML concepts, AWS AI services, responsible-AI ideas, and practical AI literacy on AWS.",
            why: "A solid \"AI vocabulary\" badge rather than a deep engineering credential. Reasonable for showing AI fluency — but your local-LLM project already demonstrates more than this exam does, so don't put it ahead of a core cloud/security cert.",
            url: "https://aws.amazon.com/certification/certified-ai-practitioner/" },
          { id: "cert-awsml", rank: 10, score: 6.5, name: "AWS Certified Machine Learning Engineer – Associate", issuer: "AWS",
            cost: "$150", study: "$0+", prep: "60–120 hrs", tag: "Niche — needs real ML experience first",
            validates: "Implementing, deploying, and maintaining ML solutions on AWS (e.g., SageMaker).",
            why: "A genuinely technical credential, but specialized — AWS expects about a year of hands-on SageMaker work. Better after you have a stronger cloud/system cert and actual ML projects behind you.",
            url: "https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/" },
          { id: "cert-ghfound", rank: 11, score: 6, name: "GitHub Foundations", issuer: "GitHub · Microsoft",
            cost: "$99 — free voucher via Student Pack", study: "$0", prep: "5–10 hrs", tag: "Cheap box-checker",
            validates: "Git & GitHub fundamentals — repositories, branching, pull requests, issues, and workflow basics.",
            why: "Low-signal for someone who already builds projects and uses GitHub daily. Only worth it if you can claim the free voucher through your GitHub Student Developer Pack while it lasts.",
            url: "https://learn.microsoft.com/en-us/credentials/certifications/github-foundations/" },
          { id: "cert-gcpgenai", rank: 12, score: 5, name: "Google Generative AI Leader", issuer: "Google Cloud",
            cost: "$99 — $59 beta thru Jul 5 2026", study: "$0–$20", prep: "10–20 hrs", tag: "AI literacy — non-technical",
            validates: "Foundational generative-AI understanding, use cases, and business/organizational implications (valid 3 yrs).",
            why: "A light, leadership-flavored AI badge. Fine for showing AI familiarity, but a weak technical differentiator on its own — better as a cheap supplement than a main summer target.",
            url: "https://cloud.google.com/learn/certification/generative-ai-leader" },
          { id: "cert-gcpda", rank: 13, score: 4.5, name: "Google Cloud Data Analytics Certificate", issuer: "Google Cloud · Skills",
            cost: "~$29/mo · certificate, not an exam", study: "40–90 hrs", tag: "Cloud-data, career-pivot leaning",
            validates: "Practical data-analytics skills inside the Google Cloud ecosystem.",
            why: "A legitimate learning path, but a better fit if you specifically want cloud-data work. Less aligned with computer engineering than the cloud/security/automation picks. It's a certificate program, not a proctored certification.",
            url: "https://cloud.google.com/learn/certificates" },
          { id: "cert-googleda", rank: 14, score: 4, name: "Google Data Analytics Professional Certificate", issuer: "Google · Coursera",
            cost: "~$29–$39/mo · ~3–6 months", study: "40–120 hrs", tag: "Analyst pivot — not CE-focused",
            validates: "Data-analysis workflow, spreadsheets, SQL, dashboards, and communicating insights.",
            why: "A good credential if you want to pivot toward analyst or BI roles — but for a computer-engineering path it's usually not the best use of summer time.",
            url: "https://www.coursera.org/professional-certificates/google-data-analytics" }
        ]}
      ]
    },
    {
      type: "prose",
      id: "cert-stacks",
      title: "Recommended combinations",
      icon: "🧱",
      blocks: [
        { k: "callout", variant: "rule", title: "If you do only one",
          html: "<strong>AWS Solutions Architect – Associate.</strong> The single best use of one summer." },
        { k: "subhead", text: "Best two-cert stack", ico: "🥈" },
        { k: "p", html: "<strong>AWS Solutions Architect – Associate + CompTIA Security+</strong> — cloud architecture, a security baseline, and strong general employability for internships." },
        { k: "subhead", text: "Best three-cert stack", ico: "🥇" },
        { k: "p", html: "<strong>AWS Solutions Architect – Associate + Security+ + Cisco CCNA Automation</strong> — the strongest combination for your profile: it blends cloud, security, automation, networking, and systems thinking in one stack." },
        { k: "subhead", text: "If you'd rather lean software", ico: "💻" },
        { k: "p", html: "<strong>AWS Developer – Associate + GitHub Actions</strong> — the better path if you want software engineering over infrastructure." },
        { k: "subhead", text: "If you want to explore AI without overcommitting", ico: "🤖" },
        { k: "p", html: "Pick <strong>one</strong> of AWS AI Practitioner or Google Generative AI Leader — and only after a stronger system credential, unless the AI badge is free or almost free." }
      ]
    },
    {
      type: "prose",
      id: "cert-skip",
      title: "What to skip for now",
      icon: "🚧",
      blocks: [
        { k: "callout", variant: "warn", title: "Probably not worth it right now",
          html: "<ul style=\"margin:6px 0 0;padding-left:1.1em\">"
            + "<li><strong>GitHub Foundations</strong> at full price if you already know Git.</li>"
            + "<li><strong>Google Data Analytics Professional Certificate</strong> unless you want an analytics pivot.</li>"
            + "<li><strong>Google Cloud Data Analytics Certificate</strong> unless you want cloud-data specifically.</li>"
            + "<li><strong>AWS ML Engineer – Associate</strong> unless you already have ML projects or are going hard into ML.</li>"
            + "</ul>" }
      ]
    },
    {
      type: "prose",
      id: "cert-anthropic",
      title: "A note on Anthropic & AI certs",
      icon: "💬",
      blocks: [
        { k: "callout", variant: "info", title: "No public Anthropic certification (yet)",
          html: "Anthropic publishes <strong>courses and learning material</strong> and announced a <strong>partner-only</strong> Claude certification, but there's no broadly open public cert the way AWS, Google, GitHub, Cisco, or CompTIA offer. For this summer, treat Anthropic as a <strong>learning resource</strong>, not a credential target." },
        { k: "links", items: [
          { name: "Anthropic Learn", url: "https://www.anthropic.com/learn", desc: "Official learning hub.", free: true },
          { name: "Anthropic Courses", url: "https://docs.anthropic.com/en/docs/resources/courses", desc: "Free courses and material.", free: true },
          { name: "Claude Partner Network", url: "https://www.anthropic.com/news/claude-partner-network", desc: "The partner-only certification announcement." }
        ]}
      ]
    },
    {
      type: "prose",
      id: "cert-signal",
      title: "Community & market signal",
      icon: "📡",
      blocks: [
        { k: "p", html: "How students and early-career applicants currently talk about these — not hard rules, but consistent with the ranking above:" },
        { k: "ul", items: [
          "Students often call <strong>AWS SAA</strong> worth it for internships and real cloud credibility.",
          "<strong>Security+</strong> is one of the most consistently recommended baseline security certs.",
          "<strong>Google ACE</strong> is praised as practical — but the exam fee is a real barrier for students.",
          "<strong>GitHub Foundations</strong> is seen as most useful when it's free or bundled through student access."
        ]}
      ]
    }
  ]
};
