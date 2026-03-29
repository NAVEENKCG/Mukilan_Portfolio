"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const isWorks = pathname === "/works" || pathname === "/";

    const worksCategories = [
        "Hospitality",
        "Commercial",
        "Private homes",
        "Multi-residential",
        "Masterplanning",
        "Public works",
        "Archive",
    ];

    const mainLinks = [
        { name: "Philosophy", path: "/philosophy" },
        { name: "Practice", path: "#" },
        { name: "People", path: "/people" },
        { name: "Experiences", path: "#" },
        { name: "Books", path: "#" },
        { name: "News", path: "#" },
        { name: "Awards", path: "#" },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="sidebar-area shadow-[-10px_0_30px_rgba(0,0,0,0.06)] bg-[var(--bg-base)] !border-none hidden lg:flex">
                <div className="flex justify-end mb-8">
                    <button className="p-2 cursor-pointer hover:opacity-70 transition-opacity">
                        <Menu size={28} strokeWidth={1} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col pt-8 px-4">
                    {isWorks && (
                        <div className="mb-20">
                            <span className="text-sm font-light text-[var(--text-muted)] tracking-wide block mb-3 pl-2">
                                Selected work
                            </span>
                            <ul className="flex flex-col">
                                {worksCategories.map((category) => (
                                    <li key={category}>
                                        <Link
                                            href={`/works?category=${category.toLowerCase().replace(" ", "-")}`}
                                            className="block py-[10px] pl-2 text-[14px] font-light text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors border-t border-[var(--border)]"
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                                <li className="border-t border-[var(--border)] mt-1"></li>
                            </ul>
                        </div>
                    )}

                    <nav className={cn(isWorks ? "pl-[80px]" : "pl-8")}>
                        <ul className="flex flex-col">
                            {mainLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className={cn(
                                            "block py-[10px] text-[14px] font-light text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors border-t border-[var(--border)]",
                                            pathname === link.path && "text-[var(--text-muted)] pointer-events-none"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="border-t border-[var(--border)] mt-1"></li>
                        </ul>
                    </nav>
                </div>

                <div className="mt-12 flex justify-between items-end mb-4 px-4">
                    <Link href="/contact" className="text-sm font-light text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-2">
                        Contact
                    </Link>
                    <div className="text-right">
                        <Link href="/" className="logo-text inline-block hover:opacity-80 transition-opacity">
                            MUKILAN<br />ARCHITECTURE
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Nav Trigger */}
            <div className="lg:hidden fixed top-6 right-6 z-50">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-[var(--text-primary)]"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-[var(--bg-base)] flex flex-col"
                    >
                        <div className="flex justify-end p-6">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-3 text-[var(--text-primary)]"
                            >
                                <X size={32} strokeWidth={1} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-10 pt-4 pb-20">
                            {isWorks && (
                                <div className="mb-12">
                                    <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 block">
                                        Selected work
                                    </span>
                                    <ul className="flex flex-col gap-4">
                                        {worksCategories.map(cat => (
                                            <li key={cat}>
                                                <Link href="#" className="text-xl font-light text-[var(--text-secondary)]" onClick={() => setIsMobileMenuOpen(false)}>{cat}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <nav>
                                <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4 block">
                                    Menu
                                </span>
                                <ul className="flex flex-col gap-6">
                                    {mainLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.path}
                                                className="text-3xl font-display text-[var(--text-primary)]"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
