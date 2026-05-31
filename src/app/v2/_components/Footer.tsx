"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Footer() {
    const { t } = useLanguage();
    const footerRef = useRef<HTMLElement>(null);
    const wordmarkRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (wordmarkRef.current && footerRef.current) {
            gsap.fromTo(
                wordmarkRef.current,
                { y: "50%", opacity: 0.1 },
                {
                    y: "0%",
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 95%",
                        end: "bottom bottom",
                        scrub: 1
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer 
            ref={footerRef}
            className="bg-[#E0218A] text-[#0A0A0A] pt-24 pb-12 px-6 md:px-12 relative overflow-hidden flex flex-col justify-between select-none"
        >
            <div className="max-w-[1440px] mx-auto w-full z-10">
                
                {/* Upper row: Let's make something + back to top */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-20">
                    <div>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#0A0A0A]/70 uppercase block mb-4 font-mono">
                            // {t("CONNECT", "PROPOJENÍ")}
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium font-display tracking-tight leading-[1.0]" style={{ letterSpacing: "-0.04em" }}>
                            {t("Let's make", "Pojďme něco")}<br />{t("something.", "vytvořit.")}
                        </h2>
                    </div>

                    <button
                        onClick={handleScrollToTop}
                        className="self-start md:self-auto flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-[#0A0A0A] hover:opacity-75 transition-opacity font-mono pb-1 border-b border-[#0A0A0A]"
                        aria-label="Scroll back to top"
                    >
                        {t("Back to Top", "Zpět nahoru")} &uarr;
                    </button>
                </div>

                {/* Middle row: Address / Social Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-[#0A0A0A]/10/20 w-full text-sm font-body">
                    
                    {/* Column 1: Contacts */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]/70 mb-4 font-mono">
                            {t("Contact Us", "Kontaktujte Nás")}
                        </h4>
                        <div className="flex flex-col gap-3 font-medium">
                            <a href="mailto:aovastudio@gmail.com" className="group/link flex items-center gap-1.5 hover:opacity-75 transition-opacity w-fit">
                                <span className="transition-transform duration-300 transform group-hover/link:translate-x-1">&rarr;</span>
                                <span>aovastudio@gmail.com</span>
                            </a>
                            <Link href="/v2/book-a-call" className="group/link flex items-center gap-1.5 hover:opacity-75 transition-opacity w-fit">
                                <span className="transition-transform duration-300 transform group-hover/link:translate-x-1">&rarr;</span>
                                <span>{t("Book a Strategizing Call", "Sjednat Konzultační Hovor")}</span>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Socials */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]/70 mb-4 font-mono">
                            {t("Social Media", "Sociální Sítě")}
                        </h4>
                        <div className="flex flex-col gap-3 font-medium">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-1.5 hover:opacity-75 transition-opacity w-fit">
                                <span className="transition-transform duration-300 transform group-hover/link:translate-x-1">&rarr;</span>
                                <span>Instagram</span>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-1.5 hover:opacity-75 transition-opacity w-fit">
                                <span className="transition-transform duration-300 transform group-hover/link:translate-x-1">&rarr;</span>
                                <span>Twitter / X</span>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-1.5 hover:opacity-75 transition-opacity w-fit">
                                <span className="transition-transform duration-300 transform group-hover/link:translate-x-1">&rarr;</span>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 3: Studio Coordinates */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]/70 mb-4 font-mono">
                            {t("Studio Coordinates", "Souřadnice Studia")}
                        </h4>
                        <p className="font-medium text-[#0A0A0A]/80 leading-relaxed">
                            {t("Aova Studio Europe", "Aova Studio Evropa")}<br />
                            {t("Prague, Czech Republic", "Praha, Česká Republika")}<br />
                            Est. 2024 / &copy; {new Date().getFullYear()} {t("All Rights Reserved.", "Všechna práva vyhrazena.")}
                        </p>
                    </div>

                </div>

            </div>

            {/* Bottom Saturated Explosion: Absolute Massive Width-Bleed Wordmark */}
            <div className="w-full mt-24 md:mt-32 overflow-hidden border-t border-[#0A0A0A]/10/20 pt-4 pointer-events-none select-none">
                <h1 
                    ref={wordmarkRef}
                    className="text-[18vw] md:text-[20vw] lg:text-[22vw] text-[#0A0A0A] font-bold tracking-tight text-center leading-[0.75] font-display uppercase will-change-transform"
                    style={{ letterSpacing: "-0.07em" }}
                >
                    AOVA
                </h1>
            </div>

        </footer>
    );
}

