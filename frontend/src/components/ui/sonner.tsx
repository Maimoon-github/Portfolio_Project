// "use client";

// import { useTheme } from "next-themes";
// import { Toaster as Sonner, ToasterProps } from "sonner";

// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = "system" } = useTheme();

//   return (
//     <Sonner
//       theme={theme as ToasterProps["theme"]}
//       className="toaster group"
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)",
//         } as React.CSSProperties
//       }
//       {...props}
//     />
//   );
// };

// export { Toaster };



























































"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-surface-container-lowest)",
          "--normal-text": "var(--color-on-background)",
          "--normal-border": "var(--color-glass-border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };