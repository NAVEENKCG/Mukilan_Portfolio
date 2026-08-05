"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { siteConfig, contactInfo } from "@/data/siteData";
import { EASE_OUT_EXPO } from "@/lib/animations";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-white/[0.06] bg-bg-base">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left — Branding */}
          <div>
            <div className="font-display text-xl font-light tracking-[0.1em] uppercase text-white/[0.6] mb-2">
              {siteConfig.name}
            </div>
            <div className="font-body text-xs text-white/[0.3] tracking-widest uppercase">
              Est. {siteConfig.established} · {siteConfig.location}
            </div>
          </div>

          {/* Center — Socials */}
          <div className="flex gap-6">
            {contactInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-white/[0.5] hover:text-[var(--accent)] transition-colors duration-300"
              >
                {social.name}
              </a>
            ))}
          </div>

          {/* Right — Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-white/[0.4] hover:text-white/[0.8] transition-colors duration-300 group"
            whileTap={{ scale: 0.96 }}
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <motion.div
              className="group-hover:-translate-y-1 transition-transform duration-300"
            >
              <ArrowUp size={14} strokeWidth={1.5} />
            </motion.div>
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <div className="font-body text-[11px] text-white/[0.25] tracking-widest uppercase text-center">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
