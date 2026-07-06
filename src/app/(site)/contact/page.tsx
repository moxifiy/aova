"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../_components/LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const inputCls =
    "w-full bg-transparent border-0 border-b border-white/15 focus:border-white py-3.5 text-base text-white outline-none transition-colors duration-300 placeholder:text-white/25 font-body";
const labelCls = "block text-[11px] font-medium tracking-[0.04em] text-white/40 font-mono mb-1";

export default function ContactPage() {
    const { t } = useLanguage();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [source, setSource] = useState("");
    const [message, setMessage] = useState("");
    const [company, setCompany] = useState(""); // honeypot — humans never fill this
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR" | "FAILED">("IDLE");
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "SENDING") return;
        if (!name || !email || !message) {
            setStatus("ERROR");
            return;
        }
        setStatus("SENDING");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, source, message, company }),
            });
            const data = (await res.json().catch(() => ({ ok: false }))) as { ok?: boolean };
            if (res.ok && data.ok) {
                setStatus("SUCCESS");
                setName("");
                setEmail("");
                setSource("");
                setMessage("");
            } else {
                setStatus("FAILED");
            }
        } catch {
            setStatus("FAILED");
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText("hello@aova.studio");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="bg-[#0A0A0A] text-white pt-32 md:pt-44 pb-24 md:pb-36 px-6 md:px-12 min-h-screen">
            <div className="max-w-[1440px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 lg:gap-28 items-start">

                    {/* ── Left: the ask + form ── */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            className="text-5xl md:text-7xl font-medium font-display tracking-tight leading-[0.98]"
                            style={{ marginLeft: "-0.04em" }}
                        >
                            {t("Want to estimate a project?", "Chcete nacenit projekt?")}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                            className="mt-6 text-lg text-white/50 font-body leading-relaxed max-w-[480px]"
                        >
                            {t(
                                "Tell us about your project and your goals, and let's start. We usually reply within 48 hours.",
                                "Řekněte nám o svém projektu a cílech a pojďme začít. Obvykle odpovídáme do 48 hodin."
                            )}
                        </motion.p>

                        <motion.form
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="mt-12 md:mt-16 flex flex-col gap-8 max-w-[600px] bg-white/[0.04] border border-white/10 p-7 md:p-10"
                        >
                            {status === "SUCCESS" && (
                                <div className="border border-white/20 bg-white/[0.04] px-5 py-4 text-sm font-medium font-body text-white">
                                    {t(
                                        "Thank you — your message is on its way. We'll get back to you shortly.",
                                        "Děkujeme — vaše zpráva je na cestě. Brzy se vám ozveme."
                                    )}
                                </div>
                            )}
                            {status === "ERROR" && (
                                <div className="border border-[#E0218A]/60 bg-[#E0218A]/10 px-5 py-4 text-sm font-medium font-body text-white">
                                    {t(
                                        "Please fill in your name, email, and message.",
                                        "Vyplňte prosím jméno, e-mail a zprávu."
                                    )}
                                </div>
                            )}
                            {status === "FAILED" && (
                                <div className="border border-[#E0218A]/60 bg-[#E0218A]/10 px-5 py-4 text-sm font-medium font-body text-white">
                                    {t(
                                        "Something went wrong sending your message — email us directly at hello@aova.studio.",
                                        "Při odesílání se něco pokazilo — napište nám přímo na hello@aova.studio."
                                    )}
                                </div>
                            )}

                            {/* Honeypot — hidden from humans, visible to bots */}
                            <input
                                type="text"
                                name="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                            />

                            <div>
                                <label className={labelCls} htmlFor="name">
                                    {t("Your name", "Vaše jméno")}
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={inputCls}
                                    placeholder={t("Your name", "Vaše jméno")}
                                />
                            </div>

                            <div>
                                <label className={labelCls} htmlFor="email">
                                    {t("Email", "E-mail")}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={inputCls}
                                    placeholder={t("Your email", "Váš e-mail")}
                                />
                            </div>

                            <div>
                                <label className={labelCls} htmlFor="source">
                                    {t("Where do you know us from?", "Odkud nás znáte?")}
                                </label>
                                <select
                                    id="source"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    className={`${inputCls} appearance-none cursor-pointer ${source === "" ? "text-white/25" : ""}`}
                                >
                                    <option value="" className="bg-[#0A0A0A] text-white/50">
                                        {t("Where do you know us from?", "Odkud nás znáte?")}
                                    </option>
                                    <option value="instagram" className="bg-[#0A0A0A] text-white">Instagram</option>
                                    <option value="google" className="bg-[#0A0A0A] text-white">Google</option>
                                    <option value="referral" className="bg-[#0A0A0A] text-white">
                                        {t("Referral", "Doporučení")}
                                    </option>
                                    <option value="clutch" className="bg-[#0A0A0A] text-white">Clutch</option>
                                    <option value="other" className="bg-[#0A0A0A] text-white">
                                        {t("Other", "Jinde")}
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className={labelCls} htmlFor="message">
                                    {t("Message", "Zpráva")}
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={4}
                                    className={`${inputCls} resize-none`}
                                    placeholder={t("Tell us about your project…", "Řekněte nám o svém projektu…")}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={status === "SENDING"}
                                    className="font-host font-normal text-sm md:text-[15px] text-[#0A0A0A] px-8 py-3.5 bg-white rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:bg-[#F0F0F0] disabled:opacity-60 disabled:cursor-wait"
                                >
                                    {status === "SENDING"
                                        ? t("SENDING…", "ODESÍLÁM…")
                                        : t("SEND MESSAGE", "ODESLAT ZPRÁVU")}
                                </button>
                            </div>
                        </motion.form>
                    </div>

                    {/* ── Right: direct contact details ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                        className="flex flex-col gap-12 md:gap-16 lg:pt-4"
                    >
                        {/* Email */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-medium font-display tracking-tight mb-4">
                                {t("Email", "E-mail")}
                            </h2>
                            <div className="flex items-center gap-3">
                                <a
                                    href="mailto:hello@aova.studio"
                                    className="text-lg md:text-xl font-medium font-body text-[#E0218A] hover:text-white transition-colors duration-300"
                                >
                                    hello@aova.studio
                                </a>
                                <button
                                    onClick={copyEmail}
                                    aria-label={t("Copy email", "Kopírovat e-mail")}
                                    className="text-white/40 hover:text-white transition-colors duration-300"
                                >
                                    {copied ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#E0218A]">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                            <rect x="9" y="9" width="11" height="11" rx="1.5" />
                                            <path d="M5 15V5a1 1 0 0 1 1-1h10" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Phones */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-medium font-display tracking-tight mb-4">
                                {t("Phones", "Telefony")}
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-16">
                                <div>
                                    <span className="block text-[11px] font-medium tracking-[0.04em] text-white/40 font-mono mb-2">
                                        {t("Czech Republic", "Česká republika")}
                                    </span>
                                    <div className="flex flex-col gap-1.5">
                                        <a href="tel:+420739662744" className="text-base md:text-lg font-medium font-body text-white/85 hover:text-white transition-colors duration-300">
                                            +420 739 662 744
                                        </a>
                                        <a href="tel:+420777794340" className="text-base md:text-lg font-medium font-body text-white/85 hover:text-white transition-colors duration-300">
                                            +420 777 794 340
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-medium font-display tracking-tight mb-4">
                                {t("Address", "Adresa")}
                            </h2>
                            <p className="text-base md:text-lg font-medium font-body text-white/85 leading-relaxed">
                                Aova Studio<br />
                                {t("Brno, Czech Republic", "Brno, Česká republika")}<br />
                                <span className="text-white/40">Est. 2025</span>
                            </p>
                        </div>

                        {/* Socials */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-medium font-display tracking-tight mb-4">
                                {t("Socials", "Sítě")}
                            </h2>
                            <div className="flex flex-col gap-1.5">
                                <a
                                    href="https://www.instagram.com/aova.studio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base md:text-lg font-medium font-body text-white/85 hover:text-white transition-colors duration-300 w-fit"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://x.com/AovaStudio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base md:text-lg font-medium font-body text-white/85 hover:text-white transition-colors duration-300 w-fit"
                                >
                                    X
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/aova-studio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-base md:text-lg font-medium font-body text-white/85 hover:text-white transition-colors duration-300 w-fit"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}
