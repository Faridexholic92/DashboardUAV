"use client"

import PortalShell from "@/components/PortalShell"
import ImportButton from "@/components/ImportButton"
import HeroCard from "@/components/HeroCard"
import InsightsCard from "@/components/InsightsCard"
import KpiTile from "@/components/KpiTile"
import PhaseChart from "@/components/PhaseChart"
import PipelineStepper from "@/components/PipelineStepper"
import StatusDonut from "@/components/StatusDonut"
import TaskTable from "@/components/TaskTable"
import { useTasks } from "@/hooks/useTasks"
import {
	FASA_ORDER,
	STATUS_COLORS,
	STATUS_ORDER,
} from "@/lib/types"

export default function DashboardPage() {
	const t = useTasks()

	return (
		<PortalShell>
			<div className="page-head">
				<div>
					<h1 className="page-title">Dashboard</h1>
					<p className="page-sub">
						Ringkasan kemajuan operasi UAV semasa
					</p>
				</div>
				<div className="toolbar">
					<ImportButton
						onImport={t.handleImport}
						onError={t.setError}
					/>
				</div>
			</div>

			{t.error && (
				<div className="alert" role="alert">
					{t.error}
				</div>
			)}

			<main className="grid">
				<HeroCard stats={t.stats} />

				<section
					className="glass card donut-card span-4"
					aria-label="Status tugasan"
				>
					<h2 className="card-title">Status Tugasan</h2>
					<p className="card-hint">
						Pecahan {t.stats.total} tugasan — klik untuk tapis
					</p>
					<StatusDonut
						segments={STATUS_ORDER.map((s) => ({
							label: s,
							value: t.stats.byStatus[s],
							color: STATUS_COLORS[s],
						}))}
						pct={t.stats.pct}
						selected={t.statusFilter}
						onSelect={t.toggleStatus}
					/>
				</section>

				<PipelineStepper
					byFasa={t.stats.byFasa}
					selected={t.fasaFilter}
					onSelect={t.toggleFasa}
				/>

				<KpiTile
					label="Jumlah Tugasan"
					value={t.stats.total}
					sub={`${FASA_ORDER.length} fasa kerja`}
					color="var(--blue)"
				/>
				<KpiTile
					label="Selesai"
					value={t.stats.byStatus["Selesai"]}
					sub={`${t.stats.pct}% daripada jumlah`}
					color="var(--green)"
				/>
				<KpiTile
					label="Dalam Tindakan"
					value={t.stats.byStatus["Dalam Tindakan"]}
					sub="Sedang dikerjakan"
					color="var(--blue)"
				/>
				<KpiTile
					label="Tertangguh"
					value={t.stats.byStatus["Tertangguh"]}
					sub="Perlu perhatian"
					color="var(--orange)"
				/>

				<section className="glass card span-7" aria-label="Kemajuan fasa">
					<h2 className="card-title">Kemajuan Mengikut Fasa</h2>
					<p className="card-hint">
						Tugasan selesai / jumlah — klik fasa untuk tapis jadual
					</p>
					<PhaseChart
						byFasa={t.stats.byFasa}
						selected={t.fasaFilter}
						onSelect={t.toggleFasa}
					/>
				</section>

				<InsightsCard insights={t.insights} />

				<section className="glass card span-12" aria-label="Senarai semak">
					<h2 className="card-title">Senarai Semak UAV</h2>
					<p className="card-hint">
						Klik pill status untuk kemas kini terus — perubahan disimpan
						automatik
					</p>
					<TaskTable
						tasks={t.tasks}
						fasaNames={FASA_ORDER.slice()}
						fasa={t.fasaFilter}
						status={t.statusFilter}
						onFasaChange={t.setFasaFilter}
						onStatusChange={t.setStatusFilter}
						onTaskStatusChange={t.handleTaskStatus}
					/>
				</section>
			</main>

			<footer className="foot">
				Imej dron: Wikimedia Commons (lesen Creative Commons) · Sumber
				data: {t.source} · Import fail Excel/CSV berformat
				Template_Profesional_Pemprosesan_UAV untuk kemas kini penuh
			</footer>
		</PortalShell>
	)
}
