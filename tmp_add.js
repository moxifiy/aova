const fs = require('fs');

const TO_INSERT = `
const SERVICES_DATA = {
    creator: {
        theme: "text-[#FF9933]",
        accent: "bg-[#FF9933]",
        hoverAccent: "hover:bg-[#FF9933]/10",
        tabLabel: "For Creators",
        hero: {
            title: "Content that grows. Channels that last.",
            desc: "AOVA handles the full creative pipeline for creators — from zero-retention editing to algorithmic growth strategy. You focus on the camera, we build the engine.",
            color: "bg-[#FF9933]/10 border-[#FF9933]/20",
            proof: (
                <div className="mt-8 flex -space-x-4 opacity-100">
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=4')] bg-cover relative z-30 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=5')] bg-cover relative z-20 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[url('https://i.pravatar.cc/100?img=6')] bg-cover relative z-10 shadow-md"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white bg-[#FF9933] text-white flex items-center justify-center text-xs font-bold shadow-md">+10M</div>
                </div>
            )
        },
        cards: [
            { icon: "📱", title: "Short Form Editing", desc: "Reels, TikToks, Shorts engineered for retention. Hook-first cuts, pacing, captions." },
            { icon: "🎞️", title: "Long Form Editing", desc: "YouTube and podcast edits that keep viewers watching end-to-end. Story arc, b-roll, chapters." },
            { icon: "🖼️", title: "Thumbnails", desc: "High-CTR thumbnail design and title testing. The first click starts here." },
            { icon: "📈", title: "Growth Guidance", desc: "Content strategy, posting cadence, analytics review, and positioning to compound your audience." },
        ]
    },
    brand: {
        theme: "text-[#3366FF]",
        accent: "bg-[#3366FF]",
        hoverAccent: "hover:bg-[#3366FF]/10",
        tabLabel: "For Brands",
        hero: {
            title: "Design that converts. Presence that compounds.",
            desc: "AOVA builds brand infrastructure — not just visuals. We engineer systems that capture attention, drive action, and scale effortlessly as your business grows.",
            color: "bg-[#3366FF]/10 border-[#3366FF]/20",
            proof: (
                <div className="mt-8 grid grid-cols-4 gap-2 opacity-80 max-w-xs">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-8 rounded overflow-hidden flex shadow-sm bg-[var(--surface)]">
                            <div className="w-1/3 bg-[#3366FF]/20" />
                            <div className="w-2/3 bg-transparent" />
                        </div>
                    ))}
                </div>
            )
        },
        cards: [
            { icon: "✨", title: "Brand Identity", desc: "Logo, guidelines, positioning, and visual language built for long-term equity." },
            { icon: "💻", title: "Websites & Landing Pages", desc: "Custom builds focused on one thing: getting the click or the call." },
            { icon: "🚀", title: "Ads & Motion", desc: "Performance-driven static and motion ads for paid social and display." },
            { icon: "🎨", title: "Graphics & UI/UX", desc: "Pitch decks, social assets, product interfaces, and print collateral." },
        ]
    }
};

type AudienceType = 'creator' | 'brand';

function InteractiveServices() {
    const [audience, setAudience] = useState<AudienceType>('creator');
    const data = SERVICES_DATA[audience];

    return (
        <section className="relative py-32 px-6" id="services-interactive">
            <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none -z-10" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-8">Who are we building for?</h2>

                    {/* Interactive Selector */}
                    <div className="inline-flex flex-col md:flex-row p-2 bg-[var(--border)] rounded-[32px] md:rounded-full gap-2 relative z-10 w-full md:w-auto">
                        {(['creator', 'brand'] as AudienceType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setAudience(type)}
                                className={\`px-8 py-4 rounded-full text-lg md:text-xl font-serif transition-all duration-300 w-full md:w-auto \${audience === type
                                    ? \`\${SERVICES_DATA[type].accent} text-white shadow-md scale-105\`
                                    : 'hover:bg-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]'
                                    }\`}
                            >
                                {SERVICES_DATA[type].tabLabel}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={audience}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mt-16"
                    >
                        {/* Massive Hero Card (Full Width) */}
                        <div className={\`w-full p-8 md:p-16 rounded-[40px] border-2 transition-colors duration-500 overflow-hidden relative mb-6 \${data.hero.color}\`}>
                            <div className="max-w-3xl relative z-10">
                                <h4 className={\`text-4xl md:text-6xl font-serif mb-6 leading-tight \${data.theme}\`}>{data.hero.title}</h4>
                                <p className="text-xl md:text-2xl text-[var(--text)] opacity-80 font-medium leading-relaxed mb-8">{data.hero.desc}</p>
                                {data.hero.proof}
                            </div>
                            {/* Abstract large background shape matching accent */}
                            <div className={\`absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none \${data.accent} opacity-10\`} />
                        </div>

                        {/* 2x2 Grid for Secondary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.cards.map((card, i) => (
                                <div key={i} className={\`p-8 md:p-12 rounded-[32px] border-2 border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_0_0_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group\`}>
                                    <div>
                                        <div className="text-3xl mb-6 bg-[var(--border)] w-16 h-16 flex items-center justify-center rounded-2xl">{card.icon}</div>
                                        <h4 className="text-2xl md:text-3xl font-serif mb-4 flex items-center gap-3">
                                            {card.title}
                                        </h4>
                                        <p className="text-lg text-[var(--muted)] font-medium leading-relaxed">{card.desc}</p>
                                    </div>
                                    <div className="mt-12 flex justify-end">
                                        <div className={\`w-12 h-12 rounded-full border-2 border-[var(--border)] flex items-center justify-center text-[var(--muted)] transition-colors duration-300 \${data.hoverAccent} group-hover:text-[var(--text)] group-hover:border-[var(--border-hover)]\`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

`;

let content = fs.readFileSync('c:/AOVASITE2/aova/src/app/page.tsx', 'utf8');

content = content.replace("function InteractiveServices() {", "function PricingServices() {");
content = content.replace("<InteractiveServices />", "<InteractiveServices />\\n            <PricingServices />");
content = content.replace("function PricingServices() {", TO_INSERT + "function PricingServices() {");

fs.writeFileSync('c:/AOVASITE2/aova/src/app/page.tsx', content, 'utf8');
console.log("Done");
