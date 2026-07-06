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
	fasa,
	status,
	onFasaChange,
	onStatusChange,
	onTaskStatusChange,
}: {
	tasks: Task[]
	fasaNames: string[]
	fasa: string
	status: string
	onFasaChange: (fasa: string) => void
	onStatusChange: (status: string) => void
	onTaskStatusChange: (id: string, status: Status) => void
}) {
	const [q, setQ] = useState("")

	const rows = useMemo(() => {
		const needle = q.trim().toLowerCase()
		return tasks.filter((t) => {
			if (fasa !== "Semua" && t.fasa !== fasa) return false
			if (status !== "Semua" && t.status !== status) return false
			if (
				needle &&
				!`${t.aktiviti} ${t.pegawai ?? ""} ${t.catatan ?? ""}`
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
				<div className="chips" role="tablist" aria-label="Tapis fasa">
					{["Semua", ...fasaNames].map((f) => (
						<button
							type="button"
							key={f}
							className={"chip" + (fasa === f ? " active" : "")}
							onClick={() => onFasaChange(f)}
						>
							{f}
						</button>
					))}
				</div>
				<div className="search">
					<select
						className="select"
						value={status}
						onChange={(e) => onStatusChange(e.target.value)}
						aria-label="Tapis status"
					>
						{["Semua", ...STATUS_ORDER].map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
					<input
						className="input"
						type="search"
						placeholder="Cari aktiviti / pegawai…"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						aria-label="Cari aktiviti"
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
						{rows.map((t) => (
							<tr key={t.id}>
								<td className="num">{t.bil || "\u2013"}</td>
								<td className={t.sub ? "sub-akt" : undefined}>
									{t.sub ? `\u21b3 ${t.aktiviti}` : t.aktiviti}
								</td>
								<td>
									<span className="fasa-chip">{t.fasa}</span>
								</td>
								<td>
									<select
										className={"pill-select " + PILL_CLASS[t.status]}
										value={t.status}
										onChange={(e) =>
											onTaskStatusChange(t.id, e.target.value as Status)
										}
										aria-label={`Status untuk ${t.aktiviti}`}
										title="Klik untuk tukar status"
									>
										{STATUS_ORDER.map((s) => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
								</td>
								<td className={t.tarikhSiap ? undefined : "muted"}>
									{t.tarikhSiap ?? "\u2014"}
								</td>
								<td className={t.pegawai ? undefined : "muted"}>
									{t.pegawai ?? "\u2014"}
								</td>
							</tr>
						))}
						{rows.length === 0 && (
							<tr>
								<td colSpan={6} className="empty">
									Tiada tugasan sepadan dengan tapisan.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}
