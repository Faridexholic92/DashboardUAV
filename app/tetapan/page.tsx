"use client"

import PortalShell from "@/components/PortalShell"
import { useEffect, useState } from "react"
import { useTasks } from "@/hooks/useTasks"
import { getSession, updateName } from "@/lib/auth"
import { applyTheme, getTheme, type Theme } from "@/lib/theme"

export default function TetapanPage() {
	const t = useTasks()
	const [theme, setTheme] = useState<Theme>("dark")
	const [nama, setNama] = useState("")
	const [saved, setSaved] = useState(false)

	useEffect(() => {
		setTheme(getTheme())
		const s = getSession()
		if (s) setNama(s.name)
	}, [])

	const pickTheme = (next: Theme) => {
		applyTheme(next)
		setTheme(next)
	}

	const simpanNama = () => {
		updateName(nama)
		setSaved(true)
		window.setTimeout(() => setSaved(false), 2000)
	}

	return (
		<PortalShell>
			<div className="page-head">
				<div>
					<h1 className="page-title">Tetapan</h1>
					<p className="page-sub">Tema, profil dan data portal</p>
				</div>
			</div>

			<main className="grid">
				<section className="glass card span-6" aria-label="Tema">
					<h2 className="card-title">Tema Paparan</h2>
					<p className="card-hint">
						Pilihan disimpan dalam pelayar anda
					</p>
					<div className="theme-choice">
						<button
							type="button"
							className={
								theme === "dark"
									? "theme-opt selected"
									: "theme-opt"
							}
							onClick={() => pickTheme("dark")}
						>
							🌙 Gelap
							<small>Mod malam — sesuai untuk bilik kawalan</small>
						</button>
						<button
							type="button"
							className={
								theme === "light"
									? "theme-opt selected"
									: "theme-opt"
							}
							onClick={() => pickTheme("light")}
						>
							☀️ Cerah
							<small>Mod siang — sesuai untuk lapangan</small>
						</button>
					</div>
				</section>

				<section className="glass card span-6" aria-label="Profil">
					<h2 className="card-title">Profil</h2>
					<p className="card-hint">Nama paparan pada topbar portal</p>
					<label className="field" style={ { marginTop: 12 } }>
						<span>Nama paparan</span>
						<input
							value={nama}
							onChange={(e) => setNama(e.target.value)}
							placeholder="cth. Farid"
						/>
					</label>
					<div className="toolbar" style={ { marginTop: 12 } }>
						<button
							type="button"
							className="btn-primary"
							onClick={simpanNama}
						>
							{saved ? "Disimpan ✓" : "Simpan"}
						</button>
					</div>
					<p className="login-note" style={ { marginTop: 12 } }>
						Muat semula halaman untuk melihat nama baharu pada topbar.
					</p>
				</section>

				<section className="glass card span-12" aria-label="Data">
					<h2 className="card-title">Data Checklist</h2>
					<p className="card-hint">
						Sumber semasa: {t.source} · {t.stats.total} tugasan ·{" "}
						{t.stats.pct}% selesai
					</p>
					<div className="toolbar" style={ { marginTop: 12 } }>
						<button
							type="button"
							className="btn-ghost"
							onClick={t.handleReset}
							title="Padam semua perubahan dan kembali ke templat asal"
						>
							Reset ke templat asal
						</button>
					</div>
					<p className="login-note" style={ { marginTop: 12 } }>
						Semua data disimpan dalam localStorage pelayar sahaja —
						tiada server terlibat.
					</p>
				</section>
			</main>
		</PortalShell>
	)
}
