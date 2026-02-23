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
	title: "Aova — Design & Motion Studio",
	description:
		"Design studio for brands & creators. Branding, websites, ads, thumbnails, video editing, motion design, and growth strategy.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${instrumentSerif.variable} ${outfit.variable} antialiased`}
			>
				{/* Fixed 2-line grid — designjoy style */}
				<div className="pg-grid-lines" aria-hidden="true">
					<div className="pg-grid-lines__inner" />
				</div>
				{children}
			</body>
		</html>
	);
}
