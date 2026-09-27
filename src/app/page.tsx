import Link from "next/link";
import { ArrowRight, DollarSign, MapPin, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LiveStats, RecentReviews, TopRated } from "@/components/home/home-live-sections";
import { PhotoCredit, PhotoFill } from "@/components/photo";
import { photos } from "@/data/photos";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Search",
    body: "Browse every residence hall and popular apartment near Main Campus in one place.",
  },
  {
    title: "Compare",
    body: "See ratings for cleanliness, location, value, management, and noise side by side.",
  },
  {
    title: "Share",
    body: "Lived somewhere? Leave an anonymous review so the next class of Owls knows what to expect.",
  },
];

function SectionHeading({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
      >
        {linkLabel} <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="bg-oxblood text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-6 pb-28 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12 md:pt-16 md:pb-32">
          <figure className="md:order-last">
            <div className="relative h-40 overflow-hidden rounded-2xl sm:h-64 md:h-[28rem]">
              <PhotoFill photo={photos.oconnorPlaza} priority sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
            <figcaption className="mt-1.5 text-right">
              <PhotoCredit photo={photos.oconnorPlaza} />
            </figcaption>
          </figure>
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-white/75">
              <MapPin className="size-4" /> Temple University, Main Campus
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Find your place at Temple, rated by the students who live there.
            </h1>
            <form
              action="/housing"
              className="mt-8 flex max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 text-neutral-950 shadow-2xl shadow-black/20 sm:flex-row"
            >
              <label htmlFor="hero-search" className="sr-only">
                Search housing
              </label>
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="size-5 text-neutral-500" />
                <input
                  id="hero-search"
                  name="q"
                  placeholder="Search a dorm or apartment, e.g. Morgan Hall"
                  className="h-11 w-full bg-transparent text-neutral-950 outline-none placeholder:text-neutral-500"
                />
              </div>
              <button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 text-base")}>
                Search
              </button>
            </form>
            <div className="mt-10 max-w-xl border-t border-white/20 pt-6">
              <LiveStats />
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto -mt-16 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              href: "/housing?type=on-campus",
              photo: photos.morganHall,
              title: "On-campus housing",
              body: "Residence halls, suites, and university apartments.",
            },
            {
              href: "/housing?type=off-campus",
              photo: photos.cecilBMoore,
              title: "Off-campus housing",
              body: "Student apartments and rowhouse shares nearby.",
            },
          ].map((c) => (
            <div
              key={c.href}
              className="group relative isolate flex h-56 flex-col justify-end overflow-hidden rounded-2xl bg-oxblood p-6 text-white shadow-xl shadow-black/15 focus-within:ring-3 focus-within:ring-ring/60 sm:h-64"
            >
              <PhotoFill
                photo={c.photo}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="-z-10 transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-oxblood via-oxblood/50 to-transparent" />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl font-semibold">
                    <Link href={c.href} className="outline-none after:absolute after:inset-0">
                      {c.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-white/80">{c.body}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-oxblood transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-5" />
                </span>
              </div>
              <PhotoCredit photo={c.photo} className="absolute top-3 right-4 z-10" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <SectionHeading
          title="Top rated right now"
          description="The places students love most, based on recent reviews."
          href="/housing"
          linkLabel="See all"
        />
        <TopRated />
      </section>

      <section className="mt-20 bg-blossom">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-primary pt-5">
                <span className="font-heading text-4xl font-bold text-primary tabular-nums">{i + 1}</span>
                <h3 className="mt-3 font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <SectionHeading
          title="Latest reviews"
          description="Fresh from students on and around Main Campus."
          href="/reviews"
          linkLabel="All reviews"
        />
        <RecentReviews />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="relative isolate grid items-center gap-6 overflow-hidden rounded-3xl bg-oxblood p-8 pb-12 text-white md:grid-cols-[1fr_auto] md:p-12">
          <PhotoFill photo={photos.charlesLibrary} sizes="(max-width: 1152px) 100vw, 1152px" className="-z-10" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-oxblood via-oxblood/85 to-oxblood/40"
          />
          <PhotoCredit photo={photos.charlesLibrary} className="absolute right-5 bottom-3" />
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">Not sure what you can afford?</h2>
            <p className="mt-2 max-w-xl text-white/80">
              Compare dorm rates with off-campus rent, and use the budget calculator to estimate your real monthly
              cost.
            </p>
          </div>
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-white px-6 text-base text-oxblood hover:bg-white/90",
            )}
          >
            <DollarSign /> Explore pricing
          </Link>
        </div>
      </section>
    </>
  );
}
