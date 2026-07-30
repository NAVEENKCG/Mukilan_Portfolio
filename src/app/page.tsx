"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

/* ── Easing ── */
const EASE_EXPO  = [0.16, 1, 0.3, 1]  as const;

/* ── Variants ── */
const revealLine = {
  initial: { scaleX: 0, transformOrigin: "left" as const },
  animate: { scaleX: 1, transition: { duration: 1.4, ease: EASE_EXPO, delay: 0.2 } },
};
const maskReveal = (delay = 0) => ({
  initial: { y: "110%", opacity: 0 },
  animate: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE_EXPO, delay } },
});
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_EXPO, delay } },
});
const imageReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.6, ease: EASE_EXPO, delay: 0.1 } },
};

/* ── Counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setN(Math.floor(value));
      },
    });
    return () => controls.stop();
  }, [to]);
  return <>{n}{suffix}</>;
}

/* ── Cursor blob ── */
function CursorBlob() {
  const x = useMotionValue(-160);
  const y = useMotionValue(-160);
  const sx = useSpring(x, { stiffness: 80, damping: 18 });
  const sy = useSpring(y, { stiffness: 80, damping: 18 });
  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX - 160); y.set(e.clientY - 160); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  return (
    <motion.div
      style={{
        position: "fixed", width: 320, height: 320, borderRadius: "50%",
        pointerEvents: "none", zIndex: 9999,
        left: 0, top: 0, x: sx, y: sy,
        background: "radial-gradient(circle, rgba(232,224,208,0.07) 0%, transparent 65%)",
        mixBlendMode: "screen" as const,
        willChange: "transform",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6, ease: EASE_EXPO }}
    />
  );
}

