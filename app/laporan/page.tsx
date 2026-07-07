"use client"

import PortalShell from "@/components/PortalShell"
import KpiTile from "@/components/KpiTile"
import { useTasks } from "@/hooks/useTasks"
import { exportCsv } from "@/lib/exportCsv"
import { FASA_ORDER } from "@/lib/types"

export default function LaporanPage() {
	const t = useTasks()

	const tarikh = new Date().toLocaleDateString("ms-MY", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})

	return (
		<PortalShell>
			<div className="page-head">
				<div>
					<h1 className="page-title">Laporan</h1>
					<p className="page-sub">
						Ringkasan kemajuan setakat {tarikh} · Sumber: {t.source}
					</p>
				</div>
				<div className="toolbar">
					<button
						type="button"
						className="btn-ghost"
						onClick={() => exportCsv(t.tasks)}
						title="Muat turun checklist semasa sebagai CSV"
					>
						Export CSV
					</button>
					<button
						type="button"
						className="btn-ghost"
						onClick={() => window.print()}
						title="Cetak atau simpan sebagai PDF"
					>
						Cetak / PDF
					</button>
				</div>
			</div>

			<main className="grid">
				<KpiTile
					label="Kemajuan Keseluruhan"
					value={`${t.stats.pct}%`}
					sub={`${t.stats.byStatus["Selesai"]}/${t.stats.total} tugasan selesai`}
					color="var(--blue)"
				/>
				<KpiTile
					label="Dalam Tindakan"
					value={t.stats.byStatus["Dalam Tindakan"]}
					sub="Sedang dikerjakan"
					color="var(--teal)"
				/>
				<KpiTile
					label="Belum Mula"
					value={t.stats.byStatus["Belum Mula"]}
					sub="Menunggu giliran"
					color="var(--violet)"
				/>
				<KpiTile
					label="Tertangguh"
					value={t.stats.byStatus["Tertangguh"]}
					sub="Perlu perhatian"
					color="var(--orange)"
				/>

				<section
					className="glass card span-12"
					aria-label="Ringkasan mengikut fasa"
				>
					<h2 className="card-title">Ringkasan Mengikut Fasa</h2>
					<p className="card-hint">
						Kemajuan {FASA_ORDER.length} fasa kerja — dari perancangan
						sehingga arkib
					</p>
					<table className="report-table">
						<thead>
							<tr>
								<th>Fasa</th>
								<th>Selesai</th>
								<th>Jumlah</th>
								<th>Kemajuan</th>
								<th>%</th>
							</tr>
						</thead>
						<tbody>
							{t.stats.byFasa.map((f) => {
								const pct =
									f.total > 0
										? Math.round((f.selesai / f.total) * 100)
										: 0
								return (
									<tr key={f.fasa}>
										<td>{f.fasa}</td>
										<td>{f.selesai}</td>
										<td>{f.total}</td>
										<td>
											<span className="report-bar">
												<i style={ { width: `${pct}%` } } />
											</span>
										</td>
										<td>{pct}%</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</section>
			</main>
		</PortalShell>
	)
}
