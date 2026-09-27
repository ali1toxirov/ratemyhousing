import type { ReactNode } from "react";
import { PhotoCredit, PhotoFill } from "@/components/photo";
import type { Photo } from "@/data/photos";

export function PageHeader({ photo, title, description, children }: {
  photo: Photo;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-oxblood text-white">
      <PhotoFill photo={photo} priority className="-z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-oxblood via-oxblood/85 to-oxblood/30" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-20 pb-12 sm:px-6 md:flex-row md:items-end md:justify-between md:pt-28">
        <div className="max-w-2xl space-y-3">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h1>
          <p className="max-w-xl text-white/80">{description}</p>
        </div>
        {children}
      </div>
      <PhotoCredit photo={photo} className="absolute right-4 bottom-3 sm:right-6" />
    </section>
  );
}
