import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.ComponentProps<"input"> {
  label: string;
  unit?: string;
  error?: string;
  children?: ReactNode;
}

export function InputField({
  label,
  unit,
  error,
  className,
  children,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="label-md flex items-center justify-between text-on-surface">
        {label}
        {unit && <span className="text-secondary text-xs font-normal">{unit}</span>}
      </Label>
      
      <div className="relative">
        <Input
          className={cn(
            "input text-lg",
            error && "border-destructive focus:border-destructive",
            className
          )}
          {...props}
        />
        {children}
      </div>
      
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}