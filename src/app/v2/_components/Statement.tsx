"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FallingWords, { type FallingWord } from "./FallingWords";

export default function Statement() {
    const [threeWordsState, setThreeWordsState] = useState<"idle" | "visible" | "falling">("idle");
    const [mounted, setMounted] = useState(false);
    const wordRefs = [
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null),
        useRef<HTMLSpanElement>(null)
    ];
    const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (threeWordsState === "visible") {
                const wordsData = wordRefs.map((ref, idx) => {
                    if (ref.current) {
                        const rect = ref.current.getBoundingClientRect();
                        return {
                            text: idx === 0 ? ": DESIGN," : idx === 1 ? "STRATEGY," : "MOTION",
                            left: rect.left,
                            top: rect.top,
                            width: rect.width,
                            height: rect.height,
                            fontSize: window.getComputedStyle(ref.current).fontSize,
                        };
                    }
                    return null;
                }).filter(Boolean) as any[];

                if (wordsData.length === 3) {
                    setFallingWords(wordsData);
                    setThreeWordsState("falling");
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threeWordsState]);

    // Helper for inline animation state (when visible or idle)
    const getInlineAnimationState = (index: number) => {
        if (threeWordsState === "falling") {
            return {
                opacity: 0,
                transition: { duration: 0 } // hide instantly so the fixed physics version can take over
            };
        }
        if (threeWordsState === "visible") {
            const delays = [0, 0.08, 0.16];
            return {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // smooth deceleration
                    delay: delays[index]
                }
            };
        }
        return {
            opacity: 0,
            x: -15,
            y: 0,
            rotate: 0,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
            }
        };
    };

    return (
        <>
            <section className="bg-white text-[#0A0A0A] py-48 md:py-80 pl-4 md:pl-8 pr-6 md:pr-12 relative">
            <div className="max-w-[1440px] mx-auto">
                
                {/* Main Headline */}
                <div className="w-full">
                    <motion.p
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-2xl lg:text-[32px] font-semibold tracking-tight leading-[1.05] font-display"
                    >
                        A BRAND WITHOUT STRATEGY IS DECORATION. STRATEGY WITHOUT DESIGN IS JUST A DOCUMENT. DESIGN WITHOUT MOTION IS A MOMENT THAT PASSES.
                        <br />
                        <br />
                        WE DO ALL{" "}
                        <span className="relative inline-block group/three cursor-pointer">
                            <span 
                                onMouseEnter={() => { setThreeWordsState("visible"); }}
                                className="underline decoration-[#CCCCCC] decoration-2 underline-offset-[6px] transition-colors duration-300 hover:text-[#E0218A]"
                            >
                                THREE
                            </span>
                            {/* Staggered falling text container */}
                            <span className="absolute left-[calc(100%+0.35em)] top-0 flex items-center gap-[0.25em] text-[#8A8A8A] font-display font-normal text-2xl md:text-4xl lg:text-5xl select-none whitespace-nowrap pointer-events-none z-10">
                                <motion.span
                                    ref={wordRefs[0]}
                                    initial={{ opacity: 0, x: -15, y: 0, rotate: 0 }}
                                    animate={getInlineAnimationState(0)}
                                    className="inline-block"
                                >
                                    : DESIGN,
                                </motion.span>
                                <motion.span
                                    ref={wordRefs[1]}
                                    initial={{ opacity: 0, x: -15, y: 0, rotate: 0 }}
                                    animate={getInlineAnimationState(1)}
                                    className="inline-block"
                                >
                                    STRATEGY,
                                </motion.span>
                                <motion.span
                                    ref={wordRefs[2]}
                                    initial={{ opacity: 0, x: -15, y: 0, rotate: 0 }}
                                    animate={getInlineAnimationState(2)}
                                    className="inline-block"
                                >
                                    MOTION
                                </motion.span>
                            </span>
                        </span><span className={`transition-opacity duration-300 ${threeWordsState === "visible" ? 'opacity-0' : 'opacity-1'}`}>,</span>
                        <br />
                        BECAUSE YOUR BRAND DESERVES MORE THAN ONE.
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
                        href="/v2/about"
                        className="flower-btn relative inline-flex items-center justify-center"
                    >
                        <div className="flower-wrapper relative">
                            <span className="flower-text font-host font-normal text-sm md:text-[15px] text-white px-8 py-3.5 bg-[#2C2C2C] rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:bg-[#1A1A1A] z-10 relative">
                                GET TO KNOW US
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

            </div>
        </section>
        {mounted && threeWordsState === "falling" && (
            <FallingWords
                words={fallingWords}
                onDone={() => {
                    setThreeWordsState("idle");
                    setFallingWords([]);
                }}
            />
        )}
        </>
    );
}

