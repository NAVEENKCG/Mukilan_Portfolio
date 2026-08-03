"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OverlayMenu from "./OverlayMenu";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <button 
                    onClick={scrollToTop}
                    className="font-display text-[15px] tracking-[0.22em] uppercase text-white font-light pointer-events-auto hover:opacity-70 transition-opacity"
                >
                    Mukilan
                </button>
                
                <button
                    onClick={() => setMenuOpen(true)}
                    className="flex items-center gap-3 text-white pointer-events-auto group"
                >
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase group-hover:opacity-70 transition-opacity">
                        Menu
                    </span>
                    <div className="flex flex-col gap-[5px]">
                        <div className="w-6 h-[1px] bg-white group-hover:w-8 transition-all duration-300" />
                        <div className="w-4 h-[1px] bg-white group-hover:w-8 transition-all duration-300" />
                    </div>
                </button>
            </motion.header>

            <AnimatePresence>
                {menuOpen && <OverlayMenu onClose={() => setMenuOpen(false)} />}
            </AnimatePresence>
        </>
    );
}

export default Header;
