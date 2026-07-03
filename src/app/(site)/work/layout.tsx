import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work",
    description:
        "Selected projects by Aova Studio — branding, web design, UI/UX, and editorial work for brands and creators.",
    alternates: { canonical: "https://aova.studio/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
    return children;
}
