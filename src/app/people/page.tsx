"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";
import { cn } from "@/lib/utils";

const teamMembers = [
    {
        name: "Mukilan EV",
        title: "CEO & Founding Principal",
        image: "/images/team/mukilan.png",
        bio: "Mukilan EV founded Mukilan Architecture with a vision to create buildings that exist in harmony with their environment. With over a decade of experience in contemporary architectural design, he leads the studio with a philosophy that blends bold innovation with deep respect for natural landscapes and cultural context.",
    },
    {
        name: "Naveenraj SS",
        title: "Senior Developer",
        image: "/images/team/naveenraj.png",
        bio: "Naveenraj SS brings cutting-edge technology expertise to the studio, bridging the gap between architectural design and digital innovation. His work in computational design and BIM technology has helped the firm push the boundaries of what's possible in modern architecture.",
    },
];

export default function PeoplePage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();
    const activeMember = teamMembers[activeIndex];

    return (
        <section className="people-layout">
            {/* Portrait */}
            <div className="people-portrait">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="absolute inset-0"
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={activeMember.image}
                            alt={`Portrait of ${activeMember.name}`}
                            fill
                            className="object-cover"
                            priority
                            sizes="35vw"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Vertical text */}
            <div className="vertical-text hidden md:flex items-start pt-20">
                {activeMember.name} Bio
            </div>

            {/* Content */}
            <motion.div
                className="people-content"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <motion.h1 className="section-heading" variants={staggerItem}>
                    People
                </motion.h1>

                <div className="mt-8">
                    {teamMembers.map((member, index) => (
                        <motion.button
                            key={member.name}
                            className={cn(
                                "team-member block text-left w-full",
                                index === activeIndex && "active"
                            )}
                            onClick={() => setActiveIndex(index)}
                            variants={staggerItem}
                            whileTap={{ scale: 0.96 }}
                            aria-label={`View ${member.name}'s profile`}
                        >
                            <div className="team-member-name">{member.name}</div>
                            <div className="team-member-title">{member.title}</div>
                        </motion.button>
                    ))}
                </div>

                {/* Bio */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="mt-12 max-w-md"
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        transition={EASE_OUT_EXPO}
                    >
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {activeMember.bio}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
