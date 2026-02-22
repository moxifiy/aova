"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
            }
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return <div className="pg-cursor-dot" ref={dotRef} />;
}

function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-10 py-4 bg-white/70 backdrop-blur-2xl border border-black/5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.7)]"
        >
            <div className="flex items-center gap-12 text-sm font-semibold uppercase tracking-widest text-black/60">
                <a href="#process" className="hover:text-black hover:scale-105 transition-all">Process</a>
                <a href="#work" className="hover:text-black hover:scale-105 transition-all">Work</a>
                <a href="#services" className="hover:text-black hover:scale-105 transition-all">Services</a>
            </div>
        </motion.nav>
    );
}

function Hero() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            {/* Dot Pattern Background fading out at edges */}
            <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-60 pointer-events-none -z-20" />

            {/* Extra decorative dot blocks for abstract feel */}
            <div className="absolute top-[15%] left-[5%] w-64 h-64 bg-dots opacity-[0.15] -rotate-6 pointer-events-none -z-15" />
            <div className="absolute bottom-[20%] right-[5%] w-96 h-48 bg-dots opacity-[0.15] rotate-12 pointer-events-none -z-15" />

            {/* Decorative ambient gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF3366]/10 to-[#3366FF]/10 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" />

            {/* Subtle decorative crosses */}
            <div className="absolute top-32 left-12 md:left-24 text-black/20 text-xl font-light pointer-events-none">+</div>
            <div className="absolute bottom-32 right-12 md:right-24 text-black/20 text-xl font-light pointer-events-none">+</div>

            <motion.div
                style={{ y }}
                className="text-center max-w-4xl mx-auto z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-12 flex justify-center"
                >
                    <svg viewBox="0 0 677.88 220.38" fill="currentColor" className="w-32 md:w-48 text-black opacity-80">
                        <path d="M220.17.21v116.98c0,56.99-46.2,103.19-103.19,103.19h-41.08v-75.9h75.9v-75.9h-75.9v75.9H0v-41.08C0,46.41,46.2.21,103.18.21h116.99Z" />
                        <path d="M317.98,0h-23.18l-36.95,101.43h21.15l7.91-22.75h38.57l7.86,22.75h21.59L317.98,0ZM292.4,62.88l13.85-39.84,13.77,39.84h-27.62Z" />
                        <path d="M424.66,44.99c-3.29-5.75-7.68-10.24-13.19-13.48-5.51-3.23-11.79-4.85-18.84-4.85s-13.38,1.62-18.98,4.85c-5.6,3.24-10.02,7.75-13.26,13.55-3.23,5.8-4.85,12.46-4.85,20s1.59,13.91,4.78,19.7c3.19,5.8,7.58,10.31,13.19,13.55,5.6,3.24,11.93,4.85,18.98,4.85s13.35-1.61,18.91-4.85c5.55-3.24,9.97-7.75,13.26-13.55,3.28-5.79,4.92-12.41,4.92-19.85s-1.64-14.17-4.92-19.92ZM406.62,76.29c-1.5,3.04-3.48,5.36-5.94,6.95-2.47,1.59-5.2,2.39-8.19,2.39s-5.75-.8-8.26-2.39c-2.51-1.59-4.49-3.91-5.94-6.95-1.45-3.05-2.18-6.84-2.18-11.38s.75-8.35,2.25-11.45c1.5-3.09,3.5-5.4,6.01-6.95,2.51-1.55,5.31-2.32,8.41-2.32s5.7.77,8.11,2.32c2.42,1.55,4.35,3.86,5.8,6.95,1.45,3.1,2.17,6.91,2.17,11.45s-.75,8.33-2.24,11.38Z" />
                        <polygon points="507.12 28.4 480.46 101.43 455.82 101.43 429.16 28.4 450.46 28.4 468.28 82.3 485.96 28.4 507.12 28.4" />
                        <path d="M572.28,39.99c-2.71-4.35-6.62-7.66-11.74-9.93-5.12-2.27-11.11-3.4-17.97-3.4-6.08,0-11.59,1.06-16.52,3.19-4.92,2.12-8.86,5.09-11.81,8.91-2.94,3.81-4.66,8.38-5.14,13.69h19.56c.58-3.19,2.13-5.55,4.64-7.1,2.51-1.54,5.55-2.32,9.13-2.32,3.28,0,5.94.58,7.97,1.74,2.03,1.16,3.47,2.88,4.34,5.14.87,2.27,1.31,5.2,1.31,8.77h-17.68c-7.15,0-13.04.94-17.68,2.83-4.63,1.88-8.09,4.51-10.36,7.89-2.27,3.39-3.4,7.3-3.4,11.74,0,4.06.99,7.75,2.97,11.08,1.98,3.34,4.95,5.99,8.91,7.97,3.96,1.98,8.93,2.97,14.92,2.97,3,0,5.65-.31,7.97-.94,2.32-.63,4.44-1.49,6.38-2.61,1.93-1.1,3.64-2.43,5.14-3.98,1.5-1.54,2.78-3.24,3.84-5.07l2.32,10.87h16.95v-45.36c0-6.37-1.35-11.73-4.05-16.08ZM555.32,71c-.38,2.32-.99,4.44-1.81,6.37-.82,1.94-1.93,3.7-3.33,5.29-1.4,1.6-3.04,2.8-4.93,3.62-1.88.83-4.03,1.24-6.44,1.24-2.03,0-3.84-.32-5.44-.95-1.59-.62-2.82-1.54-3.69-2.75-.87-1.21-1.31-2.73-1.31-4.56,0-1.65.44-3.09,1.31-4.35s2.19-2.25,3.98-2.97c1.79-.73,4.13-1.09,7.03-1.09h14.63v.15Z" />
                        <path d="M335.8,189.88c0,5.41-1.37,10.41-4.12,15-2.76,4.59-6.82,8.28-12.18,11.08s-11.95,4.2-19.78,4.2c-7.24,0-13.76-1.25-19.56-3.76-5.79-2.51-10.36-6.18-13.69-11.02-3.33-4.82-5.1-10.67-5.29-17.53h21.45c.19,2.9.99,5.51,2.39,7.83,1.4,2.31,3.33,4.15,5.79,5.5,2.47,1.36,5.44,2.03,8.91,2.03,2.9,0,5.44-.48,7.61-1.45,2.18-.96,3.89-2.32,5.15-4.06,1.25-1.73,1.88-3.86,1.88-6.37,0-2.7-.7-5-2.1-6.88-1.4-1.89-3.31-3.5-5.73-4.86-2.41-1.35-5.24-2.58-8.47-3.69-3.24-1.11-6.59-2.25-10.07-3.41-8.02-2.61-14.13-6.11-18.33-10.5-4.2-4.4-6.31-10.22-6.31-17.46,0-6.18,1.48-11.45,4.42-15.8,2.95-4.34,7.05-7.68,12.32-9.99,5.26-2.32,11.23-3.48,17.9-3.48s13.04,1.18,18.25,3.55c5.22,2.37,9.35,5.77,12.39,10.21,3.05,4.45,4.66,9.71,4.86,15.8h-21.88c0-2.22-.61-4.28-1.81-6.16-1.21-1.88-2.83-3.41-4.86-4.57-2.03-1.15-4.4-1.73-7.1-1.73-2.51-.1-4.76.26-6.74,1.08-1.98.82-3.55,2.03-4.71,3.62-1.16,1.6-1.73,3.6-1.73,6.02s.57,4.42,1.73,6.01c1.16,1.6,2.8,2.97,4.93,4.13,2.12,1.16,4.59,2.25,7.39,3.26,2.8,1.02,5.84,2.05,9.13,3.12,5.12,1.74,9.8,3.79,14.05,6.15,4.25,2.37,7.63,5.44,10.15,9.21,2.51,3.76,3.76,8.74,3.76,14.92Z" />
                        <path d="M372.4,162.35v30.28c0,3.19.7,5.41,2.11,6.67,1.39,1.26,3.78,1.88,7.17,1.88h9.56v17.25h-13.18c-5.13,0-9.64-.82-13.55-2.47-3.91-1.64-6.96-4.34-9.13-8.11-2.18-3.77-3.26-8.89-3.26-15.36v-30.14h-12.61v-16.95h12.61l2.32-20.14h17.96v20.14h18.99v16.95h-18.99Z" />
                        <path d="M471.91,145.4v73.03h-17.83l-1.59-11.89c-2.13,4.16-5.24,7.47-9.35,9.93-4.1,2.46-9.05,3.69-14.85,3.69s-11.08-1.23-15.29-3.69c-4.2-2.46-7.39-6.11-9.56-10.94s-3.26-10.77-3.26-17.82v-42.31h20.29v40.28c0,5.7,1.18,10.02,3.55,12.97,2.36,2.94,6.06,4.42,11.08,4.42,3.19,0,6.01-.73,8.48-2.18,2.46-1.45,4.42-3.55,5.87-6.3,1.44-2.75,2.17-6.11,2.17-10.07v-39.12h20.29Z" />
                        <path d="M540.12,114.1v40.43c-2.41-3.58-5.55-6.28-9.42-8.12-3.86-1.83-8.4-2.75-13.62-2.75-6.66,0-12.68,1.66-18.04,5-5.36,3.33-9.54,7.87-12.53,13.62-3,5.75-4.49,12.29-4.49,19.63s1.47,13.91,4.42,19.71c2.94,5.79,7.05,10.33,12.31,13.62,5.27,3.28,11.18,4.92,17.75,4.92,4.06,0,7.56-.53,10.51-1.59,2.94-1.06,5.48-2.46,7.61-4.2,2.12-1.74,3.96-3.72,5.5-5.94l2.18,10h18.11v-104.33h-20.29ZM538.24,192.63c-1.55,3.1-3.75,5.51-6.59,7.25-2.85,1.74-6.21,2.61-10.07,2.61s-6.94-.87-9.79-2.61c-2.85-1.74-5.07-4.15-6.66-7.25-1.6-3.09-2.39-6.71-2.39-10.86,0-3.87.79-7.37,2.39-10.51,1.59-3.14,3.81-5.58,6.66-7.32,2.85-1.74,6.11-2.6,9.79-2.6s7.1.86,9.99,2.6c2.9,1.74,5.12,4.16,6.67,7.25,1.54,3.09,2.32,6.66,2.32,10.72s-.78,7.63-2.32,10.72Z" />
                        <rect x="573.64" y="145.4" width="20.28" height="73.03" />
                        <path d="M672.95,161.99c-3.29-5.75-7.68-10.24-13.19-13.48-5.5-3.23-11.78-4.85-18.83-4.85s-13.38,1.62-18.99,4.85c-5.6,3.24-10.02,7.75-13.25,13.55-3.24,5.8-4.86,12.46-4.86,20s1.6,13.91,4.78,19.7c3.19,5.8,7.59,10.31,13.19,13.55,5.6,3.24,11.93,4.85,18.98,4.85s13.36-1.61,18.91-4.85c5.55-3.24,9.97-7.75,13.26-13.55,3.28-5.79,4.93-12.41,4.93-19.85s-1.65-14.17-4.93-19.92ZM654.91,193.29c-1.5,3.04-3.48,5.36-5.94,6.95-2.46,1.59-5.2,2.39-8.19,2.39s-5.75-.8-8.26-2.39c-2.51-1.59-4.49-3.91-5.94-6.95-1.45-3.05-2.17-6.84-2.17-11.38s.75-8.35,2.24-11.45c1.5-3.09,3.5-5.4,6.02-6.95,2.51-1.55,5.31-2.32,8.4-2.32s5.7.77,8.12,2.32c2.41,1.55,4.34,3.86,5.79,6.95,1.45,3.1,2.18,6.91,2.18,11.45s-.75,8.33-2.25,11.38Z" />
                        <rect x="573.65" y="114.1" width="20.26" height="20.26" />
                    </svg>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-[-0.03em] mb-8 font-serif text-black"
                >
                    We elevate <br />
                    <span className="italic text-[#FF3366]">startups</span> with intent.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-12"
                >
                    Modern web experiences crafted with precision, for founders who care about how their brand looks and feels.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <a href="#contact" className="pg-btn pg-btn-primary text-lg">
                        Reserve your spot
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                    <p className="mt-4 text-xs font-medium text-black/40 uppercase tracking-widest">Booking for Q1 2026</p>
                </motion.div>
            </motion.div>
        </section>
    );
}

