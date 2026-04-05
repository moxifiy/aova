"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useMotionTemplate, useSpring, useInView } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const HeroLogo3D = dynamic<{ isDark: boolean }>(() => import("@/components/HeroLogo3D"), { ssr: false });
import Folder from '@/components/Folder';
import BorderGlow from '@/components/BorderGlow';
import ThemeToggle from '@/components/ThemeToggle';
import CustomCursor from '@/components/CustomCursor';



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

// Previously NavThemeIcon lived here, now using ThemeToggle

function Navbar({ isDark, toggleDark }: { isDark: boolean; toggleDark: () => void }) {
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => setIsAtTop(window.scrollY < 80);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pillBg = isDark ? 'rgba(20,20,20,0.92)' : 'rgba(255,255,255,0.92)';
    const pillBdr = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';
    const pillStyle = { backgroundColor: pillBg, borderColor: pillBdr, borderWidth: 1, borderStyle: 'solid' as const };

    const btnCls = "px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-150";
    const iconCls = "w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-150";
    const bookCls = "px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-widest bg-[var(--text)] text-[var(--surface)] hover:opacity-80 transition-opacity duration-150";
    const divCls = "w-px h-4 mx-0.5 bg-black/[0.08] dark:bg-white/[0.1]";

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-6 inset-x-0 z-50 pointer-events-none"
        >
            <AnimatePresence mode="wait">
                {isAtTop ? (
                    /* ── SPLIT STATE (at top) ── */
                    <motion.div
                        key="split"
                        className="flex items-center justify-between px-6 md:px-10"
                    >
                        {/* Left pill — arrow (scroll to bottom) */}
                        <motion.div
                            layoutId="nav-left"
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
                            layoutId="nav-center"
                            style={pillStyle}
                            className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-lg"
                        >
                            {NAV_LINKS.map(({ label, id }) => (
                                <button key={id} onClick={() => scrollToId(id)} className={btnCls}>{label}</button>
                            ))}
                        </motion.div>

                        {/* Right pill — book + theme */}
                        <motion.div
                            layoutId="nav-right"
                            style={pillStyle}
                            className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-lg"
                        >
                            <button onClick={() => scrollToId('faq')} className={bookCls}>Book</button>
                            <ThemeToggle isDark={isDark} onToggle={toggleDark} />
                        </motion.div>
                    </motion.div>
                ) : (
                    /* ── MERGED STATE (scrolled) ── */
                    <motion.div
                        key="merged"
                        className="flex justify-center"
                    >
                        <motion.div layoutId="nav-center" style={pillStyle} className="flex items-center gap-1 pointer-events-auto rounded-full backdrop-blur-xl px-2 py-1.5 shadow-xl">
                            <motion.div layoutId="nav-left" className="flex items-center">
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
                            </motion.div>

                            {NAV_LINKS.map(({ label, id }) => (
                                <button key={id} onClick={() => scrollToId(id)} className={btnCls}>{label}</button>
                            ))}

                            <motion.div layoutId="nav-right" className="flex items-center gap-1">
                                <button onClick={() => scrollToId('faq')} className={bookCls}>Book</button>
                                <ThemeToggle isDark={isDark} onToggle={toggleDark} />
                            </motion.div>
                        </motion.div>
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
            <div className={`absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] bg-gradient-to-tr rounded-full blur-[100px] -z-10 animate-pulse pointer-events-none ${isDark ? 'from-[#FF3366]/5 to-[#3366FF]/5' : 'from-[#FF3366]/10 to-[#3366FF]/10'}`} />

            {/* Interactive 3D glass logo element */}
            <HeroLogo3D isDark={isDark} />

            {/* Subtle decorative crosses */}
            <div className="absolute top-32 left-12 md:left-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>
            <div className="absolute bottom-32 right-12 md:right-24 text-[var(--text)]/20 text-xl font-light pointer-events-none">+</div>

            <motion.div
                style={{ y, opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}
                className="pg-inner text-left z-10"
            >
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
                    Not an agency. Not a freelancer. A studio that treats your project like it's our own, and delivers like it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center gap-4 pointer-events-auto"
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
        <div className="pg-marquee-wrap flex items-center justify-center relative h-16 px-6">
            <div className="font-serif italic text-base md:text-lg flex items-center justify-center gap-4 md:gap-8 overflow-hidden max-w-7xl mx-auto w-full">
                {/* Left Star (Static) */}
                <span className="text-[var(--accent)] text-sm shrink-0">✦</span>

                {/* Dynamic Text Container */}
                <div className="relative flex-1 flex items-center justify-center h-8 md:h-10">
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

const PRICING_TABS_DATA = [
    {
        id: "landing-page",
        label: "Landing Page",
        title: "LANDING PAGE",
        duration: "15-20 Days",
        gradient: "from-[#FF3366] to-[#FF9933]",
        price: "$5,149",
        features: [
            "Custom Wireframe",
            "Figma Design Source",
            "Responsive Design (Mobile & Tablet)",
            "Updates every 48 hours",
            "SEO Setup",
        ],
        addons: [
            { name: "Add Framer Dev", price: "+$2,799" },
            { name: "Extra Pages", price: "+$999" },
        ],
        tags: ["WebDesign", "Framer", "React", "NextJS"]
    },
    {
        id: "branding",
        label: "Branding",
        title: "BRANDING",
        duration: "10-15 Days",
        gradient: "from-[#3366FF] to-[#33CCFF]",
        price: "$3,499",
        features: [
            "Logo Design (3 Concepts)",
            "Brand Guidelines",
            "Typography & Colors",
            "Social Media Kit",
        ],
        addons: [
            { name: "Brand Book Strategy", price: "+$1,200" },
        ],
        tags: ["Identity", "Visuals", "Guidelines"]
    },
    {
        id: "product-animation",
        label: "Product Animation",
        title: "PRODUCT ANIMATION",
        duration: "14-25 Days",
        gradient: "from-[#9933FF] to-[#FF33CC]",
        price: "$4,299",
        features: [
            "3D Product Modeling",
            "Texturing & Lighting",
            "15-30s Loop Animation",
            "High-Res Rendering",
        ],
        addons: [
            { name: "Interactive WebGL", price: "+$3,500" },
            { name: "Extra Angled Shots", price: "+$800" },
        ],
        tags: ["3D", "Spline", "Blender", "Motion"]
    },
    {
        id: "mobile-app",
        label: "Mobile App Design",
        title: "MOBILE APP DESIGN",
        duration: "20-30 Days",
        gradient: "from-[#00CC66] to-[#a8ff78]",
        price: "$6,999",
        features: [
            "User Research & UX Strategy",
            "Wireframes & Flow",
            "High-Fidelity UI Design",
            "Interactive Prototype",
        ],
        addons: [
            { name: "Development Handoff Prep", price: "+$1,500" },
            { name: "App Store Assets", price: "+$500" },
        ],
        tags: ["iOS", "Android", "UIUX", "Figma"]
    }
];


const SERVICES_DATA = {
    creator: {
        theme: "text-[#FF9933]",
        accent: "bg-[#FF9933]",
        hoverAccent: "hover:bg-[#FF9933]/10",
        bgAccent: "bg-[#FF9933]/10",
        tabLabel: "For Creators",
        hero: {
            title: "Content that grows. Channels that last.",
            desc: "AOVA handles the full creative pipeline for creators — from zero-retention editing to algorithmic growth strategy. You focus on the camera, we build the engine.",
            color: "bg-[#FF9933]/5 border-[#FF9933]/10",
        },
        pricingCards: [
            {
                title: "Shorts & Reels",
                desc: "High-retention vertical edits.",
                features: ["4 Videos / Month", "Hook Optimization", "Custom Motion Graphics"],
                price: "$1,200",
                period: "/mo",
                featured: false
            },
            {
                title: "YouTube Engine",
                desc: "Full long-form production.",
                features: ["2 Long Form Videos", "A/B Thumbnail Testing", "Title SEO", "4 Shorts Cut-downs"],
                price: "$2,500",
                period: "/mo",
                featured: true
            },
            {
                title: "Scale Partner",
                desc: "Total channel management.",
                features: ["4 Long Form Videos", "8 Shorts / Reels", "Weekly Strategy Calls", "Sponsorship Deck"],
                price: "$4,500",
                period: "/mo",
                featured: false
            }
        ]
    },
    brand: {
        theme: "text-[#3366FF]",
        accent: "bg-[#3366FF]",
        hoverAccent: "hover:bg-[#3366FF]/10",
        bgAccent: "bg-[#3366FF]/10",
        tabLabel: "For Brands",
        hero: {
            title: "Design that converts. Presence that compounds.",
            desc: "AOVA builds brand infrastructure — not just visuals. We engineer systems that capture attention, drive action, and scale effortlessly as your business grows.",
            color: "bg-[#3366FF]/5 border-[#3366FF]/10",
        },
        pricingCards: [
            {
                title: "Identity Sprint",
                desc: "Your brand's visual foundation.",
                features: ["Logo System", "Brand Guidelines", "Typography & Color", "Social Assets"],
                price: "$3,500",
                period: "fixed",
                featured: false
            },
            {
                title: "Conversion Web",
                desc: "High-performance landing pages.",
                features: ["Figma Platform Design", "Framer / Next.js Build", "Copywriting Strategy", "SEO Setup"],
                price: "$5,500",
                period: "fixed",
                featured: true
            },
            {
                title: "Full Launch",
                desc: "End-to-end brand & digital.",
                features: ["Complete Identity System", "Website (Up to 8 pages)", "Motion Guidelines", "Pitch Deck Template"],
                price: "$12,000",
                period: "fixed",
                featured: false
            }
        ]
    }
};

type AudienceType = 'creator' | 'brand';

function InteractiveServices() {
    const [audience, setAudience] = useState<AudienceType | null>(null);

    return (
        <section className="relative py-32 px-6" id="services-interactive">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">Who are we building for?</h2>

                    <div className="inline-flex flex-col md:flex-row p-1.5 bg-[#111111] border border-white/10 rounded-[32px] md:rounded-full gap-2 relative z-10 w-full md:w-auto shadow-xl">
                        {(['creator', 'brand'] as AudienceType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setAudience(audience === type ? null : type)}
                                className={`px-8 py-3.5 rounded-full text-lg md:text-xl font-serif transition-all duration-300 w-full md:w-auto ${audience === type
                                    ? `${SERVICES_DATA[type].accent} text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-100`
                                    : 'hover:bg-white/5 text-white/50 hover:text-white'
                                    }`}
                            >
                                {SERVICES_DATA[type].tabLabel}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {audience && (
                        <motion.div
                            key={audience}
                            initial={{ opacity: 0, height: 0, y: 30 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="mt-16 overflow-hidden"
                        >
                            <div className="pt-2 pb-8">
                                <div className={`w-full p-8 md:p-16 rounded-[40px] border border-white/5 transition-colors duration-500 overflow-hidden relative mb-12 bg-[#0A0A0A] shadow-2xl ${SERVICES_DATA[audience].hero.color}`}>
                                    <div className="max-w-3xl relative z-10">
                                        <h4 className={`text-4xl md:text-6xl font-serif mb-6 leading-tight ${SERVICES_DATA[audience].theme}`}>{SERVICES_DATA[audience].hero.title}</h4>
                                        <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed">{SERVICES_DATA[audience].hero.desc}</p>
                                    </div>
                                    <div className={`absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${SERVICES_DATA[audience].accent} opacity-[0.05]`} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {SERVICES_DATA[audience].pricingCards.map((card, i) => (
                                        <div key={i} className={`relative flex flex-col justify-between p-8 rounded-[32px] border bg-[#111111]/80 backdrop-blur-md shadow-lg transition-all duration-300 ${card.featured ? `border-white/30 -translate-y-2 ${SERVICES_DATA[audience].bgAccent}` : `border-white/5 hover:border-white/20 hover:-translate-y-1`}`}>
                                            {card.featured && (
                                                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-black text-xs font-bold uppercase tracking-widest ${SERVICES_DATA[audience].accent}`}>
                                                    Most Popular
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-2xl font-serif text-white mb-2">{card.title}</h4>
                                                <p className="text-sm text-white/50 font-medium mb-8 pb-8 border-b border-white/5">{card.desc}</p>

                                                <ul className="space-y-4 mb-16">
                                                    {card.features.map((feat, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-white/70 text-sm font-medium">
                                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${SERVICES_DATA[audience].bgAccent} ${SERVICES_DATA[audience].theme}`}>
                                                                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M1 7l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                            </div>
                                                            {feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="pt-8 border-t border-white/5 mt-auto">
                                                <div className="flex items-end gap-2 mb-6">
                                                    <span className="text-5xl font-serif text-white tracking-tight leading-none">{card.price}</span>
                                                    <span className="text-white/40 text-sm font-bold uppercase pb-1 tracking-widest">{card.period}</span>
                                                </div>
                                                <button className={`w-full py-4 rounded-2xl font-semibold transition-colors duration-300 ${card.featured ? `${SERVICES_DATA[audience].accent} text-black` : 'bg-white/5 text-white hover:bg-white/10'}`}>
                                                    Get Started
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

function PricingServices() {
    const [activeTab, setActiveTab] = useState(PRICING_TABS_DATA[0].id);
    const data = PRICING_TABS_DATA.find(t => t.id === activeTab)!;
    const [activeAddons, setActiveAddons] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setActiveAddons({});
    }, [activeTab]);

    const handleAddonToggle = (addonName: string) => {
        setActiveAddons(prev => ({ ...prev, [addonName]: !prev[addonName] }));
    };

    return (
        <section className="relative py-32" id="services">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="pg-inner">
                <div className="flex flex-wrap justify-center gap-2 mb-12 relative z-10">
                    {PRICING_TABS_DATA.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-full text-base font-semibold transition-all duration-300 shadow-sm ${activeTab === tab.id
                                ? "bg-[var(--text)] text-[var(--surface)] scale-105"
                                : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--border)] border border-[var(--border)]"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={data.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-[var(--surface)] border border-[var(--border)] rounded-[32px] p-6 lg:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row gap-10 relative z-10"
                    >
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{data.title}</h3>
                                    <div className="px-3 py-1 rounded-full border border-[var(--border)] text-xs text-[var(--muted)] flex items-center gap-2 font-mono">
                                        <span className="text-xl leading-none">⏱</span> {data.duration}
                                    </div>
                                </div>

                                {data.addons && data.addons.length > 0 && (
                                    <div className="mb-8 space-y-3">
                                        {data.addons.map((addon) => (
                                            <div key={addon.name} className="flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-[var(--text)] text-sm md:text-base">{addon.name}</span>
                                                    <span className="text-[10px] uppercase font-bold text-[#FF3366] bg-[#FF3366]/10 px-2 py-0.5 rounded-sm tracking-widest">{addon.price}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleAddonToggle(addon.name)}
                                                    className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${activeAddons[addon.name] ? 'bg-[var(--text)]' : 'bg-[var(--border-hover)]'}`}
                                                >
                                                    <div className={`w-5 h-5 bg-[var(--surface)] rounded-full absolute top-0.5 transition-all duration-300 shadow-md ${activeAddons[addon.name] ? 'left-[26px] bg-white' : 'left-0.5'}`} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <ul className="space-y-4 mb-8">
                                    {data.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-base md:text-lg text-[var(--text)]">
                                            <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--text)] text-[var(--surface)] flex items-center justify-center text-sm">✓</span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-8">
                                {data.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-[var(--border)] text-[var(--muted)] text-xs rounded-full font-mono tracking-widest uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-4">
                            <div className={`w-full aspect-square rounded-[32px] bg-gradient-to-br ${data.gradient} p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl`}>
                                <div className="absolute -bottom-10 -right-10 text-[180px] opacity-10 font-black leading-none drop-shadow-lg pointer-events-none select-none">A</div>

                                <div className="relative z-10">
                                    <p className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-1">{data.label}</p>
                                    <h4 className="text-4xl font-serif italic drop-shadow-md">{data.title.toLowerCase()}</h4>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Starting from</p>
                                    <p className="text-6xl md:text-7xl font-black tracking-tighter drop-shadow-lg">{data.price}</p>
                                </div>
                            </div>

                            <button className="w-full py-4 mt-2 rounded-[20px] bg-[var(--text)] text-[var(--surface)] text-lg font-bold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                                Send a Message
                            </button>
                            <button className="w-full py-4 rounded-[20px] bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] text-lg font-bold hover:bg-[var(--border)] transition-colors duration-300 shadow-sm">
                                Book a Call
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

/* ================================================================


/* ================================================================
   PROJECTS
   ================================================================ */
const workProjects = [
    { num: "01", name: "O.R.C.A Systems", category: "Brand Identity", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { num: "02", name: "Vela Creative", category: "Web Design", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop" },
    { num: "03", name: "Neo Banking App", category: "Product UX", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop" },
];



function WorkSection() {
    const router = useRouter();
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
                            <div key={p.num} className="group relative h-[240px] sm:h-[360px] md:h-[480px] overflow-hidden rounded-2xl bg-[var(--border)] cursor-pointer">
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
                        onClick={() => router.push('/archive')}
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
    { text: "Aova absolutely transformed our digital presence. They didn't just design a website, they built a machine that converts.", author: "L. Jenkins", brand: "Founder of Lumara", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
    { text: "The editing quality and turnaround time are unmatched. We've seen a 30% increase in retention since working with Aova.", author: "A. Abdaal", brand: "Creator", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop" },
    { text: "Insane attention to detail. The brand identity they delivered gave us the confidence to scale aggressively.", author: "S. Rossi", brand: "Founder of Halo", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=150&auto=format&fit=crop" },
    { text: "Simply the best creative partner we've ever worked with. Fast, communicative, and constantly delivering heat.", author: "M. Chen", brand: "TechFlow", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
];

function Testimonials() {
    return (
        <section className="pt-16 pb-32 overflow-hidden bg-transparent text-[var(--text)] relative mt-0" id="testimonials">
            <div className="pg-inner mb-16 relative z-10">
                <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">Aova <span className="italic text-[#FF3366]">Love</span></h2>
                <p className="text-[var(--muted)] text-lg max-w-xl">Don&apos;t just take our word for it. Trusted by industry leaders constantly moving the needle.</p>
            </div>

            <div className="flex overflow-hidden relative w-full h-full group">
                {/* Edge fade gradients */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-8 group-hover:[animation-play-state:paused] py-4" style={{ width: "max-content", animation: "scroll 40s linear infinite" }}>
                    {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                        <div key={i} className="w-[320px] sm:w-[400px] md:w-[500px] flex flex-col bg-[var(--surface)] border-2 border-[var(--border)] shadow-[0_4px_0_0_rgba(0,0,0,0.05)] p-6 sm:p-8 md:p-10 rounded-[24px] md:rounded-[32px] shrink-0 transition-transform duration-300 hover:-translate-y-2 hover:border-[var(--border-hover)]">
                            
                            {/* Profile Header Section */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={t.avatar} 
                                        alt={t.author} 
                                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0 border border-[var(--border)]" 
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="font-bold tracking-tight text-lg md:text-xl text-[var(--text)] leading-none">{t.author}</span>
                                        <span className="text-[var(--muted)] text-sm md:text-base leading-none">{t.brand}</span>
                                    </div>
                                </div>
                                {/* Optional Right-Aligned Logo Placeholder */}
                                <div className="w-10 h-10 md:w-12 md:h-12 text-[var(--muted)] opacity-40 flex items-center justify-center shrink-0">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" />
                                        <path d="M26 14L14 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                        <path d="M26 26V14H14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-[#FF3366]">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                ))}
                            </div>

                            <p className="text-xl md:text-2xl font-serif text-[var(--text)] whitespace-normal leading-snug">&ldquo;{t.text}&rdquo;</p>
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
    { num: "01", title: "Discovery Call", desc: "We get on a call, learn your world, and figure out exactly what you need. No pitch, no pressure, just clarity." },
    { num: "02", title: "The Strategy", desc: "You get a clear plan: what we're building, how long it takes, and what it costs. Everything in writing before we touch a thing." },
    { num: "03", title: "The Build", desc: "We build. You stay in the loop at every milestone. Fast, intentional, and built to your standard, not ours." },
    { num: "04", title: "Handoff", desc: "Final assets, full ownership, and a roadmap for what's next. You walk away with everything you need to move." }
];

function BuyingProcess() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["0.2 1", "0.8 0.5"]
    });
    
    // Smooth out the progress line
    const scale = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative py-32 border-t border-[var(--border)] overflow-hidden" id="process">
            {/* Decorative background block */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-dots opacity-[0.08] -rotate-12 pointer-events-none -z-10" />

            <div className="pg-inner relative">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-serif tracking-tight mb-6">How it <span className="italic text-[#00CC66]">Works</span></h2>
                    <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">We keep things simple, transparent, and completely focused on your success.</p>
                </div>

                <div className="relative w-full">
                    {/* Horizontal Track Line (Desktop) */}
                    <div className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-[2px] bg-[var(--border)] z-0 overflow-hidden">
                        <motion.div className="h-full bg-[#00CC66] origin-left" style={{ scaleX: scale }} />
                    </div>

                    {/* Vertical Track Line (Mobile) */}
                    <div className="block md:hidden absolute left-[27px] top-[24px] bottom-[24px] w-[2px] bg-[var(--border)] z-0 overflow-hidden">
                        <motion.div className="w-full h-full bg-[#00CC66] origin-top" style={{ scaleY: scale }} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 relative z-10 w-full">
                        {BUYING_STEPS.map((step, i) => (
                            <div key={step.num} className="flex flex-row md:flex-col items-start md:items-center relative w-full">
                                {/* The node waypoint */}
                                <motion.div 
                                    initial={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--muted)' }}
                                    whileInView={{ borderColor: '#00CC66', backgroundColor: '#00CC66', color: '#111111' }}
                                    viewport={{ margin: "-20%" }}
                                    transition={{ duration: 0.6 }}
                                    className="w-14 h-14 shrink-0 rounded-full border-2 md:border-4 shadow-sm flex items-center justify-center font-serif text-lg font-bold z-10 transition-colors md:mb-8 bg-[var(--surface)]"
                                >
                                    {step.num}
                                </motion.div>

                                {/* The content card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="relative ml-6 md:ml-0 p-6 lg:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full text-left md:text-center shrink min-w-0"
                                >
                                    <h3 className="text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
                                    <p className="text-[var(--muted)] text-sm leading-relaxed">{step.desc}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================================================================
   FAQ
   ================================================================ */
const FAQS = [
    { q: "What types of projects do you take on?", a: "We work across brand identity, UI/UX design, design systems, motion graphics, video production, and web development. We're selective — we take on fewer clients so each one gets our full attention and craft." },
    { q: "How long does a typical project take?", a: "Brand identity projects typically run 6–10 weeks. Web and product design engagements run 8–16 weeks. Video and motion work varies by scope, but most packages operate on a two-week sprint cadence." },
    { q: "What is your pricing structure?", a: "We work on a project-fee basis for one-off work, and a sprint retainer model for ongoing clients. Either way, you know the full cost upfront — no hourly billing, no surprises." },
    { q: "Do you work with early-stage brands?", a: "Yes. We have packages built specifically for founders and early-stage brands who need a strong foundation fast — brand identity, social kit, and motion assets — without the overhead of a full agency." },
    { q: "Who will I actually be working with?", a: "Leif and Kudy run every engagement directly. You'll deal with the founders on strategy, creative direction, and reviews — not account managers or junior staff. A production team handles execution under our oversight." },
    { q: "How does the sprint model work?", a: "We operate in two-week sprints. Each sprint starts with a scope call, we produce and deliver assets, then close with a review. Ongoing clients can book consecutive sprints at a locked retainer rate." },
    { q: "What does onboarding look like?", a: "It starts with a 30–45 minute discovery call. From there we build a strategy blueprint, present it to you, confirm scope, and kick off the first sprint — typically within a week of signing." },
    { q: "Can we work together on just one thing?", a: "Absolutely. You don't need a long-term commitment to start. We can suite a single project, deliver it, and go from there. A lot of our ongoing clients started with one sprint." },
    { q: "What if I need revisions?", a: "Revisions are part of the process, not a gotcha. We build feedback rounds into every sprint. For larger scopes, we align on revision rounds upfront so there's never ambiguity." },
    { q: "Do you handle distribution or posting?", a: "On the Creator Growth Engine side, yes — posting management and distribution strategy are available. On the Brand side, we'll give you distribution suggestions, but execution stays with your team." }
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) {
    return (
        <BorderGlow
            className="mb-4 w-full rounded-2xl group overflow-hidden"
            borderRadius={16}
            backgroundColor="#0c0d0d"
            edgeSensitivity={30}
            glowColor="0 0 100"
            colors={['#ffffff', '#aaaaaa', '#555555']}
            animated={false}
        >
            <div className={`p-6 transition-all duration-300 w-full rounded-2xl relative bg-[#0c0d0d]`} style={{ backgroundImage: "radial-gradient(circle 500px at 0% 0%, #202020 0%, #111 40%, #0c0d0d 100%)" }}>
                <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                <div className="relative z-10 w-full">
                    <button
                        onClick={onToggle}
                        className="w-full flex items-center justify-between text-left focus:outline-none cursor-none"
                    >
                        <span className={`text-xl md:text-2xl font-serif transition-colors ${isOpen ? "text-white" : "text-white/60"}`}>{q}</span>
                        <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isOpen ? "bg-white text-black border-white rotate-45" : "border-white/20 text-white/40"}`}>
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
                                <p className="pt-4 text-white/50 text-lg max-w-2xl">{a}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </BorderGlow>
    );
}

function FaqSection() {
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const [folderOpen, setFolderOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<number | null>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(faqRef);

    useEffect(() => {
        if (!isInView && folderOpen) {
            setFolderOpen(false);
            if (selectedMember !== null) setSelectedMember(null);
        }
    }, [isInView, folderOpen, selectedMember]);

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
            name: 'Kudy', role: 'Motion Designer', avatar: '/Kudy.png',
            quote: '"Animation is the punctuation of digital experience."',
            bio: 'Kudy creates the motion layer that gives AOVA\'s work its signature energy. From micro-interactions to full motion identities, he makes interfaces feel alive without overwhelming the underlying message.',
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
                                        className="absolute inset-0 bg-[#0A0A0A] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden"
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
                                            <img src={`https://i.pravatar.cc/200?u=${member.avatar}`} alt={member.name} className={`rounded-full border-4 border-white/20 shadow-xl object-cover mb-3 ${absD === 0 ? 'w-20 h-20' : 'w-14 h-14'}`} />
                                            <h2 className={`font-serif font-bold text-white leading-tight ${absD === 0 ? 'text-2xl' : 'text-lg'}`}>{member.name}</h2>
                                            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mt-0.5">{member.role}</p>
                                            {absD === 0 && <p className="text-white/50 text-[11px] mt-1 flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>{member.location}</p>}
                                        </div>
                                        {absD === 0 && (
                                            <div className="px-6 py-5 -mt-8 relative">
                                                <div className="bg-[#111111] rounded-2xl p-5 shadow-lg border border-white/10 mb-4">
                                                    <p className="font-serif italic text-[#FF3366] text-base leading-snug">{member.quote}</p>
                                                </div>
                                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                                                <div className="flex flex-wrap gap-1.5 justify-center">
                                                    {member.skills.map(skill => <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-semibold tracking-wide border border-white/10">{skill}</span>)}
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
                                    isOpen={openIndices.includes(i)}
                                    onToggle={() => setOpenIndices(prev => prev.includes(i) ? prev.filter(idx => idx !== i) : [...prev, i])}
                                />
                            ))}
                        </div>


                    </div>

                    {/* Right Column Component: Sticky Booking Widget */}
                    <div className="lg:col-span-5 relative overflow-visible">
                        <div className="sticky top-32 w-full overflow-visible">

                            {/* TEAM Folder ─ top of sticky column */}
                            <div ref={faqRef} className="relative flex justify-center overflow-visible" style={{ paddingTop: '110px', marginTop: '-110px' }}>
                                {/* Annotation: positioned so right edge clears folder's left edge */}
                                <div
                                    className={`absolute top-1/2 translate-y-4 flex flex-col items-end gap-1 rotate-[-10deg] pointer-events-none transition-opacity duration-300 ${folderOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    style={{ zIndex: 1, right: 'calc(50% + 140px)' }}
                                >
                                    <span className="font-serif italic text-3xl text-[#FF3366] whitespace-nowrap leading-tight">Get to know us!</span>
                                    {/* Arrow sweeps from bottom-left (below text) curving right → toward folder */}
                                    <svg width="88" height="56" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="self-end mr-2">
                                        <path d="M8 8 Q20 65 82 58" stroke="#FF3366" strokeWidth="4" fill="none" strokeDasharray="6,5" strokeLinecap="round" />
                                        <path d="M88 47 L100 55 L88 63" stroke="#FF3366" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
                                            <div key="t1" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-lg ring-2 ring-white/20 group-hover:ring-white transition-all duration-300">
                                                    <img src="https://i.pravatar.cc/150?u=sarah_aova" alt="Sarah" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif text-[15px] font-medium text-white leading-none tracking-tight">Sarah</p>
                                            </div>,
                                            <div key="t2" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-lg ring-2 ring-white/20 group-hover:ring-white transition-all duration-300">
                                                    <img src="https://i.pravatar.cc/150?u=marcus_aova" alt="Marcus" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif text-[15px] font-medium text-white leading-none tracking-tight">Marcus</p>
                                            </div>,
                                            <div key="t3" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-lg ring-2 ring-white/20 group-hover:ring-white transition-all duration-300">
                                                    <img src="https://i.pravatar.cc/150?u=elena_aova" alt="Elena" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif text-[15px] font-medium text-white leading-none tracking-tight">Elena</p>
                                            </div>,
                                            <div key="t4" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-lg ring-2 ring-white/20 group-hover:ring-white transition-all duration-300">
                                                    <img src="/Kudy.png" alt="Kudy" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif text-[15px] font-medium text-white leading-none tracking-tight">Kudy</p>
                                            </div>,
                                            <div key="t5" className="flex flex-col items-center justify-center p-1 group pointer-events-auto cursor-pointer rounded-xl">
                                                <div className="rounded-full overflow-hidden w-[52px] h-[52px] mb-2 shadow-lg ring-2 ring-white/20 group-hover:ring-white transition-all duration-300">
                                                    <img src="https://i.pravatar.cc/150?u=amina_aova" alt="Amina" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>
                                                <p className="font-serif text-[15px] font-medium text-white leading-none tracking-tight">Amina</p>
                                            </div>
                                        ]}
                                    />
                                </div>
                            </div>

                            {/* Booking Widget ─ below the folder */}
                            <style>{`
                                .bk-ray {
                                    width: 250px;
                                    height: 40px;
                                    border-radius: 100px;
                                    position: absolute;
                                    background-color: #ffffff;
                                    opacity: 0.15;
                                    box-shadow: 0 0 50px #ffffff;
                                    filter: blur(12px);
                                    transform-origin: 0%;
                                    top: -2%;
                                    left: -2%;
                                    transform: rotate(35deg);
                                }
                            `}</style>
                            <motion.div
                                id="booking-widget"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6)" }}
                                transition={{ duration: 0.3 }}
                                className="w-full rounded-[40px] p-[1px] relative shadow-2xl group mt-8 overflow-hidden bg-[#0c0d0d]"
                                style={{ 
                                    rotateX, 
                                    rotateY, 
                                    transformStyle: "preserve-3d", 
                                    perspective: 1000
                                }}
                            >
                                {/* Animated edge beam */}
                                <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none z-0" 
                                    style={{ background: 'conic-gradient(from 0deg, transparent 0, transparent 75%, rgba(255,255,255,0.4) 100%)' }} 
                                />

                                {/* Main Inner Card Content */}
                                <div className="relative w-full h-full rounded-[39px] p-8 md:p-12 overflow-hidden z-10" 
                                    style={{ backgroundImage: "radial-gradient(circle 700px at 0% 0%, #303030 0%, #111111 40%, #0c0d0d 100%)" }}
                                >
                                    {/* Premium details from the cool card */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[39px]">
                                        <div className="bk-ray" />
                                    </div>

                                    {/* Dynamic Hover Spotlight Glow */}
                                    <motion.div
                                        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-0"
                                        style={{
                                            background: useMotionTemplate`
                                            radial-gradient(
                                                600px circle at ${mouseX}px ${mouseY}px,
                                                rgba(255, 255, 255, 0.1),
                                                transparent 80%
                                            )
                                        `,
                                        }}
                                    />

                                    {/* Inner grain overlay */}
                                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

                                    <div className="relative z-10 flex flex-col h-full items-center text-center" style={{ transform: "translateZ(30px)" }}>
                                        {/* Profile Avatar Circles */}
                                        <div className="flex justify-center -space-x-6 mb-6">
                                            <div className="w-[84px] h-[84px] rounded-full border-4 border-[#0c0d0d] overflow-hidden shadow-lg relative z-10 bg-[#0c0d0d]">
                                                <img src="/Kudy.png" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="w-[84px] h-[84px] rounded-full border-4 border-[#0c0d0d] overflow-hidden shadow-lg relative z-0 bg-[#0c0d0d]">
                                                <img src="/Noire.png" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        <h3 className="text-4xl md:text-5xl font-serif font-medium leading-tight tracking-tight mb-10 w-full text-[#FF3366]">
                                            <span className="bg-[#0c0d0d] md:bg-transparent md:backdrop-blur-none bg-opacity-70 backdrop-blur-md px-4 py-2 rounded-xl">Book a 30-min discovery call</span>
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
                                    <button onClick={handleCopy} className="group/email flex flex-col items-center justify-center w-full bg-[#0a0a0a] rounded-[24px] py-8 transition-all duration-300 hover:bg-[#111111] hover:shadow-lg border border-white/5 hover:border-[#FF3366]/30 relative z-20">
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
                <h2 className="text-6xl md:text-[120px] leading-none font-serif tracking-tight mb-12 text-[#FF3366] text-center">
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="inline-flex items-baseline cursor-default"
                    >
                        Let&apos;s t
                        <span className="inline-block relative">
                            a
                            {/* Absolutely-positioned overlay that expands to the right */}
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: isHovered ? "auto" : 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden inline-flex whitespace-nowrap align-bottom absolute left-full top-0 h-full"
                            >
                                aaaaaa
                            </motion.span>
                        </span>
                        {/* Ghost span — invisible but pushes 'lk' rightward in layout */}
                        <motion.span
                            initial={{ width: 0 }}
                            animate={{ width: isHovered ? "auto" : 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden inline-flex whitespace-nowrap align-bottom opacity-0 pointer-events-none select-none"
                            aria-hidden="true"
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
                    <div className="flex items-center flex-1 justify-center md:justify-start">
                        <img src="/AOVASTUDIO.svg" alt="Aova Studio" className="h-5 md:h-7 w-auto invert opacity-90 transition-opacity hover:opacity-100" />
                    </div>

                    {/* Centered Social Links (All next to each other on one row) */}
                    <div className="flex gap-4 md:gap-8 text-[11px] md:text-sm text-white/50 uppercase tracking-widest font-medium justify-center shrink-0">
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">X</a>
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors whitespace-nowrap">Discord</a>
                    </div>

                    {/* Balanced Copyright block (Right) */}
                    <div className="flex flex-col items-center md:items-end text-white/30 text-[10px] md:text-xs flex-1 mt-2 md:mt-0">
                        <span className="whitespace-nowrap">&copy; 2026 Aova Design Studio.</span>
                        <span className="whitespace-nowrap">All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function HomePage() {
    const [isDark, setIsDark] = useState(false);

    // Initialize from system preference
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

    return (
        <main className="relative">
            <CustomCursor />
            <Navbar isDark={isDark} toggleDark={() => setIsDark(!isDark)} />
            <Hero isDark={isDark} />
            <WorkSection />
            <InteractiveServices />
            <PricingServices />

            <Testimonials />

            <BuyingProcess />
            <FaqSection />
            <Footer />
        </main>
    );
}
