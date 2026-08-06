"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("mukilan_intro_played");
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("mukilan_intro_played", "true");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[var(--bg-base)] flex flex-col items-center justify-center pointer-events-auto"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <style>{`
                        .arqx-loader {
                          --duration: 3s;
                          --primary: var(--bg-elevated);
                          --primary-light: rgba(255, 255, 255, 0.1);
                          --primary-rgba: rgba(5, 10, 24, 0);
                          width: 200px;
                          height: 320px;
                          position: relative;
                          transform-style: preserve-3d;
                          zoom: 0.7;
                        }
                        @media (max-width: 480px) {
                          .arqx-loader { zoom: 0.44; }
                        }
                        .arqx-loader:before, .arqx-loader:after {
                          --r: 20.5deg;
                          content: "";
                          width: 320px;
                          height: 140px;
                          position: absolute;
                          right: 32%;
                          bottom: -11px;
                          background: var(--bg-base);
                          transform: translateZ(200px) rotate(var(--r));
                          animation: mask var(--duration) linear forwards infinite;
                        }
                        .arqx-loader:after {
                          --r: -20.5deg;
                          right: auto;
                          left: 32%;
                        }
                        .arqx-loader .ground {
                          position: absolute;
                          left: -50px;
                          bottom: -120px;
                          transform-style: preserve-3d;
                          transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
                        }
                        .arqx-loader .ground div {
                          transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
                          width: 200px;
                          height: 200px;
                          background: var(--primary);
                          background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
                          transform-style: preserve-3d;
                          animation: ground var(--duration) linear forwards infinite;
                        }
                        .arqx-loader .ground div:before, .arqx-loader .ground div:after {
                          --rx: 90deg;
                          --ry: 0deg;
                          --x: 44px;
                          --y: 162px;
                          --z: -50px;
                          content: "";
                          width: 156px;
                          height: 300px;
                          opacity: 0;
                          background: linear-gradient(var(--primary), var(--primary-rgba));
                          position: absolute;
                          transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
                          animation: ground-shine var(--duration) linear forwards infinite;
                        }
                        .arqx-loader .ground div:after {
                          --rx: 90deg;
                          --ry: 90deg;
                          --x: 0;
                          --y: 177px;
                          --z: 150px;
                        }
                        .arqx-loader .box {
                          --x: 0;
                          --y: 0;
                          position: absolute;
                          animation: var(--duration) linear forwards infinite;
                          transform: translate(var(--x), var(--y));
                        }
                        .arqx-loader .box div {
                          background-color: var(--primary);
                          width: 48px;
                          height: 48px;
                          position: relative;
                          transform-style: preserve-3d;
                          animation: var(--duration) ease forwards infinite;
                          transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
                        }
                        .arqx-loader .box div:before, .arqx-loader .box div:after {
                          --rx: 90deg;
                          --ry: 0deg;
                          --z: 24px;
                          --y: -24px;
                          --x: 0;
                          content: "";
                          position: absolute;
                          background-color: inherit;
                          width: inherit;
                          height: inherit;
                          transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
                          filter: brightness(var(--b, 1.2));
                        }
                        .arqx-loader .box div:after {
                          --rx: 0deg;
                          --ry: 90deg;
                          --x: 24px;
                          --y: 0;
                          --b: 1.4;
                        }
                        .arqx-loader .box.box0 { --x: -220px; --y: -120px; left: 58px; top: 108px; animation-name: box-move0; }
                        .arqx-loader .box.box0 div { animation-name: box-scale0; }
                        .arqx-loader .box.box1 { --x: -260px; --y: 120px; left: 25px; top: 120px; animation-name: box-move1; }
                        .arqx-loader .box.box1 div { animation-name: box-scale1; }
                        .arqx-loader .box.box2 { --x: 120px; --y: -190px; left: 58px; top: 64px; animation-name: box-move2; }
                        .arqx-loader .box.box2 div { animation-name: box-scale2; }
                        .arqx-loader .box.box3 { --x: 280px; --y: -40px; left: 91px; top: 120px; animation-name: box-move3; }
                        .arqx-loader .box.box3 div { animation-name: box-scale3; }
                        .arqx-loader .box.box4 { --x: 60px; --y: 200px; left: 58px; top: 132px; animation-name: box-move4; }
                        .arqx-loader .box.box4 div { animation-name: box-scale4; }
                        .arqx-loader .box.box5 { --x: -220px; --y: -120px; left: 25px; top: 76px; animation-name: box-move5; }
                        .arqx-loader .box.box5 div { animation-name: box-scale5; }
                        .arqx-loader .box.box6 { --x: -260px; --y: 120px; left: 91px; top: 76px; animation-name: box-move6; }
                        .arqx-loader .box.box6 div { animation-name: box-scale6; }
                        .arqx-loader .box.box7 { --x: -240px; --y: 200px; left: 58px; top: 87px; animation-name: box-move7; }
                        .arqx-loader .box.box7 div { animation-name: box-scale7; }

                        @keyframes box-move0 { 12% { transform: translate(var(--x), var(--y)); } 25%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale0 { 6% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 14%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move1 { 16% { transform: translate(var(--x), var(--y)); } 29%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale1 { 10% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 18%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move2 { 20% { transform: translate(var(--x), var(--y)); } 33%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale2 { 14% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 22%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move3 { 24% { transform: translate(var(--x), var(--y)); } 37%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale3 { 18% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 26%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move4 { 28% { transform: translate(var(--x), var(--y)); } 41%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale4 { 22% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 30%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move5 { 32% { transform: translate(var(--x), var(--y)); } 45%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale5 { 26% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 34%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move6 { 36% { transform: translate(var(--x), var(--y)); } 49%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale6 { 30% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 38%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                        @keyframes box-move7 { 40% { transform: translate(var(--x), var(--y)); } 53%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                        @keyframes box-scale7 { 34% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 42%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }

                        @keyframes ground { 0%, 65% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); } 75%, 90% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1); } 100% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); } }
                        @keyframes ground-shine { 0%, 70% { opacity: 0; } 75%, 87% { opacity: 0.2; } 100% { opacity: 0; } }
                        @keyframes mask { 0%, 65% { opacity: 0; } 66%, 100% { opacity: 1; } }
                    `}</style>
                    <div className="font-display font-light text-2xl text-white tracking-widest uppercase mb-16 opacity-80">
                        Mukilan
                    </div>
                    <div className="arqx-loader" aria-hidden="true">
                        <div className="box box0"><div></div></div>
                        <div className="box box1"><div></div></div>
                        <div className="box box2"><div></div></div>
                        <div className="box box3"><div></div></div>
                        <div className="box box4"><div></div></div>
                        <div className="box box5"><div></div></div>
                        <div className="box box6"><div></div></div>
                        <div className="box box7"><div></div></div>
                        <div className="ground"><div></div></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default IntroLoader;
