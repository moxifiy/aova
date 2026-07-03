import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description:
        "The engine behind brands that outgrow their competition. A small team of selected creatives handling strategy, identity, motion, and presence — built by founders, not committees.",
    alternates: { canonical: "https://aova.studio/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
