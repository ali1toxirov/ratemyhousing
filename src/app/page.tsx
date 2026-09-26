import Link from "next/link";
import { ArrowRight, Building, DollarSign, Home, MapPin, Search, Star, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LiveStats, RecentReviews, TopRated } from "@/components/home/home-live-sections";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Search",
    body: "Browse every residence hall and popular apartment near Main Campus in one place.",
  },
  {
    icon: Star,
    title: "Compare",
    body: "See ratings for cleanliness, location, value, management, and noise side by side.",
  },
  {
    icon: Users,
    title: "Share",
    body: "Lived somewhere? Leave an anonymous review so the next class of Owls knows what to expect.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#9D2235] via-[#7f1b2b] to-[#4a0f19] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.14),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
              <MapPin className="size-3.5" /> Temple University · Main Campus
            </span>
            <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Find your place at Temple, rated by the students who live there.
            </h1>
            <p className="max-w-xl text-lg text-white/80">
              Honest reviews, real prices, and practical tips for dorms and apartments on and around Main Campus.
            </p>
            <form action="/housing" className="flex max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl sm:flex-row">
              <label htmlFor="hero-search" className="sr-only">
                Search housing
              </label>
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="size-5 text-muted-foreground" />
                <input
                  id="hero-search"
                  name="q"
                  placeholder="Search a dorm or apartment, e.g. Morgan Hall"
                  className="h-11 w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-11 px-6 text-base")}>
                Search
              </button>
            </form>
            <LiveStats />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/housing?type=on-campus"
            className="group flex items-center gap-5 rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <span className="grid size-14 place-items-center rounded-xl bg-accent text-primary">
              <Building className="size-7" />
            </span>
            <div className="flex-1">
              <h2 className="font-heading text-xl font-semibold">On-campus housing</h2>
              <p className="text-sm text-muted-foreground">Residence halls, suites, and university apartments.</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/housing?type=off-campus"
            className="group flex items-center gap-5 rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <span className="grid size-14 place-items-center rounded-xl bg-accent text-primary">
              <Home className="size-7" />
            </span>
            <div className="flex-1">
              <h2 className="font-heading text-xl font-semibold">Off-campus housing</h2>
              <p className="text-sm text-muted-foreground">Student apartments and rowhouse shares nearby.</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Top rated right now</h2>
            <p className="text-muted-foreground">The places students love most, based on recent reviews.</p>
          </div>
          <Link href="/housing" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            See all <ArrowRight className="size-4" />
          </Link>
        </div>
        <TopRated />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Latest reviews</h2>
            <p className="text-muted-foreground">Fresh from students on and around Main Campus.</p>
          </div>
          <Link href="/reviews" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            All reviews <ArrowRight className="size-4" />
          </Link>
        </div>
        <RecentReviews />
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="grid items-center gap-6 rounded-3xl bg-foreground p-8 text-background md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">Not sure what you can afford?</h2>
            <p className="mt-2 max-w-xl text-background/70">
              Compare dorm rates with off-campus rent, and use the budget calculator to estimate your real monthly
              cost.
            </p>
          </div>
          <Link href="/pricing" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "h-11 px-6 text-base")}>
            <DollarSign /> Explore pricing
          </Link>
        </div>
      </section>
    </>
  );
}
