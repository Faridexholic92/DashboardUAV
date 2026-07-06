import type { FasaStat } from "@/lib/stats"

export default function PipelineStepper({
	byFasa,
	selected,
	onSelect,
}: {
	byFasa: FasaStat[]
	selected: string
	onSelect: (fasa: string) => void
}) {
	const firstActive = byFasa.findIndex((f) => f.selesai < f.total)

	return (
		<section className="glass card span-12" aria-label="Aliran fasa kerja">
			<div className="stepper">
				{byFasa.map((f, i) => {
					const done = f.total > 0 && f.selesai === f.total
					const active = i === firstActive
					const prev = i > 0 ? byFasa[i - 1] : null
					const prevDone =
						prev !== null && prev.total > 0 && prev.selesai === prev.total
					const cls = [
						"step",
						done ? "done" : active ? "active" : "pending",
						prevDone ? "line-done" : "",
						selected === f.fasa ? "selected" : "",
					]
						.filter(Boolean)
						.join(" ")
					return (
						<button
							type="button"
							key={f.fasa}
							className={cls}
							onClick={() => onSelect(f.fasa)}
							title={`${f.fasa}: ${f.selesai}/${f.total} selesai — klik untuk tapis`}
						>
							<span className="step-dot">{done ? "✓" : i + 1}</span>
							<span className="step-label">{f.fasa}</span>
							<span className="step-count">
								{f.selesai}/{f.total}
							</span>
						</button>
					)
				})}
			</div>
		</section>
	)
}
