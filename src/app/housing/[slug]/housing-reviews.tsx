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

type Sort = "newest" | "helpful" | "highest" | "lowest";

export function HousingReviews({ slug, name }: { slug: string; name: string }) {
  const reviews = useReviews().filter((r) => r.housingSlug === slug);
  const summary = summarize(reviews);
  const [sort, setSort] = useState<Sort>("newest");

  const sorted = [...reviews].sort((a, b) => {
    if (sort === "helpful") return b.helpful - a.helpful;
    if (sort === "highest") return b.overall - a.overall;
    if (sort === "lowest") return a.overall - b.overall;
    return b.date.localeCompare(a.date);
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit space-y-6 rounded-2xl border bg-card p-6 lg:sticky lg:top-24">
        <div className="flex items-center gap-4">
          <RatingBadge value={summary.average} size="lg" />
          <div>
            <Stars value={summary.average} />
            <p className="mt-1 text-sm text-muted-foreground">
              Based on {summary.count} review{summary.count === 1 ? "" : "s"}
            </p>
            {summary.count > 0 && (
              <p className="text-sm font-medium text-emerald-700">{summary.recommendPct}% would recommend</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          {([5, 4, 3, 2, 1] as const).map((n) => {
            const pct = summary.count ? (summary.distribution[n] / summary.count) * 100 : 0;
            return (
              <div key={n} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-muted-foreground">{n}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-5 text-right text-muted-foreground">{summary.distribution[n]}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-3 border-t pt-5">
          {(Object.keys(categoryLabels) as (keyof CategoryRatings)[]).map((key) => (
            <div key={key}>
              <div className="flex justify-between text-sm">
                <span>{categoryLabels[key]}</span>
                <span className="font-semibold">{summary.categories[key] || "–"}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(summary.categories[key] / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <ReviewFormDialog
          housingSlug={slug}
          trigger={
            <Button size="lg" className="h-11 w-full text-base">
              <PenLine /> Review {name.split(" ")[0]}
            </Button>
          }
        />
      </aside>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-bold">Student reviews</h2>
          <div className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
            {(["newest", "helpful", "highest", "lowest"] as Sort[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                className={`rounded-md px-2.5 py-1 capitalize ${sort === s ? "bg-background font-medium shadow-sm" : "text-muted-foreground"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
            <MessageSquarePlus className="size-10 text-muted-foreground" />
            <h3 className="font-heading text-lg font-semibold">No reviews yet</h3>
            <p className="max-w-sm text-sm text-muted-foreground">Lived here? Be the first to help other students decide.</p>
          </div>
        ) : (
          sorted.map((r) => <ReviewCard key={r.id} review={r} />)
        )}
      </div>
    </div>
  );
}