/* ── Parallax image ── */
function ParallaxImage({ src }: { src: string }) {
  const y  = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 40, damping: 20 });
  const iy = useTransform(sy, [-300, 300], ["-8%", "8%"]);
  useEffect(() => {
    const fn = () => y.set(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [y]);
  return (
    <motion.div style={{ position: "absolute", inset: 0, y: iy, scale: 1.12, willChange: "transform" }}>
      <img src={src} alt="Mukilan Architecture hero" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </motion.div>
  );
}

/* ── Main ── */
export default function HomePage() {
  const reduced = useReducedMotion();
  const NAV   = ["Works", "Studio", "Philosophy", "Contact"];
  const STATS = [{ label: "Projects", to: 94, suffix: "+" }, { label: "Years", to: 16, suffix: "" }, { label: "Awards", to: 32, suffix: "" }];
  const IMG   = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@200;300&family=DM+Sans:wght@300;400&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        :root{--sand:#e8e0d0;--ink:#0f0e0c;--df:'Cormorant Garamond',Georgia,serif;--bf:'DM Sans',Helvetica,sans-serif}
        body{background:var(--ink);overflow-x:hidden}

        .hero{position:relative;width:100vw;height:100svh;overflow:hidden;background:var(--ink)}
        .img-wrap{position:absolute;inset:0;overflow:hidden}
        .img-wrap::after{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");opacity:.38;pointer-events:none;z-index:3;mix-blend-mode:overlay}
        .vig{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at 30% 60%,transparent 28%,rgba(0,0,0,.58) 100%)}
        .bot{position:absolute;bottom:0;left:0;right:0;height:68%;z-index:1;pointer-events:none;background:linear-gradient(to top,rgba(0,0,0,.78) 0%,transparent 100%)}
        .top{position:absolute;top:0;left:0;right:0;height:28%;z-index:1;pointer-events:none;background:linear-gradient(to bottom,rgba(0,0,0,.42) 0%,transparent 100%)}

        .gline{height:1px;background:linear-gradient(to right,rgba(232,224,208,.55),rgba(232,224,208,.06) 55%,transparent);margin-bottom:34px}

        .btn-p{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border:1px solid rgba(232,224,208,.22);border-radius:2px;color:#fff;font-family:var(--bf);font-size:10px;letter-spacing:.22em;text-transform:uppercase;text-decoration:none;backdrop-filter:blur(16px);background:rgba(255,255,255,.06);position:relative;overflow:hidden;transition:border-color .4s ease;cursor:pointer}
        .btn-p::before{content:'';position:absolute;inset:0;background:rgba(232,224,208,.08);transform:translateX(-101%);transition:transform .55s cubic-bezier(.22,1,.36,1)}
        .btn-p:hover::before{transform:translateX(0)}
        .btn-p:hover{border-color:rgba(232,224,208,.48)}

        .btn-g{position:relative;color:rgba(255,255,255,.48);font-family:var(--bf);font-size:10px;letter-spacing:.22em;text-transform:uppercase;text-decoration:none;padding-bottom:4px;transition:color .35s ease}
        .btn-g::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:rgba(232,224,208,.55);transition:width .55s cubic-bezier(.22,1,.36,1)}
        .btn-g:hover{color:rgba(255,255,255,.88)}
        .btn-g:hover::after{width:100%}

        .navl{font-family:var(--bf);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.42);text-decoration:none;transition:color .3s ease}
        .navl:hover{color:rgba(255,255,255,.9)}

        .scroll-track{width:1px;height:56px;background:rgba(255,255,255,.1);position:relative;overflow:hidden;border-radius:1px}
        .scroll-fill{position:absolute;top:0;left:0;right:0;background:rgba(232,224,208,.52);animation:sp 2.4s ease-in-out infinite}
        @keyframes sp{0%{height:0%;top:0}50%{height:100%;top:0}100%{height:0%;top:100%}}

        .badge{display:inline-flex;flex-direction:column;gap:4px;border:1px solid rgba(232,224,208,.13);border-radius:2px;padding:14px 18px;backdrop-filter:blur(20px);background:rgba(15,14,12,.42)}
        .coord{font-family:var(--bf);font-size:9px;letter-spacing:.14em;color:rgba(255,255,255,.2);writing-mode:vertical-rl;text-orientation:mixed}

        @media(max-width:900px){.right-block{display:none!important}}
      `}</style>

      {!reduced && <CursorBlob />}

      <section className="hero">
        <div className="img-wrap">

          <motion.div style={{ position: "absolute", inset: 0 }} variants={imageReveal} initial="initial" animate="animate">
            <ParallaxImage src={IMG} />
          </motion.div>

          <div className="vig" /><div className="bot" /><div className="top" />

          {/* Nav */}
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 56px" }}
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_EXPO, delay: 1.0 }}
          >
            <span style={{ fontFamily: "var(--df)", fontSize: "15px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.88)", fontWeight: 300 }}>
              Mukilan
            </span>
            <nav style={{ display: "flex", gap: 32 }}>
              {NAV.map(n => <a key={n} href={`/${n.toLowerCase()}`} className="navl">{n}</a>)}
            </nav>
          </motion.div>

          {/* Right scroll */}
          <motion.div
            style={{ position: "absolute", right: 28, top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          >
            <span className="coord">25.0°N  80.1°W</span>
            <div className="scroll-track"><div className="scroll-fill" /></div>
          </motion.div>

          {/* Bottom content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 56px 60px" }}>
            <motion.div className="gline" variants={revealLine} initial="initial" animate="animate" />

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40 }}>

              {/* Left */}
              <div style={{ maxWidth: 640 }}>
                <div style={{ overflow: "hidden", marginBottom: 16 }}>
                  <motion.p style={{ fontFamily: "var(--bf)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)" }} variants={maskReveal(0.6)} initial="initial" animate="animate">
                    Est. 2008 · Chennai, India
                  </motion.p>
                </div>

                <div style={{ overflow: "hidden" }}>
                  <motion.h1 style={{ fontFamily: "var(--df)", fontSize: "clamp(54px,9vw,112px)", fontWeight: 200, lineHeight: 0.9, letterSpacing: "-0.03em", color: "#fff" }} variants={maskReveal(0.75)} initial="initial" animate="animate">
                    Architecture
                  </motion.h1>
                </div>

                <div style={{ overflow: "hidden", marginBottom: 26 }}>
                  <motion.h1 style={{ fontFamily: "var(--df)", fontSize: "clamp(54px,9vw,112px)", fontWeight: 200, lineHeight: 0.9, letterSpacing: "-0.03em", color: "var(--sand)" }} variants={maskReveal(0.9)} initial="initial" animate="animate">
                    for Life
                  </motion.h1>
                </div>

                <motion.p style={{ fontFamily: "var(--bf)", fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.46)", maxWidth: 360, marginBottom: 36 }} variants={fadeUp(1.2)} initial="initial" animate="animate">
                  Every structure exists in harmony with its environment — celebrating the threshold between built form and nature.
                </motion.p>

                <motion.div style={{ display: "flex", alignItems: "center", gap: 24 }} variants={fadeUp(1.4)} initial="initial" animate="animate">
                  <a href="/works" className="btn-p">
                    View Works
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>→</motion.span>
                  </a>
                  <a href="/philosophy" className="btn-g">Our Philosophy</a>
                </motion.div>
              </div>

              {/* Right */}
              <motion.div className="right-block" style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-end", flexShrink: 0 }} variants={fadeUp(1.7)} initial="initial" animate="animate">
                <div className="badge">
                  <span style={{ fontFamily: "var(--bf)", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>Current Project</span>
                  <span style={{ fontFamily: "var(--df)", fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>Bal Harbour Residence</span>
                  <span style={{ fontFamily: "var(--bf)", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>Miami, FL — In Progress</span>
                </div>

                <div style={{ display: "flex", gap: 36 }}>
                  {STATS.map(({ label, to, suffix }) => (
                    <div key={label} style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "var(--bf)", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontFamily: "var(--df)", fontSize: 30, fontWeight: 200, color: "var(--sand)", letterSpacing: "-0.04em", lineHeight: 1 }}><Counter to={to} suffix={suffix} /></div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