const MARQUEE_ITEMS = [
    "Brand Identity",
    "UI/UX Design",
    "Motion & Animation",
    "Web Development",
    "Art Direction"
];

function Marquee() {
    return (
        <div className="pg-marquee-wrap">
            <div className="pg-marquee-track">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                    <span key={i} className="pg-marquee-item">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

const SERVICES = [
    { title: "Brand Identity", desc: "Logo, visual language, brand guidelines, and strategic positioning.", color: "bg-[#FF3366]" },
    { title: "UI / UX Design", desc: "User research, wireframes, prototyping, and high-fidelity design.", color: "bg-[#3366FF]" },
    { title: "Web Development", desc: "Custom websites built with modern frameworks, optimized for performance.", color: "bg-[#00CC66]" },
    { title: "Motion Design", desc: "Micro-interactions, transitions, and animated brand assets.", color: "bg-[#FF9933]" },
];

function ProcessBento() {
    return (
        <section className="relative py-32 px-6" id="services">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Our <span className="italic text-[#3366FF]">Services</span></h2>
                    <p className="text-black/60 text-lg max-w-xl mx-auto">Everything you need to build a brand that stands out and an interface that converts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
                    >
                        <div className={`w-14 h-14 rounded-full ${SERVICES[0].color} mb-8`} />
                        <h3 className="text-3xl font-serif mb-4">{SERVICES[0].title}</h3>
                        <p className="text-black/60 text-lg">{SERVICES[0].desc}</p>
                    </motion.div>

                    {SERVICES.slice(1).map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                            className="bento-card"
                        >
                            <div className={`w-10 h-10 rounded-full ${s.color} mb-6`} />
                            <h3 className="text-xl font-serif mb-3">{s.title}</h3>
                            <p className="text-black/60">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   PROJECTS
   ================================================================ */
const PROJECTS = [
    {
        title: "Lumara — Redefining Sustainable Luxury",
        tags: ["Brand Identity", "2024"],
        desc: "Full brand overhaul, packaging, and digital presence for a next-gen sustainable fashion label.",
        colors: ["from-[#FF3366] to-[#FF9933]", "from-[#3366FF] to-[#00CC66]", "from-[#00CC66] to-[#FF3366]"],
    },
    {
        title: "Orion Analytics Dashboard",
        tags: ["UI / UX", "SaaS"],
        desc: "A zero-friction data platform for Series-B fintech startup Orion.",
        colors: ["from-[#3366FF] to-[#8833FF]", "from-[#111111] to-[#333333]", "from-[#FF3366] to-[#3366FF]"],
    },
    {
        title: "Halo — Brand in Motion",
        tags: ["Motion", "Branding"],
        desc: "Dynamic brand identity system with animated assets for digital-first wellness brand Halo.",
        colors: ["from-[#00CC66] to-[#111111]", "from-[#FF9933] to-[#FF3366]", "from-[#8833FF] to-[#00CC66]"],
    },
];

function WorkSection() {
    return (
        <section className="py-32 px-6 max-w-7xl mx-auto" id="work">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-4">Selected <span className="italic text-[#FF3366]">Work</span></h2>
                    <p className="text-black/60 text-lg max-w-md">Our finest projects for founders who refuse to blend in.</p>
                </div>
                <a href="#work" className="pg-btn border border-black/10 hover:border-black/30 bg-white">
                    View Archive
                </a>
            </div>

            <div className="grid grid-cols-1 gap-12">
                {PROJECTS.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="group flex flex-col md:flex-row gap-8 items-center"
                    >
                        <div className="w-full md:w-3/5 aspect-[4/3] rounded-[32px] overflow-hidden relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.colors[0]} opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700`} />
                            {/* Abstract decorative shapes as mock images */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-white/20 backdrop-blur-3xl rounded-3xl border border-white/30 rotate-3 group-hover:-rotate-3 transition-transform duration-500" />
                        </div>
                        <div className="w-full md:w-2/5 p-6 md:p-12">
                            <div className="flex gap-2 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full border border-black/10 text-xs font-medium uppercase tracking-widest text-black/60">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif mb-4">{project.title}</h3>
                            <p className="text-black/60 text-lg">{project.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

/* ================================================================
   BUYING PROCESS
   ================================================================ */
const BUYING_STEPS = [
    { num: "01", title: "Discovery Call", desc: "A 30-minute chat to understand your brand, goals, and technical requirements." },
    { num: "02", title: "Strategy Proposal", desc: "We map out the architecture, timeline, and exact cost. No hidden fees." },
    { num: "03", title: "Design Sprint", desc: "We execute the design systematically, seeking your feedback at key milestones." },
    { num: "04", title: "Handoff", desc: "You receive clean code, Figma files, and a brand guideline ready for production." }
];

function BuyingProcess() {
    return (
        <section className="relative py-32 px-6 border-t border-black/5 overflow-hidden" id="process">
            {/* Decorative background block */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-dots opacity-[0.08] -rotate-12 pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">How it <span className="italic text-[#00CC66]">Works</span></h2>
                    <p className="text-black/60 text-lg max-w-xl mx-auto">We keep things simple, transparent, and completely focused on your success.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {BUYING_STEPS.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="relative p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Connecting line for desktop */}
                            {i !== BUYING_STEPS.length - 1 && (
                                <div className="hidden md:block absolute top-[52px] -right-[32px] w-[32px] h-[2px] bg-black/10 z-0" />
                            )}
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-serif text-xl mb-6 relative z-10">
                                {step.num}
                            </div>
                            <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                            <p className="text-black/60">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   FAQ
   ================================================================ */
const FAQS = [
    { q: "What types of projects do you take on?", a: "We work across brand identity, UI/UX design, design systems, motion graphics, and web development. We're selective — we take on fewer projects so we can give each one our full attention and craft." },
    { q: "How long does a typical project take?", a: "Brand identity projects typically take 6–10 weeks. Web and product design engagements run 8–16 weeks." },
    { q: "What is your pricing structure?", a: "We work on a project-fee basis, not hourly. This means you know the full cost upfront with no surprises." },
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="border-b border-black/10 py-6">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-left focus:outline-none cursor-none"
            >
                <span className={`text-xl md:text-2xl font-serif transition-colors ${isOpen ? "text-[#FF3366]" : "text-black"}`}>{q}</span>
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? "bg-black text-white border-black rotate-45" : "border-black/20 text-black/60"}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="6" y1="2" x2="6" y2="10" />
                        <line x1="2" y1="6" x2="10" y2="6" />
                    </svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pt-4 text-black/60 text-lg max-w-2xl">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    return (
        <section className="py-32 px-6 max-w-4xl mx-auto" id="faq">
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Common <span className="italic text-[#00CC66]">Questions</span></h2>
            </div>
            <div>
                {FAQS.map((faq, i) => (
                    <FaqItem
                        key={i}
                        q={faq.q}
                        a={faq.a}
                        isOpen={openIndex === i}
                        onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
                    />
                ))}
            </div>
        </section>
    );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
    return (
        <footer className="relative bg-[#111111] text-white py-20 px-6 rounded-t-[40px] md:rounded-t-[80px] mt-20 overflow-hidden">
            <div className="absolute inset-0 bg-dots opacity-[0.05] pointer-events-none -z-10 mix-blend-overlay" />
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                <h2 className="text-6xl md:text-[120px] leading-none font-serif tracking-[-0.04em] mb-12">
                    Let's talk.
                </h2>
                <a href="#contact" className="pg-btn bg-white text-black hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] !text-lg !px-8 !py-4 mb-32">
                    Start a project
                </a>

                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-8">
                    <div className="flex items-center gap-2">
                        <svg viewBox="0 0 171.27 171.27" fill="currentColor" className="w-8 h-8 text-[#E8FF47]">
                            <path d="M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z" />
                        </svg>
                        <span className="font-serif text-2xl tracking-widest uppercase">Aova.</span>
                    </div>
                    <div className="flex gap-8 text-sm text-white/50 uppercase tracking-widest font-medium">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    </div>
                    <p className="text-white/30 text-xs">© 2026 Aova Design Studio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default function PlaygroundPage() {
    return (
        <main className="relative">
            <CustomCursor />
            <Navbar />
            <Hero />
            <Marquee />
            <ProcessBento />

            <WorkSection />
            <BuyingProcess />
            <FaqSection />
            <Footer />
        </main>
    );
}
