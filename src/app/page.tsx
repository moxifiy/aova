"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";

/* ================================================================
   ICONS
   ================================================================ */
function ArrowIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 14 14" fill="none">
			<path
				d="M2 12L12 2M12 2H5M12 2V9"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function PlusIcon() {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
			<path
				d="M5 1V9M1 5H9"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

/* ================================================================
   SCROLL REVEAL
   ================================================================ */
function Reveal({
	children,
	delay = 0,
	className = "",
	immediate = false,
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
	immediate?: boolean;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (immediate) {
			const t = setTimeout(() => setVisible(true), 100);
			return () => clearTimeout(t);
		}

		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [immediate]);

	const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";

	return (
		<div
			ref={ref}
			className={`reveal ${visible ? "visible" : ""} ${delayClass} ${className}`}
		>
			{children}
		</div>
	);
}

/* ================================================================
   CUSTOM CURSOR
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
   NAVBAR
   ================================================================ */
function Navbar() {
	return (
		<nav className="site-nav">
			<a href="#" className="nav-logo">
				Aova<span>.</span>
			</a>
			<ul className="nav-links">
				<li>
					<a href="#work">Work</a>
				</li>
				<li>
					<a href="#process">Process</a>
				</li>
				<li>
					<a href="#faq">FAQ</a>
				</li>
				<li>
					<a href="#">About</a>
				</li>
			</ul>
			<a href="/book-a-call" className="nav-cta">
				Book a call
			</a>
		</nav>
	);
}

/* ================================================================
   HERO
   ================================================================ */
function Hero() {
	return (
		<section className="hero" id="hero">
			{/* Ambient blobs */}
			<div
				className="hero-blob"
				style={{
					width: 500,
					height: 500,
					top: -100,
					left: -150,
					background:
						"radial-gradient(circle, #f0e8d8 0%, transparent 70%)",
				}}
			/>
			<div
				className="hero-blob"
				style={{
					width: 400,
					height: 400,
					bottom: -50,
					right: -100,
					background:
						"radial-gradient(circle, #dce8f0 0%, transparent 70%)",
				}}
			/>

			<Reveal immediate>
				<div className="hero-badge">
					<span className="hero-badge-dot" />
					Design partner for startups
				</div>
			</Reveal>

			<Reveal immediate delay={1}>
				<h1 className="hero-headline">
					Design studio committed to <em>elevating startups</em> with
					intentional branding.
				</h1>
			</Reveal>

			<Reveal immediate delay={2}>
				<p className="hero-sub">
					Modern web experiences crafted with precision, for founders who
					care about how their brand looks and feels.
				</p>
			</Reveal>

			<Reveal immediate delay={3}>
				<a href="/book-a-call" className="hero-cta">
					Reserve your spot
					<span className="hero-cta-icon">
						<svg viewBox="0 0 10 10" fill="none">
							<path
								d="M1 9L9 1M9 1H3M9 1V7"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
				</a>
			</Reveal>

			<Reveal immediate delay={4}>
				<p className="hero-avail">Booking for Q1 2026</p>
			</Reveal>
		</section>
	);
}

/* ================================================================
   MARQUEE
   ================================================================ */
const MARQUEE_ITEMS = [
	"Brand Identity",
	"UI/UX Design",
	"Motion & Animation",
	"Design Systems",
	"Web Development",
	"Art Direction",
];

function Marquee() {
	return (
		<div className="marquee-wrap">
			<div className="marquee-track">
				{[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
					<span key={i} className="marquee-item">
						{item}
					</span>
				))}
			</div>
		</div>
	);
}

/* ================================================================
   WORK / BENTO GRID
   ================================================================ */
function WorkSection() {
	return (
		<section className="work" id="work">
			<Reveal>
				<div className="section-header">
					<div>
						<p className="section-tag">Selected Work</p>
						<h2 className="section-title">
							Recent <em>projects</em>
						</h2>
					</div>
					<a href="#" className="section-link">
						All work
						<ArrowIcon />
					</a>
				</div>
			</Reveal>

			<Reveal delay={1}>
				<div className="bento">
					{/* Item 1 — large */}
					<div className="bento-item bento-item-large">
						<div className="bento-img vis-1" />
						<div className="bento-grid-lines" />
						<div
							className="geo-circle"
							style={{
								width: 300,
								height: 300,
								top: -80,
								right: -80,
							}}
						/>
						<div className="bento-overlay" />
						<div className="bento-top">
							<span className="bento-index">01 / 05</span>
						</div>
						<div className="bento-content">
							<div className="bento-tags">
								<span className="bento-tag accent">
									Brand Identity
								</span>
								<span className="bento-tag">2024</span>
							</div>
							<h3 className="bento-title bento-title-lg">
								Lumara &mdash; Redefining Sustainable Luxury
							</h3>
							<p className="bento-desc">
								Full brand overhaul, packaging, and digital presence
								for a next-gen sustainable fashion label.
							</p>
						</div>
					</div>

					{/* Item 2 — tall */}
					<div className="bento-item bento-item-tall">
						<div className="bento-img vis-2" />
						<div className="bento-overlay" />
						<div className="bento-top">
							<span className="bento-index">02 / 05</span>
						</div>
						<div className="bento-content">
							<div className="bento-tags">
								<span className="bento-tag accent">UI / UX</span>
								<span className="bento-tag">SaaS</span>
							</div>
							<h3 className="bento-title">
								Orion Analytics Dashboard
							</h3>
							<p className="bento-desc">
								A zero-friction data platform for Series-B fintech
								startup Orion.
							</p>
						</div>
					</div>

					{/* Item 3 — wide */}
					<div className="bento-item bento-item-wide">
						<div className="bento-img vis-3" />
						<div className="bento-overlay" />
						<div className="bento-top">
							<span className="bento-index">03 / 05</span>
						</div>
						<div
							className="bento-content"
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-end",
							}}
						>
							<div>
								<div className="bento-tags">
									<span className="bento-tag accent">Motion</span>
									<span className="bento-tag">Branding</span>
								</div>
								<h3 className="bento-title">
									Halo &mdash; Brand in Motion
								</h3>
							</div>
							<div className="bento-arrow">
								<ArrowIcon size={12} />
							</div>
						</div>
					</div>

					{/* Item 4 — small */}
					<div className="bento-item bento-item-small">
						<div className="bento-img vis-4" />
						<div className="bento-overlay" />
						<div className="bento-top">
							<span className="bento-index">04 / 05</span>
						</div>
						<div className="bento-content">
							<div className="bento-tags">
								<span className="bento-tag accent">System</span>
							</div>
							<h3 className="bento-title">Quanta Design System</h3>
						</div>
					</div>

					{/* Item 5 — full width */}
					<div
						className="bento-item bento-item-full"
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							minHeight: 120,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 48,
							}}
						>
							<span
								className="bento-index"
								style={{ color: "var(--muted)" }}
							>
								05 / 05
							</span>
							<div>
								<div
									className="bento-tags"
									style={{ marginBottom: 6 }}
								>
									<span className="bento-tag accent">
										Web Dev
									</span>
									<span className="bento-tag">E-Commerce</span>
									<span className="bento-tag">2023</span>
								</div>
								<h3
									className="bento-title"
									style={{ fontSize: 18 }}
								>
									Bloom &mdash; Shopify Flagship Store
								</h3>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 20,
							}}
						>
							<span
								style={{
									fontFamily: "var(--font-mono-stack)",
									fontSize: 10,
									color: "var(--muted)",
								}}
							>
								Delivered 3&times; conversion lift
							</span>
							<div className="bento-arrow">
								<ArrowIcon size={12} />
							</div>
						</div>
					</div>
				</div>
			</Reveal>
		</section>
	);
}

