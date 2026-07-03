"use client";

import { useState } from "react";

// A spread of fuchsia shades, light → dark
const SHADES = ["#E0218A", "#F0509E", "#FF7DBB", "#C71B78", "#A8155F", "#FF9ECB", "#7E1049"];

// Each row: blocks with a base flex-grow (width) + shade index — strong size variation
const ROWS: { g: number; s: number }[][] = [
    [{ g: 4, s: 3 }, { g: 1.2, s: 0 }, { g: 2.5, s: 2 }, { g: 1, s: 4 }, { g: 3.2, s: 0 }, { g: 1.3, s: 1 }],
    [{ g: 1.4, s: 1 }, { g: 1, s: 2 }, { g: 3.6, s: 0 }, { g: 2.4, s: 5 }, { g: 1.1, s: 4 }, { g: 1.6, s: 2 }],
    [{ g: 2, s: 2 }, { g: 1, s: 6 }, { g: 1, s: 3 }, { g: 4, s: 1 }, { g: 1.2, s: 0 }, { g: 1.6, s: 2 }],
];

function Block({ g, color }: { g: number; color: string }) {
    const [h, setH] = useState(false);
    return (
        <div
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            className="h-full cursor-pointer"
            style={{
                flexGrow: h ? g * 2.6 : g,
                flexBasis: 0,
                backgroundColor: color,
                filter: h ? "brightness(1.14)" : "brightness(1)",
                transition: "flex-grow 600ms cubic-bezier(0.16,1,0.3,1), filter 400ms ease",
            }}
        />
    );
}

export default function BrandDNA({ active, items }: { active: number | null; items: { label: string; desc: string }[] }) {
    const open = active !== null;
    return (
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden select-none bg-[#7E1049]">
            <div className="relative h-[200px] md:h-[280px]">
                {/* Mosaic — slides right (a touch less than the box width so it tucks under, no white seam) */}
                <div
                    className={`absolute inset-0 flex flex-col transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        open ? "translate-x-[56%] md:translate-x-[40%]" : "translate-x-0"
                    }`}
                >
                    {ROWS.map((row, ri) => (
                        <div key={ri} className="flex flex-1 w-full">
                            {row.map((b, bi) => (
                                <Block key={bi} g={b.g} color={SHADES[b.s]} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Black box — slides in from the left, pushing the blocks aside */}
                <div
                    className={`absolute inset-y-0 left-0 w-[58%] md:w-[42%] bg-[#7E1049] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    {/* Text — written on the box once it's in place */}
                    <div className="absolute inset-0 flex items-center px-6 md:px-12">
                        {items.map((it, i) => (
                            <p
                                key={i}
                                className="absolute left-6 right-6 md:left-12 md:right-10 text-white font-body font-light text-base md:text-xl leading-snug"
                                style={{
                                    opacity: active === i ? 1 : 0,
                                    transform: active === i ? "translateY(0)" : "translateY(4px)",
                                    transition: "opacity 160ms ease, transform 160ms ease",
                                }}
                            >
                                {it.desc}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
