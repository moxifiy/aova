"use client";

import { LanguageProvider } from "./_components/LanguageContext";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import V2Cursor from "./_components/V2Cursor";

export default function V2Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LanguageProvider>
            <div className="v2-root min-h-screen bg-white text-[#0A0A0A] font-body flex flex-col relative selection:bg-[#E0218A] selection:text-white">
                
                {/* Standardized contextual cursor for v2 routes */}
                <V2Cursor />

                {/* Floating Navigation Header */}
                <Navbar />

                {/* Main Content Area */}
                <div className="flex-grow w-full relative">
                    {children}
                </div>

                {/* Shared Saturated Fuchsia Footer */}
                <Footer />

            </div>
        </LanguageProvider>
    );
}

