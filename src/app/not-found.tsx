import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white text-[#0A0A0A] flex flex-col items-center justify-center px-6 text-center">
            <p
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8A8A8A] mb-6"
                style={{ fontFamily: "var(--font-host), sans-serif" }}
            >
                404
            </p>
            <h1
                className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.98] max-w-[720px]"
                style={{ fontFamily: "var(--font-host), sans-serif", letterSpacing: "-0.03em" }}
            >
                This page doesn&rsquo;t exist.
            </h1>
            <p
                className="mt-6 text-lg text-[#8A8A8A] max-w-[440px]"
                style={{ fontFamily: "var(--font-host), sans-serif" }}
            >
                The link may be old, or the page has moved. The work, however, is very much alive.
            </p>
            <Link
                href="/"
                className="mt-10 inline-block text-sm font-medium text-white px-8 py-3.5 bg-[#0A0A0A] rounded-full transition-colors duration-300 hover:bg-[#E0218A]"
                style={{ fontFamily: "var(--font-host), sans-serif" }}
            >
                Back to the studio
            </Link>
        </main>
    );
}
