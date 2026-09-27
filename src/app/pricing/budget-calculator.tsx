"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { housing, layoutMonthlyShare, mealPlanRequired, monthlyEstimate, requiredMealPlan } from "@/data/housing";
import { cn } from "@/lib/utils";

const fields = [
  { key: "food", label: "Food / groceries", hint: "Meal plan or groceries per month", initial: 350 },
  { key: "utilities", label: "Utilities & internet", hint: "Usually $0 on campus", initial: 0 },
  { key: "transport", label: "Transportation", hint: "SEPTA, rideshare, parking", initial: 40 },
  { key: "other", label: "Everything else", hint: "Laundry, supplies, fun", initial: 150 },
] as const;

type Key = (typeof fields)[number]["key"];

export function BudgetCalculator() {
  const [slug, setSlug] = useState(housing[0].slug);
  const [costs, setCosts] = useState<Record<Key, number>>(
    Object.fromEntries(fields.map((f) => [f.key, f.initial])) as Record<Key, number>,
  );
  const [budget, setBudget] = useState(1500);

  const [layoutIndex, setLayoutIndex] = useState(0);

  const place = housing.find((h) => h.slug === slug)!;
  const layout = place.layouts[layoutIndex] ?? place.layouts[0];
  const rent = layoutMonthlyShare(place, layout);
  const mealPlan = mealPlanRequired(place) ? Math.round(requiredMealPlan.semester / 4.5) : 0;
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  const layoutPrice = layout.min === layout.max ? fmt(layout.min) : `${fmt(layout.min)}–${fmt(layout.max)}`;
  const usesFullRange =
    place.priceMin !== place.priceMax && layout.min === place.priceMin && layout.max === place.priceMax;
  const total = rent + mealPlan + Object.values(costs).reduce((a, b) => a + b, 0);
  const diff = budget - total;

  return (
    <div className="grid gap-6 rounded-2xl border bg-card p-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="calc-place">Where are you thinking of living?</Label>
          <select
            id="calc-place"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setLayoutIndex(0);
            }}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
          >
            {housing.map((h) => (
              <option key={h.slug} value={h.slug}>
                {h.name} (~${monthlyEstimate(h).toLocaleString()}/mo)
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="calc-layout">Bedrooms</Label>
          <select
            id="calc-layout"
            value={layoutIndex}
            onChange={(e) => setLayoutIndex(Number(e.target.value))}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
          >
            {place.layouts.map((l, i) => (
              <option key={l.label} value={i}>
                {l.label} (~${layoutMonthlyShare(place, l).toLocaleString()}/mo each)
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">
            {layout.splitBetween
              ? `${layoutPrice} a month for the whole apartment, split ${layout.splitBetween} ways.`
              : place.priceBasis
                ? `${layoutPrice} a month for the whole apartment. Living alone, you pay all of it.`
                : place.pricePeriod === "semester"
                ? `Temple bills each student ${layoutPrice} a semester, so roommates don't lower your rate.`
                : `${layoutPrice} a month per person. Each roommate pays their own rent, so this is already your share.`}
            {usesFullRange ? " The rate for this layout isn't listed separately, so this uses the building's full range." : ""}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label htmlFor={`calc-${f.key}`}>{f.label}</Label>
              <Input
                id={`calc-${f.key}`}
                type="number"
                min={0}
                className="h-10"
                value={costs[f.key]}
                onChange={(e) => setCosts((c) => ({ ...c, [f.key]: Math.max(0, Number(e.target.value) || 0) }))}
              />
              <p className="text-xs text-muted-foreground">
                {f.key === "food" && mealPlan
                  ? "Groceries beyond the required meal plan"
                  : f.hint}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="calc-budget">Your monthly budget</Label>
          <Input
            id="calc-budget"
            type="number"
            min={0}
            className="h-10"
            value={budget}
            onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-xl bg-foreground p-6 text-background">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-background/70">Your housing share</span>
            <span className="font-semibold">${rent.toLocaleString()}</span>
          </div>
          {mealPlan > 0 && (
            <div className="flex justify-between gap-3">
              <span className="text-background/70">Required meal plan</span>
              <span>${mealPlan.toLocaleString()}</span>
            </div>
          )}
          {fields.map((f) => (
            <div key={f.key} className="flex justify-between">
              <span className="text-background/70">{f.label}</span>
              <span>${costs[f.key].toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-background/20 pt-4">
          <p className="text-sm text-background/70">Estimated monthly total</p>
          <p className="font-heading text-4xl font-bold">${total.toLocaleString()}</p>
          <p className={cn("mt-2 text-sm font-medium", diff >= 0 ? "text-emerald-300" : "text-red-300")}>
            {diff >= 0
              ? `$${diff.toLocaleString()} under your budget`
              : `$${Math.abs(diff).toLocaleString()} over your budget`}
          </p>
        </div>
      </div>
    </div>
  );
}
