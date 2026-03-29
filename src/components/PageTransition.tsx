"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE_OUT_EXPO } from "@/lib/animations";

interface PageTransitionProps {
    children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={EASE_OUT_EXPO}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default PageTransition;
