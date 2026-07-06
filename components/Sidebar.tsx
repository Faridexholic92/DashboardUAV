"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV = [
	{
		href: "/",
		label: "Dashboard",
		icon: (
			<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
				<rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
				<rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
				<rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
				<rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
			</svg>
		),
	},
	{
		href: "/checklist",
		label: "Checklist",
		icon: (
			<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<path d="M4 6.5 5.5 8 8 5" />
				<path d="M4 12.5 5.5 14 8 11" />
				<path d="M4 18.5 5.5 20 8 17" />
				<path d="M11 6.5h9M11 12.5h9M11 18.5h9" />
			</svg>
		),
	},
	{
		href: "/armada",
		label: "Armada",
		icon: (
			<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
				<circle cx="5" cy="5" r="2.4" />
				<circle cx="19" cy="5" r="2.4" />
				<circle cx="5" cy="19" r="2.4" />
				<circle cx="19" cy="19" r="2.4" />
				<path d="M6.8 6.8 10 10M17.2 6.8 14 10M6.8 17.2 10 14M17.2 17.2 14 14" />
				<rect x="10" y="10" width="4" height="4" rx="1.2" />
			</svg>
		),
	},
	{
		href: "/laporan",
		label: "Laporan",
		icon: (
			<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
				<path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
			</svg>
		),
	},
	{
		href: "/tetapan",
		label: "Tetapan",
		icon: (
			<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="12" cy="12" r="3" />
				<path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
			</svg>
		),
	},
]

export default function Sidebar() {
	const pathname = usePathname()

	return (
		<aside className="sidebar">
			<div className="brand">
				<div className="brand-mark">
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
						<circle cx="5" cy="5" r="2.4" />
						<circle cx="19" cy="5" r="2.4" />
						<circle cx="5" cy="19" r="2.4" />
						<circle cx="19" cy="19" r="2.4" />
						<path d="M6.8 6.8 10 10M17.2 6.8 14 10M6.8 17.2 10 14M17.2 17.2 14 14" />
						<rect x="10" y="10" width="4" height="4" rx="1.2" />
					</svg>
				</div>
				<div>
					<div className="brand-name">UAV Ops Portal</div>
					<div className="brand-sub">Fotogrametri</div>
				</div>
			</div>

			<nav className="nav-list" aria-label="Navigasi utama">
				{NAV.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className={
							pathname === item.href ? "nav-item active" : "nav-item"
						}
					>
						{item.icon}
						{item.label}
					</Link>
				))}
			</nav>

			<div className="sidebar-foot">
				UAV Ops Portal v2.0
				<br />
				Data disimpan dalam pelayar
			</div>
		</aside>
	)
}
