import { STATUS_COLORS, type Task } from "@/lib/types"

export default function ActivityFeed({ tasks }: { tasks: Task[] }) {
	const items = tasks
		.filter((t) => t.status !== "Belum Mula")
		.slice(-6)
		.reverse()

	if (items.length === 0) {
		return <div className="empty">Tiada aktiviti lagi — semua tugasan belum mula.</div>
	}

	return (
		<div className="feed">
			{items.map((t) => (
				<div className="feed-item" key={t.id}>
					<span
						className="feed-dot"
						style={ { background: STATUS_COLORS[t.status] } }
						aria-hidden="true"
					/>
					<div className="feed-text">
						{t.aktiviti}
						<div className="feed-meta">
							{t.status}
							{t.pegawai ? ` · ${t.pegawai}` : ""}
							{t.catatan ? ` · ${t.catatan}` : ""}
						</div>
					</div>
					<span className="feed-date">{t.tarikhSiap || t.tarikhMula || "—"}</span>
				</div>
			))}
		</div>
	)
}
