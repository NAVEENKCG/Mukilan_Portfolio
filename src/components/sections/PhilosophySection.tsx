"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function PhilosophySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-screen">
      {/* Left Image */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {/* Using heritage-restoration as stand-in — replace with actual philosophy image */}
          <Image
            src="/images/projects/heritage-restoration.png"
            alt="Modern concrete architecture showing our philosophy"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
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
          <p className="section-eyebrow">Our Approach</p>
          <h2 className="section-heading">Philosophy</h2>
        </motion.div>

        <motion.div
          className="font-body text-[15px] leading-loose text-white/[0.6] max-w-xl"
          variants={staggerItem}
        >
          <p>
            At Mukilan Architecture, we believe that buildings should not merely
            occupy land but exist in profound dialogue with it. Every project
            begins with deep listening — to the terrain, the climate, the light,
            and most importantly, to the people who will inhabit these spaces.
          </p>
          <p>
            Our approach is rooted in the conviction that great architecture
            emerges at the intersection of human need and natural context. We
            seek to create structures that are simultaneously bold and humble,
            contemporary yet timeless, striking but never disconnected from
            their surroundings.
          </p>
        </motion.div>

        <motion.blockquote
          className="philosophy-quote"
          variants={staggerItem}
        >
          &ldquo;Architecture should speak of its time and place, but yearn for
          timelessness.&rdquo;
        </motion.blockquote>

        <motion.div className="philosophy-text" variants={staggerItem}>
          <p>
            We are drawn to materials that age gracefully — raw concrete,
            natural stone, weathered wood, and handcrafted finishes. These
            materials develop character over time, allowing buildings to become
            more beautiful as they mature alongside the families and communities
            they shelter.
          </p>
          <p>
            Sustainability is not a separate consideration but an intrinsic part
            of our design process. By working with the land rather than against
            it, we create buildings that naturally regulate temperature, harvest
            light, and minimize their environmental footprint without
            sacrificing the poetry of space.
          </p>
          <p>
            Every project is an opportunity to demonstrate that architecture can
            be both an art and a responsible act. We believe that the most
            meaningful buildings are those that enhance human experience while
            treading lightly on the earth.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
