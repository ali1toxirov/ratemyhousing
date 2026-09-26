import Link from "next/link";
import { Building2 } from "lucide-react";

export const navLinks = [
  { href: "/housing", label: "Browse Housing" },
  { href: "/reviews", label: "Reviews" },
  { href: "/pricing", label: "Pricing" },
  { href: "/leasing", label: "How to Lease" },
  { href: "/guide", label: "Housing Guide" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Building2 className="size-4.5" />
      </span>
      <span>
        RateMy<span className="text-primary">Housing</span>
      </span>
    </Link>
  );
}
