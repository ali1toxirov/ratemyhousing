"use client";

import { HousingCard } from "@/components/housing-card";
import { ReviewCard } from "@/components/review-card";
import { housing } from "@/data/housing";
import { summarize } from "@/lib/ratings";
import { useReviews } from "@/lib/reviews-store";

export function TopRated() {
  const reviews = useReviews();
  const ranked = housing
    .map((h) => ({ h, summary: summarize(reviews.filter((r) => r.housingSlug === h.slug)) }))
    .sort((a, b) => b.summary.average - a.summary.average || b.summary.count - a.summary.count)
    .slice(0, 3);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ranked.map(({ h, summary }) => (
        <HousingCard key={h.slug} housing={h} summary={summary} />
      ))}
    </div>
  );
}

export function RecentReviews() {
  const reviews = useReviews().slice(0, 3);
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} showHousing />
      ))}
    </div>
  );
}

export function LiveStats() {
  const reviews = useReviews();
  const stats = [
    { label: "Places rated", value: housing.length },
    { label: "Student reviews", value: reviews.length },
    { label: "Would recommend", value: `${summarize(reviews).recommendPct}%` },
  ];
  return (
    <dl className="grid grid-cols-3 gap-4 sm:max-w-lg">
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="text-xs text-white/70 sm:text-sm">{s.label}</dt>
          <dd className="font-heading text-2xl font-bold text-white sm:text-3xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
