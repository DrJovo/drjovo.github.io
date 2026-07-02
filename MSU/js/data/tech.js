/* Tech & Computer-Engineering-specific gear */
window.PAGES.tech = {
  id: "tech",
  title: "Tech & CompE Gear",
  icon: "💻",
  subtitle: "This is where a Computer Engineering list differs from a generic one. Your laptop is the big decision — most everything else can wait until you've seen your desk.",
  sections: [
    {
      type: "prose",
      id: "tech-platform",
      title: "Choosing your machine",
      icon: "🧠",
      blocks: [
        { k: "callout", variant: "info", title: "Mac vs. Windows vs. Linux?",
          html: "Any of the three works for CompE. Windows/Linux are slightly friendlier for some embedded/EDA toolchains; Macs are excellent for general dev and battery life but occasionally need a VM for Windows-only lab software. <strong>Before buying, check whether MSU's ECE/Computer Engineering program lists a recommended spec or required software</strong> on the engineering college site: <a href=\"https://www.coe.montana.edu\" target=\"_blank\" rel=\"noopener\">coe.montana.edu</a>. If you already own a capable laptop that meets the spec below, you likely don't need a new one." }
      ]
    },
    {
      type: "checklist",
      id: "tech-list",
      title: "Gear checklist",
      icon: "✅",
      allowAdd: true,
      groups: [
        { id: "tech-g-core", name: "The big two", items: [
          { id: "tech-laptop", label: "essential", text: "Reliable laptop — 16GB RAM min (32GB ideal), SSD ≥ 512GB, strong CPU", note: "You'll run VMs, compilers, simulators (circuit/HDL tools), and IDEs. 8GB will choke. CPU matters more than GPU for most CompE work; aim for 8+ hours of battery." },
          { id: "tech-backup", label: "essential", text: "External SSD or a solid backup plan", note: "Losing a project the night before it's due is a rite of passage you can avoid. (Cloud backup strategy is on the Online Resources page.)" }
        ]},
        { id: "tech-g-acc", name: "Recommended accessories", items: [
          { id: "tech-hub", label: "recommended", text: "USB-C hub / dongle (HDMI, USB-A, ethernet)", note: "Thin laptops lack ports; you'll need them for labs and projectors." },
          { id: "tech-headphones", label: "recommended", text: "Decent headphones (keep a wired backup)", note: "For focus and for recorded/online lectures." },
          { id: "tech-mouse", label: "recommended", text: "External mouse", note: "Long coding sessions — trackpads wreck your wrist." },
          { id: "tech-charger", label: "recommended", text: "Spare / universal laptop charger", note: "A backup so a dead charger never costs you a deadline." }
        ]},
        { id: "tech-g-opt", name: "Optional upgrades (buy after move-in)", items: [
          { id: "tech-monitor", label: "optional", text: "Second monitor (portable or standard)", note: "A huge productivity boost for coding — but buy after you've seen your desk space." },
          { id: "tech-keyboard", label: "optional", text: "Mechanical / comfortable keyboard", note: "If you code a lot at your desk." },
          { id: "tech-arduino", label: "optional", warn: true, text: "Arduino starter kit (Uno + components)", note: "Great for getting hands-on before classes — but some courses provide or require a specific kit. Don't buy a lab kit until your department tells you which one." },
          { id: "tech-ipad", label: "optional", text: "iPad / tablet for notes + PDFs", note: "Excellent for handwritten engineering math with a stylus. A real expense and not a laptop replacement — buy only if you'll use it." }
        ]},
        { id: "tech-g-skip", name: "Skip (for now)", items: [
          { id: "tech-solder", label: "skip", text: "Soldering iron, multimeter, breadboards", note: "You'll use lab equipment first and learn what YOU actually want. Revisit sophomore year." },
          { id: "tech-gaming", label: "skip", text: "High-end gaming GPU laptop", note: "Heavy, expensive, poor battery, and overkill for coursework. Gaming is a separate decision, not a school need." }
        ]}
      ]
    },
    {
      type: "checklist",
      id: "tech-software",
      title: "Software to set up early",
      icon: "🧰",
      intro: "Install and claim these once your laptop is ready — full details and links are on the Student Discounts page.",
      groups: [
        { id: "tech-g-soft", name: "First-day software setup", items: [
          { id: "tech-sw-github", label: "essential", text: "Claim the GitHub Student Developer Pack", note: "Free bundle of dev tools — the #1 thing to claim. education.github.com." },
          { id: "tech-sw-jetbrains", label: "recommended", text: "Get your free JetBrains license (CLion, etc.)", note: "CLion is great for the C/C++ that's CompE bread and butter." },
          { id: "tech-sw-office", label: "recommended", text: "Install MSU Office 365 + OneDrive", note: "Free through MSU — don't pay for Office." },
          { id: "tech-sw-vscode", label: "recommended", text: "Install VS Code + Git", note: "Your everyday editor and version control." },
          { id: "tech-sw-matlab", label: "recommended", warn: true, text: "Check MSU's MATLAB / Simulink license", note: "Often free via a campus-wide license — verify on MSU's software portal before buying." }
        ]}
      ]
    }
  ]
};
