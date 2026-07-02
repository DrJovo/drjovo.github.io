/* Dorm & Living Essentials — merged from both research files */
window.PAGES.dorm = {
  id: "dorm",
  title: "Dorm & Living Essentials",
  icon: "🛏️",
  subtitle: "What to bring to Langford 205-B — and what to leave behind. It's a double, so coordinate the big shared items with your roommate before buying anything.",
  sections: [
    {
      type: "prose",
      id: "dorm-rule",
      title: "The #1 buying rule",
      icon: "📏",
      blocks: [
        { k: "callout", variant: "rule", title: "You're in Langford 205-B — a double",
          html: "Because it's a double, your biggest money-saver is to <strong>get your roommate's number and split the shared stuff</strong> — you do <strong>not</strong> both need a fridge, microwave, rug, fan, or TV. Coordinating saves roughly <strong>$150–250</strong> and a lot of clutter in a tight room." },
        { k: "callout", variant: "info", title: "What Langford already gives you",
          html: "Your room is about <strong>10′9″ × 16′</strong> with 8′6″ ceilings, and comes with an <strong>extra-long twin (Twin XL) bed, a desk, a chair, a chest of drawers, a closet, window coverings, and wired + wireless internet</strong>. The beds are <strong>loftable</strong>, so you can raise yours for storage or extra desk space — handy in a shared room. Plan to keep the university furniture and return it in good shape at year's end." },
        { k: "callout", variant: "tip", title: "Borrow before you buy",
          html: "Langford's front desk is open <strong>24/7</strong> and lends out <strong>tools, kitchen equipment, sports gear, video games, and vacuums</strong> (and handles your mail &amp; packages). The hall also has a large communal kitchen, study spaces, a computer room, and laundry — so you can skip a lot of one-off purchases." },
        { k: "callout", variant: "info",
          html: "Treat any influencer &ldquo;must-have&rdquo; list (lighted vanity mirror, jewelry box, Dyson Airwrap, luxury skincare, sunset lamps) as personal-taste extras — not freshman necessities. Those &ldquo;🛒 Shop&rdquo; links are usually affiliate upsells; buy on price and reviews, not the recommendation." }
      ]
    },
    {
      type: "checklist",
      id: "dorm-list",
      title: "Dorm checklist",
      icon: "✅",
      allowAdd: true,
      intro: "Tick items as you buy or pack them — your checkmarks save automatically. Use the filters to focus on essentials first.",
      groups: [
        { id: "dorm-g-bedding", name: "Bedding & sleep", items: [
          { id: "dorm-sheets", label: "essential", text: "Twin XL sheets — 2 sets", note: "Two sets means you always have a clean one. Regular Twin won't fit the mattress." },
          { id: "dorm-topper", label: "essential", text: "Mattress topper (2–3″ memory foam)", note: "Dorm mattresses are thin and hard — the highest-ROI comfort purchase you'll make." },
          { id: "dorm-comforter", label: "essential", text: "Warm comforter/duvet + 1–2 pillows", note: "Bozeman gets cold; get a genuinely warm one." },
          { id: "dorm-protector", label: "recommended", text: "Waterproof mattress protector", note: "Protects against spills and the mattress's unknown history." }
        ]},
        { id: "dorm-g-bath", name: "Bath & toiletries", items: [
          { id: "dorm-towels", label: "essential", text: "Bath towels (2–3) + washcloths", note: "Two minimum so one can dry. Dorms do NOT provide these." },
          { id: "dorm-caddy", label: "essential", text: "Shower caddy + shower shoes", note: "Shared bathrooms — cheap slides prevent foot fungus. Not optional in a communal hall." },
          { id: "dorm-toiletries", label: "essential", text: "Toiletries (soap, shampoo, toothbrush, razor…)", note: "Pack a starter supply; restock locally once you arrive." }
        ]},
        { id: "dorm-g-laundry", name: "Laundry", items: [
          { id: "dorm-hamper", label: "essential", text: "Laundry hamper or bag", note: "Something you can carry to a shared laundry room." },
          { id: "dorm-detergent", label: "essential", text: "Detergent (pods or sheets)", note: "Pods/sheets travel to the laundry room far better than a heavy jug." },
          { id: "dorm-hangers", label: "recommended", text: "Hangers", note: "" },
          { id: "dorm-mesh", label: "recommended", text: "Mesh bag for small items / delicates", note: "Keeps socks from vanishing in shared machines." },
          { id: "dorm-dryer", label: "recommended", text: "Dryer sheets + stain remover", note: "" },
          { id: "dorm-rack", label: "optional", text: "Folding drying rack", note: "For things that can't go in the dryer." }
        ]},
        { id: "dorm-g-power", name: "Power & connectivity", items: [
          { id: "dorm-surge", label: "essential", text: "Surge protector / power strip with USB", note: "Dorms have few outlets. Get a real surge protector — not a cheap multi-tap." },
          { id: "dorm-ext", label: "recommended", text: "Extension cord(s)", note: "Outlets are scarce and often inconveniently placed." },
          { id: "dorm-ethernet", label: "recommended", text: "Ethernet cable", note: "Langford rooms have wired internet ports — a cheap cable gives you a rock-solid connection for big downloads, VMs, and labs when dorm Wi-Fi is congested." }
        ]},
        { id: "dorm-g-storage", name: "Storage & organization", items: [
          { id: "dorm-risers", label: "recommended", text: "Bed risers + under-bed storage", note: "Rooms are tiny; under-bed is your best storage." },
          { id: "dorm-bins", label: "recommended", text: "Collapsible bins / drawer organizers", note: "Maximize cramped closet and desk space." },
          { id: "dorm-overdoor", label: "recommended", text: "Over-the-door organizer", note: "For shoes, toiletries, or supplies." },
          { id: "dorm-deskorg", label: "recommended", text: "Desk organizer", note: "Keeps pens, cables, and clutter contained." }
        ]},
        { id: "dorm-g-light", name: "Lighting, walls & comfort", items: [
          { id: "dorm-command", label: "essential", text: "Command strips + damage-free hooks", note: "Most dorms ban nails/screws — you'll be charged for wall damage." },
          { id: "dorm-lamp", label: "recommended", text: "Desk lamp / clip-on light", note: "Aids late-night studying without overhead glare." },
          { id: "dorm-fan", label: "optional", text: "Fan (coordinate — splittable)", note: "Early September can be warm; many halls aren't air-conditioned." },
          { id: "dorm-rug", label: "optional", text: "Rug (one per room)", note: "Floors are cold and hard; nice but bulky." }
        ]},
        { id: "dorm-g-appliance", name: "Appliances — coordinate with your roommate!", items: [
          { id: "dorm-fridge", label: "optional", warn: true, text: "Mini-fridge + microwave (one per room, split it)", note: "You're on the 7-Day Blue meal plan, so this is really just for snacks and late nights. Split one with your roommate and check the size/wattage limits (≤4.5 cu ft) on the Reslife page." },
          { id: "dorm-banned", label: "skip", text: "Air fryers, toasters, toaster ovens, hot plates, AC units", note: "Banned by fire code — do NOT buy. You'll also have a dining plan." }
        ]},
        { id: "dorm-g-kitchen", name: "Kitchen & snacks", items: [
          { id: "dorm-bottle", label: "essential", text: "Reusable water bottle", note: "Bozeman is high (~4,800 ft) and dry — you'll dehydrate faster than you expect." },
          { id: "dorm-snacks", label: "recommended", text: "Healthy snacks (granola, fruit, nuts)", note: "For late-night study sessions — beats the vending machine." },
          { id: "dorm-dishes", label: "optional", text: "A few microwave-safe dishes + utensils", note: "Only if you'll actually use them — Langford has a large communal kitchen, and the front desk lends kitchen equipment." },
          { id: "dorm-kettle", label: "optional", text: "Coffee maker / electric kettle", note: "For tea, ramen, late nights — if you'll use it often." }
        ]},
        { id: "dorm-g-health", name: "Health & cleaning", items: [
          { id: "dorm-firstaid", label: "essential", text: "First-aid kit + meds (ibuprofen, bandages, thermometer)", note: "You will get sick at 11pm when nothing's open." },
          { id: "dorm-wipes", label: "recommended", text: "Disinfecting wipes / multipurpose cleaner", note: "Dorms are germ factories — quick clean-ups help." },
          { id: "dorm-broom", label: "optional", text: "Small broom or hand vacuum", note: "Langford's front desk lends vacuums — borrow one before buying your own." }
        ]},
        { id: "dorm-g-everyday", name: "Everyday essentials", items: [
          { id: "dorm-backpack", label: "essential", text: "Sturdy backpack / laptop bag", note: "You'll haul a laptop + textbooks across a snowy campus daily. (Details on the Tech &amp; CompE Gear page.)" },
          { id: "dorm-lock", label: "recommended", text: "Padlock / sturdy lock", note: "For your room or a storage area." },
          { id: "dorm-stationery", label: "recommended", text: "Basic stationery (notebook, pens, stapler, tape)", note: "Stock your desk for day one." },
          { id: "dorm-toolkit", label: "recommended", text: "Small toolkit (screwdriver set, scissors)", note: "You'll assemble and fix things constantly — and as a CompE student you'll want your own (Langford's desk lends tools in a pinch)." },
          { id: "dorm-planner", label: "recommended", text: "Desk calendar / planner", note: "To track assignments and deadlines." }
        ]},
        { id: "dorm-g-skip", name: "Skip / don't buy yet", items: [
          { id: "dorm-printer", label: "skip", text: "Printer", note: "Campus printing is cheaper and you'll print far less than you think." },
          { id: "dorm-tv", label: "skip", text: "TV", note: "Your laptop + roommate coordination covers it." },
          { id: "dorm-furniture", label: "skip", text: "Large furniture (extra chairs, etc.)", note: "See what your roommate brings or what the hall provides." },
          { id: "dorm-decor", label: "skip", text: "Excess décor", note: "Travel light; add personality once you've settled in." },
          { id: "dorm-dupes", label: "skip", text: "Duplicate devices / fancy peripherals", note: "Extra tablets, VR headsets, second monitors — wait until you know your space and needs." }
        ]}
      ]
    }
  ]
};
