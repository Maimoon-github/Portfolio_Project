import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md transition-colors",
        variant === "primary" ? "bg-blue-600 text-white" : "border border-gray-300",
        className
      )}
      {...props}
    />
  );
}
