"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EASE_OUT_EXPO } from "@/lib/animations";
import { useMouseGlow } from "@/lib/useMouseGlow";

interface ProjectCardProps {
  title: string;
  image: string;
  index: number;
  className?: string;
  onClick?: () => void;
}

export function ProjectCard({
  title,
  image,
  index,
  className,
  onClick,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const handleMouseMove = useMouseGlow();

  // Parse the intended aspect ratio passed via Tailwind class
  const isSquare = className?.includes("4/3");
  const imgWidth = isSquare ? 800 : 1600;
  const imgHeight = isSquare ? 600 : 1000;

  return (
    <motion.article
      className="project-card glass-card flex flex-col w-full p-3 md:p-4"
      onMouseMove={handleMouseMove}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...EASE_OUT_EXPO, delay: (index % 2) * 0.1 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      <motion.div
        className="overflow-hidden w-full m-0 p-0 block bg-black/20 rounded-2xl relative z-[2]"
        layoutId={`project-image-${title}`}
      >
        <Image
          src={image}
          alt={title}
          width={imgWidth}
          height={imgHeight}
          className="hover-color object-cover w-full h-auto block"
          loading={index < 4 ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>
      <h3 className="relative z-[2] font-body text-[15px] font-light tracking-widest uppercase text-white/[0.6] mt-4 mb-2 text-center">
        {title}
      </h3>
    </motion.article>
  );
}

export default ProjectCard;
