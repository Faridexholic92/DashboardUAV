import type { FasaStat } from "@/lib/stats"

export default function PhaseChart({ byFasa }: { byFasa: FasaStat[] }) {
	return (
		<div className="phase-list">
			{byFasa.map((f) => {
				const pct = f.total > 0 ? (f.selesai / f.total) * 100 : 0
				const done = f.total > 0 && f.selesai === f.total
				return (
					<div className="phase-row" key={f.fasa}>
						<span className="phase-name" title={f.fasa}>
							{f.fasa}
						</span>
						<div className="phase-track">
							<div
								className={done ? "phase-fill done" : "phase-fill"}
								style={{ width: `${pct}%` }}
							/>
						</div>
						<span className="phase-count">
							{f.selesai}/{f.total}
						</span>
					</div>
				)
			})}
		</div>
	)
}
