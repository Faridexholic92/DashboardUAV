"use client"

import ImportButton from "@/components/ImportButton"
import { exportCsv } from "@/lib/exportCsv"
import type { Task } from "@/lib/types"

export default function DataToolbar({
	tasks,
	source,
	onImport,
	onReset,
	onError,
}: {
	tasks: Task[]
	source: string
	onImport: (tasks: Task[], fileName: string) => void
	onReset: () => void
	onError: (msg: string | null) => void
}) {
	return (
		<div className="toolbar">
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
				onClick={onReset}
				title="Kembali ke templat asal"
			>
				Reset
			</button>
			<ImportButton onImport={onImport} onError={onError} />
		</div>
	)
}
