"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/review-card";
import { ReviewFormDialog } from "@/components/review-form";
import { housing } from "@/data/housing";
import { useReviews } from "@/lib/reviews-store";
import { cn } from "@/lib/utils";

type Place = "all" | "on-campus" | "off-campus";

const places: { value: Place; label: string }[] = [
  { value: "all", label: "All reviews" },
  { value: "on-campus", label: "On campus" },
  { value: "off-campus", label: "Off campus" },
];

const starOptions = [5, 4, 3, 2, 1];

const typeOf = Object.fromEntries(housing.map((h) => [h.slug, h.type]));

export function ReviewsFeed() {
  const reviews = useReviews();
  const [place, setPlace] = useState<Place>("all");
  const [stars, setStars] = useState(0);

  const shown = reviews.filter(
    (r) => (place === "all" || typeOf[r.housingSlug] === place) && (stars === 0 || r.overall === stars),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {places.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPlace(p.value)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  place === p.value ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            Rating
            <select
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              className="h-9 rounded-lg border bg-background px-3 text-sm"
            >
              <option value={0}>All ratings</option>
              {starOptions.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "star" : "stars"}
                </option>
              ))}
            </select>
          </label>
        </div>
        {shown.length === 0 ? (
          <p className="rounded-2xl border border-dashed py-16 text-center text-sm text-muted-foreground">
            No reviews match this filter yet.
          </p>
        ) : (
          shown.map((r) => <ReviewCard key={r.id} review={r} showHousing />)
        )}
      </div>

      <aside id="write" className="h-fit scroll-mt-24 space-y-4 rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="font-heading text-lg font-semibold">Share your experience</h2>
        <p className="text-sm text-muted-foreground">
          Your review helps incoming students avoid surprises. It takes about two minutes and can be anonymous.
        </p>
        <ReviewFormDialog
          trigger={
            <Button size="lg" className="h-11 w-full text-base">
              <PenLine /> Write a review
            </Button>
          }
        />
        <div className="border-t pt-4 text-sm">
          <h3 className="font-semibold">Review guidelines</h3>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-muted-foreground">
            <li>Describe your own experience.</li>
            <li>Be specific: noise, maintenance, safety, cost.</li>
            <li>No names of RAs, roommates, or staff.</li>
            <li>Keep it respectful.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
