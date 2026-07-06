"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import ThemeToggle from "@/components/ThemeToggle"
import { getSession, logout, type Session } from "@/lib/auth"

export default function PortalLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [session, setSession] = useState<Session | null>(null)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		const s = getSession()
		if (!s) {
			router.replace("/login")
			return
		}
		setSession(s)
		setReady(true)
	}, [router])

	if (!ready) {
		return <div className="portal-splash">Memuatkan portal…</div>
	}

	const initials = (session?.name || "?").charAt(0).toUpperCase()

	const handleLogout = () => {
		logout()
		router.replace("/login")
	}

	return (
		<div className="portal">
			<Sidebar />
			<div className="portal-main">
				<header className="portal-topbar">
					<div className="portal-crumb">
						<span className="live-dot" aria-hidden="true" /> Operasi
						aktif — Pemprosesan Data Fotogrametri
					</div>
					<div className="portal-actions">
						<ThemeToggle />
						<div className="user-chip" title={session?.email}>
							<span className="user-avatar">{initials}</span>
							<span className="user-name">{session?.name}</span>
						</div>
						<button
							type="button"
							className="btn-ghost"
							onClick={handleLogout}
						>
							Log keluar
						</button>
					</div>
				</header>
				<div className="portal-content">{children}</div>
			</div>
		</div>
	)
}
