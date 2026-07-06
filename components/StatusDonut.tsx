export interface DonutSegment {
	label: string
	value: number
	color: string
}

const R = 60
const C = 2 * Math.PI * R

export default function StatusDonut({
	segments,
	centerValue,
	centerLabel,
}: {
	segments: DonutSegment[]
	centerValue: string
	centerLabel: string
}) {
	const total = segments.reduce((a, s) => a + s.value, 0) || 1
	let cum = 0

	return (
		<div className="donut-wrap">
			<div className="donut">
				<svg width="150" height="150" viewBox="0 0 150 150" role="img" aria-label={`Status tugasan: ${segments.map((s) => `${s.label} ${s.value}`).join(", ")}`}>
					<g transform="rotate(-90 75 75)">
						<circle
							cx="75"
							cy="75"
							r={R}
							fill="none"
							stroke="rgba(255,255,255,.07)"
							strokeWidth="14"
						/>
						{segments
							.filter((s) => s.value > 0)
							.map((s) => {
								const len = (s.value / total) * C
								const offset = -cum
								cum += len
								return (
									<circle
										key={s.label}
										cx="75"
										cy="75"
										r={R}
										fill="none"
										stroke={s.color}
										strokeWidth="14"
										strokeDasharray={`${len} ${C - len}`}
										strokeDashoffset={offset}
									/>
								)
							})}
					</g>
				</svg>
				<div className="donut-center">
					<div className="v">{centerValue}</div>
					<div className="l">{centerLabel}</div>
				</div>
			</div>

			<div className="legend">
				{segments.map((s) => (
					<div className="legend-item" key={s.label}>
						<span className="legend-dot" style={ { background: s.color } } />
						{s.label}
						<b>{s.value}</b>
					</div>
				))}
			</div>
		</div>
	)
}
