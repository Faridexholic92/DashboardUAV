"use client"

import { FLEET } from "@/lib/fleet"

export default function FleetCard() {
	return (
		<section className="glass card span-12" aria-label="Armada UAV">
			<h2 className="card-title">Armada UAV</h2>
			<p className="card-hint">
				Platform DJI unit — kemas kini senarai dalam lib/fleet.ts
			</p>
			<div className="fleet-grid">
				{FLEET.map((d) => (
					<figure className="fleet-tile" key={d.name}>
						<img
							className="fleet-img"
							src={d.img}
							alt={d.alt}
							loading="lazy"
							onError={(e) => {
								e.currentTarget.style.display = "none"
							}}
						/>
						<figcaption className="fleet-meta">
							<div className="fleet-name">{d.name}</div>
							<div className="fleet-role">{d.role}</div>
						</figcaption>
					</figure>
				))}
			</div>
		</section>
	)
}
