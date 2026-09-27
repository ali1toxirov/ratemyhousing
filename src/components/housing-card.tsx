import Link from "next/link";
import Image from "next/image";
import { Car, Footprints, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingBadge } from "@/components/rating-badge";
import { StreetView } from "@/components/street-view";
import { formatPrice, type Housing } from "@/data/housing";
import { streetViews } from "@/data/street-views";
import type { RatingSummary } from "@/lib/ratings";
import { cn } from "@/lib/utils";

export function HousingCover({
  housing,
  className,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  interactive = false,
}: {
  housing: Housing;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Lets visitors look around in Street View instead of showing a still cover. */
  interactive?: boolean;
}) {
  const camera = streetViews[housing.slug];
  const live = !housing.image && camera && interactive;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        housing.image
          ? "bg-oxblood"
          : housing.type === "on-campus"
            ? "bg-primary pattern-windows"
            : "bg-schist pattern-brick",
        className,
      )}
    >
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
          {camera && (
            <StreetView
              camera={camera}
              interactive={interactive}
              title={`Google Street View of ${housing.name}, ${housing.address}`}
            />
          )}
          {!live && (
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
          )}
        </>
      )}
      {housing.image && <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />}
      <div className={cn("absolute top-3 left-3 flex gap-1.5", live && "hidden")}>
        <Badge className="bg-white/90 text-neutral-900 hover:bg-white/90">
          {housing.type === "on-campus" ? "On campus" : "Off campus"}
        </Badge>
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
