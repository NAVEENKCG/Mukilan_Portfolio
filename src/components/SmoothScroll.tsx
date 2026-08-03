"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Reset scroll on navigation
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;
