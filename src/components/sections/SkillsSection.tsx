"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";
import { skills, skillCategories } from "@/data/siteData";
import { useMouseGlow } from "@/lib/useMouseGlow";
import {
  Compass,
  Armchair,
  Map,
  Trees,
  Building2,
  Box,
  Layers,
  Spline,
  PenTool,
  LayoutGrid,
  Cuboid,
  Sun,
  Leaf,
  Zap,
  Blocks,
  Award,
} from "lucide-react";

// Map icon name strings to actual components
const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Compass,
  Armchair,
  Map,
  Trees,
  Building2,
  Box,
  Layers,
  Spline,
  PenTool,
  LayoutGrid,
  Cuboid,
  Sun,
  Leaf,
  Zap,
  Blocks,
  Award,
};

export function SkillsSection() {
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
          <motion.p className="section-eyebrow" variants={staggerItem}>
            Expertise
          </motion.p>

          <motion.h2 className="section-heading" variants={staggerItem}>
            Skills
          </motion.h2>
        </motion.div>

        {/* Category groups */}
        <div className="flex flex-col gap-16">
          {skillCategories.map((category, catIdx) => {
            const categorySkills = skills.filter((s) => s.category === category.key);

            return (
              <motion.div
                key={category.key}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...EASE_OUT_EXPO, delay: catIdx * 0.1 }}
              >
                <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-white/[0.3] mb-6">
                  {category.label}
                </h3>

                {/* Bento grid — asymmetric: first card spans 2 cols */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categorySkills.map((skill, i) => {
                    const IconComponent = iconMap[skill.icon];
                    const isFirst = i === 0;

                    return (
                      <motion.div
                        key={skill.name}
                        className={`glass-card flex flex-col items-center justify-center gap-4 p-6 md:p-8 min-h-[120px] ${
                          isFirst ? "col-span-2" : ""
                        }`}
                        onMouseMove={handleMouseMove}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ ...EASE_OUT_EXPO, delay: Math.min(i * 0.08, 0.4) }}
                        whileHover={{ y: -8 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        {IconComponent && (
                          <IconComponent
                            size={isFirst ? 28 : 22}
                            strokeWidth={1.2}
                            className="skill-icon-glow text-white/[0.5]"
                          />
                        )}
                        <span className="font-body text-[13px] text-white/[0.6] text-center tracking-wide">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
