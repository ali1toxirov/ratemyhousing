import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, GraduationCap, Home } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "How to Lease" };

const paths = [
  {
    icon: GraduationCap,
    title: "On campus",
    body: "You apply through Temple, not a landlord. After your enrollment deposit, open MyHousing from TUportal, finish the housing application, and pay the $250 housing deposit. That deposit holds your spot in room selection. If you are under 18, a parent or guardian has to approve the housing license.",
  },
  {
    icon: Home,
    title: "Off campus",
    body: "You apply on the apartment’s own website and sign a lease with them. Most student buildings rent by the bedroom, so each roommate applies and signs separately. Use the Start a lease button on a listing when you are ready to go to that property’s site.",
  },
];

const needs = [
  {
    title: "For a dorm",
    items: [
      "Your AccessNet login",
      "Enrollment deposit already paid",
      "$250 housing deposit, paid inside the application",
      "An emergency contact",
      "A parent or guardian, if you are under 18",
    ],
  },
  {
    title: "For an apartment",
    items: [
      "A photo ID",
      "Proof you are a Temple student, like an acceptance letter or class schedule",
      "A guarantor, usually a parent, if you do not earn enough to cover rent yourself",
      "An application fee, plus a security deposit that is often about one month of rent",
      "Time to read the lease. Many run August to July, including the summer.",
    ],
  },
];

const steps = [
  { n: "1", title: "Pick a place", body: "Compare reviews and price, then tour if you can. Ask what utilities really cost in winter." },
  { n: "2", title: "Apply", body: "On campus, that is MyHousing. Off campus, it is the property’s application, linked from the listing." },
  { n: "3", title: "Get approved", body: "Apartments usually check your guarantor. Dorms confirm your deposit and then open room selection." },
  { n: "4", title: "Sign and pay", body: "Read the full agreement before you sign. You are committed once you sign and pay the deposit." },
];

const previewFields = [
  { label: "Full name", value: "Your name" },
  { label: "Email", value: "you@temple.edu" },
  { label: "School", value: "Temple University" },
  { label: "Move-in", value: "August 2026" },
  { label: "Floor plan", value: "4-bedroom, private room" },
  { label: "Guarantor", value: "Parent or guardian" },
  { label: "Photo ID", value: "Uploaded" },
  { label: "Status", value: "Not submitted" },
];

export default function LeasingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leasing"
        title="How to start a lease"
        description="A short explanation of what you need before you apply for a dorm or sign an apartment. This page is information only. It does not submit an application."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6">
        <section>
          <h2 className="font-heading text-2xl font-bold">Two ways to get a place</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {paths.map((path) => (
              <div key={path.title} className="rounded-2xl border bg-card p-6">
                <path.icon className="size-5 text-primary" />
                <h3 className="mt-3 font-heading text-xl font-semibold">{path.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{path.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold">What you need</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {needs.map((group) => (
              <div key={group.title} className="rounded-2xl border bg-card p-6">
                <h3 className="font-heading text-xl font-semibold">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold">What happens next</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="rounded-2xl border bg-card p-5">
                <span className="grid size-8 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {step.n}
                </span>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-heading text-2xl font-bold">A preview of the application</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Off-campus applications usually ask for the details below. Yours will look a little different depending
              on the building. On-campus applications live inside MyHousing and ask for roommate preferences instead of
              a guarantor.
            </p>
            <Link href="/housing" className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
              Browse housing
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b bg-muted/50 px-5 py-3">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="size-4 text-primary" /> Lease application
              </p>
              <Badge variant="outline">Preview</Badge>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-2">
              {previewFields.map((field) => (
                <div key={field.label}>
                  <p className="text-xs font-medium text-muted-foreground">{field.label}</p>
                  <p className="mt-1 rounded-lg border bg-muted/40 px-3 py-2 text-sm">{field.value}</p>
                </div>
              ))}
            </div>
            <p className="border-t px-5 py-4 text-sm text-muted-foreground">
              Example only. Nothing on this page is submitted, and it is not a real lease.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
