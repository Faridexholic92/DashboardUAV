import { FASA_ORDER, type Status, type Task } from "./types"

export interface FasaStat {
	fasa: string
	total: number
	selesai: number
}

export interface Stats {
	total: number
	byStatus: Record<Status, number>
	pct: number
	byFasa: FasaStat[]
	fasaAktif: string
}

export function computeStats(tasks: Task[]): Stats {
	const byStatus: Record<Status, number> = {
		Selesai: 0,
		"Dalam Tindakan": 0,
		"Belum Mula": 0,
		Tertangguh: 0,
	}
	for (const t of tasks) byStatus[t.status] += 1

	const total = tasks.length
	const pct = total > 0 ? Math.round((byStatus.Selesai / total) * 100) : 0

	// Susun fasa ikut turutan templat; fasa asing diletak di hujung.
	const known = FASA_ORDER.filter((f) => tasks.some((t) => t.fasa === f))
	const extra = Array.from(
		new Set(tasks.map((t) => t.fasa).filter((f) => !FASA_ORDER.includes(f as (typeof FASA_ORDER)[number]))),
	)
	const fasaNames = [...known, ...extra]

	const byFasa: FasaStat[] = fasaNames.map((fasa) => {
		const rows = tasks.filter((t) => t.fasa === fasa)
		return {
			fasa,
			total: rows.length,
			selesai: rows.filter((t) => t.status === "Selesai").length,
		}
	})

	const aktif = byFasa.find((f) => f.selesai < f.total)
	const fasaAktif = total === 0 ? "—" : aktif ? aktif.fasa : "Selesai"

	return { total, byStatus, pct, byFasa, fasaAktif }
}
