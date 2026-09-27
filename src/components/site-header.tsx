"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, Moon, Search, Sun } from "lucide-react";
import { Logo, navLinks } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { THEME_COOKIE } from "@/lib/theme";
import { cn } from "@/lib/utils";

function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  document.cookie = `${THEME_COOKIE}=${next ? "dark" : "light"}; path=/; max-age=31536000; samesite=lax`;
}

function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }))}
    >
      <Sun className="hidden dark:inline" />
      <Moon className="dark:hidden" />
      <span className="sr-only">
        <span className="dark:hidden">Switch to dark mode</span>
        <span className="hidden dark:inline">Switch to light mode</span>
      </span>
    </button>
  );
}

function HeaderSearch({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = pathname === "/housing" ? (searchParams.get("q") ?? "") : "";
  const [query, setQuery] = useState(urlQuery);
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }

  return (
    <form action="/housing" className={cn("relative min-w-0", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        name="q"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Parking, kitchen, gym"
        aria-label="Search housing details"
        className="h-9 pl-8"
      />
    </form>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center gap-4">
          <div className="shrink-0">
            <Logo />
          </div>

          <nav className="hidden shrink-0 items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive(link.href) && "bg-accent text-accent-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Suspense fallback={<div className="hidden w-36 sm:block xl:w-48" />}>
              <HeaderSearch className="hidden w-36 sm:block xl:w-48" />
            </Suspense>
            <Link href="/reviews#write" className={cn(buttonVariants({ size: "lg" }), "hidden px-4 xl:inline-flex")}>
              Write a review
            </Link>
            <ThemeToggle />
          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "lg:hidden")}
              aria-label="Open menu"
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-base font-medium",
                      isActive(link.href) ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/reviews#write" className={cn(buttonVariants({ size: "lg" }), "mt-4 h-11")}>
                  Write a review
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          </div>
        </div>
        <Suspense fallback={null}>
          <HeaderSearch className="pb-3 sm:hidden" />
        </Suspense>
      </div>
    </header>
  );
}
