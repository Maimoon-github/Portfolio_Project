import { cn } from "@/lib/utils"

/**
 * Skeleton — uses tonal shift between surface steps for the shimmer effect.
 * Matches surface_container (#201f1f) → surface_container_highest (#353534).
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-secondary",
        "[background:linear-gradient(90deg,#201f1f_25%,#353534_50%,#201f1f_75%)]",
        "[background-size:400%_100%]",
        "animate-[shimmer_1.4s_ease_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }