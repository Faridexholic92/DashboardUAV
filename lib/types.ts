export const FASA_ORDER = [
	"Perancangan",
	"Lapangan",
	"Data",
	"Pemprosesan",
	"QAQC",
	"Analisis",
	"Pelaporan",
	"Arkib/Backup server",
] as const

export type Status = "Selesai" | "Dalam Tindakan" | "Belum Mula" | "Tertangguh"

export const STATUS_ORDER: Status[] = [
	"Selesai",
	"Dalam Tindakan",
	"Belum Mula",
	"Tertangguh",
]

export const STATUS_COLORS: Record<Status, string> = {
	Selesai: "var(--green)",
	"Dalam Tindakan": "var(--blue)",
	"Belum Mula": "rgba(255,255,255,.35)",
	Tertangguh: "var(--orange)",
}

export interface Task {
	id: string
	bil: string
	fasa: string
	aktiviti: string
	status: Status
	/** Baris sub-item (Bil kosong dalam templat Excel) */
	sub?: boolean
	tarikhMula?: string
	tarikhSiap?: string
	tempoh?: string
	pegawai?: string
	catatan?: string
}
