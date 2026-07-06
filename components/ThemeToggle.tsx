"use client"

import { useEffect, useState } from "react"
import { applyTheme, getTheme, type Theme } from "@/lib/theme"

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("dark")
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setTheme(getTheme())
		setMounted(true)
	}, [])

	const toggle = () => {
		const next: Theme = theme === "dark" ? "light" : "dark"
		applyTheme(next)
		setTheme(next)
	}

	return (
		<button
			type="button"
			className="icon-btn"
			onClick={toggle}
			title={
				theme === "dark" ? "Tukar ke mod cerah" : "Tukar ke mod gelap"
			}
			aria-label="Tukar tema"
		>
			{!mounted || theme === "dark" ? (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
				>
					<circle cx="12" cy="12" r="4.5" />
					<path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
				</svg>
			) : (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
				</svg>
			)}
		</button>
	)
}
