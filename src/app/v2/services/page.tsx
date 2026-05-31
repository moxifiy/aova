"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";

interface PriceTier {
    name: string;
    description: string;
    price: string;
    period: string;
    features: string[];
    isPopular: boolean;
    isDark: boolean;
}

export default function ServicesPage() {
    const { t } = useLanguage();

    const TIERS: PriceTier[] = [
        {
            name: t("Standard Retention", "Standardní Retainer"),
            description: t("Bespoke design retainer for active creators and growing brands.", "Bespoke design pro aktivní tvůrce a rostoucí značky."),
            price: "$3,200",
            period: t("/month", "/měsíc"),
            features: [
                t("2 active design requests concurrently", "2 aktivní požadavky na design najednou"),
                t("Custom vector identity & guidelines", "Identita a logomanuál na míru"),
                t("Next.js front-end consulting", "Front-end konzultace v Next.js"),
                t("Video editing & thumb strategy", "Strategie pro video a náhledy"),
                t("Slack direct communications", "Přímá komunikace přes Slack"),
                t("72-hour average deliveries", "Průměrné doručení do 72 hodin")
            ],
            isPopular: false,
            isDark: false
        },
        {
            name: t("Studio Flagship", "Studio Vlajková Loď"),
            description: t("Our primary model. Complete digital flagship architecture and branding.", "Náš hlavní model. Kompletní architektura digitální vlajkové lodi a branding."),
            price: "$5,800",
            period: t("/month", "/měsíc"),
            features: [
                t("4 active design requests concurrently", "4 aktivní požadavky na design najednou"),
                t("Complete Next.js redesign sandboxes", "Bespoke Next.js redesigny a sandboxy"),
                t("Bespoke animation & GSAP events", "Animace na míru a GSAP eventy"),
                t("Creator media attention engineering", "Video editace a thumbnail systémy"),
                t("Priority core deliveries (48 hours)", "Prioritní dodání do 48 hodin"),
                t("Direct WhatsApp + Slack setup", "Přímé spojení WhatsApp + Slack")
            ],
            isPopular: true,
            isDark: false
        },
        {
            name: t("Enterprise Strategic", "Enterprise Strategický"),
            description: t("For institutional consultancies requiring dedicated designer access.", "Pro velké společnosti vyžadující dedikovaný přístup designéra."),
            price: "$9,500",
            period: t("/month", "/měsíc"),
            features: [
                t("Unlimited active request backlog", "Neomezená fronta požadavků"),
                t("Dedicated design architect allocation", "Přidělený dedikovaný designér"),
                t("Complete web migration pipelines", "Kompletní migrační pipeline webu"),
                t("Bespoke visual content campaigns", "Kreativní kampaně na klíč"),
                t("Next.js 16 setup & server hosting", "Optimalizace serveru a Next.js 16"),
                t("24/7 Priority telephone access", "Telefonická podpora 24/7")
            ],
            isPopular: false,
            isDark: true
        }
    ];

    return (
        <main className="bg-white text-[#0A0A0A] pt-32 md:pt-40 pb-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1440px] mx-auto">
                
                {/* Header & Eyebrow */}


                <h1 className="text-5xl md:text-7xl font-normal font-display tracking-tight mb-12 max-w-[800px] leading-[0.95]" style={{ letterSpacing: "-0.045em" }}>
                    {t("Bespoke Retainers", "Pravidelné Služby")}
                </h1>

                {/* Offerings breakdown text */}
                <div className="max-w-[700px] text-[#8A8A8A] font-body font-normal leading-relaxed mb-20">
                    <p>
                        {t(
                            "We operate under a simple monthly subscription model. No complex hourly quotes, no administrative bottlenecks. You subscribe to a tier, queue your requests, and watch your assets build out with absolute typographic rigor and speed.",
                            "Fungujeme na principu jednoduchého měsíčního předplatného. Žádné složité hodinové sazby, žádná zbytečná administrativa. Zvolíte si úroveň služeb, zadáte úkoly a sledujete, jak vaše vizuály vznikají s absolutní typografickou přísností a rychlostí."
                        )}
                    </p>
                </div>

                {/* Three Pricing Tiers Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch font-body">
                    {TIERS.map((tier) => {
                        return (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`p-8 md:p-10 border-2 flex flex-col justify-between relative ${
                                    tier.isPopular
                                        ? "border-[#E0218A] bg-white"
                                        : tier.isDark
                                            ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                                            : "border-[#0A0A0A] bg-white"
                                }`}
                            >
                                {/* Saturated popular badge */}
                                {tier.isPopular && (
                                    <span className="absolute -top-4 left-6 bg-[#E0218A] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full font-mono">
                                        {t("RECOMMENDED", "DOPORUČUJEME")}
                                    </span>
                                )}

                                <div>
                                    {/* Tier Header */}
                                    <h3 className={`text-2xl font-medium font-display tracking-tight mb-2 ${tier.isDark ? "text-white" : "text-[#0A0A0A]"}`}>
                                        {tier.name}
                                    </h3>
                                    <p className={`text-xs mb-8 ${tier.isDark ? "text-white/70" : "text-[#8A8A8A]"} leading-relaxed font-light`}>
                                        {tier.description}
                                    </p>

                                    {/* Tier Pricing */}
                                    <div className="flex items-baseline mb-8">
                                        <span className={`text-4xl md:text-5xl font-normal font-display tracking-tight ${tier.isDark ? "text-white" : "text-[#0A0A0A]"}`}>
                                            {tier.price}
                                        </span>
                                        <span className={`text-xs ml-2 ${tier.isDark ? "text-white/70" : "text-[#8A8A8A]"}`}>
                                            {tier.period}
                                        </span>
                                    </div>

                                    {/* Features List */}
                                    <ul className="flex flex-col gap-4 border-t border-[#0A0A0A]/10 pt-8 mb-10">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-xs md:text-sm font-light">
                                                <span className={tier.isPopular ? "text-[#E0218A] font-bold" : "text-[#8A8A8A]"}>
                                                    &rarr;
                                                </span>
                                                <span className={tier.isDark ? "text-white/80" : "text-[#0A0A0A]/80"}>
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Custom Call-to-Action Link */}
                                <a
                                    href="/v2/contact"
                                    className={`text-center text-xs font-bold uppercase tracking-wider py-4 w-full transition-colors duration-300 border-2 font-mono ${
                                        tier.isPopular
                                            ? "bg-[#E0218A] text-white border-[#E0218A] hover:bg-transparent hover:text-[#E0218A]"
                                            : tier.isDark
                                                ? "bg-white text-[#0A0A0A] border-white hover:bg-transparent hover:text-white"
                                                : "bg-[#0A0A0A] text-white border-[#0A0A0A] hover:bg-transparent hover:text-[#0A0A0A]"
                                    }`}
                                >
                                    {t("Initiate Onboarding", "Zahájit Spolupráci")} &rarr;
                                </a>

                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}
