"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/review-card";
import { ReviewFormDialog } from "@/components/review-form";
import { housing } from "@/data/housing";
import { useReviews } from "@/lib/reviews-store";
import { cn } from "@/lib/utils";

type Filter = "all" | "on-campus" | "off-campus" | 1 | 2 | 3 | 4 | 5;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All reviews" },
  { value: "on-campus", label: "On campus" },
  { value: "off-campus", label: "Off campus" },
  { value: 5, label: "5 stars" },
  { value: 4, label: "4 stars" },
  { value: 3, label: "3 stars" },
  { value: 2, label: "2 stars" },
  { value: 1, label: "1 star" },
];

const typeOf = Object.fromEntries(housing.map((h) => [h.slug, h.type]));

export function ReviewsFeed() {
  const reviews = useReviews();
  const [filter, setFilter] = useState<Filter>("all");

  const shown = reviews.filter((r) => {
    if (filter === "on-campus" || filter === "off-campus") return typeOf[r.housingSlug] === filter;
    if (typeof filter === "number") return r.overall === filter;
    return true;
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.value ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              {f.label}
            </button>
          ))}
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
