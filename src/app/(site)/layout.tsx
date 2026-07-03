"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LanguageProvider } from "./_components/LanguageContext";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import V2Cursor from "./_components/V2Cursor";
import FallingWords from "./_components/FallingWords";
import SmoothScroll from "./_components/SmoothScroll";

export default function V2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Deter casual saving of the studio's media (right-click on images/videos only —
    // normal right-click on text keeps working)
    const guardMedia = (e: React.MouseEvent) => {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "IMG" || tag === "VIDEO") e.preventDefault();
    };

    return (
        <LanguageProvider>
            <SmoothScroll />
            <div
                onContextMenu={guardMedia}
                className="v2-root min-h-screen bg-white text-[#0A0A0A] font-body flex flex-col relative selection:bg-[#E0218A] selection:text-white"
            >
                
                {/* Standardized contextual cursor for v2 routes */}
                <V2Cursor />

                {/* Shared physics layer — dropped words/glyphs fall, collide and stack */}
                <FallingWords />

                {/* Floating Navigation Header */}
                <Navbar />

                {/* Main Content Area — every page eases in softly on navigation */}
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-grow w-full relative"
                >
                    {children}
                </motion.div>

                {/* Shared Saturated Fuchsia Footer */}
                <Footer />

            </div>
        </LanguageProvider>
    );
}

