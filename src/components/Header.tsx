"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import OverlayMenu from "./OverlayMenu";
import { navLinks } from "@/data/siteData";

const SCROLL_THRESHOLD = 80;
const SECTION_IDS = navLinks.map((l) => l.id.replace("#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const shouldReduceMotion = useReducedMotion();

  // Scroll detection for condensing + scroll-spy
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);

    // Scroll-spy: find which section is currently in viewport
    let current = "";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
          current = id;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-4 left-0 right-0 z-40 flex items-center justify-between mx-auto px-6 py-4 max-w-2xl rounded-3xl transition-all duration-500"
        style={{
          background: scrolled ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.03)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.04)",
          boxShadow: scrolled
            ? "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.3)"
            : "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          padding: scrolled ? "8px 24px" : "16px 24px",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="font-display text-[14px] tracking-[0.18em] uppercase text-white/[0.85] font-light hover:text-white transition-colors duration-300"
        >
          Mukilan
        </button>

        {/* Desktop Nav — visible on md+ */}
        <nav className="hidden md:flex items-center gap-1 relative" aria-label="Main navigation">
          {navLinks.slice(0, 4).map((link) => {
            const isActive = activeSection === link.id.replace("#", "");

            return (
              <a
                key={link.name}
                href={link.id}
                className="relative px-3 py-1.5 font-body text-[10px] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{
                  color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                }}
              >
                {/* Active pill indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.08] border border-white/[0.1] rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-3 text-white group"
          aria-label="Open navigation menu"
        >
          <span className="font-body text-[10px] tracking-[0.15em] uppercase text-white/[0.5] group-hover:text-white/[0.8] transition-colors duration-300">
            Menu
          </span>
          <div className="flex flex-col gap-[5px]">
            <div className="w-6 h-[1px] bg-white/[0.6] group-hover:w-8 group-hover:bg-white transition-all duration-300" />
            <div className="w-4 h-[1px] bg-white/[0.6] group-hover:w-8 group-hover:bg-white transition-all duration-300" />
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
