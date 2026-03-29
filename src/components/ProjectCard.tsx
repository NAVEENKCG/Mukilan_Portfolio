"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { EASE_OUT_EXPO } from "@/lib/animations";

interface ProjectCardProps {
    title: string;
    image: string;
    index: number;
    className?: string; // used for layout ratio hints from parent
    onClick?: () => void;
}

export function ProjectCard({ title, image, index, className, onClick }: ProjectCardProps) {
    const shouldReduceMotion = useReducedMotion();

    // Parse the intended aspect ratio passed via Tailwind class
    const isSquare = className?.includes("4/3");
    const imgWidth = isSquare ? 800 : 1600;
    const imgHeight = isSquare ? 600 : 1000;

    return (
        <motion.article
            className="project-card flex flex-col w-full"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...EASE_OUT_EXPO, delay: (index % 2) * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
        >
            <motion.div
                className="overflow-hidden w-full m-0 p-0 block bg-black/5"
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
            <h3 className="project-card-title">{title}</h3>
        </motion.article>
    );
}

export default ProjectCard;
