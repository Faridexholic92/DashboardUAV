import type { Status, Task } from "./types"

let n = 0
const t = (
	bil: string,
	fasa: string,
	aktiviti: string,
	status: Status = "Belum Mula",
	extra: Partial<Task> = {},
): Task => ({
	id: `t${++n}`,
	bil,
	fasa,
	aktiviti,
	status,
	sub: bil === "",
	...extra,
})

/**
 * Data lalai — diambil terus dari Template_Profesional_Pemprosesan_UAV.xlsx
 * (sheet "Checklist UAV"). Status/tarikh/pegawai di bawah adalah DATA DEMO
 * supaya carta kelihatan hidup; import fail Excel/CSV sebenar untuk
 * menggantikan semuanya.
 */
export const DEFAULT_TASKS: Task[] = [
	t("1", "Perancangan", "Pemilihan AOI", "Selesai", { tarikhMula: "1 Jun 2026", tarikhSiap: "2 Jun 2026", tempoh: "2 hari", pegawai: "Farid" }),
	t("2", "Perancangan", "Kelulusan/permit:", "Selesai", { tarikhMula: "3 Jun 2026", tarikhSiap: "10 Jun 2026", tempoh: "8 hari", pegawai: "Farid" }),
	t("", "Perancangan", "JTU/JKM", "Selesai", { tarikhSiap: "6 Jun 2026", pegawai: "Farid" }),
	t("", "Perancangan", "BGSP", "Selesai", { tarikhSiap: "8 Jun 2026", pegawai: "Farid" }),
	t("", "Perancangan", "CAAM", "Selesai", { tarikhSiap: "10 Jun 2026", pegawai: "Farid", catatan: "Permit CAAM diluluskan" }),
	t("3", "Perancangan", "Penyediaan surat/borang berkaitan :", "Selesai", { tarikhMula: "8 Jun 2026", tarikhSiap: "12 Jun 2026", tempoh: "5 hari", pegawai: "Nurul" }),
	t("", "Perancangan", "Surat Arahan kerjaluar", "Selesai", { tarikhSiap: "9 Jun 2026", pegawai: "Nurul" }),
	t("", "Perancangan", "Borang bertugas rasmi", "Selesai", { tarikhSiap: "9 Jun 2026", pegawai: "Nurul" }),
	t("", "Perancangan", "Surat makluman kerjaluar kepada pdrm /pbt", "Selesai", { tarikhSiap: "10 Jun 2026", pegawai: "Nurul" }),
	t("", "Perancangan", "Surat kebenaran masuk kawasan persendirian", "Selesai", { tarikhSiap: "11 Jun 2026", pegawai: "Nurul" }),
	t("", "Perancangan", "Surat kebenaran membawa keluar aset jabatan", "Selesai", { tarikhSiap: "11 Jun 2026", pegawai: "Aiman" }),
	t("", "Perancangan", "Borang memohon kenderaan jabatan", "Selesai", { tarikhSiap: "12 Jun 2026", pegawai: "Aiman" }),
	t("", "Perancangan", "Penyediaan peralatan untuk kerjaluar", "Selesai", { tarikhSiap: "12 Jun 2026", pegawai: "Aiman" }),
	t("4", "Perancangan", "Pelan penerbangan mission planner", "Selesai", { tarikhMula: "11 Jun 2026", tarikhSiap: "13 Jun 2026", tempoh: "3 hari", pegawai: "Farid" }),
	t("5", "Lapangan", "Penandaan / cerapan TKB", "Selesai", { tarikhMula: "16 Jun 2026", tarikhSiap: "16 Jun 2026", tempoh: "1 hari", pegawai: "Syafiq" }),
	t("6", "Lapangan", "Cerapan basestion", "Selesai", { tarikhMula: "17 Jun 2026", tarikhSiap: "17 Jun 2026", tempoh: "1 hari", pegawai: "Syafiq" }),
	t("7", "Lapangan", "Pemeriksaan UAS", "Selesai", { tarikhMula: "18 Jun 2026", tarikhSiap: "18 Jun 2026", tempoh: "1 hari", pegawai: "Aiman" }),
	t("", "Lapangan", "Penggambaran UAS", "Dalam Tindakan", { tarikhMula: "18 Jun 2026", pegawai: "Aiman", catatan: "3/5 blok penerbangan siap" }),
	t("8", "Lapangan", "Muat turun data imej", "Dalam Tindakan", { tarikhMula: "19 Jun 2026", pegawai: "Aiman" }),
	t("", "Lapangan", "Muat turun data log penerbangan"),
	t("", "Lapangan", "Muat turun data GNSS", "Tertangguh", { pegawai: "Syafiq", catatan: "Menunggu unit GNSS dari stor" }),
	t("9", "Data", "Backup data mentah"),
	t("10", "Pemprosesan", "Download data RTK"),
	t("11", "Pemprosesan", "Post Process Data GNSS untuk TKB menggunakan perisian Magnet Tools"),
	t("12", "Pemprosesan", "Proses data imej menggunakan Perisian Correlator 3D"),
	t("13.1", "Pemprosesan", "Point Cloud Generartion"),
	t("13.2", "Pemprosesan", "DSM/DTM Generation"),
	t("13.3", "Pemprosesan", "Orthomosaic Generation"),
	t("14", "QAQC", "Semakan GCP/RTK"),
	t("15", "QAQC", "Pengesahan ketepatan"),
	t("16", "Analisis", "Generate Project Report:"),
	t("16.1", "Analisis", "Generate Project Report Magnet Tools"),
	t("16.2", "Analisis", "Generate Project Report Corelator 3D"),
	t("17", "Pelaporan", "Laporan Penggambaran UAS"),
	t("18", "Pelaporan", "Laporan Semakan Kualiti"),
	t("19", "Arkib/Backup server", "Copy data final ke Server GDAS"),
]
