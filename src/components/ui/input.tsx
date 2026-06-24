import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#d4af7a]/20 bg-[#0b1027]/80 px-4 py-2 text-sm text-[#f5efe0] outline-none ring-offset-background placeholder:text-[#f5efe0]/50 focus:border-[#d4af7a] focus:ring-2 focus:ring-[#d4af7a]/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
