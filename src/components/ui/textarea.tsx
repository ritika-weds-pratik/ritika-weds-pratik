import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-xl border border-[#d4af7a]/20 bg-[#0b1027]/80 px-4 py-3 text-sm text-[#f5efe0] outline-none ring-offset-background placeholder:text-[#f5efe0]/50 focus:border-[#d4af7a] focus:ring-2 focus:ring-[#d4af7a]/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
