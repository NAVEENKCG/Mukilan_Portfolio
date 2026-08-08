"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

function Monolith() {
    const structureRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const coreLightRef = useRef<THREE.PointLight>(null);
    const p1 = useRef<THREE.Mesh>(null);
    const p2 = useRef<THREE.Mesh>(null);
    const p3 = useRef<THREE.Mesh>(null);
    const p4 = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (!structureRef.current || !coreRef.current) return;
        
        // Initial setup - slight tilt
        structureRef.current.rotation.set(0.4, -0.4, 0);
        
        const tl = gsap.timeline();
        
        // 2. Monolith rotation
        tl.to(structureRef.current.rotation, { y: Math.PI * 1.25, x: 0.2, duration: 4, ease: "power3.inOut" }, 0);
        
        // 3. The Fracture (Slabs slide apart, revealing the core)
        const move1 = [0.5, 0.5, 2];
        const move2 = [-0.5, -0.5, -2];
        const move3 = [2, -0.5, 0.5];
        const move4 = [-2, 0.5, -0.5];
        
        if (p1.current) tl.to(p1.current.position, { x: 0 + move1[0], y: 0 + move1[1], z: 0.525 + move1[2], duration: 2.5, ease: "expo.inOut" }, 1.0);
        if (p2.current) tl.to(p2.current.position, { x: 0 + move2[0], y: 0 + move2[1], z: -0.525 + move2[2], duration: 2.5, ease: "expo.inOut" }, 1.0);
        if (p3.current) tl.to(p3.current.position, { x: 0.525 + move3[0], y: 0 + move3[1], z: 0 + move3[2], duration: 2.5, ease: "expo.inOut" }, 1.0);
        if (p4.current) tl.to(p4.current.position, { x: -0.525 + move4[0], y: 0 + move4[1], z: 0 + move4[2], duration: 2.5, ease: "expo.inOut" }, 1.0);

        // 4. Core expands and ignites
        tl.to(coreRef.current.scale, { x: 1, y: 1, z: 1, duration: 2, ease: "back.out(1.2)" }, 1.5);
        if (coreLightRef.current) tl.to(coreLightRef.current, { intensity: 5, duration: 2, ease: "power2.out" }, 1.5);

    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        // Continuous subtle float
        if (structureRef.current) {
            structureRef.current.position.y = Math.sin(time) * 0.15;
        }
        if (coreRef.current) {
            coreRef.current.rotation.x = time * 0.2;
            coreRef.current.rotation.y = time * 0.3;
        }
        
        // Cinematic camera dive
        if (time > 3.0 && time < 5.0) {
            const progress = (time - 3.0) / 1.5;
            const eased = gsap.parseEase("power4.in")(Math.min(progress, 1));
            // Dive from 9 to 1
            state.camera.position.z = THREE.MathUtils.lerp(9, 1, eased);
            state.camera.rotation.z = THREE.MathUtils.lerp(0, Math.PI / 4, eased);
        } else if (time <= 3.0) {
            const progress = time / 4.0;
            const eased = gsap.parseEase("power3.inOut")(Math.min(progress, 1));
            // Pull back from 15 to 9 initially
            state.camera.position.z = THREE.MathUtils.lerp(15, 9, eased);
        }
    });

    return (
        <group ref={structureRef}>
            {/* Luminous Core Light */}
            <pointLight ref={coreLightRef} color="#4ECDC4" intensity={0} distance={15} />
            
            {/* Inner Frosted Core */}
            <mesh ref={coreRef} scale={[0.01, 0.01, 0.01]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhysicalMaterial 
                    color="#ffffff" 
                    transmission={0.9} 
                    opacity={1} 
                    metalness={0} 
                    roughness={0.2} 
                    ior={1.5} 
                    thickness={2.0} 
                />
            </mesh>

            {/* Concrete Slabs */}
            <mesh ref={p1} position={[0, 0, 0.525]} castShadow receiveShadow>
                <boxGeometry args={[2.1, 2.1, 1.05]} />
                <meshPhysicalMaterial color="#0D1526" roughness={0.85} metalness={0.2} clearcoat={0.05} />
            </mesh>
            <mesh ref={p2} position={[0, 0, -0.525]} castShadow receiveShadow>
                <boxGeometry args={[2.1, 2.1, 1.05]} />
                <meshPhysicalMaterial color="#0D1526" roughness={0.85} metalness={0.2} clearcoat={0.05} />
            </mesh>
            <mesh ref={p3} position={[0.525, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.05, 2.1, 2.1]} />
                <meshPhysicalMaterial color="#0D1526" roughness={0.85} metalness={0.2} clearcoat={0.05} />
            </mesh>
            <mesh ref={p4} position={[-0.525, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[1.05, 2.1, 2.1]} />
                <meshPhysicalMaterial color="#0D1526" roughness={0.85} metalness={0.2} clearcoat={0.05} />
            </mesh>
        </group>
    );
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

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
        }, 5500); // 5.5s to let the 3d cinematic animation play out fully

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[var(--bg-base)] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
                >
                    {/* 3D Scene Background */}
                    <div className="absolute inset-0 z-0">
                        <Canvas shadows camera={{ position: [0, 0, 15], fov: 35 }}>
                            <fog attach="fog" args={['#050A18', 10, 40]} />
                            <ambientLight intensity={0.6} />
                            <directionalLight position={[5, 10, 7]} intensity={0.8} castShadow shadow-bias={-0.0001} />
                            <Monolith />
                        </Canvas>
                    </div>

                    {/* UI Layer */}
                    <div className="relative flex flex-col items-center justify-between h-full py-12 w-full z-10 px-8 pointer-events-none">
                        
                        <div className="w-full flex justify-between items-start opacity-50 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
                            <span>System Online</span>
                            <span>Initialization Sequence</span>
                        </div>
                        
                        <div className="flex flex-col items-center mt-auto mb-10 w-full max-w-sm">
                            <div className="overflow-hidden mb-8 flex flex-col items-center w-full">
                                <motion.div 
                                    className="font-display font-light text-2xl md:text-5xl text-white tracking-[0.4em] uppercase whitespace-nowrap"
                                    initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: "50%" }}
                                    animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: "0%" }}
                                    transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                                >
                                    Mukilan E V
                                </motion.div>
                                <motion.div 
                                    className="font-mono text-[10px] md:text-xs text-[var(--accent-vivid)] tracking-[0.3em] uppercase mt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.5, ease: EASE_OUT_EXPO, delay: 0.8 }}
                                >
                                    Form & Void
                                </motion.div>
                            </div>
                            
                            {/* Cinematic Loading Line */}
                            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mt-2">
                                <motion.div
                                    className="absolute top-0 left-0 bottom-0 bg-[var(--accent-vivid)]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4.5, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default IntroLoader;
