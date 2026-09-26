import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, ThumbsDown, ThumbsUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Housing Guide" };

const timeline = [
  { when: "After you're admitted", what: "Pay your enrollment deposit, then apply for on-campus housing through the Temple housing portal." },
  { when: "Spring", what: "Fill out your roommate preferences and rank your favorite residence halls." },
  { when: "Summer", what: "Room assignments come out. Connect with your roommate and plan who brings what." },
  { when: "Late August", what: "Move-in week. Arrive at your assigned time slot and bring a photo ID." },
  { when: "October–January", what: "Planning to move off campus next year? This is when the best apartments get leased." },
];

const compare = {
  on: {
    pros: ["Walk to class in minutes", "Utilities, Wi-Fi, and furniture included", "RAs and a staffed front desk", "Easiest way to make friends"],
    cons: ["Higher cost per month", "Meal plan often required", "Less privacy and space", "Move out over winter break (some halls)"],
  },
  off: {
    pros: ["More space and privacy", "Often cheaper, especially rowhouses", "Cook your own meals", "Live with friends you choose"],
    cons: ["Leases, deposits, and landlords", "Utilities and internet are on you", "Usually 12-month commitments", "Longer walk at night"],
  },
};

const checklist = [
  "Twin XL sheets (dorm beds are longer than normal twins)",
  "Shower caddy and shower shoes",
  "Desk lamp and a power strip with surge protection",
  "Fan for early fall",
  "Laundry bag and detergent",
  "Command hooks (no nails allowed in dorms)",
  "Painter's tape to put behind Command strips so they don't pull paint off the wall",
  "Small first-aid kit and basic meds",
  "A small trash can and trash bags. You take out your own trash, and the room does not come with a bin.",
  "Disinfecting wipes and a few hangers. The closet is empty.",
];

const faqs = [
  {
    q: "Do freshmen have to live on campus?",
    a: "Temple strongly encourages first-year students to live on campus, and most do. Check the current policy with Housing & Residential Life, since requirements and exemptions can change.",
  },
  {
    q: "What's the difference between a suite and a traditional dorm?",
    a: "In a traditional dorm you share a bathroom with your whole floor. In a suite, a few rooms share one private bathroom. Suites cost more but are more private.",
  },
  {
    q: "How do I find a roommate?",
    a: "Temple's housing portal has a roommate matching tool. Many students also meet through their class year's social media groups. Talk about sleep schedules, cleanliness, and guests before you commit.",
  },
  {
    q: "Is off-campus housing safe?",
    a: "Buildings closer to campus fall inside Temple's patrol zone. Use the TUr Safe app, walk with friends at night, and ask current tenants about the block before signing.",
  },
  {
    q: "What should I look for when touring an apartment?",
    a: "Check water pressure, signs of pests or mold, working smoke detectors, window locks, and cell signal. Ask what utilities cost in winter and how quickly maintenance responds.",
  },
];

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Housing guide"
        title="Everything you need to know about living at Temple"
        description="Deadlines, on- versus off-campus trade-offs, a packing list, and answers to the questions every new Owl asks."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
        <section>
          <h2 className="font-heading text-2xl font-bold">Housing timeline</h2>
          <ol className="mt-6 space-y-0 border-l-2 border-primary/30 pl-6">
            {timeline.map((t) => (
              <li key={t.when} className="relative pb-8 last:pb-0">
                <span className="absolute top-1 -left-[33px] size-4 rounded-full border-4 border-background bg-primary" />
                <p className="text-sm font-semibold text-primary">{t.when}</p>
                <p className="mt-1 text-muted-foreground">{t.what}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold">On campus vs. off campus</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {(
              [
                ["On campus", compare.on],
                ["Off campus", compare.off],
              ] as const
            ).map(([title, data]) => (
              <div key={title} className="rounded-2xl border bg-card p-6">
                <h3 className="font-heading text-xl font-semibold">{title}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {data.pros.map((p) => (
                    <li key={p} className="flex gap-2">
                      <ThumbsUp className="mt-0.5 size-4 shrink-0 text-emerald-600" /> {p}
                    </li>
                  ))}
                  {data.cons.map((c) => (
                    <li key={c} className="flex gap-2 text-muted-foreground">
                      <ThumbsDown className="mt-0.5 size-4 shrink-0 text-red-500" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold">Move-in checklist</h2>
            <ul className="mt-6 space-y-3">
              {checklist.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border bg-card p-3 text-sm">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">Frequently asked questions</h2>
            <Accordion className="mt-6 rounded-2xl border bg-card px-5">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-6 flex gap-3 rounded-2xl bg-accent p-5 text-sm">
              <ShieldCheck className="size-6 shrink-0 text-primary" />
              <p>
                <span className="font-semibold">Safety tip:</span> Save Temple Campus Safety&apos;s number
                (215-204-1234) in your phone and use the free walking escort service at night.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
