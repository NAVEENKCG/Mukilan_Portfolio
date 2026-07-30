"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { staggerContainer, EASE_OUT_EXPO } from "@/lib/animations";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
    title: string;
    image: string;
    location: string;
    status: string;
    typology: string;
    scale: string;
    description: string;
};

const projects: Project[] = [
    {
        title: "Coastal Villa",
        image: "/images/projects/coastal-villa.png",
        location: "Malibu, California",
        status: "Completed 2023",
        typology: "Private / Residential",
        scale: "8,500 sq ft",
        description: "A breathtaking coastal retreat featuring panoramic ocean views, integrating natural stone and sustainable timber to blend seamlessly with the rocky clifftop.",
    },
    {
        title: "Tech Pavilion",
        image: "/images/projects/tech-pavilion.png",
        location: "Silicon Valley, CA",
        status: "Completed 2022",
        typology: "Commercial / Office",
        scale: "45,000 sq ft",
        description: "A sleek contemporary office building with a dramatic cantilevered structure and glass facade designed to maximize natural light and foster collaboration.",
    },
    {
        title: "Beach Resort",
        image: "/images/projects/beach-resort.png",
        location: "Bali, Indonesia",
        status: "Completed 2021",
        typology: "Hospitality / Resort",
        scale: "120,000 sq ft",
        description: "A luxurious tropical resort with thatched roof pavilions and wooden walkways over crystal clear water, representing modern minimalist architecture in nature.",
    },
    {
        title: "Cultural Center",
        image: "/images/projects/cultural-center.png",
        location: "Kyoto, Japan",
        status: "In Progress",
        typology: "Public / Cultural",
        scale: "65,000 sq ft",
        description: "A modern museum building characterized by dramatic curved concrete walls and large glass atriums that embrace traditional and contemporary art.",
    },
    {
        title: "Hillside House",
        image: "/images/projects/hillside-house.png",
        location: "Aspen, Colorado",
        status: "Completed 2024",
        typology: "Private / Residential",
        scale: "12,000 sq ft",
        description: "Built into rocky terrain with rich brown natural stone, this residence features cascading green terraces and floor-to-ceiling windows overlooking a lush valley.",
    },
    {
        title: "Boutique Hotel",
        image: "/images/projects/boutique-hotel.png",
        location: "Miami, Florida",
        status: "Completed 2023",
        typology: "Hospitality / Hotel",
        scale: "85,000 sq ft",
        description: "An elegant lobby interior with soaring ceilings, warm golden pendant lighting, and rich mahogany wood columns forming a luxury minimalist design.",
    },
    {
        title: "Garden Residence",
        image: "/images/projects/garden-residence.png",
        location: "Portland, Oregon",
        status: "Completed 2020",
        typology: "Private / Residential",
        scale: "5,400 sq ft",
        description: "A sustainable family home designed around a central ancient oak tree, blurring the lines between indoor living and the lush outdoor environment.",
    },
    {
        title: "Lakeside Retreat",
        image: "/images/projects/lakeside-retreat.png",
        location: "Lake Tahoe, NV",
        status: "Completed 2022",
        typology: "Hospitality / Retreat",
        scale: "18,000 sq ft",
        description: "A series of interconnected timber cabins floating above the forest floor, offering guests an immersive woodland experience without disturbing the site.",
    },
    {
        title: "Urban Tower",
        image: "/images/projects/urban-tower.png",
        location: "New York, NY",
        status: "In Progress",
        typology: "Commercial / High-rise",
        scale: "450,000 sq ft",
        description: "A striking addition to the city skyline, featuring an articulated glass facade and integrated sky gardens that provide green spaces at altitude.",
    },
    {
        title: "Heritage Restoration",
        image: "/images/projects/heritage-restoration.png",
        location: "London, UK",
        status: "Completed 2021",
        typology: "Public / Civic",
        scale: "32,000 sq ft",
        description: "Careful adaptive reuse of a 19th-century industrial building into a vibrant community hub, preserving historic masonry while inserting modern glass interventions.",
    },
];

