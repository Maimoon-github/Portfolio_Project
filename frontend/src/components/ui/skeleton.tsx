// import { cn } from "./utils";

// function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="skeleton"
//       className={cn("bg-accent animate-pulse rounded-md", className)}
//       {...props}
//     />
//   );
// }

// export { Skeleton };































import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md bg-[var(--color-accent)]", className)}
      {...props}
    />
  );
}

export { Skeleton };