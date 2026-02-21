"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import Link from "next/link";

/* ================================================================
   CUSTOM CURSOR (duplicated for page isolation)
   ================================================================ */
function CustomCursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let mx = 0,
			my = 0,
			rx = 0,
			ry = 0;

		const onMouseMove = (e: MouseEvent) => {
			mx = e.clientX;
			my = e.clientY;
		};

		let raf: number;
		const animate = () => {
			if (dotRef.current) {
				dotRef.current.style.left = mx + "px";
				dotRef.current.style.top = my + "px";
			}
			rx += (mx - rx) * 0.12;
			ry += (my - ry) * 0.12;
			if (ringRef.current) {
				ringRef.current.style.left = rx + "px";
				ringRef.current.style.top = ry + "px";
			}
			raf = requestAnimationFrame(animate);
		};

		document.addEventListener("mousemove", onMouseMove);
		raf = requestAnimationFrame(animate);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<div className="cursor">
			<div className="cursor-ring" ref={ringRef} />
			<div className="cursor-dot" ref={dotRef} />
		</div>
	);
}

/* ================================================================
   PAGE
   ================================================================ */
export default function BookACall() {
	return (
		<>
			{/* Cal.com embed script */}
			<Script id="cal-embed-init" strategy="afterInteractive">{`
				(function (C, A, L) {
					let p = function (a, ar) { a.q.push(ar); };
					let d = C.document;
					C.Cal = C.Cal || function () {
						let cal = C.Cal;
						let ar = arguments;
						if (!cal.loaded) {
							cal.ns = {};
							cal.q = cal.q || [];
							d.head.appendChild(d.createElement("script")).src = A;
							cal.loaded = true;
						}
						if (ar[0] === L) {
							const api = function () { p(api, arguments); };
							const namespace = ar[1];
							api.q = api.q || [];
							if (typeof namespace === "string") {
								cal.ns[namespace] = cal.ns[namespace] || api;
								p(cal.ns[namespace], ar);
								p(cal, ["initNamespace", namespace]);
							} else p(cal, ar);
							return;
						}
						p(cal, ar);
					};
				})(window, "https://app.cal.com/embed/embed.js", "init");

				Cal("init", "30min", {origin:"https://app.cal.com"});

				Cal.ns["30min"]("inline", {
					elementOrSelector: "#cal-embed",
					calLink: "leif-schanche-a0hpbr/30min",
					layout: "month_view",
					config: {"useSlotsViewOnSmallScreen":"true"}
				});

				Cal.ns["30min"]("ui", {
					"theme": "dark",
					"hideEventTypeDetails": false,
					"layout": "month_view"
				});
			`}</Script>

			<CustomCursor />

			{/* Nav */}
			<nav className="site-nav">
				<Link href="/" className="nav-logo">
					Aova<span>.</span>
				</Link>
				<ul className="nav-links">
					<li>
						<Link href="/#work">Work</Link>
					</li>
					<li>
						<Link href="/#faq">FAQ</Link>
					</li>
					<li>
						<Link href="/">About</Link>
					</li>
				</ul>
				<Link href="/" className="nav-cta">
					&larr; Back to home
				</Link>
			</nav>

			{/* Header */}
			<div className="booking-header">
				<h1>
					Let&apos;s <em>talk</em>
				</h1>
				<p>
					Schedule a 30-minute discovery call. We&apos;ll discuss your
					project, goals, and how Aova can help bring your vision to
					life.
				</p>
				<div className="faq-badge" style={{ margin: "0 auto" }}>
					<span className="faq-badge-dot" />
					30 minute discovery call
				</div>
			</div>

			{/* Cal.com inline embed */}
			<div className="cal-container">
				<div className="cal-embed-wrapper">
					<div
						id="cal-embed"
						style={{ width: "100%", minHeight: 700, overflow: "auto" }}
					/>
				</div>
			</div>

			{/* Footer */}
			<div
				style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}
			>
				<div style={{ borderTop: "1px solid var(--border)" }} />
			</div>
			<footer className="site-footer">
				<div className="footer-logo">
					Aova<span>.</span>
				</div>
				<span className="footer-copy">
					&copy; {new Date().getFullYear()} Aova Studio. All rights
					reserved.
				</span>
				<ul className="footer-links">
					{["Twitter", "Instagram", "LinkedIn", "Dribbble"].map(
						(link) => (
							<li key={link}>
								<a href="#">{link}</a>
							</li>
						)
					)}
				</ul>
			</footer>
		</>
	);
}
