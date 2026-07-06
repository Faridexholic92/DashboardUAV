"use client"

import { useMemo, useState } from "react"
import ActivityFeed from "@/components/ActivityFeed"
import HeroCard from "@/components/HeroCard"
import ImportButton from "@/components/ImportButton"
import KpiTile from "@/components/KpiTile"
import PhaseChart from "@/components/PhaseChart"
import StatusDonut from "@/components/StatusDonut"
import TaskTable from "@/components/TaskTable"
import { DEFAULT_TASKS } from "@/lib/data"
import { computeStats } from "@/lib/stats"
import { STATUS_COLORS, STATUS_ORDER, type Task } from "@/lib/types"

export default function Page() {
	const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS)
	const [source, setSource] = useState("Data demo — templat asal")
	const [error, setError] = useState<string | null>(null)

	const stats = useMemo(() => computeStats(tasks), [tasks])

	return (
		<div className="shell">
			<header className="topbar">
				<div className="brand">
					<div className="brand-mark" aria-hidden="true">
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
					{error ? <span className="import-error" role="alert">{error}</span> : null}
					<span className="badge-src" title={source}>
						{source}
					</span>
					<ImportButton
						onImport={(t, name) => {
							setTasks(t)
							setSource(name)
							setError(null)
						}}
						onError={setError}
					/>
				</div>
			</header>

			<main className="grid">
				<HeroCard stats={stats} />

				<section className="glass card donut-card span-4" aria-label="Status tugasan">
					<h2 className="card-title">Status Tugasan</h2>
					<p className="card-hint">Pecahan {stats.total} tugasan</p>
					<StatusDonut
						segments={STATUS_ORDER.map((s) => ({
							label: s,
							value: stats.byStatus[s],
							color: STATUS_COLORS[s],
						}))}
						centerValue={`${stats.pct}%`}
						centerLabel="selesai"
					/>
				</section>

				<KpiTile
					label="Jumlah Tugasan"
					value={stats.total}
					sub={`${stats.byFasa.length} fasa kerja`}
					color="var(--blue)"
				/>
				<KpiTile
					label="Selesai"
					value={stats.byStatus.Selesai}
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
					value={stats.byStatus.Tertangguh}
					sub="Perlu perhatian"
					color="var(--orange)"
				/>

				<section className="glass card span-7" aria-label="Kemajuan mengikut fasa">
					<h2 className="card-title">Kemajuan Mengikut Fasa</h2>
					<p className="card-hint">Tugasan selesai / jumlah bagi setiap fasa</p>
					<PhaseChart byFasa={stats.byFasa} />
				</section>

				<section className="glass card span-5" aria-label="Aktiviti terkini">
					<h2 className="card-title">Aktiviti Terkini</h2>
					<p className="card-hint">Tugasan yang aktif atau baru selesai</p>
					<ActivityFeed tasks={tasks} />
				</section>

				<section className="glass card span-12" aria-label="Senarai semak">
					<h2 className="card-title">Senarai Semak UAV</h2>
					<p className="card-hint">
						Tapis mengikut fasa, status, atau cari aktiviti
					</p>
					<TaskTable tasks={tasks} fasaNames={stats.byFasa.map((f) => f.fasa)} />
				</section>
			</main>

			<footer className="foot">
				Sumber data: {source} · Import fail Excel/CSV berformat
				Template_Profesional_Pemprosesan_UAV untuk kemas kini penuh
			</footer>
		</div>
	)
}
