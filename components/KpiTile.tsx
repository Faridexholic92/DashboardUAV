export default function KpiTile({
	label,
	value,
	sub,
	color,
}: {
	label: string
	value: number | string
	sub?: string
	color: string
}) {
	return (
		<div className="glass kpi span-3">
			<div className="kpi-top">
				<span className="kpi-label">{label}</span>
				<span className="kpi-dot" style={ { background: color } } aria-hidden="true" />
			</div>
			<div className="kpi-value">{value}</div>
			{sub ? <div className="kpi-sub">{sub}</div> : null}
		</div>
	)
}
