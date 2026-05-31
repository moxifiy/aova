"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from '@/components/ThemeToggle';
import CustomCursor from '@/components/CustomCursor';

const CATEGORIES = ["Branding", "Websites", "Social Media", "Animation Videos"] as const;
type Category = typeof CATEGORIES[number];

const PROJECTS = [
    { id: 1, name: "O.R.C.A Systems", category: "Branding", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" },
    { id: 2, name: "Lumina Edge", category: "Branding", image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop" },
    { id: 3, name: "Neon Identity", category: "Branding", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1200&auto=format&fit=crop" },
    { id: 4, name: "Vela Creative", category: "Websites", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop" },
    { id: 5, name: "Quantum Web", category: "Websites", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" },
    { id: 6, name: "Studio Forma", category: "Social Media", image: "https://images.unsplash.com/photo-1612831455740-a2f6cb1261d5?q=80&w=1200&auto=format&fit=crop" },
    { id: 7, name: "Velocity Campaigns", category: "Social Media", image: "https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=1200&auto=format&fit=crop" },
    { id: 8, name: "Solara Motion", category: "Animation Videos", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop" },
    { id: 9, name: "TechFlow Kinetic", category: "Animation Videos", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop" },
];

export default function ArchivePage() {
    const [activeTab, setActiveTab] = useState<Category>("Branding");
    const [isDark, setIsDark] = useState(false);

    // Dark mode sync
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDark(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark]);

    const filteredProjects = PROJECTS.filter(p => p.category === activeTab);

    return (
        <main className="relative min-h-[100svh] pb-32">
            <CustomCursor />

            {/* Top Navigation & Tabs */}
            <nav className="fixed top-0 inset-x-0 z-50 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center pointer-events-none gap-4">
                <div className="pointer-events-auto w-full md:w-auto flex justify-between md:justify-start flex-none md:flex-1">
                    <Link 
                        href="/#work" 
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm text-sm font-semibold hover:bg-[var(--border)] transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                    </Link>
                    
                    {/* Theme toggle visible only on mobile in this flex container */}
                    <div className="md:hidden">
                        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                    </div>
                </div>

                {/* Centered Tabs */}
                <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shadow-sm ${activeTab === cat
                                ? "bg-[var(--text)] text-[var(--surface)] scale-105"
                                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)] border border-[var(--border)]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="pointer-events-auto hidden md:flex flex-1 justify-end">
                    <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
                </div>
            </nav>

            <div className="pg-inner pt-[140px] md:pt-32">
                {/* Animated Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p) => (
                            <motion.div
                                layout
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative h-[300px] md:h-[400px] overflow-hidden rounded-2xl bg-[var(--border)] cursor-pointer shadow-sm hover:shadow-xl transition-shadow"
                            >
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                />
                                
                                {/* Top Category Tag */}
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                                        {p.category}
                                    </span>
                                </div>
                                
                                {/* Bottom Gradient & Title */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <h3 className="text-white text-2xl font-serif leading-tight">{p.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    
                    {/* Empty state safeguard */}
                    {filteredProjects.length === 0 && (
                        <div className="col-span-1 border border-dashed border-[var(--border)] rounded-2xl p-12 text-center flex flex-col items-center justify-center text-[var(--muted)]">
                            <span className="text-3xl mb-4 opacity-50">📂</span>
                            <span className="text-sm font-semibold uppercase tracking-widest">No Projects Yet</span>
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
}
