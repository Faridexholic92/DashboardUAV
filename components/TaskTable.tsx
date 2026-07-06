"use client"

import { useMemo, useState } from "react"
import { STATUS_ORDER, type Status, type Task } from "@/lib/types"

const PILL_CLASS: Record<Status, string> = {
	Selesai: "pill pill-selesai",
	"Dalam Tindakan": "pill pill-tindakan",
	"Belum Mula": "pill pill-belum",
	Tertangguh: "pill pill-tangguh",
}

export default function TaskTable({
	tasks,
	fasaNames,
}: {
	tasks: Task[]
	fasaNames: string[]
}) {
	const [fasa, setFasa] = useState("Semua")
	const [status, setStatus] = useState("Semua")
	const [q, setQ] = useState("")

	const rows = useMemo(() => {
		const needle = q.trim().toLowerCase()
		return tasks.filter((t) => {
			if (fasa !== "Semua" && t.fasa !== fasa) return false
			if (status !== "Semua" && t.status !== status) return false
			if (
				needle &&
				![t.aktiviti, t.pegawai ?? "", t.catatan ?? "", t.bil]
					.join(" ")
					.toLowerCase()
					.includes(needle)
			)
				return false
			return true
		})
	}, [tasks, fasa, status, q])

	return (
		<>
			<div className="filters">
				<div className="chips" role="tablist" aria-label="Tapis mengikut fasa">
					{["Semua", ...fasaNames].map((f) => (
						<button
							key={f}
							type="button"
							className={f === fasa ? "chip active" : "chip"}
							onClick={() => setFasa(f)}
						>
							{f}
						</button>
					))}
				</div>
				<div className="search">
					<select
						className="select"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						aria-label="Tapis mengikut status"
					>
						<option>Semua</option>
						{STATUS_ORDER.map((s) => (
							<option key={s}>{s}</option>
						))}
					</select>
					<input
						className="input"
						type="search"
						placeholder="Cari aktiviti / pegawai…"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						aria-label="Cari tugasan"
					/>
				</div>
			</div>

			<div className="table-scroll">
				<table>
					<thead>
						<tr>
							<th>Bil</th>
							<th>Aktiviti</th>
							<th>Fasa</th>
							<th>Status</th>
							<th>Tarikh Siap</th>
							<th>Pegawai</th>
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 ? (
							<tr>
								<td colSpan={6}>
									<div className="empty">Tiada tugasan sepadan dengan tapisan.</div>
								</td>
							</tr>
						) : (
							rows.map((t) => (
								<tr key={t.id}>
									<td className="num">{t.bil || "–"}</td>
									<td className={t.sub ? "sub-akt" : undefined}>
										{t.sub ? "↳ " : ""}
										{t.aktiviti}
									</td>
									<td>
										<span className="fasa-chip">{t.fasa}</span>
									</td>
									<td>
										<span className={PILL_CLASS[t.status]}>
											<span className="pd" />
											{t.status}
										</span>
									</td>
									<td className="muted">{t.tarikhSiap || "—"}</td>
									<td className="muted">{t.pegawai || "—"}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}
