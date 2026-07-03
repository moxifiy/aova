import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Let's talk. Reach Aova Studio at hello@aova.studio — brand strategy, identity, web, and motion for brands that want to be impossible to ignore.",
    alternates: { canonical: "https://aova.studio/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
