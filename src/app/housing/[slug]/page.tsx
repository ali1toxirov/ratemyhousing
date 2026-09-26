import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BedDouble, Car, Check, DollarSign, ExternalLink, Footprints, GraduationCap, MapPin, Users } from "lucide-react";
import { HousingCover } from "@/components/housing-card";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice, getHousing, housing } from "@/data/housing";
import { cn } from "@/lib/utils";
import { HousingReviews } from "./housing-reviews";

export function generateStaticParams() {
  return housing.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/housing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getHousing(slug)?.name ?? "Not found" };
}

export default async function HousingDetailPage({ params }: PageProps<"/housing/[slug]">) {
  const { slug } = await params;
  const place = getHousing(slug);
  if (!place) notFound();

  const facts = [
    {
      icon: DollarSign,
      label: "Price",
      value: `${formatPrice(place)} / ${place.pricePeriod}${place.priceBasis ? ` (${place.priceBasis})` : ""}`,
    },
    { icon: Footprints, label: "Walk to Bell Tower", value: `~${place.walkMinutes} minutes` },
    { icon: BedDouble, label: "Room types", value: place.roomTypes.join(", ") },
    { icon: GraduationCap, label: "Freshmen", value: place.freshmen ? "Open to first-years" : "Sophomores and up" },
    {
      icon: Users,
      label: "Staff",
      value: place.type === "on-campus" ? "RAs live in the hall" : "No RAs · property staff",
    },
    { icon: Car, label: "Parking", value: place.parking.summary },
  ];

  return (
    <>
      <HousingCover
        housing={place}
        priority={Boolean(place.image)}
        sizes="100vw"
        className={place.image ? "h-72 sm:h-96" : "h-48 sm:h-64"}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative -mt-16 rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <Link href="/housing" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> All housing
          </Link>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{place.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-4" /> {place.address} · {place.style}
          </p>
          {place.image && (
            <p className="mt-1 text-xs text-muted-foreground">
              Photo:{" "}
              <a href={place.image.creditHref} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
                {place.image.credit}
              </a>
            </p>
          )}
          <p className="mt-4 max-w-3xl leading-relaxed">{place.description}</p>

          {place.website && (
            <a
              href={place.website.url}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "mt-5")}
            >
              {place.website.label}
              <ExternalLink />
            </a>
          )}

          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="rounded-xl bg-muted/60 p-4">
                <dt className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <f.icon className="size-3.5" /> {f.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h2 className="text-sm font-semibold">Amenities</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {place.amenities.map((a) => (
                <li key={a} className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
                  <Check className="size-3.5 text-emerald-600" /> {a}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{place.parking.detail}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            On-campus rates are Temple&apos;s published 2026–27 semester prices. Apartment figures are current advertised rents and can change. Confirm rent and parking with Temple Housing, Temple Parking Services, or the property before you sign.
          </p>
        </div>

        <div className="mt-10">
          <HousingReviews slug={place.slug} name={place.name} />
        </div>
      </div>
    </>
  );
}
