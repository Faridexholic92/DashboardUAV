import type { FasaStat } from "@/lib/stats"

export default function PhaseChart({
	byFasa,
	selected,
	onSelect,
}: {
	byFasa: FasaStat[]
	selected: string
	onSelect: (fasa: string) => void
}) {
	return (
		<div className="phase-list">
			{byFasa.map((f) => {
				const pct = f.total > 0 ? (f.selesai / f.total) * 100 : 0
				const isSel = selected === f.fasa
				return (
					<button
						type="button"
						key={f.fasa}
						className={
							"phase-row clickable" + (isSel ? " selected" : "")
						}
						onClick={() => onSelect(f.fasa)}
						title={`Klik untuk tapis jadual: ${f.fasa}`}
					>
						<span className="phase-name" title={f.fasa}>
							{f.fasa}
						</span>
						<span className="phase-track">
							<span
								className={
									"phase-fill" + (pct >= 100 ? " done" : "")
								}
								style={ { width: `${pct}%` } }
							/>
						</span>
						<span className="phase-count">
							{f.selesai}/{f.total}
						</span>
					</button>
				)
			})}
		</div>
	)
}
