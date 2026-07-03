import type { Metadata } from "next";

// Internal playground — keep it reachable but out of search engines
export const metadata: Metadata = {
	robots: { index: false, follow: false },
};

/* Playground layout - fonts and styles now loaded at root level */
export default function PlaygroundLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
