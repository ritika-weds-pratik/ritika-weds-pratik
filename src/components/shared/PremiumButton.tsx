import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PremiumButton({
  children,
  className,
  asChild = false,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
      <Button
        asChild={asChild}
        className={`group rounded-full border border-[#d4af7a]/35 bg-gradient-to-r from-[#d4af7a] via-[#f0d9a8] to-[#c9a24a] px-6 py-3 text-[#0b1027] shadow-[0_10px_30px_rgba(201,162,74,0.28)] ${className ?? ""}`}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            <span>{children}</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </motion.div>
  );
}
