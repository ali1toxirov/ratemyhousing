import Link from "next/link";
import { Logo, navLinks } from "@/components/logo";

const official = [
  { href: "https://housing.temple.edu", label: "Temple Housing & Residential Life" },
  { href: "https://offcampus.temple.edu", label: "Off-Campus Living" },
  { href: "https://campusoperations.temple.edu/parking-services/parking-rates/student-parking-rates", label: "Student parking rates" },
  { href: "https://bursar.temple.edu/payments/septa-semester-pass-program", label: "SEPTA student pass" },
  { href: "https://safety.temple.edu", label: "Campus Safety Services" },
];

const linkClass =
  "rounded-sm hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Student reviews of dorms and apartments around Temple’s Main Campus. Compare a place, then confirm the
            details with Temple Housing or the leasing office.
          </p>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Explore</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold">Official resources</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {official.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noreferrer" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        Not affiliated with Temple University. Built at OwlHacks.
      </div>
    </footer>
  );
}
