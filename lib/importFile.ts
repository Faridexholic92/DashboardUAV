import type { Status, Task } from "./types"

/**
 * Import fail Excel (.xlsx/.xls) atau CSV yang mengikut format
 * Template_Profesional_Pemprosesan_UAV.xlsx (sheet "Checklist UAV").
 *
 * Lajur yang dikenali: Bil, Fasa, Aktiviti, Status, Tarikh Mula,
 * Tarikh Siap, Tempoh Masa, Pegawai, Catatan.
 */

export function normalizeStatus(raw: string): Status {
	const s = raw.trim().toLowerCase()
	if (!s) return "Belum Mula"
	if (s.includes("belum")) return "Belum Mula"
	if (s.includes("selesai") || s.includes("siap") || s === "done" || s.includes("complete")) return "Selesai"
	if (s.includes("tangguh") || s.includes("hold") || s.includes("block")) return "Tertangguh"
	if (s.includes("tindakan") || s.includes("progress") || s.includes("proses")) return "Dalam Tindakan"
	return "Belum Mula"
}

const clean = (v: unknown): string => (v == null ? "" : String(v).trim())

function rowsToTasks(rows: string[][]): Task[] {
	// Cari baris header (mengandungi "Aktiviti")
	const headerIdx = rows.findIndex((r) =>
		r.some((c) => clean(c).toLowerCase().includes("aktiviti")),
	)
	if (headerIdx === -1) {
		throw new Error('Header tidak dijumpai — pastikan ada lajur "Aktiviti".')
	}

	const header = rows[headerIdx].map((c) => clean(c).toLowerCase())
	const col = (...names: string[]) =>
		header.findIndex((h) => names.some((n) => h.includes(n)))

	const iBil = col("bil")
	const iFasa = col("fasa")
	const iAkt = col("aktiviti")
	const iStatus = col("status")
	const iMula = col("tarikh mula", "mula")
	const iSiap = col("tarikh siap", "siap")
	const iTempoh = col("tempoh")
	const iPegawai = col("pegawai")
	const iCatatan = col("catatan")

	const tasks: Task[] = []
	let fasaSemasa = ""
	for (let r = headerIdx + 1; r < rows.length; r++) {
		const row = rows[r]
		const aktiviti = iAkt >= 0 ? clean(row[iAkt]) : ""
		if (!aktiviti || aktiviti === "`") continue

		const bil = iBil >= 0 ? clean(row[iBil]) : ""
		const fasa = iFasa >= 0 ? clean(row[iFasa]) : ""
		if (fasa) fasaSemasa = fasa

		tasks.push({
			id: `import-${r}`,
			bil,
			fasa: fasaSemasa || "Lain-lain",
			aktiviti,
			status: normalizeStatus(iStatus >= 0 ? clean(row[iStatus]) : ""),
			sub: bil === "",
			tarikhMula: iMula >= 0 ? clean(row[iMula]) : "",
			tarikhSiap: iSiap >= 0 ? clean(row[iSiap]) : "",
			tempoh: iTempoh >= 0 ? clean(row[iTempoh]) : "",
			pegawai: iPegawai >= 0 ? clean(row[iPegawai]) : "",
			catatan: iCatatan >= 0 ? clean(row[iCatatan]) : "",
		})
	}

	if (tasks.length === 0) throw new Error("Tiada tugasan dijumpai dalam fail.")
	return tasks
}

function parseCsv(text: string): string[][] {
	const rows: string[][] = []
	let row: string[] = []
	let cell = ""
	let inQuotes = false
	for (let i = 0; i < text.length; i++) {
		const ch = text[i]
		if (inQuotes) {
			if (ch === '"') {
				if (text[i + 1] === '"') {
					cell += '"'
					i++
				} else inQuotes = false
			} else cell += ch
		} else if (ch === '"') {
			inQuotes = true
		} else if (ch === ",") {
			row.push(cell)
			cell = ""
		} else if (ch === "\n" || ch === "\r") {
			if (ch === "\r" && text[i + 1] === "\n") i++
			row.push(cell)
			cell = ""
			rows.push(row)
			row = []
		} else cell += ch
	}
	if (cell !== "" || row.length > 0) {
		row.push(cell)
		rows.push(row)
	}
	return rows
}

export async function parseFile(file: File): Promise<Task[]> {
	const name = file.name.toLowerCase()

	if (name.endsWith(".csv")) {
		const text = await file.text()
		return rowsToTasks(parseCsv(text))
	}

	if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
		const XLSX = await import("xlsx")
		const wb = XLSX.read(await file.arrayBuffer(), { type: "array" })
		const sheetName =
			wb.SheetNames.find((n) => n.toLowerCase().includes("checklist")) ??
			wb.SheetNames[0]
		const ws = wb.Sheets[sheetName]
		const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
			header: 1,
			raw: false,
			defval: "",
		})
		return rowsToTasks(rows as string[][])
	}

	throw new Error("Format tidak disokong — gunakan .xlsx, .xls atau .csv.")
}
