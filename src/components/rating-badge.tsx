import { ratingColor } from "@/lib/ratings";
import { cn } from "@/lib/utils";

export function RatingBadge({ value, size = "md" }: { value: number; size?: "md" | "lg" }) {
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-lg font-heading font-bold tabular-nums",
        size === "lg" ? "size-16 text-3xl" : "h-8 min-w-8 px-1.5 text-sm",
        ratingColor(value),
      )}
    >
      {value ? value.toFixed(1) : "–"}
    </div>
  );
}
