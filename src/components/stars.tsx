"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

export function StarInput({
  value,
  onChange,
  size = "md",
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md";
  label: string;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label={label} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
          className="rounded transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-ring"
        >
          <Star
            className={cn(
              size === "md" ? "size-7" : "size-5",
              i <= shown ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}
