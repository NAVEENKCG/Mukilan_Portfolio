"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { staggerContainer, staggerItem } from "@/lib/animations";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { projects } from "@/data/siteData";
import type { Project } from "@/data/siteData";

export default function WorksSection() {
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 !== 0);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  const handleSelectProject = (project: Project) => {
    setIsInfoPanelOpen(false);
    setSelectedProject(project);
  };

  return (
    <>
      <AnimatePresence>
        {!selectedProject ? (
          <motion.div
            key="grid"
            className="flex flex-col gap-12 py-32 px-6 md:px-12 max-w-7xl mx-auto w-full"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <p className="section-eyebrow">Portfolio</p>
              <h2 className="section-heading">
                Selected Works
              </h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-[5%] lg:gap-[8%]">
              {/* Left Column - Wider Aspect Ratio */}
              <div className="flex-[1.2] flex flex-col gap-16 md:gap-24">
                {leftColumn.map((project, idx) => (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    image={project.image}
                    index={idx * 2}
                    className="aspect-[16/10] w-full"
                    onClick={() => handleSelectProject(project)}
                  />
                ))}
              </div>

              {/* Right Column - Taller Aspect Ratio */}
              <div className="flex-[1.0] flex flex-col gap-16 md:gap-24">
                {rightColumn.map((project, idx) => (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    image={project.image}
                    index={idx * 2 + 1}
                    className="aspect-[4/3] w-full"
                    onClick={() => handleSelectProject(project)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            className="fixed inset-0 z-[100] bg-[#111] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Info Panel */}
            <motion.aside
              className="bg-white/[0.03] backdrop-blur-xl border-l border-white/[0.08] absolute right-0 top-0 bottom-0 overflow-hidden z-[2]"
              initial={{ x: 396 }}
              animate={{ x: isInfoPanelOpen ? 0 : 396 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: 460, willChange: "transform" }}
            >
              {/* Trigger Strip */}
              <div
                className="w-[64px] h-full flex flex-col items-center justify-center gap-[14px] cursor-pointer absolute left-0 top-0 z-[3] group transition-colors duration-300 hover:bg-black/5"
                onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
                style={{ userSelect: "none" }}
              >
                <div
                  className={cn(
                    "w-[1px] bg-white/[0.2] origin-top transition-all duration-300 group-hover:bg-white/[0.4]",
                    isInfoPanelOpen
                      ? "h-[48px]"
                      : "h-[36px] group-hover:h-[48px]"
                  )}
                />
                <div
                  className={cn(
                    "vertical-text-up text-[9px] uppercase transition-all duration-300 text-white/[0.4] group-hover:text-white/[0.8] group-hover:tracking-[4.5px]",
                    "tracking-[3.5px]"
                  )}
                >
                  {isInfoPanelOpen ? "Close" : "Info"}
                </div>
                <div
                  className={cn(
                    "text-[15px] font-light leading-[1] transition-all duration-500",
                    isInfoPanelOpen
                      ? "rotate-45 text-white/[0.6]"
                      : "rotate-0 text-white/[0.4]"
                  )}
                >
                  +
                </div>
                <div
                  className={cn(
                    "w-[1px] bg-white/[0.2] origin-top transition-all duration-300 group-hover:bg-white/[0.4]",
                    isInfoPanelOpen
                      ? "h-[48px]"
                      : "h-[36px] group-hover:h-[48px]"
                  )}
                />
              </div>

              {/* Panel Body */}
              <motion.div
                className="absolute left-[64px] top-0 w-[396px] h-full p-[56px_48px_48px] overflow-y-auto"
                animate={{
                  opacity: isInfoPanelOpen ? 1 : 0,
                  x: isInfoPanelOpen ? 0 : 16,
                }}
                transition={{
                  opacity: {
                    duration: 0.3,
                    ease: "easeOut",
                    delay: isInfoPanelOpen ? 0.28 : 0,
                  },
                  x: {
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: isInfoPanelOpen ? 0.28 : 0,
                  },
                }}
                style={{
                  pointerEvents: isInfoPanelOpen ? "auto" : "none",
                }}
              >
                <div className="inline-block text-[9px] tracking-[3px] uppercase text-white/[0.4] border border-white/[0.1] py-[5px] px-[11px] mb-[32px]">
                  {selectedProject.typology}
                </div>

                <h2 className="font-display text-[32px] font-light tracking-[-0.4px] text-white leading-[1.18] mb-[18px] uppercase">
                  {selectedProject.title}
                </h2>

                <p className="text-[13.5px] leading-[1.8] text-white/[0.6] mb-[36px]">
                  {selectedProject.description}
                </p>

                <div className="h-[1px] bg-gradient-to-r from-white/[0.1] to-transparent mb-[30px]" />

                <div className="flex justify-between items-baseline py-[11px] border-b border-white/[0.05]">
                  <span className="text-[9px] tracking-[2.5px] uppercase text-white/[0.4]">
                    Location
                  </span>
                  <span className="text-[13px] text-white/[0.9]">
                    {selectedProject.location}
                  </span>
                </div>
                <div className="flex justify-between items-baseline py-[11px] border-b border-white/[0.05]">
                  <span className="text-[9px] tracking-[2.5px] uppercase text-white/[0.4]">
                    Area
                  </span>
                  <span className="text-[13px] text-white/[0.9]">
                    {selectedProject.scale}
                  </span>
                </div>
                <div className="flex justify-between items-baseline py-[11px] border-b border-white/[0.05]">
                  <span className="text-[9px] tracking-[2.5px] uppercase text-white/[0.4]">
                    Status
                  </span>
                  <span className="text-[13px] text-white/[0.9]">
                    {selectedProject.status}
                  </span>
                </div>
                <div className="flex justify-between items-baseline py-[11px]">
                  <span className="text-[9px] tracking-[2.5px] uppercase text-white/[0.4]">
                    Studio
                  </span>
                  <span className="text-[13px] text-white/[0.9]">
                    Mukilan Architecture
                  </span>
                </div>
              </motion.div>
            </motion.aside>

            {/* Main Image View */}
            <motion.main
              className="absolute inset-0 origin-left bg-[#111]"
              animate={{
                filter: isInfoPanelOpen
                  ? "brightness(0.7) saturate(0.35)"
                  : "brightness(1) saturate(1)",
                scale: isInfoPanelOpen ? 1.018 : 1,
              }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              layoutId={`project-image-${selectedProject.title}`}
            >
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                priority
              />

              {/* Exit to Grid Button overlaid on image */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-[40px] left-[40px] z-[120] text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-3 drop-shadow-md"
                aria-label="Go back to project grid"
              >
                <X size={24} strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-[0.2em] font-light">
                  Back
                </span>
              </button>
            </motion.main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
