"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";
import { aboutContent, siteConfig } from "@/data/siteData";
import { useMouseGlow } from "@/lib/useMouseGlow";

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const handleMouseMove = useMouseGlow();

  return (
    <section className="relative w-full py-32 md:py-40 lg:py-48">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Eyebrow */}
          <motion.p className="section-eyebrow" variants={staggerItem}>
            {aboutContent.eyebrow}
          </motion.p>

          {/* Heading */}
          <motion.h2
            className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[0.95] text-white mb-16 max-w-4xl"
            style={{ letterSpacing: "-0.03em" }}
            variants={staggerItem}
          >
            {aboutContent.headline}
          </motion.h2>

          {/* Two column layout: Bio left, Stats right */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Left — Bio */}
            <motion.div className="lg:flex-[1.4]" variants={staggerItem}>
              {aboutContent.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-body text-[15px] leading-loose text-white/[0.6] mb-6 max-w-xl"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Right — Stats */}
            <motion.div className="lg:flex-[0.6]" variants={staggerItem}>
              <div className="flex flex-row lg:flex-col gap-8">
                {siteConfig.stats.map(({ label, value, suffix }) => (
                  <div key={label}>
                    <div className="font-display text-5xl md:text-6xl font-extralight text-sand tracking-tight" style={{ letterSpacing: "-0.04em" }}>
                      {value}{suffix}
                    </div>
                    <div className="font-body text-[10px] tracking-[0.28em] uppercase text-white/[0.3] mt-2">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Capabilities grid */}
          <motion.div className="mt-20" variants={staggerItem}>
            <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-white/[0.3] mb-8">
              Capabilities
            </h3>
            <div className="flex flex-wrap gap-3">
              {aboutContent.capabilities.map((cap, i) => (
                <motion.div
                  key={cap}
                  className="glass-card px-5 py-3 text-[13px] font-body text-white/[0.7] hover:text-white cursor-default"
                  onMouseMove={handleMouseMove}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...EASE_OUT_EXPO, delay: Math.min(i * 0.05, 0.5) }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {cap}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
