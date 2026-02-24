"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import dynamic from "next/dynamic";

const HeroLogo3D = dynamic<{ isDark: boolean }>(() => import("@/components/HeroLogo3D"), { ssr: false });
import Folder from '@/components/Folder';

function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
            }
        };
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div className="pg-cursor-dot" ref={dotRef}>
            <svg viewBox="0 0 171.27 171.27" fill="currentColor" className="w-5 h-5 -rotate-90 origin-center">
                <path d="M171.27,0v91c0,44.33-35.94,80.27-80.27,80.27h-31.96v-59.04h59.04v-59.04h-59.04v59.04H0v-31.96C0,35.94,35.94,0,80.27,0h91Z" />
            </svg>
        </div>
    );
}

const NAV_HEIGHT = 80;

function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const targetTop = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    const start = window.scrollY;
    const distance = targetTop - start;
    const duration = 400;
    let startTime: number | null = null;

    const step = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
}

const NAV_LINKS = [
    { label: 'Work', id: 'work' },
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
];

const NAV_EASE = [0.16, 1, 0.3, 1] as const;

function NavThemeIcon({ isDark }: { isDark: boolean }) {
    return (
        <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
                <motion.svg key="moon" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.18 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </motion.svg>
            ) : (
                <motion.svg key="sun" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.18 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="4.22" x2="19.78" y2="5.64" />
                </motion.svg>
            )}
        </AnimatePresence>
    );
}

