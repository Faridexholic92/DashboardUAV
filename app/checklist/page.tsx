"use client"

import PortalShell from "@/components/PortalShell"
import DataToolbar from "@/components/DataToolbar"
import PipelineStepper from "@/components/PipelineStepper"
import TaskTable from "@/components/TaskTable"
import { useTasks } from "@/hooks/useTasks"
import { FASA_ORDER } from "@/lib/types"

export default function ChecklistPage() {
	const t = useTasks()

	return (
		<PortalShell>
			<div className="page-head">
				<div>
					<h1 className="page-title">Checklist</h1>
					<p className="page-sub">
						Senarai semak penuh — 36 tugasan merentas 8 fasa kerja
					</p>
				</div>
				<DataToolbar
					tasks={t.tasks}
					source={t.source}
					onImport={t.handleImport}
					onReset={t.handleReset}
					onError={t.setError}
				/>
			</div>

			{t.error && (
				<div className="alert" role="alert">
					{t.error}
				</div>
			)}

			<main className="grid">
				<PipelineStepper
					byFasa={t.stats.byFasa}
					selected={t.fasaFilter}
					onSelect={t.toggleFasa}
				/>

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
		</PortalShell>
	)
}
