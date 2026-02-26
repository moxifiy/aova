import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
	metadataBase: new URL("https://aova.studio"),
	title: "Aova — Design & Motion Studio",
	description:
		"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
	openGraph: {
		title: "Aova — Design & Motion Studio",
		description:
			"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
		url: "https://aova.studio",
		siteName: "Aova Studio",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Aova — Design & Motion Studio",
		description:
			"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
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
		"@type": "Organization",
		name: "Aova Studio",
		url: "https://aova.studio",
		email: "aovastudio@gmail.com",
		description:
			"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
		sameAs: [],
		serviceType: [
			"Brand Identity",
			"Web Design",
			"Motion Design",
			"Video Editing",
			"Growth Strategy",
		],
	};

	return (
		<html lang="en">
			<body
				className={`${instrumentSerif.variable} ${outfit.variable} antialiased`}
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
