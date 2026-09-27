import Image from "next/image";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/utils";

export function PhotoFill({
  photo,
  priority = false,
  sizes = "100vw",
  className,
}: {
  photo: Photo;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      style={{ objectPosition: photo.position }}
    />
  );
}

export function PhotoCredit({ photo, className }: { photo: Photo; className?: string }) {
  return (
    <a
      href={photo.creditHref}
      target="_blank"
      rel="noreferrer"
      className={cn("text-[11px] text-white/70 underline-offset-2 hover:text-white hover:underline", className)}
    >
      Photo: {photo.credit}
    </a>
  );
}
