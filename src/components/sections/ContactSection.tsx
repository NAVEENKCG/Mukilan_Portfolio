"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { contactInfo } from "@/data/siteData";
import { useMouseGlow } from "@/lib/useMouseGlow";

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const handleMouseMove = useMouseGlow();

  return (
    <section className="relative w-full flex flex-col md:flex-row min-h-screen">
      {/* Left Image */}
      <div className="w-full md:w-[40%] relative min-h-[50vh] md:min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/contact-interior.png"
            alt="Modern architecture office interior"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="w-full md:w-[60%] flex flex-col justify-center py-32 px-8 md:px-16 lg:px-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={staggerItem}>
          <p className="section-eyebrow">Get in Touch</p>
          <h2 className="section-heading">Contact</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Office */}
          <motion.div
            className="glass-card p-8 md:p-12"
            variants={staggerItem}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.96 }}
          >
            <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">
              Office
            </h3>
            <div className="font-body text-[15px] text-white/[0.6] leading-loose">
              {contactInfo.office.name}
              <br />
              {contactInfo.office.address.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < contactInfo.office.address.length - 1 && <br />}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="glass-card p-8 md:p-12"
            variants={staggerItem}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.96 }}
          >
            <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">
              Phone
            </h3>
            <div className="font-body text-[15px] text-white/[0.6] leading-loose">
              Tel{" "}
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
              >
                {contactInfo.phone}
              </a>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            className="glass-card p-8 md:p-12"
            variants={staggerItem}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.96 }}
          >
            <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">
              Email
            </h3>
            <div className="font-body text-[15px] text-white/[0.6] leading-loose">
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
              >
                {contactInfo.email}
              </a>
            </div>
          </motion.div>

          {/* Inquiries */}
          <motion.div
            className="glass-card p-8 md:p-12"
            variants={staggerItem}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.96 }}
          >
            <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">
              Inquiries
            </h3>
            <div className="font-body text-[15px] text-white/[0.6] leading-loose">
              {contactInfo.inquiries.map((inq, i) => (
                <span key={i}>
                  <a
                    href={`mailto:${inq.email}`}
                    className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
                  >
                    {inq.label}
                  </a>
                  {i < contactInfo.inquiries.length - 1 && <br />}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
