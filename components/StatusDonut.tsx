export interface DonutSegment {
	label: string
	value: number
	color: string
}

const R = 60
const C = 2 * Math.PI * R

export default function StatusDonut({
	segments,
	pct,
	selected,
	onSelect,
}: {
	segments: DonutSegment[]
	pct: number
	selected: string
	onSelect: (status: string) => void
}) {
	const total = segments.reduce((s, x) => s + x.value, 0)
	let offset = 0

	return (
		<div className="donut-wrap">
			<div className="donut">
				<svg width="150" height="150" viewBox="0 0 150 150" role="img" aria-label={`${pct}% selesai`}>
					<g transform="rotate(-90 75 75)">
						<circle
							cx="75"
							cy="75"
							r={R}
							fill="none"
							stroke="rgba(255,255,255,.07)"
							strokeWidth="14"
						/>
						{segments.map((s) => {
							const frac = total > 0 ? s.value / total : 0
							const len = frac * C
							const el =
								s.value > 0 ? (
									<circle
										key={s.label}
										cx="75"
										cy="75"
										r={R}
										fill="none"
										stroke={s.color}
										strokeWidth="14"
										strokeDasharray={`${len.toFixed(2)} ${(C - len).toFixed(2)}`}
										strokeDashoffset={(-offset).toFixed(2)}
									/>
								) : null
							offset += len
							return el
						})}
					</g>
				</svg>
				<div className="donut-center">
					<div className="v">{pct}%</div>
					<div className="l">selesai</div>
				</div>
			</div>
			<div className="legend">
				{segments.map((s) => (
					<button
						type="button"
						key={s.label}
						className={
							"legend-btn" + (selected === s.label ? " selected" : "")
						}
						onClick={() => onSelect(s.label)}
						title={`Klik untuk tapis jadual: ${s.label}`}
					>
						<span
							className="legend-dot"
							style={ { background: s.color } }
							aria-hidden="true"
						/>
						{s.label}
						<b>{s.value}</b>
					</button>
				))}
			</div>
		</div>
	)
}
