"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
    const { lang, setLang, t } = useLanguage();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll listener to condense header
    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { href: "/work", label: t("Work", "Projekty") },
        { href: "/about", label: t("About", "O nás") },
        { href: "/services", label: t("Services", "Služby") },
        { href: "/contact", label: t("Contact", "Kontakt") }
    ];
    const showCapsule = isScrolled && !isMobileMenuOpen;
    const isHeroTransparent = pathname === "/" && !isScrolled && !isMobileMenuOpen;
    const hamburgerColor = (isHeroTransparent && !isMobileMenuOpen) ? "bg-white" : "bg-[#0A0A0A]";
    const containerClasses = showCapsule
        ? "mt-4 w-[calc(100%-32px)] md:w-[calc(100%-64px)] max-w-[1100px] rounded-full border border-[#0A0A0A]/10 bg-[#F9F9F8]/65 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] px-6 md:px-8"
        : `mt-0 w-full max-w-full rounded-none border border-transparent ${
            isMobileMenuOpen
                ? "bg-white border-transparent"
                : (isHeroTransparent ? "bg-black/10 backdrop-blur-md border-transparent" : "bg-white/60 backdrop-blur-md border-transparent")
          } px-6 md:px-8`;

    const innerHeightClass = showCapsule ? "h-[34px] md:h-[40px]" : "h-[40px] md:h-[48px]";
    const innerWidthClass = "max-w-[1440px]";

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center transition-all duration-300">
                <div className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-auto ${containerClasses}`}>
                    <div className={`${innerWidthClass} w-full mx-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${innerHeightClass}`}>
                        
                        {/* Left Side: Logo */}
                        <Link href="/" className="relative h-[16px] w-[83px] md:h-[20px] md:w-[103px] transition-transform duration-300 hover:scale-[1.02] flex items-center">
                            <AovaLogo 
                                showEye={showCapsule}
                                className={`w-full h-full object-contain object-left transition-all duration-300 ${isHeroTransparent ? "filter invert" : "filter invert-0"}`}
                            />
                        </Link>

                        {/* Right Side: Navigation Links & Language Switcher */}
                        <div className="flex items-center gap-12 md:gap-16">
                            
                            {/* Navigation Menu */}
                            <nav className="hidden md:flex items-center gap-16 tracking-wider text-[12px] md:text-[13px] font-host uppercase font-medium">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link key={link.href} href={link.href} className="py-2">
                                            <span className={`transition-colors duration-150 ${
                                                isHeroTransparent
                                                    ? (isActive ? "text-white font-bold" : "text-white/70 hover:text-white")
                                                    : (isActive ? "text-[#0A0A0A] font-bold" : "text-[#555555] hover:text-[#0A0A0A]")
                                            }`}>
                                                {link.label}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Language Switcher */}
                            <div className="flex items-center gap-1.5 font-host text-[12px] md:text-[13px] tracking-wider uppercase font-medium select-none">
                                <button
                                    onClick={() => setLang("EN")}
                                    className={`transition-colors duration-150 py-1 ${
                                        lang === "EN"
                                            ? (isHeroTransparent ? "text-white font-bold" : "text-[#0A0A0A] font-bold")
                                            : (isHeroTransparent ? "text-white/40 hover:text-white" : "text-[#555555]/40 hover:text-[#0A0A0A]")
                                    }`}
                                >
                                    EN
                                </button>
                                <span className={isHeroTransparent ? "text-white/20" : "text-[#0A0A0A]/10"}>/</span>
                                <button
                                    onClick={() => setLang("CZ")}
                                    className={`transition-colors duration-150 py-1 ${
                                        lang === "CZ"
                                            ? (isHeroTransparent ? "text-white font-bold" : "text-[#0A0A0A] font-bold")
                                            : (isHeroTransparent ? "text-white/40 hover:text-white" : "text-[#555555]/40 hover:text-[#0A0A0A]")
                                    }`}
                                >
                                    CZ
                                </button>
                            </div>

                            {/* Mobile Hamburger Overlay Trigger */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 w-10 h-10 z-50 relative"
                                aria-label="Toggle Menu"
                            >
                                <span className={`w-6 h-[2px] ${hamburgerColor} transition-transform duration-300 origin-center ${
                                    isMobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                                }`} />
                                <span className={`w-6 h-[2px] ${hamburgerColor} transition-transform duration-300 origin-center ${
                                    isMobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                                }`} />
                            </button>

                        </div>

                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-white z-40 md:hidden flex flex-col justify-between px-6 pt-32 pb-16 font-body"
                    >
                        <nav className="flex flex-col gap-6 text-left">
                            {navLinks.map((link, idx) => {
                                const isActive = pathname === link.href;
                                return (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                                    >
                                        <Link 
                                            href={link.href} 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="inline-block py-2 text-4xl font-medium tracking-tight font-display text-[#0A0A0A]"
                                        >
                                            <span className={`transition-colors duration-300 ${isActive ? "text-[#E0218A]" : "active:text-[#E0218A]"}`}>
                                                {link.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Extra bottom metadata inside mobile menu to keep it editorial */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs text-[#8A8A8A] font-mono flex flex-col gap-1 tracking-wider border-t border-[#0A0A0A]/10 pt-6"
                        >
                            <span>AOVA STUDIO Europe</span>
                            <span>Brno, CZ / Est. 2024</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

interface AovaLogoProps {
    showEye: boolean;
    className?: string;
}

function AovaLogo({ showEye, className }: AovaLogoProps) {
    return (
        <svg 
            id="Layer_2" 
            data-name="Layer 2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 649.95 125.95" 
            className={className}
        >
            <g id="Layer_1-2" data-name="Layer 1" fill="currentColor">
                {/* First letter 'A' */}
                <polygon points="115.28 2.59 172.29 123.36 127.67 123.36 88.01 37.09 83.05 37.09 43.39 123.36 0 123.36 57.02 2.59 115.28 2.59" />
                
                {/* Second letter 'O' with eyeball and eyebrow holes (stencil-based layout) */}
                {showEye ? (
                    <g 
                        className="animate-logo-eye-blink" 
                        style={{ transformOrigin: "254.1px 62.97px" }}
                    >
                        <defs>
                            <clipPath id="eye-hole-clip">
                                <path d="M254.1,89.72c-25.78,0-42.14-8.63-42.14-26.75s16.36-26.74,42.14-26.74,42.14,8.63,42.14,26.74-16.11,26.75-42.14,26.75Z" />
                            </clipPath>
                        </defs>
                        {/* O Outline with normal eyeball hole cut out */}
                        <path d="M254.1,0c-49.58,0-81.81,18.12-81.81,62.97s32.23,62.98,81.81,62.98,81.8-18.12,81.8-62.98S303.68,0,254.1,0ZM254.1,89.72c-25.78,0-42.14-8.63-42.14-26.75s16.36-26.74,42.14-26.74,42.14,8.63,42.14,26.74-16.11,26.75-42.14,26.75Z" />

                        <g clipPath="url(#eye-hole-clip)">
                            {/* Eyeball White Background */}
                            <path d="M254.1,89.72c-25.78,0-42.14-8.63-42.14-26.75s16.36-26.74,42.14-26.74,42.14,8.63,42.14,26.74-16.11,26.75-42.14,26.75Z" fill="#fff" />
                            
                            {/* Pupil (full circle, positioned at top middle like original logo) */}
                            <circle 
                                className="animate-logo-eye-look"
                                style={{ transformOrigin: "254.1px 62.97px" }}
                                cx="254.1" cy="41.05" r="27.76"
                                fill="currentColor" 
                            />

                            {/* Eyeball Highlight (white part) */}
                            <path 
                                className="animate-logo-eye-look"
                                style={{ transformOrigin: "254.1px 62.97px" }}
                                d="M254.1,36.23c.17,0,.33,0,.49.01v.27c0,6.05-4.9,10.96-10.96,10.96-5.26,0-9.67-3.73-10.7-8.69,6-1.71,13.13-2.55,21.17-2.55Z" 
                                fill="#fff" 
                            />
                        </g>
                    </g>
                ) : (
                    /* Standard Hollow O for first navbar */
                    <path d="M254.1,0c-49.58,0-81.81,18.12-81.81,62.97s32.23,62.98,81.81,62.98,81.8-18.12,81.8-62.98S303.68,0,254.1,0ZM254.1,89.72c-25.78,0-42.14-8.63-42.14-26.75s16.36-26.74,42.14-26.74,42.14,8.63,42.14,26.74-16.11,26.75-42.14,26.75Z" />
                )}

                {/* Third letter 'V' */}
                <polygon points="508.19 2.59 451.18 123.36 392.92 123.36 335.9 2.59 379.29 2.59 418.95 88.86 423.91 88.86 463.57 2.59 508.19 2.59" />
                
                {/* Fourth letter 'A' */}
                <polygon points="649.95 123.36 605.33 123.36 565.67 37.09 560.71 37.09 521.05 123.36 477.66 123.36 534.68 2.59 592.94 2.59 649.95 123.36" />
            </g>
        </svg>
    );
}

