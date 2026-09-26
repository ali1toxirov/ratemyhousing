import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, children }: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b bg-gradient-to-b from-accent/70 to-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
