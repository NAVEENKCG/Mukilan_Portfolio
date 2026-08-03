"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";

const MENU_LINKS = [
    { name: "Works", id: "#works" },
    { name: "Philosophy", id: "#philosophy" },
    { name: "Studio", id: "#people" },
    { name: "Contact", id: "#contact" }
];

export function OverlayMenu({ onClose }: { onClose: () => void }) {
    const lenis = useLenis();

    const handleNavigate = (id: string) => {
        onClose();
        if (lenis) {
            lenis.scrollTo(id, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-[var(--ink)] flex flex-col justify-between px-6 py-8 md:px-12 md:py-8"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="flex justify-between items-center w-full">
                <span className="font-display text-[15px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.4)] font-light">
                    Mukilan
                </span>
                <button
                    onClick={onClose}
                    className="flex items-center gap-3 text-white group"
                >
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase group-hover:opacity-70 transition-opacity">
                        Close
                    </span>
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <div className="absolute w-6 h-[1px] bg-white rotate-45 group-hover:rotate-[225deg] transition-transform duration-500" />
                        <div className="absolute w-6 h-[1px] bg-white -rotate-45 group-hover:-rotate-[225deg] transition-transform duration-500" />
                    </div>
                </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-2 md:gap-4 flex-1">
                {MENU_LINKS.map((link, i) => (
                    <div key={link.name} className="overflow-hidden">
                        <motion.button
                            onClick={() => handleNavigate(link.id)}
                            className="font-display text-[clamp(48px,8vw,96px)] font-light tracking-tight text-white uppercase hover:text-[var(--sand)] transition-colors duration-300"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                        >
                            {link.name}
                        </motion.button>
                    </div>
                ))}
            </nav>

            <div className="flex justify-between items-end w-full text-[rgba(255,255,255,0.4)] font-body text-[10px] uppercase tracking-[0.2em]">
                <span>Est. 2008</span>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">IG</a>
                    <a href="#" className="hover:text-white transition-colors">IN</a>
                </div>
            </div>
        </motion.div>
    );
}

export default OverlayMenu;
