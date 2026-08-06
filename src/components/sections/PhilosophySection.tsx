"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function PhilosophySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/10 mt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="mb-7 flex items-center gap-4 rule-top pt-4">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-white/40">
              <span>Output · What you get</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-vivid)]"></span>
          </motion.div>
          
          <motion.h2 variants={staggerItem} className="text-lift font-display font-bold text-white text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight text-balance">
            What you <span className="accent">actually get.</span>
          </motion.h2>
          
          <motion.p variants={staggerItem} className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed text-pretty max-w-xl">
            No empty concepts. No generic templates. The concrete buildings you own from day one.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 border-t border-white/15"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {[
            { num: "100%", label: "Custom Design", sub: "every line is yours", icon: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" },
            { num: "1", label: "Studio, one team", sub: "architecture · interior", icon: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" },
            { num: "360°", label: "Visibility", sub: "across your project", icon: "m12 14 4-4" },
            { num: "0min", label: "Consultation", sub: "free, no strings", icon: "M10 2h4M12 14l3-3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={staggerItem}
              className="relative border-b border-white/15 px-1 py-7 sm:py-9 [&:nth-child(odd)]:pr-5 [&:nth-child(even)]:pl-5 sm:[&:nth-child(n)]:px-6 lg:border-l lg:border-white/10 lg:first:border-l-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tabular-nums text-white/40">0{idx + 1}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                  <path d={stat.icon}></path>
                </svg>
              </div>
              <p className="mt-5 font-display font-bold leading-none tracking-tight text-white text-[clamp(2.8rem,7vw,4.5rem)] tabular-nums">
                {stat.num}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">{stat.label}</p>
              <p className="mt-1.5 text-[13px] text-white/50 leading-snug">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Deliverable Panels */}
        <motion.div 
          className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-stretch"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="lg:col-span-7">
            <div className="glass-card h-full p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
              <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] rounded-t-xl bg-[var(--accent-vivid)]"></span>
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true"></div>
              <div className="relative z-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">The deliverable</span>
                <h3 className="mt-5 font-display font-bold tracking-tight text-white leading-[1.04] text-[clamp(1.5rem,3.4vw,2.4rem)] text-balance max-w-lg">
                  Buildings you <span className="accent">own outright</span> · engineered end to end.
                </h3>
              </div>
              <p className="relative z-10 mt-8 text-base text-white/60 leading-relaxed max-w-md text-pretty">
                Documented, handed over and fully unlocked. No black boxes, no hostage code, no shared templates.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={staggerItem} className="lg:col-span-5">
            <div className="glass-card h-full p-8 sm:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">Every engagement ships with</p>
              <ul className="mt-6 border-t border-white/10">
                {[
                  "Architecture designed and built end to end",
                  "Decisions grounded in research, not guesswork",
                  "Materials, structure and space running as one",
                  "100% custom, owned outright by you"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 border-b border-white/10 py-4">
                    <span className="mt-px font-mono text-[11px] tabular-nums text-white/40">0{i+1}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-[var(--accent-vivid)]">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span className="text-[15px] leading-snug text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
