"use client";

import { useEffect, useRef, useState } from "react";
import { streetViewEmbedUrl, type StreetViewCamera } from "@/data/street-views";
import { cn } from "@/lib/utils";

/**
 * Google's Street View embed. As a cover it's a still backdrop: clicks pass through
 * to the card, and it's oversized to crop Google's address box and controls while
 * keeping the Google logo and credits at the bottom visible.
 *
 * Browsers cap how many Street View panoramas can render at once, so covers only
 * mount while they're near the viewport.
 */
export function StreetView({
  camera,
  title,
  interactive = false,
}: {
  camera: StreetViewCamera;
  title: string;
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(interactive);

  useEffect(() => {
    if (interactive || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "150px 0px",
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [interactive]);

  return (
    <div ref={ref} className="absolute inset-0">
      {near && (
        <iframe
          src={streetViewEmbedUrl(camera)}
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen={interactive}
          tabIndex={interactive ? undefined : -1}
          aria-hidden={interactive ? undefined : true}
          className={cn(
            "absolute border-0",
            interactive
              ? "inset-0 size-full"
              : "pointer-events-none top-[-72px] left-0 h-[calc(100%+72px)] w-[calc(100%+64px)]",
          )}
        />
      )}
    </div>
  );
}
