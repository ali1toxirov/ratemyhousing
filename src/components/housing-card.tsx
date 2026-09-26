import Link from "next/link";
import { Building2, Footprints, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/rating-badge";
import { formatPrice, type Housing } from "@/data/housing";
import type { RatingSummary } from "@/lib/ratings";
import { cn } from "@/lib/utils";

export function HousingCover({ housing, className }: { housing: Housing; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", housing.gradient, className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
      <Building2 className="absolute -right-4 -bottom-4 size-32 text-white/10" strokeWidth={1.25} />
      <div className="absolute top-3 left-3 flex gap-1.5">
        <Badge className="bg-white/90 text-foreground hover:bg-white/90">
          {housing.type === "on-campus" ? "On campus" : "Off campus"}
        </Badge>
        {housing.freshmen && <Badge className="bg-black/40 text-white">Freshman-friendly</Badge>}
      </div>
    </div>
  );
}

export function HousingCard({ housing, summary }: { housing: Housing; summary: RatingSummary }) {
  return (
    <Link
      href={`/housing/${housing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
    >
      <HousingCover housing={housing} className="h-32" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-heading text-base font-semibold leading-tight group-hover:text-primary">
              {housing.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {housing.style} · {housing.address}
            </p>
          </div>
          <RatingBadge value={summary.average} />
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{housing.bestFor}</p>
        <div className="mt-auto flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {formatPrice(housing)}
            <span className="font-normal text-muted-foreground">/{housing.pricePeriod === "semester" ? "sem" : "mo"}</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Footprints className="size-3.5" />
              {housing.walkMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3.5" />
              {summary.count}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
