"use client"

import { useEffect, useMemo, useState } from "react"
import HeroCard from "@/components/HeroCard"
import ImportButton from "@/components/ImportButton"
import FleetCard from "@/components/FleetCard"
import InsightsCard from "@/components/InsightsCard"
import KpiTile from "@/components/KpiTile"
import PhaseChart from "@/components/PhaseChart"
import PipelineStepper from "@/components/PipelineStepper"
import StatusDonut from "@/components/StatusDonut"
import TaskTable from "@/components/TaskTable"
import { DEFAULT_TASKS } from "@/lib/data"
import { exportCsv } from "@/lib/exportCsv"
import { computeInsights } from "@/lib/insights"
import { computeStats } from "@/lib/stats"
import { clearState, loadState, saveState } from "@/lib/storage"
import {
	FASA_ORDER,
	STATUS_COLORS,
	STATUS_ORDER,
	type Status,
	type Task,
} from "@/lib/types"

const SOURCE_DEFAULT = "Templat asal — belum dikemas kini"

export default function Page() {
	const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS)
	const [source, setSource] = useState(SOURCE_DEFAULT)
	const [error, setError] = useState<string | null>(null)
	const [hydrated, setHydrated] = useState(false)
	const [fasaFilter, setFasaFilter] = useState("Semua")
	const [statusFilter, setStatusFilter] = useState("Semua")

	// Pulihkan sesi terakhir (import + edit status) dari localStorage
	useEffect(() => {
		const saved = loadState()
		if (saved) {
			setTasks(saved.tasks)
			setSource(saved.source)
		}
		setHydrated(true)
	}, [])

	// Auto-save setiap perubahan
	useEffect(() => {
		if (hydrated) saveState({ tasks, source })
	}, [tasks, source, hydrated])

	const stats = useMemo(() => computeStats(tasks), [tasks])
	const insights = useMemo(() => computeInsights(tasks), [tasks])

	const handleImport = (imported: Task[], fileName: string) => {
		setTasks(imported)
		setSource(fileName)
		setError(null)
		setFasaFilter("Semua")
		setStatusFilter("Semua")
	}

	const handleReset = () => {
		setTasks(DEFAULT_TASKS)
		setSource(SOURCE_DEFAULT)
		setError(null)
		setFasaFilter("Semua")
		setStatusFilter("Semua")
		clearState()
	}

	const handleTaskStatus = (id: string, status: Status) => {
		setTasks((prev) =>
			prev.map((t) => (t.id === id ? { ...t, status } : t)),
		)
		if (source === SOURCE_DEFAULT) setSource("Diedit dalam dashboard")
	}

	const toggleFasa = (fasa: string) =>
		setFasaFilter((prev) => (prev === fasa ? "Semua" : fasa))

	const toggleStatus = (status: string) =>
		setStatusFilter((prev) => (prev === status ? "Semua" : status))

	return (
		<div className="shell">
			<header className="topbar">
				<div className="brand">
					<div className="brand-mark">
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="1.8"
							strokeLinecap="round"
						>
							<circle cx="5" cy="5" r="2.4" />
							<circle cx="19" cy="5" r="2.4" />
							<circle cx="5" cy="19" r="2.4" />
							<circle cx="19" cy="19" r="2.4" />
							<path d="M6.8 6.8 10 10M17.2 6.8 14 10M6.8 17.2 10 14M17.2 17.2 14 14" />
							<rect x="10" y="10" width="4" height="4" rx="1.2" />
						</svg>
					</div>
					<div>
						<div className="brand-name">UAV Ops Console</div>
						<div className="brand-sub">Pemprosesan Data Fotogrametri</div>
					</div>
				</div>
				<div className="topbar-actions">
					<span className="badge-src" title="Sumber data semasa">
						{source}
					</span>
					<button
						type="button"
						className="btn-ghost"
						onClick={() => exportCsv(tasks)}
						title="Muat turun checklist semasa sebagai CSV"
					>
						Export CSV
					</button>
					<button
						type="button"
						className="btn-ghost"
						onClick={handleReset}
						title="Kembali ke templat asal"
					>
						Reset
					</button>
					<ImportButton onImport={handleImport} onError={setError} />
				</div>
			</header>

			{error && (
				<div className="alert" role="alert">
					{error}
				</div>
			)}

			<main className="grid">
				<HeroCard stats={stats} />

				<section
					className="glass card donut-card span-4"
					aria-label="Status tugasan"
				>
					<h2 className="card-title">Status Tugasan</h2>
					<p className="card-hint">
						Pecahan {stats.total} tugasan — klik untuk tapis
					</p>
					<StatusDonut
						segments={STATUS_ORDER.map((s) => ({
							label: s,
							value: stats.byStatus[s],
							color: STATUS_COLORS[s],
						}))}
						pct={stats.pct}
						selected={statusFilter}
						onSelect={toggleStatus}
					/>
				</section>

				<PipelineStepper
					byFasa={stats.byFasa}
					selected={fasaFilter}
					onSelect={toggleFasa}
				/>

				<KpiTile
					label="Jumlah Tugasan"
					value={stats.total}
					sub={`${FASA_ORDER.length} fasa kerja`}
					color="var(--blue)"
				/>
				<KpiTile
					label="Selesai"
					value={stats.byStatus["Selesai"]}
					sub={`${stats.pct}% daripada jumlah`}
					color="var(--green)"
				/>
				<KpiTile
					label="Dalam Tindakan"
					value={stats.byStatus["Dalam Tindakan"]}
					sub="Sedang dikerjakan"
					color="var(--blue)"
				/>
				<KpiTile
					label="Tertangguh"
					value={stats.byStatus["Tertangguh"]}
					sub="Perlu perhatian"
					color="var(--orange)"
				/>

				<section className="glass card span-7" aria-label="Kemajuan fasa">
					<h2 className="card-title">Kemajuan Mengikut Fasa</h2>
					<p className="card-hint">
						Tugasan selesai / jumlah — klik fasa untuk tapis jadual
					</p>
					<PhaseChart
						byFasa={stats.byFasa}
						selected={fasaFilter}
						onSelect={toggleFasa}
					/>
				</section>

				<InsightsCard insights={insights} />

				<FleetCard />

				<section className="glass card span-12" aria-label="Senarai semak">
					<h2 className="card-title">Senarai Semak UAV</h2>
					<p className="card-hint">
						Klik pill status untuk kemas kini terus — perubahan disimpan
						automatik
					</p>
					<TaskTable
						tasks={tasks}
						fasaNames={FASA_ORDER.slice()}
						fasa={fasaFilter}
						status={statusFilter}
						onFasaChange={setFasaFilter}
						onStatusChange={setStatusFilter}
						onTaskStatusChange={handleTaskStatus}
					/>
				</section>
			</main>

			<footer className="foot">
				Imej dron: Wikimedia Commons (lesen Creative Commons) · Sumber
				data: {source} · Import fail Excel/CSV berformat
				Template_Profesional_Pemprosesan_UAV untuk kemas kini penuh
			</footer>
		</div>
	)
}
