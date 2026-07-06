"use client";

import { motion } from "framer-motion";
import TiltLink from "./TiltLink";
import { useLanguage } from "./LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function CTA() {
    const { t } = useLanguage();
    return (
        <section className="bg-white text-[#0A0A0A] py-24 md:py-40 px-6 md:px-12 relative overflow-hidden border-t border-[#0A0A0A]/5">
            <div className="max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center">

                {/* Oversized Statement */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight font-display mb-12 max-w-[1200px] leading-[1.0]"
                    style={{ letterSpacing: "-0.045em" }}
                >
                    {t("Have a vision?", "Máte vizi?")}<br />{t("Let’s architect it together.", "Pojďme jí společně dát tvar.")}
                </motion.h2>

                {/* Primary pill button — tilts in 3D like the footer circle */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                >
                    <TiltLink
                        href="/contact"
                        className="font-host font-normal text-sm md:text-[15px] px-8 py-3.5 bg-[#2C2C2C] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                    >
                        <span className="text-white">{t("CONTACT US", "KONTAKTUJTE NÁS")}</span>
                    </TiltLink>
                </motion.div>

            </div>
        </section>
    );
}
