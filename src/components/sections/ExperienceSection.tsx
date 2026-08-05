"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";
import { experience } from "@/data/siteData";
import { MapPin } from "lucide-react";

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-32 md:py-40 lg:py-48">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p className="section-eyebrow" variants={staggerItem}>
            Journey
          </motion.p>

          <motion.h2 className="section-heading" variants={staggerItem}>
            Experience
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mt-8 pl-12 md:pl-16">
          {/* Background line */}
          <div className="timeline-line" />

          {/* Animated fill line */}
          {!shouldReduceMotion && (
            <motion.div
              className="timeline-line"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, var(--accent-vivid), var(--accent-warm))",
              }}
            />
          )}

          {/* Timeline items */}
          <div className="flex flex-col gap-16 md:gap-20">
            {experience.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative flex gap-6 md:gap-10"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...EASE_OUT_EXPO, delay: Math.min(i * 0.1, 0.6) }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-12 md:-left-16 top-1 flex items-center justify-center"
                  style={{ width: 48, marginLeft: -1 }}
                >
                  <motion.div
                    className="timeline-dot"
                    whileInView={{ borderColor: "var(--accent-vivid)", boxShadow: "0 0 12px rgba(78, 205, 196, 0.3), 0 0 4px rgba(78, 205, 196, 0.5)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: Math.min(i * 0.1, 0.6) + 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-display text-3xl md:text-4xl font-extralight text-sand tracking-tight" style={{ letterSpacing: "-0.03em" }}>
                      {item.year}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1.5 font-body text-[10px] tracking-[0.15em] uppercase text-white/[0.3]">
                        <MapPin size={10} strokeWidth={1.5} />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <h3 className="font-body text-lg md:text-xl font-normal text-white/[0.9] mb-3">
                    {item.title}
                  </h3>

                  <p className="font-body text-[14px] leading-relaxed text-white/[0.5] max-w-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
