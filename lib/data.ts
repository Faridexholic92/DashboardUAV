import type { Task } from "./types"

let n = 0
const t = (bil: string, fasa: string, aktiviti: string): Task => ({
	id: `t${++n}`,
	bil,
	fasa,
	aktiviti,
	status: "Belum Mula",
	sub: bil === "",
})

/**
 * Data lalai — diambil terus dari Template_Profesional_Pemprosesan_UAV.xlsx
 * (sheet "Checklist UAV"), tanpa sebarang ubahan. Status semua baris kosong
 * dalam templat, jadi semuanya "Belum Mula". Import fail Excel/CSV yang
 * telah dikemas kini untuk melihat kemajuan sebenar.
 */
export const DEFAULT_TASKS: Task[] = [
	t("1", "Perancangan", "Pemilihan AOI"),
	t("2", "Perancangan", "Kelulusan/permit:"),
	t("", "Perancangan", "JTU/JKM"),
	t("", "Perancangan", "BGSP"),
	t("", "Perancangan", "CAAM"),
	t("3", "Perancangan", "Penyediaan surat/borang berkaitan :"),
	t("", "Perancangan", "Surat Arahan kerjaluar"),
	t("", "Perancangan", "Borang bertugas rasmi"),
	t("", "Perancangan", "Surat makluman kerjaluar kepada pdrm /pbt"),
	t("", "Perancangan", "Surat kebenaran masuk kawasan persendirian"),
	t("", "Perancangan", "Surat kebenaran membawa keluar aset jabatan"),
	t("", "Perancangan", "Borang memohon kenderaan jabatan"),
	t("", "Perancangan", "Penyediaan peralatan untuk kerjaluar"),
	t("4", "Perancangan", "Pelan penerbangan mission planner"),
	t("5", "Lapangan", "Penandaan / cerapan TKB"),
	t("6", "Lapangan", "Cerapan basestion"),
	t("7", "Lapangan", "Pemeriksaan UAS"),
	t("", "Lapangan", "Penggambaran UAS"),
	t("8", "Lapangan", "Muat turun data imej"),
	t("", "Lapangan", "Muat turun data log penerbangan"),
	t("", "Lapangan", "Muat turun data GNSS"),
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
