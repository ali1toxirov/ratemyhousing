import type { CategoryRatings, Review } from "@/data/reviews";

export type RatingSummary = {
  count: number;
  average: number;
  recommendPct: number;
  categories: CategoryRatings;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

const round1 = (n: number) => Math.round(n * 10) / 10;

export function summarize(reviews: Review[]): RatingSummary {
  const count = reviews.length;
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const totals: CategoryRatings = { cleanliness: 0, location: 0, value: 0, management: 0, quiet: 0 };
  let sum = 0;
  let recommend = 0;

  for (const r of reviews) {
    sum += r.overall;
    distribution[r.overall as 1 | 2 | 3 | 4 | 5] += 1;
    if (r.wouldRecommend) recommend += 1;
    for (const key of Object.keys(totals) as (keyof CategoryRatings)[]) {
      totals[key] += r.ratings[key];
    }
  }

  const categories = Object.fromEntries(
    Object.entries(totals).map(([k, v]) => [k, count ? round1(v / count) : 0]),
  ) as CategoryRatings;

  return {
    count,
    average: count ? round1(sum / count) : 0,
    recommendPct: count ? Math.round((recommend / count) * 100) : 0,
    categories,
    distribution,
  };
}

export function ratingColor(value: number) {
  if (value >= 4) return "bg-emerald-600 text-white";
  if (value >= 3) return "bg-amber-400 text-amber-950";
  if (value > 0) return "bg-red-600 text-white";
  return "bg-muted text-muted-foreground";
}
