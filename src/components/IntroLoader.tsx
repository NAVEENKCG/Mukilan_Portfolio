"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("mukilan_intro_played");
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("mukilan_intro_played", "true");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[var(--ink)] flex flex-col items-center justify-center pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="overflow-hidden mb-4">
                        <motion.h1
                            className="font-display text-4xl md:text-6xl text-[var(--sand)] tracking-[0.2em] uppercase font-light"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        >
                            Mukilan
                        </motion.h1>
                    </div>
                    <motion.div
                        className="w-[1px] h-0 bg-[var(--sand)] opacity-50"
                        initial={{ height: 0 }}
                        animate={{ height: 60 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                    />
                    <div className="overflow-hidden mt-4">
                        <motion.p
                            className="font-body text-xs md:text-sm text-[rgba(255,255,255,0.6)] tracking-[0.4em] uppercase"
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
                        >
                            Architecture
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default IntroLoader;
