"use client";

import InlineVideo from "./InlineVideo";
import { useLanguage } from "./LanguageContext";

export default function ProjectSlider() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full h-dvh overflow-hidden bg-[#0A0A0A]">
            {/* Ambient showreel — clicking plays it right here with sound */}
            <InlineVideo
                fill
                dimmed
                src="/no-outro.mp4"
                poster="/showreel-poster.jpg"
                cursorLabel={t("Watch Showreel", "Přehrát showreel")}
                ariaLabel={t("Watch showreel with sound", "Přehrát showreel se zvukem")}
                hint={t("Tap to watch showreel", "Klepnutím přehrajete showreel")}
            />
        </section>
    );
}
