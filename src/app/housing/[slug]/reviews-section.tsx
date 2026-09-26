"use client";

import { useState } from "react";
import { MessageSquarePlus, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingBadge } from "@/components/rating-badge";
import { ReviewCard } from "@/components/review-card";
import { ReviewFormDialog } from "@/components/review-form";
import { Stars } from "@/components/stars";
import { categoryLabels, type CategoryRatings } from "@/data/reviews";
import { summarize } from "@/lib/ratings";
import { useReviews } from "@/lib/reviews-store";
import { cn } from "@/lib/utils";

export function ReviewsSection({ slug, name }: { slug: string; name: string }) {
  const reviews = useReviews().filter((r) => r.housingSlug === slug);
  const summary = summarize(reviews);
  const [minStars, setMinStars] = useState(0);
  const shown = reviews.filter((r) => r.overall >= minStars);

  const writeButton = (
    <Button size="lg" className="h-11 px-5 text-base">
      <PenLine /> Write a review
    </Button>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <RatingBadge value={summary.average} size="lg" />
            <div>
              <Stars value={summary.average} />
              <p className="mt-1 text-sm text-muted-foreground">
                {summary.count} review{summary.count === 1 ? "" : "s"}
              </p>
              {summary.count > 0 && (
                <p className="text-sm font-medium text-emerald-700">{summary.recommendPct}% would recommend</p>
              )}
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {(Object.keys(categoryLabels) as (keyof CategoryRatings)[]).map((key) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{categoryLabels[key]}</span>
                  <span className="font-semibold tabular-nums">{summary.categories[key] || "–"}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(summary.categories[key] / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t pt-4">
            <ReviewFormDialog housingSlug={slug} trigger={writeButton} />
          </div>
        </div>
      </aside>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-bold">Student reviews</h2>
          <div className="flex flex-wrap gap-1.5">
            {[0, 4, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setMinStars(n)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  minStars === n ? "border-primary bg-accent text-accent-foreground" : "hover:bg-muted",
                )}
              >
                {n === 0 ? "All" : `${n}+ stars`}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-14 text-center">
            <MessageSquarePlus className="size-10 text-muted-foreground" />
            <h3 className="font-heading text-lg font-semibold">
              {reviews.length === 0 ? `No reviews for ${name} yet` : "No reviews match this filter"}
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              {reviews.length === 0
                ? "Lived here? Be the first to help future students decide."
                : "Try showing all ratings."}
            </p>
          </div>
        ) : (
          shown.map((r) => <ReviewCard key={r.id} review={r} />)
        )}
      </div>
    </div>
  );
}
