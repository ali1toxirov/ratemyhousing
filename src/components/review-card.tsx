"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { Stars } from "@/components/stars";
import { categoryLabels, type CategoryRatings, type Review } from "@/data/reviews";
import { getHousing } from "@/data/housing";
import { deleteReview, useIsOwnReview } from "@/lib/reviews-store";
import { cn } from "@/lib/utils";

export function ReviewCard({ review, showHousing = false }: { review: Review; showHousing?: boolean }) {
  const [voted, setVoted] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const isOwn = useIsOwnReview(review.id);
  const place = getHousing(review.housingSlug);
  const date = new Date(`${review.date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="rounded-2xl border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          {showHousing && place && (
            <Link href={`/housing/${place.slug}`} className="text-xs font-semibold text-primary hover:underline">
              {place.name}
            </Link>
          )}
          <div className="flex items-center gap-2">
            <Stars value={review.overall} />
            <span className="text-sm font-semibold">{review.overall}.0</span>
          </div>
          <h3 className="font-heading text-base font-semibold">{review.title}</h3>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            review.wouldRecommend ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
          )}
        >
          {review.wouldRecommend ? <ThumbsUp className="size-3" /> : <ThumbsDown className="size-3" />}
          {review.wouldRecommend ? "Recommends" : "Doesn't recommend"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{review.body}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(Object.keys(categoryLabels) as (keyof CategoryRatings)[]).map((key) => (
          <span key={key} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            {categoryLabels[key]} <span className="font-semibold text-foreground">{review.ratings[key]}</span>
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <span>
          <span className="font-medium text-foreground">{review.author}</span> · {review.year} · {date}
        </span>
        <div className="flex items-center gap-1">
          {isOwn &&
            (confirming ? (
              <span className="flex items-center gap-1">
                <span className="font-medium text-foreground">Delete this review?</span>
                <button
                  type="button"
                  onClick={() => deleteReview(review.id)}
                  className="rounded-md px-2 py-1 font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="rounded-md px-2 py-1 transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-destructive"
              >
                <Trash2 className="size-3.5" /> Delete
              </button>
            ))}
          {!confirming && (
            <button
              type="button"
              onClick={() => setVoted((v) => !v)}
              className={cn(
                "flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted",
                voted && "text-primary",
              )}
            >
              <ThumbsUp className={cn("size-3.5", voted && "fill-current")} />
              Helpful ({review.helpful + (voted ? 1 : 0)})
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
