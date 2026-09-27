"use client";

import { useState } from "react";
import Link from "next/link";
import {
  formatPrice,
  guestPolicy,
  housing,
  mealPlanRequired,
  monthlyEstimate,
  requiredMealPlan,
  type Housing,
} from "@/data/housing";
import { cn } from "@/lib/utils";

const mealPlanMonthly = Math.round(requiredMealPlan.semester / 4.5);

function monthlyCost(place: Housing, newStudent: boolean) {
  const rent = monthlyEstimate(place);
  if (newStudent && mealPlanRequired(place)) return rent + mealPlanMonthly;
  return rent;
}

function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

function listed(place: Housing) {
  const period = place.pricePeriod === "semester" ? "semester" : "month";
  const basis = place.priceBasis ? `, ${place.priceBasis}` : "";
  return `${formatPrice(place)} / ${period}${basis}`;
}

function comparison(left: Housing, right: Housing, newStudent: boolean) {
  const leftCost = monthlyCost(left, newStudent);
  const rightCost = monthlyCost(right, newStudent);
  const gap = Math.abs(leftCost - rightCost);
  const cheaper = leftCost === rightCost ? null : leftCost < rightCost ? left : right;
  const cost = cheaper ? `${cheaper.name} is ${money(gap)} less a month.` : "Same monthly estimate.";

  const walkGap = Math.abs(left.walkMinutes - right.walkMinutes);
  const closer =
    left.walkMinutes === right.walkMinutes ? null : left.walkMinutes < right.walkMinutes ? left : right;
  const walk = closer
    ? `${closer.name} is ${walkGap} minute${walkGap === 1 ? "" : "s"} closer.`
    : "Same walk to campus.";

  return `${cost} ${walk}`;
}

function PlaceSelect({
  id,
  label,
  value,
  blocked,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  blocked: string;
  onChange: (slug: string) => void;
}) {
  const groups = [
    { label: "On campus", places: housing.filter((place) => place.type === "on-campus") },
    { label: "Off campus", places: housing.filter((place) => place.type === "off-campus") },
  ];

  return (
    <select
      id={id}
      aria-label={label}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full rounded-lg border bg-background px-3 text-sm"
    >
      <option value="">Choose a place</option>
      {groups.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.places.map((place) => (
            <option key={place.slug} value={place.slug} disabled={place.slug === blocked}>
              {place.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

function Side({ place }: { place: Housing | undefined }) {
  if (!place) return <div />;

  return (
    <div>
      <Link href={`/housing/${place.slug}`} className="font-heading text-lg font-semibold hover:text-primary">
        {place.name}
      </Link>
      <p className="text-sm text-muted-foreground">{place.style}</p>
    </div>
  );
}

export function PriceCompare() {
  const [leftSlug, setLeftSlug] = useState("");
  const [rightSlug, setRightSlug] = useState("");
  const [newStudent, setNewStudent] = useState(false);

  const left = housing.find((place) => place.slug === leftSlug);
  const right = housing.find((place) => place.slug === rightSlug);

  const rows = [
    {
      label: "Monthly",
      left: left ? money(monthlyCost(left, newStudent)) : "—",
      right: right ? money(monthlyCost(right, newStudent)) : "—",
      winner:
        left && right
          ? monthlyCost(left, newStudent) === monthlyCost(right, newStudent)
            ? null
            : monthlyCost(left, newStudent) < monthlyCost(right, newStudent)
              ? "left"
              : "right"
          : null,
      emphasis: true,
    },
    {
      label: "Listed",
      left: left ? listed(left) : "—",
      right: right ? listed(right) : "—",
    },
    {
      label: "Parking",
      left: left?.parking.summary ?? "—",
      right: right?.parking.summary ?? "—",
    },
    {
      label: "Walk",
      left: left ? `${left.walkMinutes} min` : "—",
      right: right ? `${right.walkMinutes} min` : "—",
      winner:
        left && right
          ? left.walkMinutes === right.walkMinutes
            ? null
            : left.walkMinutes < right.walkMinutes
              ? "left"
              : "right"
          : null,
    },
    {
      label: "Guests",
      left: left ? guestPolicy(left).summary : "—",
      right: right ? guestPolicy(right).summary : "—",
    },
    {
      label: "Meal plan",
      left: left ? (mealPlanRequired(left) ? "Required" : "Not required") : "—",
      right: right ? (mealPlanRequired(right) ? "Required" : "Not required") : "—",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          type="button"
          aria-pressed={newStudent}
          onClick={() => setNewStudent((on) => !on)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm font-medium",
            newStudent ? "border-primary bg-accent text-accent-foreground" : "hover:bg-muted",
          )}
        >
          New student
        </button>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <PlaceSelect
          id="compare-left"
          label="Left place"
          value={leftSlug}
          blocked={rightSlug}
          onChange={(slug) => {
            setLeftSlug(slug);
            if (slug && slug === rightSlug) setRightSlug("");
          }}
        />
        <span className="text-sm text-muted-foreground">vs</span>
        <PlaceSelect
          id="compare-right"
          label="Right place"
          value={rightSlug}
          blocked={leftSlug}
          onChange={(slug) => {
            setRightSlug(slug);
            if (slug && slug === leftSlug) setLeftSlug("");
          }}
        />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
        <Side place={left} />
        <span className="w-16 sm:w-24" />
        <div className="text-right">
          <Side place={right} />
        </div>
      </div>

      {left && right ? (
        <>
          <div className="divide-y border-y">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-3 py-3">
                <p
                  className={cn(
                    "text-sm",
                    row.emphasis && "font-heading text-2xl font-bold tabular-nums sm:text-3xl",
                    row.winner === "left" && "text-primary",
                  )}
                >
                  {row.left}
                </p>
                <p className="w-16 text-center text-xs text-muted-foreground sm:w-24 sm:text-sm">{row.label}</p>
                <p
                  className={cn(
                    "text-right text-sm",
                    row.emphasis && "font-heading text-2xl font-bold tabular-nums sm:text-3xl",
                    row.winner === "right" && "text-primary",
                  )}
                >
                  {row.right}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm">
            {comparison(left, right, newStudent)}
            {newStudent ? ` New student adds ${money(mealPlanMonthly)} a month on campus.` : ""}
          </p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">Choose one place on the left and one on the right.</p>
      )}
    </div>
  );
}
