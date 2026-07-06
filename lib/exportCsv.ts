import type { Task } from "./types"

const esc = (v: string): string =>
	/[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v

/**
 * Export checklist semasa (termasuk status yang diedit dalam dashboard)
 * ke fail CSV yang serasi dengan format templat asal — boleh dibuka
 * dalam Excel dan diimport semula.
 */
export function exportCsv(
	tasks: Task[],
	fileName = "checklist-uav.csv",
): void {
	const header = [
		"Bil",
		"Fasa",
		"Aktiviti",
		"Status",
		"Tarikh Mula",
		"Tarikh Siap",
		"Tempoh Masa",
		"Pegawai",
		"Catatan",
	]
	const lines = [header.join(",")]
	for (const t of tasks) {
		lines.push(
			[
				t.bil,
				t.sub ? "" : t.fasa,
				t.aktiviti,
				t.status === "Belum Mula" ? "" : t.status,
				t.tarikhMula ?? "",
				t.tarikhSiap ?? "",
				t.tempoh ?? "",
				t.pegawai ?? "",
				t.catatan ?? "",
			]
				.map(esc)
				.join(","),
		)
	}

	const blob = new Blob(["\ufeff" + lines.join("\r\n")], {
		type: "text/csv;charset=utf-8",
	})
	const url = URL.createObjectURL(blob)
	const a = document.createElement("a")
	a.href = url
	a.download = fileName
	a.click()
	URL.revokeObjectURL(url)
}