export default function WorksPage() {
    const leftColumn = projects.filter((_, i) => i % 2 === 0);
    const rightColumn = projects.filter((_, i) => i % 2 !== 0);

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

    const handleSelectProject = (project: Project) => {
        setIsInfoPanelOpen(false);
        setSelectedProject(project);
    };

    return (
        <>
            <AnimatePresence>
                {!selectedProject ? (
                    <motion.div
                        key="grid"
                        className="flex flex-col md:flex-row gap-6 md:gap-[5%] lg:gap-[8%] pt-10 pb-32 pl-[8%] pr-[420px] max-lg:pr-[3%] w-full"
                        initial="initial"
                        animate="animate"
                        exit={{ opacity: 0, transition: { duration: 0.4 } }}
                        variants={staggerContainer}
                    >
                        {/* Left Column - Wider Aspect Ratio */}
                        <div className="flex-[1.2] flex flex-col gap-16 md:gap-24">
                            {leftColumn.map((project, idx) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    image={project.image}
                                    index={idx * 2}
                                    className="aspect-[16/10] w-full"
                                    onClick={() => handleSelectProject(project)}
                                />
                            ))}
                        </div>

                        {/* Right Column - Taller Aspect Ratio */}
                        <div className="flex-[1.0] flex flex-col gap-16 md:gap-24">
                            {rightColumn.map((project, idx) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    image={project.image}
                                    index={idx * 2 + 1}
                                    className="aspect-[4/3] w-full"
                                    onClick={() => handleSelectProject(project)}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        className="fixed inset-0 z-[100] bg-[#111] overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Info Panel */}
                        <motion.aside
                            className="bg-[#fafaf8] border-l border-[#e4e2db] absolute right-0 top-0 bottom-0 overflow-hidden z-[2]"
                            initial={{ x: 396 }}
                            animate={{ x: isInfoPanelOpen ? 0 : 396 }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            style={{ width: 460, willChange: "transform" }}
                        >
                            {/* Trigger Strip */}
                            <div
                                className="w-[64px] h-full flex flex-col items-center justify-center gap-[14px] cursor-pointer absolute left-0 top-0 z-[3] group transition-colors duration-300 hover:bg-black/5"
                                onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
                                style={{ userSelect: 'none' }}
                            >
                                <div className={cn(
                                    "w-[1px] bg-[#ccc] origin-top transition-all duration-300 group-hover:bg-[#888]",
                                    isInfoPanelOpen ? "h-[48px] bg-[#999]" : "h-[36px] group-hover:h-[48px]"
                                )} />
                                <div className={cn(
                                    "vertical-text-up text-[9px] uppercase transition-all duration-300 group-hover:text-[#444] group-hover:tracking-[4.5px]",
                                    isInfoPanelOpen ? "text-[#666] tracking-[3.5px]" : "text-[#aaa] tracking-[3.5px]"
                                )}>
                                    {isInfoPanelOpen ? "Close" : "Info"}
                                </div>
                                <div className={cn(
                                    "text-[15px] font-light leading-[1] transition-all duration-500",
                                    isInfoPanelOpen ? "rotate-45 text-[#666]" : "rotate-0 text-[#bbb]"
                                )}>
                                    +
                                </div>
                                <div className={cn(
                                    "w-[1px] bg-[#ccc] origin-top transition-all duration-300 group-hover:bg-[#888]",
                                    isInfoPanelOpen ? "h-[48px] bg-[#999]" : "h-[36px] group-hover:h-[48px]"
                                )} />
                            </div>

                            {/* Panel Body */}
                            <motion.div
                                className="absolute left-[64px] top-0 w-[396px] h-full p-[56px_48px_48px] overflow-y-auto"
                                animate={{
                                    opacity: isInfoPanelOpen ? 1 : 0,
                                    x: isInfoPanelOpen ? 0 : 16
                                }}
                                transition={{
                                    opacity: { duration: 0.3, ease: "easeOut", delay: isInfoPanelOpen ? 0.28 : 0 },
                                    x: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: isInfoPanelOpen ? 0.28 : 0 }
                                }}
                                style={{ pointerEvents: isInfoPanelOpen ? 'auto' : 'none' }}
                            >
                                <div className="inline-block text-[9px] tracking-[3px] uppercase text-[#b0ab9e] border border-[#e0ddd5] py-[5px] px-[11px] mb-[32px]">
                                    {selectedProject.typology}
                                </div>

                                <h2 className="font-display text-[32px] font-light tracking-[-0.4px] text-[#1a1a18] leading-[1.18] mb-[18px] uppercase">
                                    {selectedProject.title}
                                </h2>

                                <p className="text-[13.5px] leading-[1.8] text-[#888] mb-[36px]">
                                    {selectedProject.description}
                                </p>

                                <div className="h-[1px] bg-gradient-to-r from-[#e0ddd5] to-transparent mb-[30px]" />

                                <div className="flex justify-between items-baseline py-[11px] border-b border-[#f0ede6]">
                                    <span className="text-[9px] tracking-[2.5px] uppercase text-[#c0bcb2]">Location</span>
                                    <span className="text-[13px] text-[#333]">{selectedProject.location}</span>
                                </div>
                                <div className="flex justify-between items-baseline py-[11px] border-b border-[#f0ede6]">
                                    <span className="text-[9px] tracking-[2.5px] uppercase text-[#c0bcb2]">Area</span>
                                    <span className="text-[13px] text-[#333]">{selectedProject.scale}</span>
                                </div>
                                <div className="flex justify-between items-baseline py-[11px] border-b border-[#f0ede6]">
                                    <span className="text-[9px] tracking-[2.5px] uppercase text-[#c0bcb2]">Status</span>
                                    <span className="text-[13px] text-[#333]">{selectedProject.status}</span>
                                </div>
                                <div className="flex justify-between items-baseline py-[11px]">
                                    <span className="text-[9px] tracking-[2.5px] uppercase text-[#c0bcb2]">Studio</span>
                                    <span className="text-[13px] text-[#333]">Mukilan Architecture</span>
                                </div>
                            </motion.div>
                        </motion.aside>

                        {/* Main Image View */}
                        <motion.main
                            className="absolute inset-0 origin-left bg-[#111]"
                            animate={{
                                filter: isInfoPanelOpen ? "brightness(0.7) saturate(0.35)" : "brightness(1) saturate(1)",
                                scale: isInfoPanelOpen ? 1.018 : 1
                            }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            layoutId={`project-image-${selectedProject.title}`}
                        >
                            <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Exit to Grid Button overlaid on image */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-[40px] left-[40px] z-[120] text-white opacity-60 hover:opacity-100 transition-opacity flex items-center gap-3 drop-shadow-md"
                            >
                                <X size={24} strokeWidth={1.5} />
                                <span className="text-[11px] uppercase tracking-[0.2em] font-light">Back</span>
                            </button>
                        </motion.main>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