function Navbar({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => setIsAtTop(window.scrollY < 80);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pillBg  = isDark ? 'rgba(20,20,20,0.92)'   : 'rgba(255,255,255,0.92)';
    const pillBdr = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';
    const pillStyle = { backgroundColor: pillBg, borderColor: pillBdr, borderWidth: 1, borderStyle: 'solid' as const };

    const btnCls  = "px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-150";
    const iconCls = "w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-150";
    const bookCls = "px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[var(--text)] text-[var(--surface)] hover:opacity-80 transition-opacity duration-150";
    const divCls  = "w-px h-4 mx-0.5 bg-black/[0.08] dark:bg-white/[0.1]";

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: NAV_EASE }}
            className="fixed top-6 inset-x-0 z-50 pointer-events-none"
        >
            <AnimatePresence mode="sync">
                {isAtTop ? (
                    /* ── SPLIT STATE (at top) ── */
                    <motion.div
                        key="split"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between px-6 md:px-10"
                    >
                        {/* Left pill — arrow (scroll to bottom) */}
                        <motion.div
                            initial={{ x: -24, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -24, opacity: 0 }}
                            transition={{ duration: 0.5, ease: NAV_EASE }}
                            style={pillStyle}
                            className="flex items-center pointer-events-auto rounded-full backdrop-blur-xl p-1.5 shadow-lg"
                        >
                            <button
                                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                                className={iconCls}
                                aria-label="Scroll to bottom"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* Center pill — nav links */}
                        <motion.div
                            initial={{ y: -16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -16, opacity: 0 }}
                            transition={{ duration: 0.5, ease: NAV_EASE, delay: 0.04 }}
                            style={pillStyle}
                            className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-lg"
                        >
                            {NAV_LINKS.map(({ label, id }) => (
                                <button key={id} onClick={() => scrollToId(id)} className={btnCls}>{label}</button>
                            ))}
                        </motion.div>

                        {/* Right pill — book + theme */}
                        <motion.div
                            initial={{ x: 24, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 24, opacity: 0 }}
                            transition={{ duration: 0.5, ease: NAV_EASE, delay: 0.07 }}
                            style={pillStyle}
                            className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-lg"
                        >
                            <button onClick={() => scrollToId('faq')} className={bookCls}>Book</button>
                            <div className={divCls} />
                            <button onClick={toggleDark} className={iconCls} aria-label="Toggle theme">
                                <NavThemeIcon isDark={isDark} />
                            </button>
                        </motion.div>
                    </motion.div>
                ) : (
                    /* ── MERGED STATE (scrolled) ── */
                    <motion.div
                        key="merged"
                        initial={{ opacity: 0, y: -12, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.94 }}
                        transition={{ duration: 0.5, ease: NAV_EASE }}
                        className="flex justify-center"
                    >
                        <div style={pillStyle} className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-xl">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className={iconCls}
                                aria-label="Scroll to top"
                            >
                                <svg style={{ transform: 'rotate(180deg)' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                                </svg>
                            </button>
                            <div className={divCls} />
                            {NAV_LINKS.map(({ label, id }) => (
                                <button key={id} onClick={() => scrollToId(id)} className={btnCls}>{label}</button>
                            ))}
                            <div className={divCls} />
                            <button onClick={() => scrollToId('faq')} className={bookCls}>Book</button>
                            <div className={divCls} />
                            <button onClick={toggleDark} className={iconCls} aria-label="Toggle theme">
                                <NavThemeIcon isDark={isDark} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

const triggerBookingSpark = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId('faq');
    const widget = document.getElementById('booking-widget');
    if (widget) {
        widget.classList.remove('animate-spark-flash');
        void widget.offsetWidth;
        widget.classList.add('animate-spark-flash');
    }
};

function Hero({ isDark }: { isDark: boolean }) {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <section className="relative min-h-[100svh] flex flex-col items-start justify-center pt-32 pb-20 px-8 md:px-16 lg:px-24 overflow-hidden">
            {/* Decorative ambient gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF3366]/10 to-[#3366FF]/10 rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none" />

            {/* Interactive 3D glass logo element */}
            <HeroLogo3D isDark={isDark} />

            {/* Subtle decorative crosses */}
            <div className="absolute top-32 left-12 md:left-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>
            <div className="absolute bottom-32 right-12 md:right-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>

            <motion.div
                style={{ y }}
                className="pg-inner text-left z-10"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] text-xs font-semibold uppercase tracking-widest mb-8 shadow-sm"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366] inline-block"></span>
                    Design &amp; Motion Studio
                </motion.div>

                {/* Headline: bold sans + italic serif accents */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl md:text-8xl lg:text-[96px] leading-[0.92] tracking-[-0.03em] mb-8 text-[var(--text)]"
                >
                    <span className="font-black">Design studio for</span><br />
                    <span className="font-serif italic text-[#FF3366]">brands</span>
                    <span className="font-black"> &amp; </span>
                    <span className="font-serif italic text-[#3366FF]">creators</span>
                    <span className="font-black">.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-base md:text-lg text-[var(--muted)] max-w-lg mb-10 leading-relaxed"
                >
                    Brands get the full creative suite. Creators get the content engine. Elevating your digital presence with intention.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <motion.button
                        onClick={triggerBookingSpark}
                        whileHover={{
                            scale: 1.05,
                            rotateX: 12,
                            rotateY: -8,
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(255, 51, 102, 0.25)"
                        }}
                        whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                        className="pg-btn pg-btn-primary text-base group shadow-xl transition-shadow duration-300"
                    >
                        <span style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2">
                            Reserve your spot
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </span>
                    </motion.button>
                    <p className="text-xs font-medium text-[var(--muted)] opacity-80 uppercase tracking-widest">Booking for Q1 2026</p>
                </motion.div>
            </motion.div>
        </section>
    );
}

const MARQUEE_ITEMS = [
    "Connecting selected creatives to selective brands.",
    "Where the right creators find the right canvas.",
    "Igniting brand potential with top-tier creative minds.",
    "Bespoke matchmaking for the creative industry.",
];




function Marquee() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % MARQUEE_ITEMS.length);
        }, 11000); // 11 seconds delay
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pg-marquee-wrap flex items-center justify-center relative h-32 px-6">
            <div className="font-serif italic text-2xl md:text-3xl flex items-center justify-center gap-4 md:gap-8 overflow-hidden max-w-7xl mx-auto w-full">
                {/* Left Star (Static) */}
                <span className="text-[var(--accent)] text-lg shrink-0">✦</span>

                {/* Dynamic Text Container */}
                <div className="relative flex-1 flex items-center justify-center h-16 md:h-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute text-center w-full"
                        >
                            {MARQUEE_ITEMS[index]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Star (Static) */}
                <span className="text-[var(--accent)] text-lg shrink-0">✦</span>
            </div>
        </div>
    );
}

