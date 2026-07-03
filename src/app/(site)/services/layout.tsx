import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Services",
    description:
        "Our core solutions — brand strategy, brand creation, web design, brand in motion, and social & content systems. Everything a brand needs to be impossible to ignore.",
    alternates: { canonical: "https://aova.studio/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
