import type { Insights } from "@/lib/insights"
import type { Task } from "@/lib/types"

function Group({
	title,
	items,
	color,
}: {
	title: string
	items: Task[]
	color: string
}) {
	if (items.length === 0) return null
	return (
		<div className="insight-group">
			<div className="insight-title">{title}</div>
			{items.map((t) => (
				<div className="insight-item" key={t.id}>
					<span
						className="feed-dot"
						style={ { background: color } }
						aria-hidden="true"
					/>
					<div className="feed-text">
						{t.aktiviti}
						<div className="feed-meta">
							{[t.fasa, t.pegawai, t.catatan].filter(Boolean).join(" · ")}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default function InsightsCard({ insights }: { insights: Insights }) {
	const empty =
		insights.tertangguh.length === 0 &&
		insights.dalamTindakan.length === 0 &&
		insights.seterusnya.length === 0 &&
		insights.baruSelesai.length === 0

	return (
		<section className="glass card span-5" aria-label="Fokus sekarang">
			<h2 className="card-title">Fokus Sekarang</h2>
			<p className="card-hint">Dijana automatik daripada status checklist</p>
			{empty ? (
				<div className="empty">Semua tugasan selesai — projek lengkap. 🎉</div>
			) : (
				<>
					<Group
						title="Perlu perhatian"
						items={insights.tertangguh}
						color="var(--orange)"
					/>
					<Group
						title="Sedang berjalan"
						items={insights.dalamTindakan}
						color="var(--blue)"
					/>
					<Group
						title="Seterusnya"
						items={insights.seterusnya}
						color="rgba(255,255,255,.45)"
					/>
					<Group
						title="Baru selesai"
						items={insights.baruSelesai}
						color="var(--green)"
					/>
				</>
			)}
		</section>
	)
}
