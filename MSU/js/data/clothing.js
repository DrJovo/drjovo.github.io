/* Clothing & Weather — Bozeman is the real curriculum */
window.PAGES.clothing = {
  id: "clothing",
  title: "Clothing & Weather",
  icon: "🧥",
  subtitle: "Bozeman sits at ~4,800 ft in a mountain valley. The winter will genuinely try to hurt you — and you walk to class. Layering beats one big coat.",
  sections: [
    {
      type: "prose",
      id: "clothing-intro",
      title: "What you're dressing for",
      icon: "🌨️",
      blocks: [
        { k: "p", html: "Expect a warm-ish September, a fast drop through October, and a <strong>long, cold, snowy winter</strong> — single-digit and sub-zero °F days happen, plus wind and intense high-altitude sun. Bozeman averages roughly <strong>63–82″ of snow</strong> a year. Dorm-to-class is on foot. This is <strong>not</strong> &ldquo;bring a hoodie&rdquo; cold." },
        { k: "callout", variant: "tip", title: "The strategy: layer, don't bulk",
          html: "A thermal base layer + a mid-layer (fleece/puffer) + a waterproof insulated shell keeps you warmer and more flexible than one giant coat. Bring what you own now, then buy the gaps locally in late September once you've felt the climate — Bozeman has good outdoor-gear stores and end-of-season sales." }
      ]
    },
    {
      type: "checklist",
      id: "clothing-list",
      title: "Cold-weather checklist",
      icon: "✅",
      allowAdd: true,
      groups: [
        { id: "cloth-g-essential", name: "The non-negotiables", items: [
          { id: "cloth-coat", label: "essential", text: "Serious insulated winter coat (waterproof shell, warm to ~0°F / -18°C)", note: "The one piece of clothing you must not cheap out on." },
          { id: "cloth-boots", label: "essential", text: "Waterproof winter boots with traction", note: "Icy sidewalks daily from November to March. Slips and wet feet are miserable." },
          { id: "cloth-base", label: "essential", text: "Thermal base layers (top + bottom)", note: "The secret to staying warm without a giant coat. Merino or synthetic — not cotton." },
          { id: "cloth-extremities", label: "essential", text: "Warm beanie, insulated gloves, scarf/neck gaiter", note: "Heat escapes from your extremities; cheap and critical." },
          { id: "cloth-socks", label: "essential", text: "Wool or synthetic socks (several pairs)", note: "Cotton socks + snow = cold, wet feet." }
        ]},
        { id: "cloth-g-rec", name: "Layering & sun", items: [
          { id: "cloth-mid", label: "recommended", text: "Mid-layers (fleece, puffer vest, hoodies)", note: "The 'middle' of your layering system." },
          { id: "cloth-rain", label: "recommended", text: "Rain jacket / packable shell", note: "Shoulder seasons (fall & spring) are wet." },
          { id: "cloth-sun", label: "recommended", text: "Sunglasses + lip balm + good lotion", note: "High-altitude sun, dry air, and snow glare are no joke." }
        ]},
        { id: "cloth-g-opt", name: "Situational", items: [
          { id: "cloth-snowpants", label: "optional", text: "Snow pants", note: "Only if you'll hike/ski/play in the snow — very tempting in Bozeman, and Langford has ski lockers and a ski wax room (rentable locker ~$60/year) if you get into it." },
          { id: "cloth-everyday", label: "optional", text: "Everyday clothes you already own", note: "Jeans, tees, sweaters — bring what you have; don't buy a new wardrobe." }
        ]},
        { id: "cloth-g-skip", name: "Skip", items: [
          { id: "cloth-brand", label: "skip", text: "Brand-name 'Montana fashion'", note: "Function over brand — buy warmth. You can grab a Bobcats hoodie on campus in week one." },
          { id: "cloth-wardrobe", label: "skip", text: "A full winter wardrobe bought in July", note: "Bring what you own; buy the gaps in late September locally once you feel the climate." },
          { id: "cloth-formal", label: "skip", text: "Formal/dress clothes", note: "Not needed initially unless you already have a specific event. Save the room for cold-weather gear." }
        ]}
      ]
    }
  ]
};
