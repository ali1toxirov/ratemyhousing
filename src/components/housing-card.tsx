import Link from "next/link";
import Image from "next/image";
import { Building2, Car, Footprints, MessageSquare, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/rating-badge";
import { formatPrice, formatWithRequiredMealPlan, guestPolicy, type Housing } from "@/data/housing";
import type { RatingSummary } from "@/lib/ratings";
import { cn } from "@/lib/utils";

export function HousingCover({
  housing,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  housing: Housing;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-gradient-to-br", housing.gradient, className)}>
      {housing.image ? (
        <Image
          src={housing.image.src}
          alt={housing.image.alt}
          fill
          priority={priority}
          quality={75}
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
          <Building2 className="absolute -right-4 -bottom-4 size-32 text-white/10" strokeWidth={1.25} />
        </>
      )}
      {housing.image && <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />}
      <div className="absolute top-3 left-3 flex gap-1.5">
        <Badge className="bg-white/90 text-foreground hover:bg-white/90">
          {housing.type === "on-campus" ? "On campus" : "Off campus"}
        </Badge>
        {housing.freshmen && <Badge className="bg-black/40 text-white">Freshman-friendly</Badge>}
      </div>
    </div>
  );
}

export function HousingCard({
  housing,
  summary,
  compact = false,
}: {
  housing: Housing;
  summary: RatingSummary;
  compact?: boolean;
}) {
  const withMealPlan = formatWithRequiredMealPlan(housing);
  return (
    <Link
      href={`/housing/${housing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
    >
      <HousingCover housing={housing} className="h-40" />
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
        {!compact && (
          <>
            <p className="line-clamp-2 text-sm text-muted-foreground">{housing.bestFor}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Car className="size-3.5 shrink-0" />
              {housing.parking.summary}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <UserPlus className="size-3.5 shrink-0" />
              Guests · {guestPolicy(housing).summary}
            </p>
          </>
        )}
        {!compact && (
        <div className="mt-auto flex items-end justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground">
              {formatPrice(housing)}
              <span className="font-normal text-muted-foreground">
                /{housing.pricePeriod === "semester" ? "sem" : "mo"}
                {housing.priceBasis ? ` · ${housing.priceBasis}` : ""}
              </span>
            </p>
            {withMealPlan && (
              <p className="mt-0.5 max-w-[14rem] leading-snug">
                <span className="font-semibold text-foreground">New students {withMealPlan}</span>
                {" · rent + 12 meals/week"}
              </p>
            )}
          </div>
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
        )}
      </div>
    </Link>
  );
}
