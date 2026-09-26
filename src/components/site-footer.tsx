import Link from "next/link";
import { Logo, navLinks } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Honest, student-written reviews of on- and off-campus housing at Temple University. Built at
            OwlHacks.
          </p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Official resources</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="https://housing.temple.edu" target="_blank" rel="noreferrer" className="hover:text-foreground">
                Temple Housing & Residential Life
              </a>
            </li>
            <li>
              <a href="https://offcampus.temple.edu" target="_blank" rel="noreferrer" className="hover:text-foreground">
                Off-Campus Living
              </a>
            </li>
            <li>
              <a href="https://safety.temple.edu" target="_blank" rel="noreferrer" className="hover:text-foreground">
                Campus Safety Services
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        Not affiliated with Temple University. Prices are estimates. Always confirm with the property.
      </div>
    </footer>
  );
}
