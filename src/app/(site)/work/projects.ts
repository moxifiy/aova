// Shared case-study data — importable from both server (metadata) and client components.
// Copy is placeholder-quality until real case studies are written; swap images for real work.

export interface CaseStudy {
    slug: string;
    client: string;
    title: { en: string; cz: string };
    category: "Branding" | "Web" | "UI/UX" | "Editorial";
    year: string;
    services: { en: string[]; cz: string[] };
    intro: { en: string; cz: string };
    outcome: { en: string; cz: string };
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        slug: "orca",
        client: "Orca Compute Systems",
        title: {
            en: "Establishing institutional credibility for deep tech ecosystems.",
            cz: "Budování institucionální důvěryhodnosti pro deep tech ekosystémy.",
        },
        category: "Branding",
        year: "2025",
        services: {
            en: ["Identity", "Design System", "3D Art"],
            cz: ["Identita", "Design systém", "3D art"],
        },
        intro: {
            en: "Orca builds computing infrastructure for research institutions — serious technology that was being presented with a startup template's face. We rebuilt the identity from strategy up: a wordmark with engineering precision, a design system rigid enough for compliance documents and flexible enough for conference keynotes.",
            cz: "Orca staví výpočetní infrastrukturu pro výzkumné instituce — seriózní technologii, která se prezentovala tváří startupové šablony. Identitu jsme přestavěli od strategie: logotyp s inženýrskou přesností a design systém dost pevný pro compliance dokumenty i dost pružný pro konferenční keynoty.",
        },
        outcome: {
            en: "The new system carried Orca through a funding round and two industry conferences without a single asset made outside the guidelines. Credibility stopped being a conversation.",
            cz: "Nový systém provedl Orcu investičním kolem a dvěma oborovými konferencemi, aniž by jediný materiál vznikl mimo guidelines. O důvěryhodnosti se přestalo diskutovat.",
        },
    },
    {
        slug: "vela",
        client: "Vela Architecture",
        title: {
            en: "Reimagining architectural portfolios as breathing visual spaces.",
            cz: "Architektonické portfolio jako živý vizuální prostor.",
        },
        category: "Web",
        year: "2025",
        services: {
            en: ["Interactive UX", "Web Design", "Development"],
            cz: ["Interaktivní UX", "Web design", "Vývoj"],
        },
        intro: {
            en: "Vela designs spaces meant to be walked through slowly — but their portfolio site rushed visitors past the work in a grid of thumbnails. We designed a site that moves like their buildings feel: generous, unhurried, and structural, with scroll pacing that gives each project room to breathe.",
            cz: "Vela navrhuje prostory, kterými se má procházet pomalu — jejich portfolio ale návštěvníky hnalo mřížkou náhledů. Navrhli jsme web, který se pohybuje tak, jak jejich budovy působí: velkoryse, beze spěchu a strukturovaně, s tempem scrollování, které dává každému projektu prostor dýchat.",
        },
        outcome: {
            en: "Average time on the work pages tripled, and the studio now opens client pitches by simply scrolling the site.",
            cz: "Průměrný čas strávený na stránkách projektů se ztrojnásobil a studio dnes zahajuje prezentace klientům jednoduše tím, že projíždí web.",
        },
    },
    {
        slug: "vapor",
        client: "Vapor Frontier",
        title: {
            en: "Pioneering fluid digital campaigns for web3 design platforms.",
            cz: "Průkopnické digitální kampaně pro web3 designové platformy.",
        },
        category: "Branding",
        year: "2024",
        services: {
            en: ["Campaign", "3D Design", "Visual Assets"],
            cz: ["Kampaň", "3D design", "Vizuální assety"],
        },
        intro: {
            en: "Vapor needed a campaign system that could evolve weekly without falling apart — new drops, new partners, new formats. We built a fluid visual language around a single gradient logic and a 3D asset library, so every new piece feels inevitable rather than improvised.",
            cz: "Vapor potřeboval kampaňový systém, který se může měnit každý týden, aniž by se rozpadl — nové dropy, noví partneři, nové formáty. Postavili jsme tekutý vizuální jazyk na jediné logice gradientů a knihovně 3D assetů, takže každý nový kus působí samozřejmě, ne improvizovaně.",
        },
        outcome: {
            en: "Twelve campaign waves shipped in six months, all unmistakably one brand. The asset library now runs itself inside their team.",
            cz: "Dvanáct kampaňových vln za šest měsíců, všechny nezaměnitelně jedna značka. Knihovnu assetů si dnes jejich tým spravuje sám.",
        },
    },
    {
        slug: "noire",
        client: "Noire Magazine",
        title: {
            en: "Elevating print editorial standards for independent visual artists.",
            cz: "Pozvednutí tiskových editorialových standardů pro nezávislé vizuální umělce.",
        },
        category: "Editorial",
        year: "2024",
        services: {
            en: ["Typography", "Grid Systems", "Book Design"],
            cz: ["Typografie", "Mřížkové systémy", "Knižní design"],
        },
        intro: {
            en: "Noire publishes work by artists who obsess over every frame — the magazine had to meet that standard on paper. We designed a typographic system and grid that lets photography lead, with restraint tight enough that a single pull quote lands like a headline.",
            cz: "Noire publikuje práce umělců, kteří řeší každý snímek — časopis musel tomu standardu stačit i na papíře. Navrhli jsme typografický systém a mřížku, kde vede fotografie, s takovou mírou zdrženlivosti, že jediný citát zasáhne jako titulek.",
        },
        outcome: {
            en: "The redesigned issue sold out its print run and the system now templates every future edition.",
            cz: "Přepracované číslo vyprodalo náklad a systém je dnes šablonou pro každé další vydání.",
        },
    },
    {
        slug: "kudy",
        client: "Kudy Motion Studio",
        title: {
            en: "Crafting fluid vector aesthetics for creative agency reels.",
            cz: "Tekutá vektorová estetika pro reely kreativních agentur.",
        },
        category: "UI/UX",
        year: "2024",
        services: {
            en: ["Vector Art", "Interface Design", "Prototyping"],
            cz: ["Vektorový art", "Design rozhraní", "Prototypování"],
        },
        intro: {
            en: "A motion studio's interface should feel like motion even standing still. For Kudy we designed a vector-driven UI language — cursors, transitions, and hover states that carry the same elasticity as their reels, prototyped to the frame.",
            cz: "Rozhraní motion studia má působit jako pohyb, i když stojí. Pro Kudy jsme navrhli vektorový UI jazyk — kurzory, přechody a hover stavy se stejnou pružností, jakou mají jejich reely, prototypované na frame přesně.",
        },
        outcome: {
            en: "The design language shipped across their site and pitch decks, and doubled as a motion spec their animators actually use.",
            cz: "Designový jazyk se propsal do webu i prezentací a zároveň slouží jako motion specifikace, kterou jejich animátoři opravdu používají.",
        },
    },
    {
        slug: "amina",
        client: "Amina Digital",
        title: {
            en: "Bridging architectural styling with corporate web excellence.",
            cz: "Propojení architektonického stylu se špičkovým firemním webem.",
        },
        category: "Web",
        year: "2023",
        services: {
            en: ["Web Design", "Development", "Animations"],
            cz: ["Web design", "Vývoj", "Animace"],
        },
        intro: {
            en: "Amina sits between two worlds — architectural clients who expect taste and corporate stakeholders who expect rigor. We built a site that satisfies both: editorial layouts with measured motion on a foundation of strict components and fast loads.",
            cz: "Amina stojí mezi dvěma světy — architektonickými klienty, kteří čekají vkus, a korporátními stakeholdery, kteří čekají řád. Postavili jsme web, který uspokojí oba: editorialové layouty s odměřeným pohybem na základech přísných komponent a rychlého načítání.",
        },
        outcome: {
            en: "The site became their best salesperson — inbound leads doubled within a quarter of launch.",
            cz: "Web se stal jejich nejlepším obchodníkem — příchozí poptávky se do čtvrt roku od spuštění zdvojnásobily.",
        },
    },
];

// Shared placeholder identity shown on every project cover (Work grid hover)
// and, to match it exactly, on every case-study page too — swap out once real
// case studies replace the placeholder content above.
export const COVER_TITLE = "Kudlanka Smajlo";
export const COVER_DESCRIPTION = "render je pavouk ktery je hodne maly a nevlastni ani sulina";
