import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { HousingBrowser } from "./housing-browser";

export const metadata: Metadata = { title: "Browse Housing" };

export default async function HousingPage({ searchParams }: PageProps<"/housing">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const type = params.type === "on-campus" || params.type === "off-campus" ? params.type : "all";

  return (
    <>
      <PageHeader
        eyebrow="Browse housing"
        title="Every place to live near Main Campus"
        description="Filter residence halls and apartments by type, price, and distance, then dig into real student reviews."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <HousingBrowser initialQuery={q} initialType={type} />
      </div>
    </>
  );
}
