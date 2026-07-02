/* MSU Finances — a reference center for financial aid, billing & money resources.
   Not a personal-finance manager; just the MSU systems and rules that matter. */
window.PAGES.finances = {
  id: "finances",
  title: "MSU Finances",
  icon: "💵",
  subtitle: "A reference center for Montana State's financial aid, student-account billing, and money resources — the systems, rules, and links that matter before and during enrollment.",
  sections: [
    {
      type: "prose",
      id: "fin-start",
      title: "How MSU money works",
      icon: "🧭",
      blocks: [
        { k: "callout", variant: "rule", title: "The one rule to internalize",
          html: "<strong>Financial aid and billing are two separate processes.</strong> The <strong>Office of Financial Aid &amp; Education</strong> decides what support you may receive; <strong>Student Accounts</strong> controls the actual bill, payment confirmation, refunds, and payment plans. Aid showing up does <em>not</em> mean your bill is settled — you still confirm it (see below)." },
        { k: "subhead", text: "Numbers to know", ico: "🔢" },
        { k: "ul", items: [
          "<strong>FAFSA school code (MSU-Bozeman): <span class=\"mono\">002532</span></strong>.",
          "<strong>Half-time = 6 credits</strong> — the minimum for most federal aid. Undergrad aid offers are generally built on <strong>12 credits</strong>, so dropping below can reduce, cancel, or prorate aid.",
          "The <strong>2026–27 FAFSA is open.</strong> Every contributor (you, a parent, a spouse if applicable) needs their <strong>own FSA ID</strong> before starting.",
          "A missed bill confirmation triggers a <strong>$40 late fee</strong> and can cancel your classes."
        ]},
        { k: "callout", variant: "tip",
          html: "MSU's guidance: <strong>borrow only what you need</strong>, not the maximum offered. Grants &amp; scholarships are limited and awarded until exhausted; loans are offered after them." }
      ]
    },
    {
      type: "prose",
      id: "fin-aid",
      title: "Financial aid & education",
      icon: "🎓",
      blocks: [
        { k: "p", html: "The starting point is always the same: <strong>complete the FAFSA → review your aid offer in MyMSU → accept the aid you want in MyMSU.</strong> Your offer may include scholarships, grants, loans, and federal work-study, depending on your situation." },
        { k: "p", html: "Aid is built from your <strong>cost of attendance</strong> (tuition, fees, housing, food, books, transportation, and personal expenses), your need profile, and other resources. MSU may consider adjustments for special items like a <strong>computer purchase</strong> or dependent care." },
        { k: "subhead", text: "Rules that quietly cost people aid", ico: "⚠️" },
        { k: "ul", items: [
          "<strong>Satisfactory Academic Progress (SAP):</strong> you must keep meeting SAP standards to keep federal, state, and most scholarship aid.",
          "<strong>Enrollment changes:</strong> adding, dropping, or withdrawing can reduce, cancel, or prorate aid — even if it's already disbursed.",
          "<strong>Verification:</strong> if MSU requests documents, complete them promptly. Ignored requests can cancel aid or force you to repay what was disbursed.",
          "<strong>Outside scholarships:</strong> you must report outside scholarships, grants, fellowships, and tuition waivers so MSU can update your record (there's a scholarship reporting form)."
        ]},
        { k: "callout", variant: "info",
          html: "Your situation can change — MSU has processes for verification, enrollment changes, special circumstances, and unusual-circumstances appeals. There's also a <strong>financial coach</strong> you can book. Links are below." }
      ]
    },
    {
      type: "prose",
      id: "fin-billing",
      title: "Billing, payments & confirming your bill",
      icon: "🧾",
      blocks: [
        { k: "callout", variant: "rule", title: "You must confirm your bill every semester",
          html: "Confirming verifies you're actually attending before refunds process. <strong>Even if aid covers everything and your balance is $0, you still have to click <em>Confirm</em> in MyMSU/MyInfo by the deadline.</strong> If you owe a balance, pay it by the deadline. Miss it → a <strong>$40 late fee</strong> and possible class cancellation." },
        { k: "p", html: "MSU uses <strong>paperless billing</strong> — review your web bill in MyMSU rather than waiting for mail. You'll get bi-monthly email reminders to your MSU address, and you can set up an <strong>authorized payer</strong> (parent/grandparent) through QuikPay to view statements and pay." },
        { k: "subhead", text: "Ways to pay", ico: "💳" },
        { k: "ul", items: [
          "<strong>Online eCheck — no service fee.</strong> The cheapest option.",
          "<strong>Credit/debit card — 2.85% service fee</strong> (online, by phone, or in person). Visa, MasterCard, Discover, Amex.",
          "<strong>In person</strong> at the cashier window, 1st floor of Montana Hall (check, card, or cash).",
          "<strong>By mail:</strong> P.O. Box 172640, Bozeman, MT 59717-2640 (FedEx/UPS: 121 Montana Hall, Bozeman, MT 59717). Make checks payable to Montana State University and include your student ID."
        ]}
      ]
    },
    {
      type: "prose",
      id: "fin-refunds",
      title: "Refunds",
      icon: "💸",
      blocks: [
        { k: "ul", items: [
          "<strong>12+ credits:</strong> refunds begin processing ~5 days before the first day of classes — but only if all aid requirements are complete and your bill is confirmed by the deadline.",
          "<strong>Fewer than 12 credits:</strong> refunds generally process after the third class day.",
          "<strong>Holds stop refunds.</strong> Clear any account holds first.",
          "Choose <strong>direct deposit</strong> (safer and faster), and keep your address current in MyMSU."
        ]}
      ]
    },
    {
      type: "prose",
      id: "fin-plan",
      title: "Tuition payment plan",
      icon: "📆",
      blocks: [
        { k: "p", html: "MSU offers an installment plan through <strong>QuikPay</strong> (set up by you or an authorized payer). There's a <strong>non-refundable $50 processing fee</strong> per application, the first installment is due at setup, and remaining installments rebalance if your aid or charges change." },
        { k: "ul", items: [
          "<strong>Fall due dates:</strong> October 1 · November 1 · December 1.",
          "<strong>Spring due dates:</strong> February 14 · March 14 · April 14.",
          "Direct payments made <em>outside</em> the plan can change how it rebalances — read the instructions before using it."
        ]}
      ]
    },
    {
      type: "prose",
      id: "fin-parents",
      title: "Parents & family",
      icon: "👪",
      blocks: [
        { k: "p", html: "The <strong>Office of Financial Education</strong> (in the Allen Yarnell Center for Student Success) handles budgeting, planning, and financial coaching. It offers a <strong>Paying for School Budget Planner</strong> and a <strong>Paying for School Packet</strong>, plus a parents page for family support." },
        { k: "subhead", text: "Federal Parent PLUS loans", ico: "🏦" },
        { k: "ul", items: [
          "Can fill the gap when other aid doesn't cover the full cost of attendance — a parent can borrow up to the full COA (no aggregate limit).",
          "The interest rate is set annually by Congress, and there's an origination fee.",
          "Eligible borrowers per MSU's summary: biological parents, adoptive parents, stepparents, and grandparents.",
          "The loan is in the <strong>parent's name</strong>; it can be repaid while the student is in school or deferred until graduation (interest may accrue during deferment)."
        ]},
        { k: "callout", variant: "info",
          html: "If a parent or helper needs to view or pay your account, expect to set up <strong>FERPA authorization</strong> so MSU can legally share billing or aid information. Families can also attend a financial-education appointment with you." }
      ]
    },
    {
      type: "prose",
      id: "fin-rules",
      title: "Rules to remember",
      icon: "📌",
      blocks: [
        { k: "callout", variant: "warn", title: "The operational must-dos",
          html: "<ul style=\"margin:6px 0 0;padding-left:1.1em\">"
            + "<li><strong>Confirm your bill every semester</strong> — aid alone doesn't satisfy it.</li>"
            + "<li>Aid is tied to <strong>enrollment level + academic progress</strong> — adds/drops/withdrawals can change what you owe or receive.</li>"
            + "<li><strong>Borrow only what's necessary.</strong></li>"
            + "<li>Expecting a refund? Finish all aid requirements, confirm your bill, and clear any holds.</li>"
            + "<li>If someone else pays/views your account, set up <strong>FERPA authorization</strong>.</li>"
          + "</ul>" }
      ]
    },
    {
      type: "prose",
      id: "fin-apps",
      title: "Budgeting apps worth a look",
      icon: "📲",
      blocks: [
        { k: "callout", variant: "tip",
          html: "You don't <em>need</em> an app to budget — a spreadsheet works, and MSU's Financial Education office (above) offers free coaching. But if you want one, these three cover the bases for a student and lean free. Pick <strong>one</strong> you'll actually stick with rather than installing all three." },
        { k: "subhead", text: "YNAB — free for a year as a student", ico: "💪" },
        { k: "p", html: "The gold standard for hands-on budgeting. It uses <strong>zero-based budgeting</strong> — every dollar gets a job before you spend it — which is the fastest way to stop overdrawing and actually steer your money. The catch: it's active, not set-and-forget. Normally $109/year, but <strong>college students get a free 365-day trial</strong> with proof of enrollment, so it's effectively free for your whole first year. <a href=\"https://www.ynab.com/pricing\" target=\"_blank\" rel=\"noopener\">ynab.com</a>" },
        { k: "subhead", text: "Empower Personal Dashboard — free", ico: "📊" },
        { k: "p", html: "The best <strong>fully free</strong> big-picture tool. Link your checking, savings, cards, loans, and any investments and it shows your net worth and cash flow in one dashboard — no subscription. It's more of a monitor than a strict budgeting system, so it pairs well with YNAB (or stands alone if you just want visibility). <a href=\"https://www.empower.com/tools\" target=\"_blank\" rel=\"noopener\">empower.com</a>" },
        { k: "subhead", text: "Rocket Money — free tier", ico: "🧹" },
        { k: "p", html: "The practical pick for the problem students actually have: <strong>subscription creep</strong>. It surfaces recurring charges and free trials that quietly auto-renew, tracks bills, and gives a quick budget view. The free tier covers tracking and reminders; Premium (pay-what's-fair, ~$7–$14/mo) adds one-tap cancellations. A low-effort &ldquo;money-leak&rdquo; catcher. <a href=\"https://www.rocketmoney.com/\" target=\"_blank\" rel=\"noopener\">rocketmoney.com</a>" },
        { k: "callout", variant: "info",
          html: "All three are free to start. <strong>YNAB</strong> teaches you to budget, <strong>Empower</strong> shows the whole picture, and <strong>Rocket Money</strong> hunts down wasteful subscriptions — together, a complete and mostly-free toolkit." },
        { k: "subhead", text: "A few others, briefly", ico: "👀" },
        { k: "p", html: "If none of those click, other beginner-friendly picks: <strong>PocketGuard</strong> distills everything into one &ldquo;safe to spend&rdquo; number; <strong>Goodbudget</strong> teaches the classic envelope method and is free; and <strong>Quicken Simplifi</strong> is clean and mostly automated for a few dollars a month. And don't overlook the simplest option — your <strong>bank's own app</strong> plus a weekly five-minute check-in is plenty to start." }
      ]
    },
    {
      type: "resources",
      id: "fin-links",
      title: "Key links",
      icon: "🔗",
      intro: "Official MSU pages. Detailed office contacts are saved in your Profile → Contacts.",
      groups: [
        { name: "Financial aid", items: [
          { name: "Office of Financial Aid & Education", url: "https://www.montana.edu/financialaid/", desc: "Aid home — offers, eligibility, tools." },
          { name: "2026–27 Info Guide", url: "https://www.montana.edu/financialaid/info-guide-2627.html", desc: "How this year's aid is built and disbursed." },
          { name: "Priority dates", url: "https://www.montana.edu/financialaid/priority.html", desc: "Deadlines worth hitting." },
          { name: "Forms library", url: "https://www.montana.edu/financialaid/forms.html", desc: "SAP appeals, scholarship/resource reporting, third-party billing, study abroad." },
          { name: "Private loans", url: "https://www.montana.edu/financialaid/Loans-Private.html", desc: "If you're considering borrowing beyond federal aid." },
          { name: "Upload documents", url: "https://www.montana.edu/financialaid/docu_upload.html", desc: "Submit verification or requested paperwork." },
          { name: "Federal FAFSA (studentaid.gov)", url: "https://studentaid.gov", desc: "Where you complete the FAFSA. MSU code 002532." }
        ]},
        { name: "Billing & payments", items: [
          { name: "Student Accounts", url: "https://www.montana.edu/ubs/studentaccounts/", desc: "Billing home — charges, payments, statements." },
          { name: "Confirm your bill", url: "https://www.montana.edu/financialaid/confirm.html", desc: "The must-do step each semester." },
          { name: "Billing FAQ", url: "https://www.montana.edu/ubs/studentaccounts/faq.html", desc: "Authorized payers, reminders, deadlines." },
          { name: "Payment plan (QuikPay)", url: "https://www.montana.edu/ubs/studentaccounts/defpay.html", desc: "Installments — $50 setup fee; due dates." },
          { name: "Refund schedule", url: "https://www.montana.edu/ubs/studentaccounts/Student-Refund-Schedule.html", desc: "When refunds process by enrollment status." }
        ]},
        { name: "Parents & family", items: [
          { name: "Office of Financial Education", url: "https://www.montana.edu/aycss/financialedu/", desc: "Budgeting, planning, financial coaching." },
          { name: "Information for parents", url: "https://www.montana.edu/aycss/financialedu/financialedu_parents.html", desc: "Family support + Parent PLUS FAQ." },
          { name: "Paying for school", url: "https://www.montana.edu/aycss/financialedu/pay_for_school.html", desc: "Budget planner and the paying-for-school packet." }
        ]}
      ]
    }
  ]
};
