import type { Stats } from "@/lib/stats"

export default function HeroCard({ stats }: { stats: Stats }) {
	return (
		<section className="hero span-8" aria-label="Ringkasan kemajuan">
			<svg
				className="hero-rings"
				width="260"
				height="260"
				viewBox="0 0 260 260"
				fill="none"
				aria-hidden="true"
			>
				<circle cx="130" cy="130" r="60" stroke="rgba(255,255,255,.14)" />
				<circle cx="130" cy="130" r="92" stroke="rgba(255,255,255,.10)" />
				<circle cx="130" cy="130" r="124" stroke="rgba(255,255,255,.06)" />
			</svg>

			<div className="eyebrow">Dashboard Kemajuan UAV</div>
			<h1>Pemprosesan Data Fotogrametri</h1>
			<p className="hero-desc">
				Pemantauan checklist operasi UAV — dari perancangan &amp; permit
				sehingga pemprosesan, QA/QC dan arkib.
			</p>

			<div className="hero-body">
				<div>
					<div className="hero-pct">
						{stats.pct}
						<span>%</span>
					</div>
					<div className="progress-label">Kemajuan keseluruhan</div>
					<div
						className="progress-track"
						role="progressbar"
						aria-valuenow={stats.pct}
						aria-valuemin={0}
						aria-valuemax={100}
					>
						<div className="progress-fill" style={{ width: `${stats.pct}%` }} />
					</div>
				</div>

				<div className="hero-stats">
					<div className="hero-stat">
						<div className="v">
							{stats.byStatus.Selesai}/{stats.total}
						</div>
						<div className="l">Tugasan selesai</div>
					</div>
					<div className="hero-stat">
						<div className="v">{stats.fasaAktif}</div>
						<div className="l">Fasa aktif</div>
					</div>
					<div className="hero-stat">
						<div className="v">{stats.byStatus.Tertangguh}</div>
						<div className="l">Tertangguh</div>
					</div>
				</div>
			</div>
		</section>
	)
}
