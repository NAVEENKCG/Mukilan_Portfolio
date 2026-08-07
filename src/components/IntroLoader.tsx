"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

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
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[var(--bg-base)] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                >
                    {/* Subtle Background Accent */}
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />

                    <div className="relative flex flex-col items-center z-10">
                        <div className="overflow-hidden mb-8">
                            <motion.div 
                                className="font-display font-light text-4xl md:text-6xl text-white tracking-[0.3em] uppercase"
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
                            >
                                Mukilan
                            </motion.div>
                        </div>
                        
                        {/* Elegant Loading Line */}
                        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 bottom-0 bg-white"
                                initial={{ width: "0%", x: "0%" }}
                                animate={{ width: ["0%", "100%", "100%"], x: ["0%", "0%", "100%"] }}
                                transition={{ duration: 2.2, ease: "easeInOut", times: [0, 0.6, 1] }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default IntroLoader;
