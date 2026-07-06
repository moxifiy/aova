import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit, Inclusive_Sans, Newsreader, Host_Grotesk } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
	themeColor: "#FFFFFF",
	width: "device-width",
	initialScale: 1,
};

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument",
	subsets: ["latin"],
	weight: "400",
	style: ["normal", "italic"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

const inclusiveSans = Inclusive_Sans({
	variable: "--font-display",
	subsets: ["latin"],
	weight: "400",
});

/* v2 clean type system — scoped to .v2-root in globals.css (old site keeps Outfit/Instrument) */
const newsreader = Newsreader({
	variable: "--font-newsreader",
	subsets: ["latin"],
	style: ["normal"],
});

const hostGrotesk = Host_Grotesk({
	variable: "--font-host",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
});



export const metadata: Metadata = {
	metadataBase: new URL("https://aova.studio"),
	title: {
		default: "Aova — Design & Motion Studio",
		template: "%s — Aova Studio",
	},
	description:
		"Aova is a brand design & motion studio in Brno, Czech Republic, working with brands and creators across Europe and the US. Brand strategy, identity, web design, and motion.",
	keywords: [
		"design studio",
		"brand design studio",
		"graphic design studio",
		"motion design studio",
		"branding agency",
		"brand identity",
		"web design",
		"Brno",
		"Czech Republic",
		"Czechia",
		"United States",
		"Aova",
		"Aova Studio",
	],
	openGraph: {
		title: "Aova — Design & Motion Studio",
		description:
			"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
		url: "https://aova.studio",
		siteName: "Aova Studio",
		locale: "en_US",
		type: "website",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Aova — Design & Motion Studio" }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Aova — Design & Motion Studio",
		description:
			"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
		images: ["/og.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://aova.studio",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": ["Organization", "ProfessionalService"],
		name: "Aova Studio",
		alternateName: "Aova",
		url: "https://aova.studio",
		logo: "https://aova.studio/og.jpg",
		image: "https://aova.studio/og.jpg",
		email: "hello@aova.studio",
		telephone: "+420739662744",
		foundingDate: "2025",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Brno",
			addressCountry: "CZ",
		},
		areaServed: [
			{ "@type": "Country", name: "Czech Republic" },
			{ "@type": "Country", name: "United States" },
		],
		description:
			"Brand design & motion studio in Brno, Czech Republic, working with brands and creators across Europe and the US. Brand strategy, identity, web design, and motion.",
		sameAs: [
			"https://www.instagram.com/aova.studio/",
			"https://x.com/AovaStudio",
			"https://www.linkedin.com/company/aova-studio",
		],
		knowsAbout: [
			"Brand Strategy",
			"Brand Identity",
			"Graphic Design",
			"Web Design",
			"UI/UX Design",
			"Motion Design",
			"Video Editing",
		],
		serviceType: [
			"Brand Strategy",
			"Brand Identity",
			"Web Design",
			"Motion Design",
			"Social & Content Systems",
		],
	};

	return (
		<html lang="en">
			<body
				className={`${instrumentSerif.variable} ${outfit.variable} ${inclusiveSans.variable} ${newsreader.variable} ${hostGrotesk.variable} antialiased`}
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{/* Fixed 2-line grid — designjoy style */}
				<div className="pg-grid-lines" aria-hidden="true">
					<div className="pg-grid-lines__inner" />
				</div>
				{children}
			</body>
		</html>
	);
}
