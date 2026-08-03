"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";

export default function ContactSection() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="relative w-full flex flex-col md:flex-row min-h-screen">
            {/* Left Image - Sticky for Parallax effect */}
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
                <motion.h2 className="section-heading" variants={staggerItem}>
                    Contact
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Office */}
                    <motion.div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-8 md:p-12 rounded-3xl" variants={staggerItem}>
                        <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">Office</h3>
                        <div className="font-body text-[15px] text-white/[0.6] leading-loose">
                            Mukilan Architecture Studio<br />
                            Chennai, Tamil Nadu<br />
                            India
                        </div>
                    </motion.div>

                    {/* Phone */}
                    <motion.div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-8 md:p-12 rounded-3xl" variants={staggerItem}>
                        <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">Phone</h3>
                        <div className="font-body text-[15px] text-white/[0.6] leading-loose">
                            Tel{" "}
                            <a href="tel:+919677335058" className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">
                                +91 9677335058
                            </a>
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-8 md:p-12 rounded-3xl" variants={staggerItem}>
                        <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">Email</h3>
                        <div className="font-body text-[15px] text-white/[0.6] leading-loose">
                            <a href="mailto:mukilan@gmail.com" className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">
                                mukilan@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Inquiries */}
                    <motion.div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-8 md:p-12 rounded-3xl" variants={staggerItem}>
                        <h3 className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white mb-4">Inquiries</h3>
                        <div className="font-body text-[15px] text-white/[0.6] leading-loose">
                            <a href="mailto:mukilan@gmail.com" className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">
                                New business inquiries
                            </a>
                            <br />
                            <a href="mailto:mukilan@gmail.com" className="text-white/[0.8] underline underline-offset-4 hover:text-[var(--accent)] transition-colors">
                                Media &amp; press inquiries
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Social Footer */}
                <motion.div className="mt-20 pt-10 border-t border-white/[0.1] flex justify-between items-center" variants={staggerItem}>
                    <div className="font-body text-xs text-white/[0.4] uppercase tracking-widest">
                        © 2026 Mukilan Architecture
                    </div>
                    <div className="flex gap-6">
                        <a
                            href="https://www.linkedin.com/in/mukilan-e-v-2ab80525b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-sm text-white/[0.6] hover:text-[var(--accent)] transition-colors"
                        >
                            LinkedIn
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
