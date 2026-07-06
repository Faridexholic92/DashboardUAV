import type { Task } from "./types"

export interface Insights {
	tertangguh: Task[]
	dalamTindakan: Task[]
	seterusnya: Task[]
	baruSelesai: Task[]
}

/**
 * Insight dijana automatik daripada status checklist:
 * - Tertangguh: perlu perhatian segera
 * - Dalam Tindakan: sedang berjalan
 * - Seterusnya: 3 tugasan belum mula terawal ikut turutan checklist
 * - Baru Selesai: 2 tugasan selesai terkini
 */
export function computeInsights(tasks: Task[]): Insights {
	return {
		tertangguh: tasks.filter((t) => t.status === "Tertangguh"),
		dalamTindakan: tasks.filter((t) => t.status === "Dalam Tindakan"),
		seterusnya: tasks.filter((t) => t.status === "Belum Mula").slice(0, 3),
		baruSelesai: tasks
			.filter((t) => t.status === "Selesai")
			.slice(-2)
			.reverse(),
	}
}
