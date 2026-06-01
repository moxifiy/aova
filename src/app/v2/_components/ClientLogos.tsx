"use client";

const LOGOS = ["ORCA", "VELA", "VAPOR", "NOIRE", "KUDY", "AMINA", "LUMEN", "ATLAS", "SENNOR", "FLORAE"];

function dropLogo(e: React.MouseEvent<HTMLSpanElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (r.width === 0) return;
    const fontSize = window.getComputedStyle(el).fontSize;
    window.dispatchEvent(
        new CustomEvent("v2-drop", {
            detail: {
                items: [
                    {
                        text: el.textContent || "",
                        left: r.left,
                        top: r.top,
                        width: r.width,
                        height: r.height,
                        fontSize,
                        color: "#E0218A",
                    },
                ],
            },
        })
    );
}

function Row({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
    const Group = (
        <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
            {items.map((logo, i) => (
                <span
                    key={i}
                    onClick={dropLogo}
                    className="v2-clickable text-3xl md:text-5xl font-medium font-display tracking-tight text-[#0A0A0A]/25 hover:text-[#E0218A] transition-colors duration-300 whitespace-nowrap"
                >
                    {logo}
                </span>
            ))}
        </div>
    );

    return (
        <div className="flex overflow-hidden">
            <div
                className="v2-marquee-track flex w-max hover:[animation-play-state:paused]"
                style={{ animation: `${reverse ? "v2-marquee-rev" : "v2-marquee"} ${duration}s linear infinite` }}
            >
                {Group}
                {Group}
            </div>
        </div>
    );
}

export default function ClientLogos() {
    return (
        <div
            className="mt-20 md:mt-28 flex flex-col gap-8 md:gap-14 overflow-hidden"
            style={{
                WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
                maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }}
        >
            <Row items={LOGOS} duration={42} />
            <Row items={[...LOGOS].reverse()} reverse duration={52} />
        </div>
    );
}
