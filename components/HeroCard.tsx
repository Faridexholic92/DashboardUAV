"use client"

import type { Stats } from "@/lib/stats"
import { HERO_IMG } from "@/lib/fleet"
import SafeImg from "@/components/SafeImg"

export default function HeroCard({ stats }: { stats: Stats }) {
	return (
		<section className="hero span-8" aria-label="Ringkasan kemajuan">
			{/* Laluan penerbangan dron (hiasan) */}
			<svg
				className="hero-rings"
				width="300"
				height="260"
				viewBox="0 0 300 260"
				fill="none"
				aria-hidden="true"
			>
				{/* zon orbit */}
				<circle
					cx="70"
					cy="185"
					r="34"
					stroke="rgba(255,255,255,.12)"
					strokeDasharray="3 6"
				/>
				{/* laluan penerbangan */}
				<path
					d="M 20 225 C 90 195, 95 120, 160 100 C 210 85, 235 70, 262 38"
					stroke="rgba(94,159,232,.55)"
					strokeWidth="2"
					strokeDasharray="7 8"
					strokeLinecap="round"
				/>
				{/* waypoint */}
				<circle cx="20" cy="225" r="4" fill="rgba(94,159,232,.9)" />
				<circle cx="20" cy="225" r="9" stroke="rgba(94,159,232,.35)" />
				<circle cx="124" cy="113" r="3.5" fill="rgba(255,255,255,.55)" />
				<circle cx="210" cy="85" r="3.5" fill="rgba(255,255,255,.55)" />
				{/* crosshair sasaran */}
				<g stroke="rgba(79,185,201,.6)" strokeLinecap="round">
					<circle cx="160" cy="100" r="8" fill="none" />
					<path d="M160 88v6M160 106v6M148 100h6M166 100h6" />
				</g>
				{/* dron di hujung laluan */}
				<g
					stroke="rgba(255,255,255,.85)"
					strokeWidth="1.6"
					strokeLinecap="round"
					fill="none"
				>
					<circle cx="252" cy="28" r="5" />
					<circle cx="276" cy="28" r="5" />
					<circle cx="252" cy="50" r="5" />
					<circle cx="276" cy="50" r="5" />
					<path d="M255.5 31.5 261 37M272.5 31.5 267 37M255.5 46.5 261 41M272.5 46.5 267 41" />
					<rect x="261" y="36" width="6" height="6" rx="1.6" />
				</g>
			</svg>

			{/* Foto dron DJI (Wikimedia Commons, CC) */}
			<SafeImg
				className="hero-drone"
				src={HERO_IMG}
				alt="Dron DJI Mavic Air 2 sedang terbang"
			/>

			<div className="eyebrow">
				<span className="live-dot" aria-hidden="true" />
				Dashboard Kemajuan UAV
			</div>
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
						<div
							className="progress-fill"
							style={ { width: `${stats.pct}%` } }
						/>
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
