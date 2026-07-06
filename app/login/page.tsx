"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ThemeToggle from "@/components/ThemeToggle"
import { getSession, login } from "@/lib/auth"

export default function LoginPage() {
	const router = useRouter()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [err, setErr] = useState<string | null>(null)

	useEffect(() => {
		if (getSession()) router.replace("/")
	}, [router])

	const submit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!email.includes("@")) {
			setErr("Masukkan emel yang sah.")
			return
		}
		if (password.length < 4) {
			setErr("Kata laluan minimum 4 aksara.")
			return
		}
		login(email, name)
		router.replace("/")
	}

	return (
		<div className="login-wrap">
			<div className="login-theme">
				<ThemeToggle />
			</div>

			<div className="login-card">
				<div className="login-art">
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
							<div className="brand-sub">Pemprosesan Data Fotogrametri</div>
						</div>
					</div>

					<h2>Kawal misi anda dari satu portal</h2>
					<p>
						Pantau checklist operasi, kemajuan fasa, armada dron dan
						laporan — dari perancangan sehingga arkib.
					</p>

					<div className="login-points">
						<span>
							<i className="live-dot" /> 36 tugasan · 8 fasa kerja
						</span>
						<span>
							<i className="live-dot" /> Import / export Excel &amp; CSV
						</span>
						<span>
							<i className="live-dot" /> Mod gelap &amp; cerah
						</span>
					</div>

					<svg className="login-path" width="280" height="120" viewBox="0 0 280 120" fill="none" aria-hidden="true">
						<path d="M 10 105 C 70 85, 90 45, 150 38 C 200 32, 230 25, 262 12" stroke="rgba(94,159,232,.5)" strokeWidth="2" strokeDasharray="7 8" strokeLinecap="round" />
						<circle cx="10" cy="105" r="4" fill="rgba(94,159,232,.9)" />
						<circle cx="150" cy="38" r="3.5" fill="rgba(255,255,255,.55)" />
						<circle cx="262" cy="12" r="5" stroke="rgba(255,255,255,.8)" />
					</svg>
				</div>

				<form className="login-form" onSubmit={submit}>
					<h1>Log Masuk</h1>
					<p className="login-sub">Akses portal operasi UAV anda</p>

					{err && (
						<div className="alert" role="alert">
							{err}
						</div>
					)}

					<label className="field">
						<span>Nama paparan (pilihan)</span>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="cth. Farid"
							autoComplete="name"
						/>
					</label>

					<label className="field">
						<span>Emel</span>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="nama@agensi.gov.my"
							autoComplete="email"
						/>
					</label>

					<label className="field">
						<span>Kata laluan</span>
						<input
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							autoComplete="current-password"
						/>
					</label>

					<button type="submit" className="btn-primary">
						Masuk ke Portal
					</button>

					<p className="login-note">
						Mod demo — sesi disimpan dalam pelayar anda sahaja, tiada
						data dihantar ke mana-mana server. Untuk produksi, sambungkan
						NextAuth.js atau SSO agensi.
					</p>
				</form>
			</div>
		</div>
	)
}
