import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { photos } from "@/data/photos";
import { ReviewsFeed } from "./reviews-feed";

export const metadata: Metadata = { title: "Reviews" };

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        photo={photos.beuryBeach}
        title="What students are saying"
        description="Real experiences from Owls who lived there. Filter by on or off campus, or by an exact star rating from 1 to 5."
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ReviewsFeed />
      </div>
    </>
  );
}
