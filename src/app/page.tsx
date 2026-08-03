"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import WorksSection from "@/components/sections/WorksSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import PeopleSection from "@/components/sections/PeopleSection";
import ContactSection from "@/components/sections/ContactSection";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

/* ── Easing ── */
const EASE_EXPO  = [0.16, 1, 0.3, 1]  as const;

/* ── Variants ── */
const revealLine = {
  initial: { scaleX: 0, transformOrigin: "left" as const },
  animate: { scaleX: 1, transition: { duration: 1.4, ease: EASE_EXPO, delay: 0.2 } },
};
const maskReveal = (delay = 0) => ({
  initial: { y: "110%", opacity: 0 },
  animate: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE_EXPO, delay } },
});
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EXPO, delay } },
});
const imageReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.6, ease: EASE_EXPO, delay: 0.1 } },
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
  return <>{n}{suffix}</>;
}

/* ── Cursor blob ── */
function CursorBlob() {
  const x = useMotionValue(-160);
  const y = useMotionValue(-160);
  const sx = useSpring(x, { stiffness: 80, damping: 18 });
  const sy = useSpring(y, { stiffness: 80, damping: 18 });
  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX - 160); y.set(e.clientY - 160); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return (
    <motion.div
      style={{
        position: "fixed", width: 320, height: 320, borderRadius: "50%",
        pointerEvents: "none", zIndex: 9999,
        left: 0, top: 0, x: sx, y: sy,
        background: "radial-gradient(circle, rgba(232,224,208,0.07) 0%, transparent 65%)",
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
  const y  = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 40, damping: 20 });
  const iy = useTransform(sy, [-300, 300], ["-8%", "8%"]);
  useEffect(() => {
    const fn = () => y.set(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [y]);
  return (
    <motion.div style={{ position: "absolute", inset: 0, y: iy, scale: 1.12, willChange: "transform" }}>
      <img src={src} alt="Mukilan Architecture hero" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </motion.div>
  );
}

/* ── Main ── */
export default function HomePage() {
  const reduced = useReducedMotion();
  const NAV   = ["Works", "Studio", "Philosophy", "Contact"];
  const STATS = [{ label: "Projects", to: 94, suffix: "+" }, { label: "Years", to: 16, suffix: "" }, { label: "Awards", to: 32, suffix: "" }];
  const IMG   = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85";

  return (
    <>
      {!reduced && <CursorBlob />}

      <section className="hero">
        <div className="img-wrap">

          <motion.div style={{ position: "absolute", inset: 0 }} variants={imageReveal} initial="initial" animate="animate">
            <ParallaxImage src={IMG} />
          </motion.div>

          <div className="vig" /><div className="bot" /><div className="top" />

          {/* Right scroll */}
          <motion.div
            style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          >
            <span className="coord">25.0°N  80.1°W</span>
            <div className="scroll-track"><div className="scroll-fill" /></div>
          </motion.div>

          {/* Bottom content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 56px 60px" }}>
            <motion.div className="gline" variants={revealLine} initial="initial" animate="animate" />

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>

              {/* Left */}
              <div style={{ maxWidth: 640 }}>
                <div style={{ overflow: "hidden", marginBottom: 16 }}>
                  <motion.p style={{ fontFamily: "var(--font-body)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }} variants={maskReveal(0.6)} initial="initial" animate="animate">
                    Est. 2008 · Chennai, India
                  </motion.p>
                </div>

                <div style={{ overflow: "hidden" }}>
                  <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(54px,9vw,112px)", fontWeight: 200, lineHeight: 0.9, letterSpacing: "-0.03em", color: "#fff" }} variants={maskReveal(0.75)} initial="initial" animate="animate">
                    Architecture
                  </motion.h1>
                </div>

                <div style={{ overflow: "hidden", marginBottom: 26 }}>
                  <motion.h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(54px,9vw,112px)", fontWeight: 200, lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--sand)" }} variants={maskReveal(0.9)} initial="initial" animate="animate">
                    for Life
                  </motion.h1>
                </div>

                <motion.p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.46)", maxWidth: 360, marginBottom: 36 }} variants={fadeUp(1.2)} initial="initial" animate="animate">
                  Every structure exists in harmony with its environment — celebrating the threshold between built form and nature.
                </motion.p>

                <motion.div style={{ display: "flex", alignItems: "center", gap: 24 }} variants={fadeUp(1.4)} initial="initial" animate="animate">
                  <a href="#works" className="btn-p">
                    View Works
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                  </a>
                  <a href="#philosophy" className="btn-g">Our Philosophy</a>
                </motion.div>
              </div>

              {/* Right */}
              <motion.div className="right-block" style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-end", flexShrink: 0 }} variants={fadeUp(1.7)} initial="initial" animate="animate">
                <div className="badge">
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>Current Project</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>Bal Harbour Residence</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>Miami, FL — In Progress</span>
                </div>

                <div style={{ display: "flex", gap: 36 }}>
                  {STATS.map(({ label, to, suffix }) => (
                    <div key={label} style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 200, color: "var(--sand)", letterSpacing: "-0.04em", lineHeight: 1 }}><Counter to={to} suffix={suffix} /></div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* Stacked Sections */}
      <section id="works" className="relative w-full z-10 bg-[var(--bg-base)]">
        <WorksSection />
      </section>
      <section id="philosophy" className="relative w-full z-10 bg-[var(--bg-base)]">
        <PhilosophySection />
      </section>
      <section id="people" className="relative w-full z-10 bg-[var(--bg-base)]">
        <PeopleSection />
      </section>
      <section id="contact" className="relative w-full z-10 bg-[var(--bg-base)]">
        <ContactSection />
      </section>
    </>
  );
}