const SERVICES_DATA = {
    creator: {
        theme: "text-[#FF3366]",
        accent: "bg-[#FF3366]",
        hoverAccent: "hover:bg-[#FF3366]/10",
        tabLabel: "I'm a creator",
        hero: {
            title: "Content that grows. Channels that last.",
            desc: "AOVA handles the full creative pipeline for creators — from zero-retention editing to algorithmic growth strategy. You focus on the camera, we build the engine.",
            color: "bg-[#FF3366]/5 border-[#FF3366]/20",
            proof: (
                <div className="mt-8 flex -space-x-4 opacity-100">
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=4')] bg-cover relative z-30 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=5')] bg-cover relative z-20 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=6')] bg-cover relative z-10 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[#FF3366] text-white flex items-center justify-center text-xs font-bold shadow-md">+10M</div>
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
        tabLabel: "I own a brand",
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
    const [audience, setAudience] = useState<AudienceType | null>(null);
    const data = audience ? SERVICES_DATA[audience] : null;

    return (
        <section className="relative py-32 px-6" id="services">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">Who are we building for?</h2>
                </div>

                {/* Sticky Interactive Selector */}
                <div className="sticky top-24 z-50 flex justify-center mb-16 pointer-events-none">
                    <div className="inline-flex flex-col md:flex-row p-2 bg-[var(--surface)]/70 backdrop-blur-xl rounded-[32px] md:rounded-full gap-2 relative border border-[var(--border)] shadow-2xl shadow-black/5 pointer-events-auto">
                        {(['creator', 'brand'] as AudienceType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setAudience(prev => prev === type ? null : type)}
                                className={`px-8 py-4 rounded-full text-lg md:text-xl font-serif transition-all duration-500 w-full md:w-auto relative ${audience === type
                                    ? `text-white scale-105 border border-white/20 ${type === 'creator' ? 'bg-[#FF3366] shadow-[inset_0_3px_12px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1),0_12px_30px_rgba(255,51,102,0.3)]' : 'bg-[#3366FF] shadow-[inset_0_3px_12px_rgba(255,255,255,0.4),inset_0_-3px_8px_rgba(0,0,0,0.1),0_12px_30px_rgba(51,102,255,0.3)]'}`
                                    : 'hover:bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] border border-transparent'
                                    }`}
                            >
                                {SERVICES_DATA[type].tabLabel}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {audience && data && (
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
                    )}
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
        <section className="py-32 relative z-20">
            <div className="pg-inner">
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
const workProjects = [
    { num: "01", name: "O.R.C.A Systems", category: "Brand Identity", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { num: "02", name: "Vela Creative", category: "Web Design", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop" },
    { num: "03", name: "Neo Banking App", category: "Product UX", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop" },
];

const workProjectsRow2 = [
    { num: "04", name: "Solara Wellness", category: "Brand Identity", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop" },
    { num: "05", name: "Forma Studio", category: "Motion Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2764&auto=format&fit=crop" },
];

function WorkSection() {
    return (
        <section id="work" className="py-32">
            <div className="pg-inner space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h2 className="text-5xl md:text-7xl">Selected Work</h2>
                    <p className="text-[var(--muted)] max-w-sm text-sm">
                        Immersion, identity, and scale built for the next generation of creative businesses.
                    </p>
                </div>

                {/* Card grids — gap-4 between all rows and columns */}
                <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {workProjects.map((p) => (
                        <div key={p.num} className="group relative h-[480px] overflow-hidden rounded-2xl bg-[var(--border)] cursor-pointer">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            />
                            {/* Category tag — top left */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                                    {p.category}
                                </span>
                            </div>
                            {/* Index — top right */}
                            <span className="absolute top-4 right-4 z-20 text-white/40 text-xs font-mono">{p.num}</span>
                            {/* Bottom gradient + title */}
                            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-5 left-5 z-20">
                                <h3 className="text-white text-xl font-serif leading-tight">{p.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2-column card grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workProjectsRow2.map((p) => (
                        <div key={p.num} className="group relative h-[360px] overflow-hidden rounded-2xl bg-[var(--border)] cursor-pointer">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            />
                            {/* Category tag — top left */}
                            <div className="absolute top-4 left-4 z-20">
                                <span className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/20">
                                    {p.category}
                                </span>
                            </div>
                            {/* Index — top right */}
                            <span className="absolute top-4 right-4 z-20 text-white/40 text-xs font-mono">{p.num}</span>
                            {/* Bottom gradient + title */}
                            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-5 left-5 z-20">
                                <h3 className="text-white text-xl font-serif leading-tight">{p.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

                <div className="flex justify-center pt-8">
                    <motion.button
                        onClick={() => scrollToId('faq')}
                        whileHover={{
                            scale: 1.05,
                            rotateX: 12,
                            rotateY: -8,
                            y: -5,
                            boxShadow: "0 25px 50px -12px rgba(255, 51, 102, 0.25)"
                        }}
                        whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                        className="pg-btn pg-btn-primary group shadow-xl transition-shadow duration-300"
                    >
                        <span style={{ transform: "translateZ(20px)" }} className="flex items-center gap-2">
                            View Complete Archive
                            <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                        </span>
                    </motion.button>
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
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Aova <span className="italic text-[#FF3366]">Love</span></h2>
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
    { num: "01", title: "Discovery Call", desc: "A 15-minute chat to understand your brand, content goals, and technical requirements." },
    { num: "02", title: "Strategy Proposal", desc: "We map out the execution plan, architecture, timeline, and exact cost. No hidden fees." },
    { num: "03", title: "Execution Sprint", desc: "We craft the design or content systematically, seeking your feedback at key milestones." },
    { num: "04", title: "Handoff", desc: "You receive clean code, final assets, and a growth roadmap ready for deployment." }
];

function BuyingProcess() {
    return (
        <section className="relative py-32 border-t border-[var(--border)] overflow-hidden" id="process">
            {/* Decorative background block */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-dots opacity-[0.08] -rotate-12 pointer-events-none -z-10" />

            <div className="pg-inner">
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
    const [folderOpen, setFolderOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<number | null>(null);

    const teamMembers = [
        {
            name: 'Sarah', role: 'Creative Director', avatar: 'sarah_aova',
            quote: '"Great design starts with a really good question."',
            bio: 'Sarah leads the creative vision at AOVA, shaping the studio\'s aesthetic language across brand, digital, and motion work. With 10 years in the industry, she believes in restraint, intentionality, and work that resonates long after first glance.',
            skills: ['Brand Identity', 'Art Direction', 'Typography', 'Creative Strategy'],
            location: 'Amsterdam, NL',
        },
        {
            name: 'Marcus', role: 'Lead Engineer', avatar: 'marcus_aova',
            quote: '"Code is design. Every function has a form."',
            bio: 'Marcus builds the technical backbone of every AOVA project — from pixel-perfect web experiences to interactive 3D environments. He champions performance, accessibility, and code that reads as cleanly as the designs it serves.',
            skills: ['React / Next.js', 'WebGL / Three.js', 'TypeScript', 'DevOps'],
            location: 'Berlin, DE',
        },
        {
            name: 'Elena', role: 'Design Lead', avatar: 'elena_aova',
            quote: '"Systems thinking is just empathy at scale."',
            bio: 'Elena architects design systems and product interfaces that feel effortless by design. She bridges strategy and craft, ensuring every component, interaction, and pixel is considered as part of a larger whole.',
            skills: ['UI / UX', 'Design Systems', 'Figma', 'Interaction Design'],
            location: 'Barcelona, ES',
        },
        {
            name: 'David', role: 'Motion Designer', avatar: 'david_aova',
            quote: '"Animation is the punctuation of digital experience."',
            bio: 'David creates the motion layer that gives AOVA\'s work its signature energy. From micro-interactions to full motion identities, he makes interfaces feel alive without overwhelming the underlying message.',
            skills: ['After Effects', 'CSS Animation', 'Lottie', 'Framer'],
            location: 'London, UK',
        },
        {
            name: 'Amina', role: 'Brand Strategist', avatar: 'amina_aova',
            quote: '"Your brand is what people say when you leave the room."',
            bio: 'Amina brings clarity to complex positioning challenges, helping clients articulate who they are and why it matters. She leads workshops, naming projects, and brand narrative work that grounds everything AOVA creates.',
            skills: ['Brand Strategy', 'Positioning', 'Copywriting', 'Research'],
            location: 'Nairobi, KE',
        },
    ];

    const [copied, setCopied] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const rotateX = useTransform(springY, [0, 1], [30, -30]);
    const rotateY = useTransform(springX, [0, 1], [-30, 30]);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const localX = clientX - left;
        const localY = clientY - top;
        mouseX.set(localX);
        mouseY.set(localY);
        x.set(localX / width);
        y.set(localY / height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("aovastudio@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "styles": { "branding": { "brandColor": "#FF3366" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    return (
        <>
            {/* Team Member Deck Modal */}
            <AnimatePresence>
                {selectedMember !== null && (
                    <motion.div
                        key="member-modal-backdrop"
                        className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSelectedMember(null)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

                        {/* Card deck */}
                        <div className="relative z-10" style={{ width: 380, height: 560 }} onClick={e => e.stopPropagation()}>
                            {teamMembers.map((member, idx) => {
                                const total = teamMembers.length;
                                let d = ((idx - (selectedMember ?? 0)) % total + total) % total;
                                if (d > total / 2) d = d - total;
                                const absD = Math.abs(d);
                                return (
                                    <motion.div
                                        key={idx}
                                        className="absolute inset-0 bg-white rounded-[32px] shadow-2xl overflow-hidden"
                                        animate={{ x: d * 165, scale: 1 - absD * 0.11, opacity: absD === 0 ? 1 : Math.max(0.45, 0.78 - absD * 0.18), zIndex: 10 - absD, rotate: d * -2.5, y: absD * 12 }}
                                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                                        style={{ cursor: absD > 0 ? 'pointer' : 'default' }}
                                        onClick={() => { if (absD > 0) setSelectedMember(idx); }}
                                    >
                                        <div className="relative bg-[#FF3366] px-6 pt-8 pb-16 flex flex-col items-center text-center">
                                            {absD === 0 && (
                                                <button onClick={e => { e.stopPropagation(); setSelectedMember(null); }} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
                                                </button>
                                            )}
                                            <img src={`https://i.pravatar.cc/200?u=${member.avatar}`} alt={member.name} className={`rounded-full border-4 border-white shadow-xl object-cover mb-3 ${absD === 0 ? 'w-20 h-20' : 'w-14 h-14'}`} />
                                            <h2 className={`font-serif font-bold text-white leading-tight ${absD === 0 ? 'text-2xl' : 'text-lg'}`}>{member.name}</h2>
                                            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mt-0.5">{member.role}</p>
                                            {absD === 0 && <p className="text-white/50 text-[11px] mt-1 flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>{member.location}</p>}
                                        </div>
                                        {absD === 0 && (
                                            <div className="px-6 py-5 -mt-8 relative">
                                                <div className="bg-white rounded-2xl p-5 shadow-lg border border-black/5 mb-4">
                                                    <p className="font-serif italic text-[#FF3366] text-base leading-snug">{member.quote}</p>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {member.skills.map(skill => <span key={skill} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold tracking-wide border border-gray-200">{skill}</span>)}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Dot indicators */}
                        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                            {teamMembers.map((_, idx) => (
                                <button key={idx} onClick={e => { e.stopPropagation(); setSelectedMember(idx); }} className={`rounded-full transition-all duration-300 ${idx === selectedMember ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`} />
                            ))}
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            <section className="py-32 overflow-visible" id="faq">
                <div className="pg-inner grid grid-cols-1 lg:grid-cols-12 gap-16 items-start overflow-visible">

                    {/* Left Column Component: FAQ */}
                    <div className="lg:col-span-7">
                        <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-16">
                            Common <span className="italic text-[#00CC66]">Questions</span>
                        </h2>
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


                    </div>

                    {/* Right Column Component: Sticky Booking Widget */}
                    <div className="lg:col-span-5 relative overflow-visible">
                        <div className="sticky top-32 w-full overflow-visible">

                            {/* TEAM Folder ─ top of sticky column */}
                            <div className="relative flex justify-center overflow-visible" style={{ paddingTop: '110px', marginTop: '-110px' }}>
                                {/* Annotation: positioned so right edge clears folder's left edge */}
                                <div
                                    className={`absolute top-1/2 translate-y-4 flex flex-col items-end gap-1 rotate-[-10deg] pointer-events-none transition-opacity duration-300 ${folderOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    style={{ zIndex: 1, right: 'calc(50% + 180px)' }}
                                >
                                    <span className="font-serif italic text-3xl text-[#FF3366] whitespace-nowrap leading-tight">Get to know us!</span>
                                    {/* Arrow sweeps from bottom-left (below text) curving right → toward folder */}
                                    <svg width="88" height="56" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-end mr-2">
                                        <path d="M8 8 Q20 65 100 55" stroke="#FF3366" strokeWidth="4" fill="none" strokeDasharray="6,5" strokeLinecap="round" />
                                        <path d="M88 44 L100 55 L86 60" stroke="#FF3366" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                {/* Folder – z-index: 2 ensures it stacks above annotation (z:1) */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <Folder
                                        size={1.8}
                                        color="#FF3366"
                                        onOpenChange={setFolderOpen}
                                        onCardClick={i => setSelectedMember(i)}
                                        items={[
                                            <div key="t1" className="flex flex-col items-center justify-center h-full w-full text-center bg-white rounded-xl p-2 border border-black/5">
                                                <img src="https://i.pravatar.cc/150?u=sarah_aova" alt="Sarah" className="w-12 h-12 rounded-full border border-gray-200 mb-2 object-cover shadow-sm" />
                                                <h4 className="font-serif text-[13px] font-bold text-black leading-tight">Sarah</h4>
                                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Creative Dir.</p>
                                            </div>,
                                            <div key="t2" className="flex flex-col items-center justify-center h-full w-full text-center bg-white rounded-xl p-2 border border-black/5">
                                                <img src="https://i.pravatar.cc/150?u=marcus_aova" alt="Marcus" className="w-12 h-12 rounded-full border border-gray-200 mb-2 object-cover shadow-sm" />
                                                <h4 className="font-serif text-[13px] font-bold text-black leading-tight">Marcus</h4>
                                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Engineer</p>
                                            </div>,
                                            <div key="t3" className="flex flex-col items-center justify-center h-full w-full text-center bg-white rounded-xl p-2 border border-black/5">
                                                <img src="https://i.pravatar.cc/150?u=elena_aova" alt="Elena" className="w-12 h-12 rounded-full border border-gray-200 mb-2 object-cover shadow-sm" />
                                                <h4 className="font-serif text-[13px] font-bold text-black leading-tight">Elena</h4>
                                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Design Lead</p>
                                            </div>,
                                            <div key="t4" className="flex flex-col items-center justify-center h-full w-full text-center bg-white rounded-xl p-2 border border-black/5">
                                                <img src="https://i.pravatar.cc/150?u=david_aova" alt="David" className="w-12 h-12 rounded-full border border-gray-200 mb-2 object-cover shadow-sm" />
                                                <h4 className="font-serif text-[13px] font-bold text-black leading-tight">David</h4>
                                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Motion</p>
                                            </div>,
                                            <div key="t5" className="flex flex-col items-center justify-center h-full w-full text-center bg-white rounded-xl p-2 border border-black/5">
                                                <img src="https://i.pravatar.cc/150?u=amina_aova" alt="Amina" className="w-12 h-12 rounded-full border border-gray-200 mb-2 object-cover shadow-sm" />
                                                <h4 className="font-serif text-[13px] font-bold text-black leading-tight">Amina</h4>
                                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Strategy</p>
                                            </div>
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Booking Widget ─ below the folder */}
                            <motion.div
                                id="booking-widget"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
                                transition={{ duration: 0.3 }}
                                className="w-full rounded-[40px] p-8 md:p-12 overflow-hidden relative border border-[#222222] bg-[#0A0A0A] group mt-8"
                                style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
                            >
                                {/* Inner grain overlay */}
                                <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                                {/* Pink Spotlight Hover Glow */}
                                <motion.div
                                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                                    style={{
                                        background: useMotionTemplate`
                                        radial-gradient(
                                            600px circle at ${mouseX}px ${mouseY}px,
                                            rgba(255, 51, 102, 0.15),
                                            transparent 80%
                                        )
                                    `,
                                    }}
                                />

                                <div className="relative z-10 flex flex-col h-full items-center text-center" style={{ transform: "translateZ(30px)" }}>

                                    <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs font-semibold uppercase tracking-widest mb-8">Currently accepting clients</span>

                                    <h3 className="text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight mb-10 w-full text-[#FF3366]">
                                        Book a 15-min intro call
                                    </h3>

                                    <motion.button
                                        data-cal-namespace=""
                                        data-cal-link="rick/get-rick-rolled"
                                        data-cal-config='{"layout":"month_view"}'
                                        whileHover={{
                                            scale: 1.05,
                                            rotateX: 12,
                                            rotateY: -8,
                                            y: -5,
                                            boxShadow: "0 25px 50px -12px rgba(255, 51, 102, 0.25)"
                                        }}
                                        whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                        className="w-full bg-white text-black font-semibold text-lg py-5 rounded-2xl shadow-xl transition-shadow duration-300 mb-8"
                                    >
                                        <span style={{ transform: "translateZ(20px)" }} className="block">
                                            Book a call
                                        </span>
                                    </motion.button>

                                    {/* Footer Email Note */}
                                    <button onClick={handleCopy} className="group/email flex flex-col items-center justify-center w-full bg-[#FFFFFF]/5 rounded-[24px] py-8 transition-all duration-300 hover:bg-[#FFFFFF]/10 hover:shadow-lg border border-transparent hover:border-[#FF3366]/30">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`mb-4 transition-colors duration-300 ${copied ? 'text-[#00CC66]' : 'text-white/50 group-hover/email:text-[#FF3366]'}`}>
                                            {copied ? (
                                                <path d="M20 6L9 17l-5-5"></path>
                                            ) : (
                                                <>
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </>
                                            )}
                                        </svg>
                                        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-2 transition-colors">{copied ? 'Copied to clipboard' : 'Prefer to email?'}</span>
                                        <span className="text-lg md:text-xl font-serif text-white group-hover/email:text-[#FF3366] transition-colors">aovastudio@gmail.com</span>
                                    </button>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>

            </section>
        </>
    );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <footer className="relative bg-[#111111] text-white py-20 rounded-t-[40px] md:rounded-t-[80px] mt-20 overflow-hidden">
            <div className="absolute inset-0 bg-dots opacity-[0.05] pointer-events-none -z-10 mix-blend-overlay" />
            <div className="pg-inner flex flex-col items-center text-center">
                <h2 className="text-6xl md:text-[120px] leading-none font-serif tracking-tight mb-12 text-[#FF3366] flex justify-center items-baseline cursor-default">
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="inline-flex items-baseline"
                    >
                        Let&apos;s t
                        <span className="inline-block relative">
                            a
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: isHovered ? "auto" : 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden inline-flex whitespace-nowrap align-bottom absolute left-full top-0 h-full"
                            >
                                aaaaaa
                            </motion.span>
                        </span>
                        {/* Ghost text for layout spacing */}
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden inline-flex whitespace-nowrap align-bottom opacity-0 pointer-events-none"
                        >
                            aaaaaa
                        </motion.span>
                        lk{isHovered ? '!' : '.'}
                    </div>
                </h2>
                <motion.button
                    onClick={triggerBookingSpark}
                    whileHover={{
                        scale: 1.05,
                        rotateX: 12,
                        rotateY: -8,
                        y: -5,
                        boxShadow: "0 25px 50px -12px rgba(255, 51, 102, 0.25)"
                    }}
                    whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                    className="pg-btn bg-white text-black hover:bg-[#FF3366] hover:text-white hover:border-[#FF3366] !text-lg !px-8 !py-4 mb-32 shadow-xl transition-colors duration-300"
                >
                    <span style={{ transform: "translateZ(20px)" }}>
                        Start a project
                    </span>
                </motion.button>

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
            <WorkSection />
            <InteractiveServices />
            <TrustedBy />
            <Testimonials />

            <BuyingProcess />
            <FaqSection />
            <Footer />
        </main>
    );
}
