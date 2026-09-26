"use client";

import { useMemo, useSyncExternalStore } from "react";
import { seedReviews, type Review } from "@/data/reviews";

// There's no database yet: reviews written in the browser are saved to
// localStorage and merged with the seed reviews in src/data/reviews.ts.
const STORAGE_KEY = "ratemyhousing-reviews";
const EMPTY: Review[] = [];
const listeners = new Set<() => void>();
let cache: Review[] | null = null;

function isRemoved(review: Review) {
  return (
    review.housingSlug === "the-view-at-montgomery" &&
    review.title.trim().toLowerCase() === "nice rooms" &&
    review.body.toLowerCase().includes("management is iffyyy")
  );
}

function readLocal(): Review[] {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Review[];
    const next = parsed.filter((review) => !isRemoved(review));
    if (next.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    cache = next;
  } catch {
    cache = [];
  }
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addReview(review: Review) {
  const next = [review, ...readLocal()];
  cache = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export function useReviews() {
  const local = useSyncExternalStore(subscribe, readLocal, () => EMPTY);
  return useMemo(
    () =>
      [...local, ...seedReviews].sort((a, b) => b.date.localeCompare(a.date)),
    [local],
  );
}
