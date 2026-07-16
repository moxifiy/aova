"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import InlineVideo from "./InlineVideo";
import TiltLink from "./TiltLink";
import { useLanguage } from "./LanguageContext";

export default function Statement() {
    const { t, lang } = useLanguage();
    const REVEAL_WORDS = useMemo(
        () => (lang === "EN" ? [": design, ", "strategy, ", "motion"] : [": design, ", "strategie, ", "motion"]),
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
    const measureRef = useRef<HTMLSpanElement>(null);
    const [shift, setShift] = useState(0);

    // On hover, measure the reveal's full width and shift the whole phrase left
    // by half of it (+ the gap) so the completed line lands centred.
    const handleThreeEnter = () => {
        const m = measureRef.current;
        if (m) {
            const w = m.getBoundingClientRect().width;
            const fs = parseFloat(getComputedStyle(m).fontSize) || 16;
            setShift((w + fs * 0.35) / 2);
        }
        setThreeWordsState("visible");
    };

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
            <section className="bg-white text-[#0A0A0A] pt-16 md:pt-28 pb-32 md:pb-52 px-6 md:px-12 relative overflow-x-clip">
            <div className="max-w-[1440px] mx-auto">

                {/* Main Headline — each sentence stacked and centered */}
                <div className="w-full text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-2xl lg:text-[36px] font-semibold tracking-tight leading-[1.3] font-display"
                    >
                        {t("A brand without strategy is decoration.", "Značka bez strategie je dekorace.")}
                        <br />
                        {t("Strategy without design is just a document.", "Strategie bez designu je jen dokument.")}
                        <br />
                        {t("Design without motion is a moment that passes.", "Design bez pohybu je okamžik, který pomine.")}
                        <br />
                        <br />
                        {/* "We do all three" shifts left when hovered so the fully typed-out
                            line ends up centred, with the reveal on the same line. */}
                        <span
                            className="relative inline-block"
                            style={{
                                transform: threeWordsState === "visible" ? `translateX(-${shift}px)` : "translateX(0px)",
                                transition: "transform 450ms cubic-bezier(0.16,1,0.3,1)",
                            }}
                        >
                            {t("We do all", "Děláme všechny")}{" "}
                            <span className="relative inline-block group/three cursor-pointer">
                                <span
                                    onMouseEnter={handleThreeEnter}
                                    className="underline decoration-[#9A9A9A] decoration-[3px] underline-offset-[2px] transition-colors duration-300 hover:text-[#E0218A]"
                                >
                                    {t("three", "tři")}
                                </span>
                                {/* Typewriter reveal — types out on hover; click the words to drop them */}
                                <span
                                    onClick={dropThree}
                                    className="v2-clickable absolute left-[calc(100%+0.35em)] top-0 text-[#0A0A0A] font-display font-semibold text-lg md:text-2xl lg:text-[36px] tracking-tight leading-[1.3] select-none whitespace-nowrap z-10"
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
                            {/* Hidden measurer — the reveal's full width, to compute the shift */}
                            <span
                                ref={measureRef}
                                aria-hidden
                                className="invisible pointer-events-none absolute left-0 top-0 font-display font-semibold text-lg md:text-2xl lg:text-[36px] tracking-tight whitespace-nowrap"
                            >
                                {REVEAL_WORDS.join("")}
                            </span>
                        </span>
                        <br />
                        {t("because your brand deserves more than one.", "protože vaše značka si zaslouží víc než jednu.")}
                    </motion.h1>
                </div>

                {/* Call To Action Button — centered, tilts in 3D like the footer circle */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="mt-10 md:mt-14 flex justify-center"
                >
                    <TiltLink
                        href="/about"
                        className="font-host font-normal text-sm md:text-[15px] px-8 py-3.5 bg-[#2C2C2C] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                    >
                        <span className="text-white">{t("GET TO KNOW US", "POZNEJTE NÁS")}</span>
                    </TiltLink>
                </motion.div>

                {/* Announcement video — plays in place with sound when clicked */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-20 md:mt-32 flex flex-col items-center"
                >
                    <InlineVideo
                        src="/announcement.mp4"
                        cursorLabel={t("Watch", "Přehrát")}
                        ariaLabel={t("Watch announcement video with sound", "Přehrát video se zvukem")}
                        className="w-full max-w-[1100px]"
                    />
                    {/* Label under the video */}
                    <span className="mt-5 md:mt-6 text-[#8A8A8A] text-[11px] md:text-xs font-host font-medium tracking-[0.04em] text-center">
                        {t("Announcement video", "Naše oznámení")}
                    </span>
                </motion.div>

            </div>
        </section>
        </>
    );
}

