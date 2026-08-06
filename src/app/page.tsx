"use client";

import { useEffect, useState } from "react";
import AboutSection from "@/components/sections/AboutSection";
import WorksSection from "@/components/sections/WorksSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import PeopleSection from "@/components/sections/PeopleSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import { siteConfig } from "@/data/siteData";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

/* ── Easing ── */
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Variants ── */
const revealLine = {
  initial: { scaleX: 0, transformOrigin: "left" as const },
  animate: {
    scaleX: 1,
    transition: { duration: 1.4, ease: EASE_EXPO, delay: 0.2 },
  },
};
const maskReveal = (delay = 0) => ({
  initial: { y: "110%", opacity: 0 },
  animate: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_EXPO, delay },
  },
});
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_EXPO, delay },
  },
});
const imageReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.6, ease: EASE_EXPO, delay: 0.1 },
  },
};

/* ── Counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setN(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [to]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

/* ── Cursor blob ── */
function CursorBlob() {
  const x = useMotionValue(-160);
  const y = useMotionValue(-160);
  const sx = useSpring(x, { stiffness: 80, damping: 18 });
  const sy = useSpring(y, { stiffness: 80, damping: 18 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      x.set(e.clientX - 160);
      y.set(e.clientY - 160);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return (
    <motion.div
      style={{
        position: "fixed",
        width: 320,
        height: 320,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 50,
        left: 0,
        top: 0,
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(232,224,208,0.07) 0%, transparent 65%)",
        mixBlendMode: "screen" as const,
        willChange: "transform",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: EASE_EXPO }}
    />
  );
}

/* ── Parallax image ── */
function ParallaxImage({ src }: { src: string }) {
  const y = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 40, damping: 20 });
  const iy = useTransform(sy, [-300, 300], ["-8%", "8%"]);
  useEffect(() => {
    const fn = () => y.set(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [y]);
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        y: iy,
        scale: 1.12,
        willChange: "transform",
      }}
    >
      <img
        src={src}
        alt="Mukilan Architecture hero"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </motion.div>
  );
}

/* ── Main ── */
export default function HomePage() {
  const reduced = useReducedMotion();
  const { stats, currentProject } = siteConfig;
  const IMG = "/images/hero.png";

  return (
    <>
      {!reduced && <CursorBlob />}

      {/* ───── HERO (ARQX Inspired) ───── */}
      <section className="relative h-[110svh] sm:h-[130svh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Concentric Circles Background */}
          <div aria-hidden="true" className="absolute inset-0 z-0">
            <div className="relative flex items-center justify-center h-full w-full opacity-60">
              <div 
                className="h-44 w-44 sm:h-60 sm:w-60 rounded-full" 
                style={{
                  background: "radial-gradient(circle at 34% 28%, rgba(255,255,255,0.02), rgba(13,21,38,0.5) 46%, rgba(78,205,196,0.08) 72%, transparent 82%)",
                  boxShadow: "inset -10px -12px 40px rgba(78,205,196,0.08), inset 16px 14px 30px rgba(255,255,255,0.05), 0 30px 60px -24px rgba(0,0,0,0.5)"
                }}
              />
              <motion.div 
                className="absolute h-44 w-44 sm:h-60 sm:w-60 rounded-full border border-[var(--accent-vivid)]/20" 
                style={{ transform: "scale(1.22)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute h-44 w-44 sm:h-60 sm:w-60 rounded-full border border-white/5" 
                style={{ transform: "scale(1.42)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Vignette fade for the grid behind text */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5]" style={{ background: "radial-gradient(135% 115% at 0% 100%, var(--bg-base) 30%, rgba(5,10,24,0.55) 54%, transparent 78%)" }}></div>

          {/* Top fixed labels */}
          <motion.div 
            className="pointer-events-none absolute inset-x-0 top-0 z-10 mx-auto max-w-7xl px-5 sm:px-8 pt-24 sm:pt-28 flex items-start justify-between font-mono text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <span>Digital Infrastructure</span>
            <span className="flex items-center gap-2 text-white/30">
              <span className="h-1 w-1 rounded-full bg-[var(--accent-vivid)]"></span> Systems Online
            </span>
          </motion.div>

          {/* Bottom Content */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-5 sm:px-8 pb-24 sm:pb-28">
            <motion.p 
              className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-vivid)]"
              variants={fadeUp(1.2)}
              initial="initial"
              animate="animate"
            >
              Mukilan · Engineered for life
            </motion.p>
            
            <motion.h1 
              className="text-lift text-edge font-display font-bold text-white leading-[0.94] tracking-tight max-w-[15ch]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
              variants={fadeUp(1.4)}
              initial="initial"
              animate="animate"
            >
              We architect what others <span className="text-white [-webkit-text-stroke:0] [-webkit-text-fill-color:white]">assemble.</span>
            </motion.h1>

            <motion.div 
              className="pointer-events-auto mt-8 flex flex-wrap items-center gap-5"
              variants={fadeUp(1.6)}
              initial="initial"
              animate="animate"
            >
              <a data-cursor="hover" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bg-base transition-colors hover:bg-[var(--accent)] hover:text-bg-base" href="#works">
                <span className="relative z-10">// View our works</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
                </svg>
              </a>
              <p className="max-w-xs text-sm text-white/50 leading-relaxed">
                Modern buildings, carefully balancing individual needs and location attributes.
              </p>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div 
            className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 [@media(max-height:640px)]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll to enter</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path>
              </svg>
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ───── SECTIONS ───── */}
      <section id="about" className="relative w-full z-10 bg-bg-base">
        <AboutSection />
      </section>

      <section id="works" className="relative w-full z-10 bg-bg-base">
        <WorksSection />
      </section>

      <section id="philosophy" className="relative w-full z-10 bg-bg-base">
        <PhilosophySection />
      </section>

      <section id="experience" className="relative w-full z-10 bg-bg-base">
        <ExperienceSection />
      </section>

      <section id="skills" className="relative w-full z-10 bg-bg-base">
        <SkillsSection />
      </section>

      <section id="people" className="relative w-full z-10 bg-bg-base">
        <PeopleSection />
      </section>

      <section id="contact" className="relative w-full z-10 bg-bg-base">
        <ContactSection />
      </section>

      <Footer />
    </>
  );
}
