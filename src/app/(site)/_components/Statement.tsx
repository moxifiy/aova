"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import VideoLightbox from "./VideoLightbox";
import { useLanguage } from "./LanguageContext";

export default function Statement() {
    const { t, lang } = useLanguage();
    const REVEAL_WORDS = useMemo(
        () => (lang === "EN" ? [": DESIGN, ", "STRATEGY, ", "MOTION"] : [": DESIGN, ", "STRATEGIE, ", "MOTION"]),
        [lang]
    );
    const REVEAL_STARTS = useMemo(
        () => [0, REVEAL_WORDS[0].length, REVEAL_WORDS[0].length + REVEAL_WORDS[1].length],
        [REVEAL_WORDS]
    );
    const REVEAL_TOTAL = useMemo(() => REVEAL_WORDS.reduce((sum, w) => sum + w.length, 0), [REVEAL_WORDS]);

    const [threeWordsState, setThreeWordsState] = useState<"idle" | "visible">("idle");
    const wordRefs = [
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null)
    ];
    const [typedCount, setTypedCount] = useState(0);

    // Announcement video — muted inline preview, click to watch with sound
    const [annOpen, setAnnOpen] = useState(false);
    const annRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const v = annRef.current;
        if (!v || !("IntersectionObserver" in window)) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) v.play().catch(() => {});
                else v.pause();
            },
            { threshold: 0.1 }
        );
        io.observe(v);
        return () => io.disconnect();
    }, []);

    // Click the typed-out words to drop them into the shared physics layer (they fall on click, not on scroll)
    const dropThree = () => {
        if (threeWordsState !== "visible" || typedCount < REVEAL_TOTAL) return;
        const items = wordRefs.map((ref, idx) => {
            if (!ref.current) return null;
            const rect = ref.current.getBoundingClientRect();
            return {
                text: REVEAL_WORDS[idx].trimEnd(),
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                fontSize: window.getComputedStyle(ref.current).fontSize,
                color: "#0A0A0A",
            };
        }).filter(Boolean);

        if (items.length === 3) {
            window.dispatchEvent(new CustomEvent("v2-drop", { detail: { items } }));
            setThreeWordsState("idle");
        }
    };

    // Typewriter reveal — types the words out character-by-character on hover
    useEffect(() => {
        if (threeWordsState !== "visible") {
            setTypedCount(0);
            return;
        }
        setTypedCount(0);
        let c = 0;
        const id = setInterval(() => {
            c += 1;
            setTypedCount(c);
            if (c >= REVEAL_TOTAL) clearInterval(id);
        }, 30);
        return () => clearInterval(id);
    }, [threeWordsState, REVEAL_TOTAL]);

    return (
        <>
            <section className="bg-white text-[#0A0A0A] pt-16 md:pt-28 pb-32 md:pb-52 pl-4 md:pl-8 pr-6 md:pr-12 relative">
            <div className="max-w-[1440px] mx-auto">
                
                {/* Main Headline */}
                <div className="w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-3xl lg:text-[42px] font-semibold tracking-tight leading-[1.05] font-display"
                    >
                        {t(
                            "A BRAND WITHOUT STRATEGY IS DECORATION. STRATEGY WITHOUT DESIGN IS JUST A DOCUMENT. DESIGN WITHOUT MOTION IS A MOMENT THAT PASSES.",
                            "ZNAČKA BEZ STRATEGIE JE DEKORACE. STRATEGIE BEZ DESIGNU JE JEN DOKUMENT. DESIGN BEZ POHYBU JE OKAMŽIK, KTERÝ POMINE."
                        )}
                        <br />
                        <br />
                        {t("WE DO ALL", "DĚLÁME VŠECHNY")}{" "}
                        <span className="relative inline-block group/three cursor-pointer">
                            <span 
                                onMouseEnter={() => { setThreeWordsState("visible"); }}
                                className="underline decoration-[#9A9A9A] decoration-[3px] underline-offset-[2px] transition-colors duration-300 hover:text-[#E0218A]"
                            >
                                {t("THREE", "TŘI")}
                            </span>
                            {/* Typewriter reveal — types out on hover (space after each comma); click the words to drop them */}
                            <span
                                onClick={dropThree}
                                className="v2-clickable absolute left-[calc(100%+0.35em)] top-0 text-[#0A0A0A] font-display font-semibold text-xl md:text-3xl lg:text-[42px] tracking-tight leading-[1.05] select-none whitespace-nowrap z-10"
                                style={{ pointerEvents: typedCount >= REVEAL_TOTAL ? "auto" : "none" }}
                            >
                                {REVEAL_WORDS.map((full, i) => {
                                    const vis = Math.max(0, Math.min(full.length, typedCount - REVEAL_STARTS[i]));
                                    const active = threeWordsState === "visible" && typedCount >= REVEAL_STARTS[i] && typedCount < REVEAL_STARTS[i] + full.length;
                                    return (
                                        <span key={i} ref={wordRefs[i]} className="inline-block whitespace-pre">
                                            {full.slice(0, vis)}
                                            {active && <span className="v2-caret inline-block w-[0.07em] h-[0.74em] bg-current align-baseline" />}
                                        </span>
                                    );
                                })}
                                {threeWordsState === "visible" && typedCount >= REVEAL_TOTAL && (
                                    <span className="v2-caret inline-block w-[0.07em] h-[0.74em] bg-current align-baseline" />
                                )}
                            </span>
                        </span><span className={`transition-opacity duration-300 ${threeWordsState === "visible" ? 'opacity-0' : 'opacity-1'}`}>,</span>
                        <br />
                        {t("BECAUSE YOUR BRAND DESERVES MORE THAN ONE.", "PROTOŽE VAŠE ZNAČKA SI ZASLOUŽÍ VÍC NEŽ JEDNU.")}
                    </motion.p>
                </div>

                {/* Call To Action Button (Dark Gray Pill) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="mt-6 md:mt-10"
                >
                    <Link
                        href="/about"
                        className="flower-btn relative inline-flex items-center justify-center"
                    >
                        <div className="flower-wrapper relative">
                            <span className="flower-text font-host font-normal text-sm md:text-[15px] text-white px-8 py-3.5 bg-[#2C2C2C] rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:bg-[#1A1A1A] z-10 relative">
                                {t("GET TO KNOW US", "POZNEJTE NÁS")}
                            </span>

                            <div className="flower flower1">
                                <div className="flower-petal one"></div>
                                <div className="flower-petal two"></div>
                                <div className="flower-petal three"></div>
                                <div className="flower-petal four"></div>
                            </div>
                            <div className="flower flower2">
                                <div className="flower-petal one"></div>
                                <div className="flower-petal two"></div>
                                <div className="flower-petal three"></div>
                                <div className="flower-petal four"></div>
                            </div>
                            <div className="flower flower3">
                                <div className="flower-petal one"></div>
                                <div className="flower-petal two"></div>
                                <div className="flower-petal three"></div>
                                <div className="flower-petal four"></div>
                            </div>
                            <div className="flower flower4">
                                <div className="flower-petal one"></div>
                                <div className="flower-petal two"></div>
                                <div className="flower-petal three"></div>
                                <div className="flower-petal four"></div>
                            </div>
                            <div className="flower flower5">
                                <div className="flower-petal one"></div>
                                <div className="flower-petal two"></div>
                                <div className="flower-petal three"></div>
                                <div className="flower-petal four"></div>
                            </div>
                            <div className="flower flower6">
                                <div className="flower-petal one"></div>
                                <div className="flower-petal two"></div>
                                <div className="flower-petal three"></div>
                                <div className="flower-petal four"></div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Announcement video — centered, inline (not fullscreen); hover shows the WATCH circle */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 md:mt-32 flex flex-col items-center"
                >
                    <button
                        onClick={() => setAnnOpen(true)}
                        aria-label={t("Watch announcement video with sound", "Přehrát video se zvukem")}
                        data-cursor-text={t("Watch", "Přehrát")}
                        className="cursor-none-v2 relative block w-full max-w-[1100px] aspect-video overflow-hidden bg-[#0A0A0A] group"
                    >
                        <video
                            ref={annRef}
                            src="/announcement.mp4"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            disablePictureInPicture
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                    </button>
                    {/* Label under the video */}
                    <span className="mt-5 md:mt-6 text-[#8A8A8A] text-[11px] md:text-xs font-host font-semibold uppercase tracking-[0.28em] text-center">
                        {t("Announcement video", "Naše oznámení")}
                    </span>
                </motion.div>

            </div>
        </section>

        <VideoLightbox src="/announcement.mp4" open={annOpen} onClose={() => setAnnOpen(false)} />
        </>
    );
}

