import type { Metadata } from "next";
import { AlertTriangle, PiggyBank } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { photos } from "@/data/photos";
import { BudgetCalculator } from "./budget-calculator";
import { PriceCompare } from "./price-compare";

export const metadata: Metadata = { title: "Pricing" };

const hiddenCosts = [
  { title: "Meal plans", body: "New students in every residence hall must buy at least 12 meals a week, $2,389 per semester on top of the room rate. Returning students can skip it." },
  { title: "Security deposits", body: "Off-campus leases usually ask for one month's rent up front, plus an application fee." },
  { title: "Utilities overages", body: "\"Utilities included\" often means capped. Heating in January can push you over the limit." },
  { title: "12-month leases", body: "Many apartments lease August to July, so you may pay rent for summer months you're not there." },
  { title: "Furniture & move-in", body: "Unfurnished rowhouses mean buying a bed, desk, and kitchen basics." },
  { title: "Renter's insurance", body: "Often required off campus. It usually costs about $10–20 a month." },
];

const tips = [
  "Split a larger unit with more roommates. Per-person rent drops fast.",
  "Apply for Temple's housing grants and check the Cherry Pantry if money gets tight.",
  "Sign leases early (October–January) for the best off-campus prices.",
  "Compare the monthly total, not just the rent. Food and transportation add up.",
  "Ask current tenants about real utility bills before you sign.",
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        photo={photos.southEnd}
        title="What does living near Temple actually cost?"
        description="Choose one place on each side."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-bold">Compare</h2>
          <PriceCompare />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="font-heading text-2xl font-bold">Budget calculator</h2>
            <p className="text-muted-foreground">Pick a place, adjust your other expenses, and see your real monthly cost.</p>
          </div>
          <BudgetCalculator />
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 font-heading text-2xl font-bold">
              <AlertTriangle className="size-6 text-amber-500" /> Costs people forget
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {hiddenCosts.map((c) => (
                <div key={c.title} className="rounded-2xl border bg-card p-5">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-fit rounded-2xl bg-accent p-6">
            <h2 className="flex items-center gap-2 font-heading text-xl font-bold text-accent-foreground">
              <PiggyBank className="size-6" /> Ways to save
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {tips.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
