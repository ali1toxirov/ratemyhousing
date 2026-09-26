import { ratingColor } from "@/lib/ratings";
import { cn } from "@/lib/utils";

export function RatingBadge({ value, size = "md" }: { value: number; size?: "md" | "lg" }) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-xl font-heading font-bold tabular-nums",
        size === "lg" ? "size-20 text-4xl" : "size-12 text-lg",
        ratingColor(value),
      )}
    >
      {value ? value.toFixed(1) : "–"}
    </div>
  );
}
