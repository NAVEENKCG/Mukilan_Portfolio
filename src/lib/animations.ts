export const SPRING_SMOOTH = { type: "spring" as const, stiffness: 300, damping: 30 };
export const SPRING_SNAPPY = { type: "spring" as const, stiffness: 500, damping: 35 };
export const EASE_OUT_EXPO = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

export const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: EASE_OUT_EXPO,
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: EASE_OUT_EXPO,
};

export const slideInFromLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const slideInFromRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: EASE_OUT_EXPO,
};
