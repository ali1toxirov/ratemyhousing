"use client";

import { useMemo, useState } from "react";
import { SearchX, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HousingCard } from "@/components/housing-card";
import { housing, monthlyEstimate } from "@/data/housing";
import { summarize } from "@/lib/ratings";
import { useReviews } from "@/lib/reviews-store";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | "on-campus" | "off-campus";
type Sort = "rating" | "reviews" | "price" | "distance";

const sortItems: { value: Sort; label: string }[] = [
  { value: "rating", label: "Top rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "price", label: "Lowest to highest" },
  { value: "distance", label: "Distance descending" },
];

const typeTabs: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "on-campus", label: "On campus" },
  { value: "off-campus", label: "Off campus" },
];

export function HousingBrowser({ initialQuery, initialType }: { initialQuery: string; initialType: TypeFilter }) {
  const reviews = useReviews();
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<TypeFilter>(initialType);
  const [sort, setSort] = useState<Sort>("rating");
  const [freshmenOnly, setFreshmenOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return housing
      .filter((h) => type === "all" || h.type === type)
      .filter((h) => !freshmenOnly || h.freshmen)
      .filter((h) => !q || `${h.name} ${h.address} ${h.style}`.toLowerCase().includes(q))
      .map((h) => ({ h, summary: summarize(reviews.filter((r) => r.housingSlug === h.slug)) }))
      .sort((a, b) => {
        if (sort === "rating") return b.summary.average - a.summary.average;
        if (sort === "reviews") return b.summary.count - a.summary.count;
        if (sort === "price") return monthlyEstimate(a.h) - monthlyEstimate(b.h);
        return b.h.walkMinutes - a.h.walkMinutes;
      });
  }, [reviews, query, type, sort, freshmenOnly]);

  function clearFilters() {
    setQuery("");
    setType("all");
    setFreshmenOnly(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, street, or style"
            className="h-10 pl-9"
            aria-label="Search housing"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg bg-muted p-1">
            {typeTabs.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  type === t.value ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFreshmenOnly((v) => !v)}
            className={cn(
              "h-10 rounded-lg border px-3 text-sm font-medium transition-colors",
              freshmenOnly ? "border-primary bg-accent text-accent-foreground" : "hover:bg-muted",
            )}
          >
            Freshman-friendly
          </button>
          <Select items={sortItems} value={sort} onValueChange={(v) => v && setSort(v as Sort)}>
            <SelectTrigger className="h-10 w-44" aria-label="Sort by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortItems.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{results.length}</span> of {housing.length} places
      </p>

      {results.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <h2 className="font-heading text-lg font-semibold">No places match your filters</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Try a different search term or clear your filters to see every option.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ h, summary }) => (
            <HousingCard key={h.slug} housing={h} summary={summary} />
          ))}
        </div>
      )}
    </div>
  );
}
