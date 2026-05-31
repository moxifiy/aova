"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "CZ";

interface LanguageContextProps {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (enCopy: string, czCopy: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("EN");

    const t = (enCopy: string, czCopy: string) => {
        return lang === "EN" ? enCopy : czCopy;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
