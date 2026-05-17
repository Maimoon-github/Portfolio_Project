// import * as React from "react";

// import { cn } from "./utils";

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base bg-input-background transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className,
//       )}
//       {...props}
//     />
//   );
// }

// export { Input };







































import * as React from "react";
import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-[var(--color-glass-border)] bg-[var(--color-surface-container-low)] px-3 py-1 text-base text-[var(--color-on-background)] transition-colors file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-on-background)] placeholder:text-[var(--color-outline)] selection:bg-[var(--color-primary)] selection:text-[var(--color-on-primary)] focus-visible:outline-none focus-visible:border-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:border-[var(--color-error)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };