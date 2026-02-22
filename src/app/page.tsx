"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const HeroLogo3D = dynamic<{ isDark: boolean }>(() => import("@/components/HeroLogo3D"), { ssr: false });

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(calc(${e.clientX}px - 2px), calc(${e.clientY}px - 2px))`;
            }
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div className="pg-cursor-dot" ref={dotRef}>
            <svg viewBox="0 0 171.27 171.27" fill="currentColor" className="w-5 h-5 -rotate-90 origin-center transition-transform duration-100 ease-out">
                <path d="M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z" />
            </svg>
        </div>
    );
}

function Navbar({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-8 py-3 bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] rounded-full shadow-lg"
        >
            <div className="flex items-center gap-12 text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
                <a href="#process" className="hover:text-[var(--text)] hover:scale-105 transition-all">Process</a>
                <a href="#work" className="hover:text-[var(--text)] hover:scale-105 transition-all">Work</a>
                <a href="#services" className="hover:text-[var(--text)] hover:scale-105 transition-all">Services</a>

                <div className="w-[2px] h-4 bg-[var(--border)] mx-[-16px]"></div>

                <button onClick={toggleDark} className="hover:text-[var(--text)] hover:scale-110 transition-all cursor-none" aria-label="Toggle Theme">
                    {isDark ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    )}
                </button>
            </div>
        </motion.nav>
    );
}

function Hero({ isDark }: { isDark: boolean }) {
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

            {/* Interactive 3D glass logo element */}
            <HeroLogo3D isDark={isDark} />

            {/* Subtle decorative crosses */}
            <div className="absolute top-32 left-12 md:left-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>
            <div className="absolute bottom-32 right-12 md:right-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>

            <motion.div
                style={{ y }}
                className="text-center max-w-4xl mx-auto z-10"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-[-0.03em] mb-8 font-serif text-[var(--text)]"
                >
                    Design studio for<br />
                    <span className="italic text-[#FF3366]">brands</span> & <span className="italic text-[#3366FF]">creators</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-lg md:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-12"
                >
                    Brands get the full creative suite. Creators get the content engine. Elevating your digital presence with intention.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <a href="/book-a-call" className="pg-btn pg-btn-primary text-lg">
                        Reserve your spot
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                    <p className="mt-4 text-xs font-medium text-[var(--muted)] opacity-80 uppercase tracking-widest">Booking for Q1 2026</p>
                </motion.div>
            </motion.div>
        </section>
    );
}

const MARQUEE_ITEMS = [
    "Branding", "Websites", "Ads", "Thumbnails", "Video Editing", "Motion Design", "Growth Strategy",
    "Branding", "Websites", "Ads", "Thumbnails", "Video Editing", "Motion Design", "Growth Strategy"
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

const SERVICES_DATA = {
    creator: {
        theme: "text-[#FF9933]",
        accent: "bg-[#FF9933]",
        hoverAccent: "hover:bg-[#FF9933]/10",
        tabLabel: "For Creators",
        hero: {
            title: "Content that grows. Channels that last.",
            desc: "AOVA handles the full creative pipeline for creators — from zero-retention editing to algorithmic growth strategy. You focus on the camera, we build the engine.",
            color: "bg-[#FF9933]/10 border-[#FF9933]/20",
            proof: (
                <div className="mt-8 flex -space-x-4 opacity-100">
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=4')] bg-cover relative z-30 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=5')] bg-cover relative z-20 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=6')] bg-cover relative z-10 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[#FF9933] text-white flex items-center justify-center text-xs font-bold shadow-md">+10M</div>
                </div>
            )
        },
        cards: [
            { icon: "\u{1F4F1}", title: "Short Form Editing", desc: "Reels, TikToks, Shorts engineered for retention. Hook-first cuts, pacing, captions." },
            { icon: "\u{1F39E}\uFE0F", title: "Long Form Editing", desc: "YouTube and podcast edits that keep viewers watching end-to-end. Story arc, b-roll, chapters." },
            { icon: "\u{1F5BC}\uFE0F", title: "Thumbnails", desc: "High-CTR thumbnail design and title testing. The first click starts here." },
            { icon: "\u{1F4C8}", title: "Growth Guidance", desc: "Content strategy, posting cadence, analytics review, and positioning to compound your audience." },
        ]
    },
    brand: {
        theme: "text-[#3366FF]",
        accent: "bg-[#3366FF]",
        hoverAccent: "hover:bg-[#3366FF]/10",
        tabLabel: "For Brands",
        hero: {
            title: "Design that converts. Presence that compounds.",
            desc: "AOVA builds brand infrastructure — not just visuals. We engineer systems that capture attention, drive action, and scale effortlessly as your business grows.",
            color: "bg-[#3366FF]/10 border-[#3366FF]/20",
            proof: (
                <div className="mt-8 grid grid-cols-4 gap-2 opacity-80 max-w-xs">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-8 rounded overflow-hidden flex shadow-sm bg-[var(--surface)]">
                            <div className="w-1/3 bg-[#3366FF]/20" />
                            <div className="w-2/3 bg-transparent" />
                        </div>
                    ))}
                </div>
            )
        },
        cards: [
            { icon: "\u2728", title: "Brand Identity", desc: "Logo, guidelines, positioning, and visual language built for long-term equity." },
            { icon: "\u{1F4BB}", title: "Websites & Landing Pages", desc: "Custom builds focused on one thing: getting the click or the call." },
            { icon: "\u{1F680}", title: "Ads & Motion", desc: "Performance-driven static and motion ads for paid social and display." },
            { icon: "\u{1F3A8}", title: "Graphics & UI/UX", desc: "Pitch decks, social assets, product interfaces, and print collateral." },
        ]
    }
};

type AudienceType = 'creator' | 'brand';

function InteractiveServices() {
    const [audience, setAudience] = useState<AudienceType>('creator');
    const data = SERVICES_DATA[audience];

    return (
        <section className="relative py-32 px-6" id="services">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">Who are we building for?</h2>

                    {/* Interactive Selector */}
                    <div className="inline-flex flex-col md:flex-row p-2 bg-[var(--border)] rounded-[32px] md:rounded-full gap-2 relative z-10 w-full md:w-auto">
                        {(['creator', 'brand'] as AudienceType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setAudience(type)}
                                className={`px-8 py-4 rounded-full text-lg md:text-xl font-serif transition-all duration-300 w-full md:w-auto ${audience === type
                                    ? `${SERVICES_DATA[type].accent} text-white shadow-md scale-105`
                                    : 'hover:bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                                    }`}
                            >
                                {SERVICES_DATA[type].tabLabel}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={audience}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mt-16"
                    >
                        {/* Massive Hero Card (Full Width) */}
                        <div className={`w-full p-8 md:p-16 rounded-[40px] border-2 transition-colors duration-500 overflow-hidden relative mb-6 ${data.hero.color}`}>
                            <div className="max-w-3xl relative z-10">
                                <h4 className={`text-4xl md:text-6xl font-serif mb-6 leading-tight ${data.theme}`}>{data.hero.title}</h4>
                                <p className="text-xl md:text-2xl text-[var(--text)] opacity-80 font-medium leading-relaxed mb-8">{data.hero.desc}</p>
                                {data.hero.proof}
                            </div>
                            {/* Abstract large background shape matching accent */}
                            <div className={`absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${data.accent} opacity-10`} />
                        </div>

                        {/* 2x2 Grid for Secondary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.cards.map((card, i) => (
                                <div key={i} className={`p-8 md:p-12 rounded-[32px] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_0_0_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group`}>
                                    <div>
                                        <div className="text-3xl mb-6 bg-[var(--border)] w-16 h-16 flex items-center justify-center rounded-2xl">{card.icon}</div>
                                        <h4 className="text-2xl md:text-3xl font-serif mb-4 flex items-center gap-3">
                                            {card.title}
                                        </h4>
                                        <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">{card.desc}</p>
                                    </div>
                                    <div className="mt-12 flex justify-end">
                                        <div className={`w-12 h-12 rounded-full border-2 border-[var(--border)] flex items-center justify-center text-[var(--muted)] transition-colors duration-300 ${data.hoverAccent} group-hover:text-[var(--text)] group-hover:border-[var(--border-hover)]`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

/* ================================================================
   TRUSTED BY
   ================================================================ */
function TrustedBy() {
    return (
        <section className="py-32 px-6 relative z-20">
            <div className="max-w-6xl mx-auto">
                <div className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-sm">
                    {/* Abstract decorative background hint */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[var(--border)] to-transparent rounded-full blur-3xl opacity-40 pointer-events-none -mr-32 -mt-24"></div>

                    <div className="w-full md:w-1/3 relative z-10 shrink-0">
                        <h2 className="text-4xl md:text-5xl font-serif leading-tight mb-8">Trusted by fast-moving <br /> brands & creators</h2>
                        <div className="flex gap-8 items-center">
                            <div>
                                <p className="text-4xl font-bold text-[var(--text)] mb-1">10k+</p>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Tasks delivered</p>
                            </div>
                            <div className="w-[1px] h-12 bg-[var(--border)]"></div>
                            <div>
                                <p className="text-4xl font-bold text-[#3366FF] mb-1">200+</p>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Projects nailed</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 select-none relative z-10">
                        <div className="flex items-center justify-center font-bold text-2xl tracking-tighter hover:scale-105 transition-transform cursor-pointer">systeme</div>
                        <div className="flex items-center justify-center font-black text-xl tracking-widest hover:scale-105 transition-transform cursor-pointer">MAXONE</div>
                        <div className="flex items-center justify-center font-semibold text-2xl tracking-tight text-[#FF3366] hover:scale-105 transition-transform cursor-pointer">TEEMYCO</div>
                        <div className="flex items-center justify-center font-serif text-3xl italic hover:scale-105 transition-transform cursor-pointer">LYFEfuel</div>
                        <div className="flex items-center justify-center font-bold text-2xl tracking-tighter text-[var(--text)] opacity-80 hover:scale-105 transition-transform cursor-pointer">staffgeek</div>
                        <div className="flex items-center justify-center font-semibold text-xl tracking-tighter hover:scale-105 transition-transform cursor-pointer opacity-80">sendcloud</div>
                        <div className="flex items-center justify-center font-bold text-xl tracking-widest hover:scale-105 transition-transform cursor-pointer">assima</div>
                        <div className="flex items-center justify-center font-black text-2xl tracking-tighter hover:scale-105 transition-transform cursor-pointer">prodigy</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   PROJECTS
   ================================================================ */
function WorkSection() {
    return (
        <section id="work" className="py-32 px-6">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h2 className="text-5xl md:text-7xl">Selected Work</h2>
                    <p className="text-[var(--muted)] max-w-sm text-sm">
                        Immersion, identity, and scale built for the next generation of creative businesses.
                    </p>
                </div>

                {/* Asymmetric Bento Portfolio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Featured / Full Width */}
                    <div className="group relative w-full h-[500px] md:h-[600px] md:col-span-2 overflow-hidden rounded-[32px] bg-[var(--border)] cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                            alt="Featured Project"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent"></div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
                            <span className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md">O.R.C.A Systems</span>
                            <span className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md">Brand Identity</span>
                        </div>
                    </div>

                    {/* Half Width Left */}
                    <div className="group relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-[32px] bg-[var(--border)] cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop"
                            alt="Project Two"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent"></div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
                            <span className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md">Vela Creative</span>
                            <span className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md">Web Design</span>
                        </div>
                    </div>

                    {/* Half Width Right */}
                    <div className="group relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-[32px] bg-[var(--border)] cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"
                            alt="Project Three"
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-transparent"></div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
                            <span className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md">Neo Banking App</span>
                            <span className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-full shadow-md">Product UX</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pt-8">
                    <a href="/book-a-call" className="pg-btn pg-btn-primary group">
                        View Complete Archive
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   TESTIMONIALS
   ================================================================ */
const TESTIMONIALS = [
    { text: "Aova absolutely transformed our digital presence. They didn't just design a website, they built a machine that converts.", author: "L. Jenkins", brand: "Lumara" },
    { text: "The editing quality and turnaround time are unmatched. We've seen a 30% increase in retention since working with Aova.", author: "A. Abdaal", brand: "Creator" },
    { text: "Insane attention to detail. The brand identity they delivered gave us the confidence to scale aggressively.", author: "S. Rossi", brand: "Halo" },
    { text: "Simply the best creative partner we've ever worked with. Fast, communicative, and constantly delivering heat.", author: "M. Chen", brand: "TechFlow" },
];

function Testimonials() {
    return (
        <section className="pt-16 pb-32 overflow-hidden bg-transparent text-[var(--text)] relative mt-0" id="testimonials">
            <div className="max-w-7xl mx-auto mb-16 px-6 relative z-10">
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Client <span className="italic text-[#FF3366]">Love</span></h2>
                <p className="text-[var(--muted)] text-lg max-w-xl">Don&apos;t just take our word for it. Trusted by industry leaders constantly moving the needle.</p>
            </div>

            <div className="flex overflow-hidden relative w-full h-full group">
                {/* Edge fade gradients */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-8 group-hover:[animation-play-state:paused] py-4" style={{ width: "max-content", animation: "scroll 40s linear infinite" }}>
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div key={i} className="w-[400px] md:w-[500px] bg-[var(--surface)] border-2 border-[var(--border)] shadow-[0_4px_0_0_rgba(0,0,0,0.05)] p-10 rounded-[32px] shrink-0 transition-transform duration-300 hover:-translate-y-2 hover:border-[var(--border-hover)]">
                            <div className="flex gap-1 mb-8 text-[#FF3366]">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl font-serif text-[var(--text)] whitespace-normal mb-10 leading-snug">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3366FF] to-[#00CC66] shrink-0" />
                                <div className="flex flex-col">
                                    <span className="font-bold text-lg text-[var(--text)]">{t.author}</span>
                                    <span className="text-[var(--muted)] text-sm uppercase tracking-widest">{t.brand}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   BUYING PROCESS
   ================================================================ */
const BUYING_STEPS = [
    { num: "01", title: "Discovery Call", desc: "A 30-minute chat to understand your brand, content goals, and technical requirements." },
    { num: "02", title: "Strategy Proposal", desc: "We map out the execution plan, architecture, timeline, and exact cost. No hidden fees." },
    { num: "03", title: "Execution Sprint", desc: "We craft the design or content systematically, seeking your feedback at key milestones." },
    { num: "04", title: "Handoff & Growth", desc: "You receive clean code, final assets, and a growth roadmap ready for deployment." }
];

function BuyingProcess() {
    return (
        <section className="relative py-32 px-6 border-t border-[var(--border)] overflow-hidden" id="process">
            {/* Decorative background block */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-dots opacity-[0.08] -rotate-12 pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">How it <span className="italic text-[#00CC66]">Works</span></h2>
                    <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">We keep things simple, transparent, and completely focused on your success.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {BUYING_STEPS.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="relative p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Connecting line for desktop */}
                            {i !== BUYING_STEPS.length - 1 && (
                                <div className="hidden md:block absolute top-[52px] -right-[32px] w-[32px] h-[2px] bg-[var(--border)] z-0" />
                            )}
                            <div className="w-12 h-12 rounded-full bg-[var(--text)] text-[var(--surface)] flex items-center justify-center font-serif text-xl mb-6 relative z-10">
                                {step.num}
                            </div>
                            <h3 className="text-2xl font-serif mb-3">{step.title}</h3>
                            <p className="text-[var(--muted)]">{step.desc}</p>
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
    { q: "How long does a typical project take?", a: "Brand identity projects typically take 6\u201310 weeks. Web and product design engagements run 8\u201316 weeks." },
    { q: "What is your pricing structure?", a: "We work on a project-fee basis, not hourly. This means you know the full cost upfront with no surprises." },
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) {
    return (
        <div className="border-b border-[var(--border)] py-6">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-left focus:outline-none cursor-none"
            >
                <span className={`text-xl md:text-2xl font-serif transition-colors ${isOpen ? "text-[#FF3366]" : "text-[var(--text)]"}`}>{q}</span>
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? "bg-[var(--text)] text-[var(--surface)] border-[var(--text)] rotate-45" : "border-[var(--border-hover)] text-[var(--muted)]"}`}>
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
                        <p className="pt-4 text-[var(--muted)] text-lg max-w-2xl">{a}</p>
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
                    Let&apos;s talk.
                </h2>
                <a href="/book-a-call" className="pg-btn bg-white text-black hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] !text-lg !px-8 !py-4 mb-32">
                    Start a project
                </a>

                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-10 pb-4 gap-8">
                    {/* AOVASTUDIO.svg Logo (Left) */}
                    <div className="flex items-center md:w-1/3 justify-center md:justify-start">
                        <img src="/AOVASTUDIO.svg" alt="Aova Studio" className="h-5 md:h-7 w-auto invert opacity-90 transition-opacity hover:opacity-100" />
                    </div>

                    {/* Centered Social Links */}
                    <div className="flex gap-6 md:gap-8 text-[11px] md:text-sm text-white/50 uppercase tracking-widest font-medium flex-wrap justify-center md:w-1/3">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Discord</a>
                    </div>

                    {/* Balanced Copyright block (Right) */}
                    <div className="flex flex-col items-center md:items-end text-white/30 text-[10px] md:text-xs md:w-1/3 mt-2 md:mt-0">
                        <span>&copy; 2026 Aova Design Studio.</span>
                        <span>All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function HomePage() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <main className="relative">
            <CustomCursor />
            <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
            <Hero isDark={isDark} />
            <Marquee />
            <InteractiveServices />

            <WorkSection />
            <TrustedBy />
            <Testimonials />

            <BuyingProcess />
            <FaqSection />
            <Footer />
        </main>
    );
}
