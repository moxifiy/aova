"use client";

import WhatThisChanges from "./WhatThisChanges";
import ClientLogos from "./ClientLogos";

export default function ServicesTeaser() {
    return (
        <section className="bg-white text-[#0A0A0A] py-16 md:py-32 px-6 md:px-12 relative overflow-hidden border-t border-[#0A0A0A]/5">
            <div className="max-w-[1440px] mx-auto">

                {/* What This Changes — animated geometric marks */}
                <WhatThisChanges />

                {/* Client logos flowing right beneath the icons */}
                <ClientLogos />

            </div>
        </section>
    );
}
