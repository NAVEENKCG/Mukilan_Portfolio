"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const stripImages = [
    "/images/projects/coastal-villa.png",
    "/images/projects/tech-pavilion.png",
    "/images/projects/beach-resort.png",
    "/images/projects/cultural-center.png",
    "/images/projects/hillside-house.png",
    "/images/projects/boutique-hotel.png",
    "/images/projects/garden-residence.png",
    "/images/projects/lakeside-retreat.png",
];

export function ProjectStrip() {
    return (
        <div className="project-strip" aria-hidden="true">
            {stripImages.map((src, i) => (
                <div key={i} className="project-strip-item">
                    <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="60px"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
}

export default ProjectStrip;
