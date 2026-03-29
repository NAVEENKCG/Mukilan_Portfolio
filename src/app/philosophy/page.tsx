"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";

export default function PhilosophyPage() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="philosophy-layout">
            {/* Left image */}
            <motion.div
                className="philosophy-image"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src="/images/hero.png"
                    alt="Architectural landscape representing our philosophy"
                    fill
                    className="object-cover"
                    priority
                    sizes="50vw"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                className="philosophy-content"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <motion.h1 className="section-heading" variants={staggerItem}>
                    Philosophy
                </motion.h1>

                <motion.div className="philosophy-text" variants={staggerItem}>
                    <p>
                        At Mukilan Architecture, we believe that buildings should not merely occupy land
                        but exist in profound dialogue with it. Every project begins with deep listening —
                        to the terrain, the climate, the light, and most importantly, to the people who
                        will inhabit these spaces.
                    </p>
                    <p>
                        Our approach is rooted in the conviction that great architecture emerges at the
                        intersection of human need and natural context. We seek to create structures that
                        are simultaneously bold and humble, contemporary yet timeless, striking but never
                        disconnected from their surroundings.
                    </p>
                </motion.div>

                <motion.blockquote className="philosophy-quote" variants={staggerItem}>
                    &ldquo;Architecture should speak of its time and place, but yearn for
                    timelessness.&rdquo;
                </motion.blockquote>

                <motion.div className="philosophy-text" variants={staggerItem}>
                    <p>
                        We are drawn to materials that age gracefully — raw concrete, natural stone,
                        weathered wood, and handcrafted finishes. These materials develop character
                        over time, allowing buildings to become more beautiful as they mature alongside
                        the families and communities they shelter.
                    </p>
                    <p>
                        Sustainability is not a separate consideration but an intrinsic part of our
                        design process. By working with the land rather than against it, we create
                        buildings that naturally regulate temperature, harvest light, and minimize their
                        environmental footprint without sacrificing the poetry of space.
                    </p>
                    <p>
                        Every project is an opportunity to demonstrate that architecture can be both
                        an art and a responsible act. We believe that the most meaningful buildings are
                        those that enhance human experience while treading lightly on the earth.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
