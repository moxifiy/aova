"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PINK = "#ff269d";
const INK = "#0A0A0A";
const linkCls =
    "relative w-fit text-white after:absolute after:left-0 after:-bottom-0.5 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100";

export default function Footer() {
    const { t } = useLanguage();
    const footerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLButtonElement>(null);
    const markRef = useRef<SVGSVGElement>(null);
    const year = new Date().getFullYear();

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const text = textRef.current;
        if (!text) return;
        const tween = gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: text, start: "top 78%", toggleActions: "play none none none" } }
        );
        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);

    const handleScrollToTop = () => {
        const l = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis;
        if (l) l.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 3D tilt of the back-to-top circle toward the cursor
    const onTilt = (e: React.MouseEvent) => {
        const el = circleRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = `rotateX(${(-dy * 20).toFixed(1)}deg) rotateY(${(dx * 20).toFixed(1)}deg) scale(1.06)`;
    };
    const onTiltReset = () => {
        if (circleRef.current) circleRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    // Elastic wordmark: scroll speed stretches the letters taller (slimming them
    // slightly, like real rubber), and a spring lets them wobble back to rest
    // when you stop. Anchored at the baseline; runs only while visible.
    useEffect(() => {
        const footer = footerRef.current;
        const mark = markRef.current;
        if (!footer || !mark) return;

        let raf = 0;
        let running = false;
        let cur = 0; // current stretch amount
        let springVel = 0;
        let lastY = window.scrollY;
        let lastT = performance.now();

        const loop = () => {
            const y = window.scrollY;
            const t = performance.now();
            const dt = Math.max(8, t - lastT);
            const vel = (y - lastY) / dt; // px per ms
            lastY = y;
            lastT = t;

            // gravity feel: scrolling down stretches the letters up, scrolling up
            // squashes them flat — signed velocity, capped both ways
            const target = Math.max(-0.09, Math.min(0.14, vel * 0.26));
            // under-damped spring → lively overshoot when settling back
            springVel += (target - cur) * 0.16;
            springVel *= 0.8;
            cur = Math.max(-0.11, Math.min(0.17, cur + springVel));

            const sy = 1 + cur;
            const sx = 1 - cur * 0.25;
            mark.style.transform = `scaleY(${sy.toFixed(4)}) scaleX(${sx.toFixed(4)})`;
            raf = requestAnimationFrame(loop);
        };

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !running) {
                running = true;
                lastY = window.scrollY;
                lastT = performance.now();
                raf = requestAnimationFrame(loop);
            } else if (!entry.isIntersecting && running) {
                running = false;
                cancelAnimationFrame(raf);
                cur = 0;
                springVel = 0;
                mark.style.transform = "scaleY(1) scaleX(1)";
            }
        });
        io.observe(footer);

        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <footer ref={footerRef} className="relative min-h-screen flex flex-col select-none text-white" style={{ backgroundColor: PINK }}>
            <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 pt-14 md:pt-20 relative z-10">
                <div className="flex items-start justify-between gap-8">
                    <div ref={textRef} className="flex flex-wrap gap-10 md:gap-20 font-body">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 mb-3 font-mono">
                                {t("Contact", "Kontakt")}
                            </h4>
                            <div className="flex flex-col gap-2 text-sm md:text-base font-medium">
                                <a href="mailto:hello@aova.studio" className={linkCls}>hello@aova.studio</a>
                                <a href="tel:+420739662744" className={linkCls}>+420 739 662 744</a>
                                <a href="tel:+420777794340" className={linkCls}>+420 777 794 340</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 mb-3 font-mono">
                                {t("Socials", "Sítě")}
                            </h4>
                            <div className="flex flex-col gap-2 text-sm md:text-base font-medium">
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={linkCls}>Instagram</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={linkCls}>Twitter / X</a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn</a>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm md:text-base font-medium leading-relaxed text-white/90">
                                {t("Aova Studio", "Aova Studio")}<br />
                                {t("Brno, Czech Republic", "Brno, Česká Republika")}<br />
                                &copy; {year} {t("Aova Studio. All rights reserved.", "Aova Studio. Všechna práva vyhrazena.")}
                            </p>
                        </div>
                    </div>

                    {/* Back to top — circle tilts in 3D toward the cursor */}
                    <div className="shrink-0" style={{ perspective: "650px" }}>
                        <button
                            ref={circleRef}
                            onClick={handleScrollToTop}
                            onMouseMove={onTilt}
                            onMouseLeave={onTiltReset}
                            aria-label="Back to top"
                            className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#0A0A0A] flex items-center justify-center"
                            style={{ transformStyle: "preserve-3d", transition: "transform 250ms cubic-bezier(0.16,1,0.3,1)", willChange: "transform" }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16 md:w-[5.5rem] md:h-[5.5rem]" style={{ transform: "translateZ(22px)" }}>
                                <path d="M12 20V4M12 4l-7 7M12 4l7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom: full-width AOVA wordmark — sticky; only the "O" tilts in 3D on hover */}
            <div
                className="mt-auto sticky bottom-0 z-20 w-full px-4 md:px-8 pb-4 md:pb-6"
                style={{ backgroundColor: PINK }}
            >
                <svg ref={markRef} viewBox="0 0 647.07 125.95" className="w-full h-auto block" style={{ overflow: "visible", willChange: "transform", transformOrigin: "center bottom" }} aria-label="AOVA">
                    {/* V */}
                    <path fill={INK} d="M505.06,6.15l-54.65,115.77c-.41.87-1.29,1.43-2.26,1.43h-55.09c-.97,0-1.85-.56-2.26-1.43L336.14,6.15c-.78-1.66.43-3.57,2.26-3.57h37.84c.98,0,1.86.57,2.27,1.46l38.32,83.36c.41.89,1.29,1.46,2.27,1.46h1.76c.98,0,1.86-.57,2.27-1.46L461.46,4.04c.41-.89,1.29-1.46,2.27-1.46h39.07c1.83,0,3.04,1.91,2.26,3.57Z" />
                    {/* A (left) */}
                    <path fill={INK} d="M114.51,4.02l54.65,115.77c.78,1.66-.43,3.57-2.26,3.57h-39.07c-.98,0-1.86-.57-2.27-1.46l-38.32-83.36c-.41-.89-1.29-1.46-2.27-1.46h-1.76c-.98,0-1.86.57-2.27,1.46l-38.32,83.36c-.41.89-1.29,1.46-2.27,1.46H2.5c-1.83,0-3.04-1.91-2.26-3.57L54.9,4.02c.41-.87,1.29-1.43,2.26-1.43h55.09c.97,0,1.85.56,2.26,1.43Z" />
                    {/* O + eye */}
                    <g>
                        <path fill={INK} d="M252.66,0c-49.58,0-81.81,18.12-81.81,62.97s32.23,62.98,81.81,62.98,81.8-18.12,81.8-62.98S302.24,0,252.66,0ZM234.18,38.09c5.41-1.25,11.61-1.86,18.48-1.86.17,0,.33,0,.49.01v.27c0,6.05-4.9,10.96-10.96,10.96-4.18,0-7.82-2.35-9.66-5.81-.76-1.43.07-3.21,1.65-3.57ZM252.66,89.72c-25.78,0-42.14-8.63-42.14-26.75,0-8.67,3.75-15.17,10.48-19.58,1.69-1.11,3.9.11,3.9,2.13v.05c0,15.33,12.43,27.76,27.75,27.76s27.76-12.43,27.76-27.76v-.12c-.01-1.99,2.16-3.25,3.83-2.17,6.81,4.42,10.56,10.95,10.56,19.69,0,18.12-16.11,26.75-42.14,26.75Z" />
                        <path fill="#fff" d="M253.15,36.24v.27c0,6.05-4.9,10.96-10.96,10.96-4.18,0-7.82-2.35-9.66-5.81-.76-1.43.07-3.21,1.65-3.57,5.41-1.25,11.61-1.86,18.48-1.86.17,0,.33,0,.49.01Z" />
                        <path fill="#fff" d="M294.8,62.97c0,18.12-16.11,26.75-42.14,26.75s-42.14-8.63-42.14-26.75c0-8.67,3.75-15.17,10.48-19.58,1.69-1.11,3.9.11,3.9,2.13v.05c0,15.33,12.43,27.76,27.75,27.76s27.76-12.43,27.76-27.76v-.12c-.01-1.99,2.16-3.25,3.83-2.17,6.81,4.42,10.56,10.95,10.56,19.69Z" />
                    </g>
                    {/* A (right) */}
                    <path fill={INK} d="M644.56,123.36h-39.07c-.98,0-1.86-.57-2.27-1.46l-38.32-83.36c-.41-.89-1.29-1.46-2.27-1.46h-1.76c-.98,0-1.86.57-2.27,1.46l-38.32,83.36c-.41.89-1.29,1.46-2.27,1.46h-37.84c-1.83,0-3.04-1.91-2.26-3.57l54.66-115.77c.41-.87,1.29-1.43,2.26-1.43h55.09c.97,0,1.85.56,2.26,1.43l54.65,115.77c.78,1.66-.43,3.57-2.26,3.57Z" />
                </svg>
            </div>
        </footer>
    );
}
