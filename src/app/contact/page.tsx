"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from "@/lib/animations";

export default function ContactPage() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="contact-layout">
            {/* Left image */}
            <motion.div
                className="contact-image"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src="/images/contact-interior.png"
                    alt="Modern architecture office interior"
                    fill
                    className="object-cover"
                    priority
                    sizes="35vw"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                className="contact-content"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
            >
                <motion.h1 className="section-heading" variants={staggerItem}>
                    Contact
                </motion.h1>

                {/* Office */}
                <motion.div className="contact-block" variants={staggerItem}>
                    <h2 className="contact-block-title">Office</h2>
                    <div className="contact-block-text">
                        Mukilan Architecture Studio<br />
                        Chennai, Tamil Nadu<br />
                        India
                    </div>
                </motion.div>

                {/* Phone */}
                <motion.div className="contact-block" variants={staggerItem}>
                    <h2 className="contact-block-title">Phone</h2>
                    <div className="contact-block-text">
                        Tel{" "}
                        <a href="tel:+919677335058" className="contact-link">
                            +91 9677335058
                        </a>
                    </div>
                </motion.div>

                {/* Email */}
                <motion.div className="contact-block" variants={staggerItem}>
                    <h2 className="contact-block-title">Email</h2>
                    <div className="contact-block-text">
                        <a href="mailto:mukilan@gmail.com" className="contact-link">
                            mukilan@gmail.com
                        </a>
                    </div>
                </motion.div>

                {/* Inquiries */}
                <motion.div className="contact-block" variants={staggerItem}>
                    <h2 className="contact-block-title">Inquiries</h2>
                    <div className="contact-block-text">
                        <a href="mailto:mukilan@gmail.com" className="contact-link">
                            New business inquiries
                        </a>
                        <br />
                        <a href="mailto:mukilan@gmail.com" className="contact-link">
                            Media &amp; press inquiries
                        </a>
                    </div>
                </motion.div>

                {/* Social */}
                <motion.div className="contact-block" variants={staggerItem}>
                    <div className="social-links">
                        <a
                            href="https://www.linkedin.com/in/mukilan-e-v-2ab80525b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            LinkedIn
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
