"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { teamMembers } from "@/data/siteData";

export default function PeopleSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeMember = teamMembers[activeIndex];

  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-screen">
      {/* Portrait */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.05 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.98 }
            }
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={activeMember.image}
              alt={`Portrait of ${activeMember.name}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vertical text */}
      <div className="vertical-text hidden md:flex items-start pt-20 absolute left-1/2 z-10">
        {activeMember.name} Bio
      </div>

      {/* Content */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center py-32 px-8 md:px-16 lg:px-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={staggerItem}>
          <p className="section-eyebrow">The Team</p>
          <h2 className="section-heading">People</h2>
        </motion.div>

        <div className="mt-8 flex flex-col gap-2">
          {teamMembers.map((member, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.button
                key={member.name}
                className={cn(
                  "relative block text-left w-full py-4 px-6 rounded-2xl transition-colors duration-300",
                  isActive
                    ? "text-white"
                    : "text-white/[0.6] hover:text-white"
                )}
                onClick={() => setActiveIndex(index)}
                variants={staggerItem}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-team-member"
                    className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <div className="relative z-10 flex flex-col">
                  <span className="font-body text-[16px] tracking-wide">
                    {member.name}
                  </span>
                  <span
                    className={cn(
                      "font-body text-[13px] mt-1 transition-colors duration-300",
                      isActive ? "text-[var(--accent)]" : "text-white/[0.4]"
                    )}
                  >
                    {member.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bio */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="mt-12 max-w-md"
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }
            }
            transition={EASE_OUT_EXPO}
          >
            <p className="text-sm leading-relaxed text-white/[0.6]">
              {activeMember.bio}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
