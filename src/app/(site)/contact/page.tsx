"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";

export default function ContactPage() {
    const { t } = useLanguage();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple client-side validation
        if (!name || !email || !message) {
            setStatus("ERROR");
            return;
        }

        // Simulate success submit handler (no auto-submit HTML page refreshes!)
        setStatus("SUCCESS");
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <main className="bg-[#E0218A] text-[#0A0A0A] pt-32 md:pt-40 pb-24 px-6 md:px-12 min-h-screen relative flex flex-col justify-center">
            <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                
                {/* Left Column: Direct Call-to-action & Address Coordinates */}
                <div className="flex flex-col justify-between font-body">
                    <div>

                        <h1 className="text-5xl md:text-7xl font-normal font-display tracking-tight leading-[0.95] mb-8" style={{ letterSpacing: "-0.045em" }}>
                            {t("Let’s talk.", "Pojďme si promluvit.")}
                        </h1>
                        <p className="text-base md:text-lg font-normal leading-relaxed text-[#0A0A0A] max-w-[500px] mb-12">
                            {t(
                                "Queue a strategic launch, request custom Next.js redesign consultations, or simply ask us a question. We usually onboard premium retainers within 48 hours.",
                                "Naplánujte si konzultaci, zažádejte o redesign v Next.js na míru nebo nám jednoduše položte dotaz. Spolupráci obvykle zahajujeme do 48 hodin."
                            )}
                        </p>
                    </div>

                    {/* Coordinates */}
                    <div className="flex flex-col gap-6 text-sm border-t border-[#0A0A0A]/10 pt-8">
                        <div>
                            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]/70 mb-2 font-mono">
                                {t("Standard Channel", "Hlavní Kanál")}
                            </h3>
                            <a href="mailto:hello@aova.studio" className="font-semibold text-lg hover:opacity-75 transition-opacity cursor-none underline">
                                hello@aova.studio
                            </a>
                        </div>
                        <div>
                            <h3 className="font-bold text-xs uppercase tracking-wider text-[#0A0A0A]/70 mb-2 font-mono">
                                {t("Office Location", "Kancelář Studia")}
                            </h3>
                            <p className="font-medium text-[#0A0A0A]/80 leading-relaxed">
                                Aova Studio &bull; {t("Brno, Czech Republic", "Brno, Česká republika")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Premium Saturated Contact Form */}
                <div className="bg-white p-8 md:p-12 border border-[#0A0A0A]/10 flex flex-col justify-center font-body text-[#0A0A0A]">

                    <h2 className="text-2xl font-medium mb-6 font-display tracking-tight">
                        {t("Send a Message", "Napište Zprávu")}
                    </h2>

                    {status === "SUCCESS" && (
                        <div className="p-4 bg-[#00CC66]/10 text-[#00CC66] border-2 border-[#00CC66] mb-6 text-sm font-semibold">
                            {t("Thank you! Your strategic request was submitted successfully.", "Děkujeme! Vaše zpráva byla úspěšně odeslána.")}
                        </div>
                    )}

                    {status === "ERROR" && (
                        <div className="p-4 bg-red-500/10 text-red-600 border-2 border-red-500 mb-6 text-sm font-semibold">
                            {t("Please complete all inputs before submitting.", "Vyplňte prosím všechna pole před odesláním.")}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        
                        {/* Name Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#0A0A0A] font-mono" htmlFor="name">
                                {t("Your Name", "Vaše Jméno")}
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white border border-[#0A0A0A]/10 focus:border-[#E0218A] px-4 py-3 text-sm font-medium outline-none transition-colors duration-300"
                                placeholder={t("e.g. Leif Johnson", "např. Jan Novák")}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#0A0A0A] font-mono" htmlFor="email">
                                {t("Email Address", "Emailová Adresa")}
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-[#0A0A0A]/10 focus:border-[#E0218A] px-4 py-3 text-sm font-medium outline-none transition-colors duration-300"
                                placeholder="name@domain.com"
                            />
                        </div>

                        {/* Message Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#0A0A0A] font-mono" htmlFor="message">
                                {t("Project Scope", "Rozsah Projektu")}
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full bg-white border border-[#0A0A0A]/10 focus:border-[#E0218A] px-4 py-3 text-sm font-medium outline-none transition-colors duration-300 resize-none"
                                placeholder={t("Tell us about your brand mission...", "Řekněte nám o cílech vašeho brandu...")}
                            />
                        </div>

                        {/* Custom Submit Button */}
                        <button
                            type="submit"
                            className="transition-colors duration-300 w-full py-4 text-xs uppercase tracking-wider font-bold font-mono bg-[#0A0A0A] text-white border border-[#0A0A0A]/10 hover:bg-[#E0218A] hover:border-[#E0218A] mt-2"
                        >
                            {t("Send Request", "Odeslat Poptávku")} &rarr;
                        </button>

                    </form>

                </div>

            </div>
        </main>
    );
}
