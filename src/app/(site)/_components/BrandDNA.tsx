"use client";

import { useState } from "react";

// Fuchsia scale, ordered light → dark. The composition is a weave: every row
// contains all seven shades exactly once, stepping through the scale two at a
// time and shifting three per row — so horizontal neighbours always contrast,
// nothing sits above its own colour, and the whole wall reads as one pattern.
const SHADES = ["#FF9ECB", "#FF7DBB", "#F0509E", "#E0218A", "#C71B78", "#A8155F", "#7E1049"];
const RHYTHM = [2.6, 1, 1.6, 1, 2.2, 1.3, 1.8];

const rotate = <T,>(arr: T[], n: number): T[] => [...arr.slice(n % arr.length), ...arr.slice(0, n % arr.length)];

const ROWS: { g: number; s: number }[][] = [0, 1, 2].map((row) =>
    rotate(RHYTHM, row * 2).map((g, i) => ({ g, s: (i * 2 + row * 3) % SHADES.length }))
);

function Block({ g, color }: { g: number; color: string }) {
    const [h, setH] = useState(false);
    return (
        <div
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            className="h-full cursor-pointer"
            style={{
                flexGrow: h ? g * 1.9 : g,
                flexBasis: 0,
                backgroundColor: color,
                filter: h ? "brightness(1.12)" : "brightness(1)",
                transition: "flex-grow 450ms cubic-bezier(0.22,1,0.36,1), filter 300ms ease",
            }}
        />
    );
}

export default function BrandDNA({ active, items }: { active: number | null; items: { label: string; desc: string }[] }) {
    const open = active !== null;
    return (
        <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden select-none bg-[#7E1049]">
            <div className="relative h-[200px] md:h-[280px]">
                {/* Mosaic — stays full; the descriptor panel overlays only the top row */}
                <div className="absolute inset-0 flex flex-col">
                    {ROWS.map((row, ri) => (
                        <div key={ri} className="flex flex-1 w-full">
                            {row.map((b, bi) => (
                                <Block key={bi} g={b.g} color={SHADES[b.s]} />
                            ))}
                        </div>
                    ))}
                </div>

                {/* The top-right block grows leftward into a dark panel — snappy, like
                    one of the wall's own blocks expanding. Text is written centered. */}
                <div
                    className="absolute top-0 right-0 h-1/3 bg-[#7E1049]"
                    style={{
                        width: open ? "86%" : "14%",
                        transition: "width 380ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                />
                <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none">
                    {items.map((it, i) => (
                        <p
                            key={i}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] max-w-[620px] text-center text-white font-body font-light text-sm md:text-xl leading-snug"
                            style={{
                                opacity: active === i ? 1 : 0,
                                transition: active === i ? "opacity 180ms ease 110ms" : "opacity 90ms ease",
                            }}
                        >
                            {it.desc}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
