"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="bg-white text-[#0A0A0A] pt-32 md:pt-40 pb-24 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1440px] mx-auto">
                
                {/* Header & Eyebrow */}


                {/* Big Brutalist Statement Up Top */}
                <div className="max-w-[1100px] mb-24 md:mb-32">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                        className="text-4xl md:text-6xl lg:text-7xl font-medium font-display tracking-tight leading-[1.0]"
                    >
                        {t("We build", "Budujeme")} <span className="font-serif text-[#E0218A]">{t("digital architecture", "digitální architekturu")}</span> {t("with absolute restraint, allowing your identity to command the canvas.", "s absolutní střídmostí a necháváme vaši identitu ovládnout prostor.")}
                    </motion.h1>
                </div>

                {/* Studio Story Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 md:mb-36">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]/5 border border-[#0A0A0A]/10">
                        <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                            alt="AOVA Studio Space"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center max-w-[550px] font-body">
                        <h2 className="text-3xl md:text-4xl font-medium font-display tracking-tight mb-6">
                            {t("The Editorial Method", "Ediční Metoda")}
                        </h2>
                        <p className="text-[#8A8A8A] leading-relaxed mb-6 font-normal">
                            {t(
                                "AOVA was established to dismantle template-driven visual clutter. We believe that true premium positioning is built on absolute confidence—meaning massive breathing space, near-zero color, and impeccable typographic scale. When color does appear, it shocks the eye and captures absolute attention.",
                                "Studio AOVA bylo založeno s cílem odbourat šablonovitý vizuální smog. Věříme, že skutečně prémiové postavení je založeno na absolutní sebedůvěře – což znamená obrovský prostor pro nadechnutí, téměř nulovou barevnost a dokonalé typografické měřítko. Když už se barva objeví, šokuje oko a upoutá absolutní pozornost."
                            )}
                        </p>
                        <p className="text-[#8A8A8A] leading-relaxed font-normal">
                            {t(
                                "By merging rigorous brand guidelines with modern high-performance code frameworks, we provide both high-end design consultancies and global creators the visual tools they need to represent their value unequivocally.",
                                "Spojením přísných brand guidelines s moderními vysoce výkonnými kódovými frameworky poskytujeme špičkovým designovým poradenským společnostem i globálním tvůrcům vizuální nástroje, které potřebují k jednoznačnému vyjádření své hodnoty."
                            )}
                        </p>
                    </div>
                </div>

                {/* Core Principles (Pixelmate styled cards) */}
                <div className="pt-16 border-t border-[#0A0A0A]/10">


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 font-body text-balance">
                        <div className="p-8 border border-[#0A0A0A]/10">
                            <span className="text-sm font-bold text-[#E0218A] uppercase tracking-wider block mb-4 font-mono">
                                // 01
                            </span>
                            <h3 className="text-xl font-medium font-display tracking-tight mb-3">
                                {t("Editorial Rigor", "Ediční Přísnost")}
                            </h3>
                            <p className="text-sm text-[#8A8A8A] leading-relaxed font-normal">
                                {t(
                                    "No card soups. No unnecessary border radius details. We treat web layouts like high-end print magazines—every line, coordinate, and margin has an explicit design purpose.",
                                    "Žádná záplava zbytečných karet. Žádné nadbytečné zaoblení rohů. K webovým layoutům přistupujeme jako k luxusním tištěným časopisům – každá linka, souřadnice a okraj má svůj jasný designový účel."
                                )}
                            </p>
                        </div>
                        
                        <div className="p-8 border border-[#0A0A0A]/10">
                            <span className="text-sm font-bold text-[#E0218A] uppercase tracking-wider block mb-4 font-mono">
                                // 02
                            </span>
                            <h3 className="text-xl font-medium font-display tracking-tight mb-3">
                                {t("Technical Prestige", "Technická Prestiž")}
                            </h3>
                            <p className="text-sm text-[#8A8A8A] leading-relaxed font-normal">
                                {t(
                                    "We build purely in Next.js using hardware-accelerated rendering and modern routing sandboxes. Fast, clean compilation that keeps your digital flagship running smoothly.",
                                    "Stavíme výhradně v Next.js s využitím hardwarově akcelerovaného vykreslování a moderních směrovacích sandboxů. Rychlá a čistá kompilace, která udržuje vaši digitální vlajkovou loď v bezchybném chodu."
                                )}
                            </p>
                        </div>

                        <div className="p-8 border border-[#0A0A0A]/10">
                            <span className="text-sm font-bold text-[#E0218A] uppercase tracking-wider block mb-4 font-mono">
                                // 03
                            </span>
                            <h3 className="text-xl font-medium font-display tracking-tight mb-3">
                                {t("Shock & Awe Scarcity", "Efekt Vzácnosti")}
                            </h3>
                            <p className="text-sm text-[#8A8A8A] leading-relaxed font-normal">
                                {t(
                                    "Restraint is our loudest feature. By keeping fuchsia and bold saturated moments rare, we make sure that when your message speaks, it resonates with maximum force.",
                                    "Střídmost je naším nejvýraznějším prvkem. Tím, že držíme fuchsiovou a odvážně syté momenty v naprosté vzácnosti, zajišťujeme, že když vaše sdělení promluví, zarezonuje s maximální silou."
                                )}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
