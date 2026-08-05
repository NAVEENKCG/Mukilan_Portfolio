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

      {/* ───── HERO ───── */}
      <section className="hero">
        <div className="img-wrap">
          {/* Gradient mesh overlay */}
          <div className="hero-gradient-mesh" />

          <motion.div
            style={{ position: "absolute", inset: 0 }}
            variants={imageReveal}
            initial="initial"
            animate="animate"
          >
            <ParallaxImage src={IMG} />
          </motion.div>

          <div className="vig" />
          <div className="bot" />
          <div className="top" />

          {/* Right scroll indicator */}
          <motion.div
            style={{
              position: "absolute",
              right: 28,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <span className="coord">25.0°N 80.1°W</span>
            <div className="scroll-track">
              <div className="scroll-fill" />
            </div>
          </motion.div>

          {/* Bottom content */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              padding: "0 56px 60px",
            }}
          >
            <motion.div
              className="gline"
              variants={revealLine}
              initial="initial"
              animate="animate"
            />

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 40,
              }}
            >
              {/* Left */}
              <div style={{ maxWidth: 640 }}>
                <div style={{ overflow: "hidden", marginBottom: 16 }}>
                  <motion.p
                    className="font-body text-[10px] tracking-[0.3em] uppercase text-white/[0.38]"
                    variants={maskReveal(0.6)}
                    initial="initial"
                    animate="animate"
                  >
                    Est. {siteConfig.established} · {siteConfig.location}
                  </motion.p>
                </div>

                <div style={{ overflow: "hidden" }}>
                  <motion.h1
                    className="font-display font-extralight leading-[0.9] text-white"
                    style={{
                      fontSize: "clamp(54px,9vw,112px)",
                      letterSpacing: "-0.03em",
                    }}
                    variants={maskReveal(0.75)}
                    initial="initial"
                    animate="animate"
                  >
                    Architecture
                  </motion.h1>
                </div>

                <div style={{ overflow: "hidden", marginBottom: 26 }}>
                  <motion.h1
                    className="font-display font-extralight leading-[0.9] text-sand"
                    style={{
                      fontSize: "clamp(54px,9vw,112px)",
                      letterSpacing: "-0.03em",
                    }}
                    variants={maskReveal(0.9)}
                    initial="initial"
                    animate="animate"
                  >
                    for Life
                  </motion.h1>
                </div>

                <motion.p
                  className="font-body text-[14px] leading-[1.8] text-white/[0.46] max-w-[360px] mb-9"
                  variants={fadeUp(1.2)}
                  initial="initial"
                  animate="animate"
                >
                  {siteConfig.description}
                </motion.p>

                <motion.div
                  className="flex items-center gap-6"
                  variants={fadeUp(1.4)}
                  initial="initial"
                  animate="animate"
                >
                  <a href="#works" className="btn-p">
                    View Works
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </a>
                  <a href="#philosophy" className="btn-g">
                    Our Philosophy
                  </a>
                </motion.div>
              </div>

              {/* Right */}
              <motion.div
                className="right-block flex flex-col gap-7 items-end shrink-0"
                variants={fadeUp(1.7)}
                initial="initial"
                animate="animate"
              >
                <div className="badge">
                  <span className="font-body text-[9px] tracking-[0.25em] uppercase text-white/[0.28]">
                    Current Project
                  </span>
                  <span className="font-display text-[15px] font-light text-white/[0.85] tracking-tight">
                    {currentProject.name}
                  </span>
                  <span className="font-body text-[9px] tracking-[0.15em] text-white/[0.28] uppercase">
                    {currentProject.location} — {currentProject.status}
                  </span>
                </div>

                <div className="flex gap-9">
                  {stats.map(({ label, value, suffix }) => (
                    <div key={label} style={{ textAlign: "right" }}>
                      <div className="font-body text-[9px] tracking-[0.28em] uppercase text-white/[0.3] mb-1">
                        {label}
                      </div>
                      <div
                        className="font-display text-[30px] font-extralight text-sand leading-none"
                        style={{ letterSpacing: "-0.04em" }}
                      >
                        <Counter to={value} suffix={suffix} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
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