/* ================================================================
   FAQ
   ================================================================ */
const FAQS = [
	{
		q: "What types of projects do you take on?",
		a: "We work across brand identity, UI/UX design, design systems, motion graphics, and web development. We're selective — we take on fewer projects so we can give each one our full attention and craft.",
	},
	{
		q: "How long does a typical project take?",
		a: "Brand identity projects typically take 6–10 weeks. Web and product design engagements run 8–16 weeks. We always agree on a clear timeline before starting, and we stick to it.",
	},
	{
		q: "What does the process look like?",
		a: "We follow a four-phase approach: Discovery → Strategy → Design → Delivery. You'll be involved at key decision points throughout, with regular check-ins and shared Figma files so you always know where things stand.",
	},
	{
		q: "What is your pricing structure?",
		a: "We work on a project-fee basis, not hourly. This means you know the full cost upfront with no surprises. Projects typically start from $12,000 for brand identity, and $24,000 for full product design engagements.",
	},
	{
		q: "Do you offer ongoing retainers?",
		a: "Yes — we offer monthly retainers for ongoing design support. These are reserved for existing clients and cover design iterations, new feature work, and asset creation. Slots are limited.",
	},
];

function FaqItem({
	q,
	a,
	isOpen,
	onToggle,
}: {
	q: string;
	a: string;
	isOpen: boolean;
	onToggle: () => void;
}) {
	const innerRef = useRef<HTMLParagraphElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (innerRef.current) {
			setHeight(innerRef.current.scrollHeight);
		}
	}, [a]);

	return (
		<div className={`faq-item ${isOpen ? "open" : ""}`}>
			<button className="faq-trigger" onClick={onToggle}>
				<span className="faq-trigger-text">{q}</span>
				<span className="faq-icon">
					<PlusIcon />
				</span>
			</button>
			<div
				className="faq-answer"
				style={{ maxHeight: isOpen ? height : 0 }}
			>
				<p ref={innerRef} className="faq-answer-inner">
					{a}
				</p>
			</div>
		</div>
	);
}

function FaqSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = useCallback(
		(i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
		[]
	);

	return (
		<section className="faq" id="faq">
			<Reveal>
				<div className="section-header">
					<div>
						<p className="section-tag">FAQ</p>
						<h2 className="section-title">
							Common <em>questions</em>
						</h2>
					</div>
				</div>
			</Reveal>

			<Reveal delay={1}>
				<div className="faq-grid">
					{/* Left intro panel */}
					<div className="faq-intro">
						<div>
							<p className="faq-intro-title">
								Everything you need to know before we begin.
							</p>
							<p className="faq-intro-text">
								We keep our process transparent and
								straightforward. If you have a question not answered
								here, we&apos;d love to hear from you.
							</p>
						</div>
						<div>
							<a
								href="/book-a-call"
								className="btn-primary"
								style={{ width: "fit-content" }}
							>
								Book a call
								<ArrowIcon />
							</a>
							<div className="faq-badge">
								<span className="faq-badge-dot" />
								Available for projects
							</div>
						</div>
					</div>

					{/* Right accordion */}
					<div className="faq-list">
						{FAQS.map((faq, i) => (
							<FaqItem
								key={i}
								q={faq.q}
								a={faq.a}
								isOpen={openIndex === i}
								onToggle={() => toggle(i)}
							/>
						))}
					</div>
				</div>
			</Reveal>
		</section>
	);
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
	return (
		<>
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

/* ================================================================
   PAGE
   ================================================================ */
export default function Home() {
	return (
		<>
			<CustomCursor />
			<Navbar />
			<Hero />
			<Marquee />
			<WorkSection />
			<FaqSection />
			<Footer />
		</>
	);
}
