"use client"

import PortalShell from "@/components/PortalShell"
import FleetCard from "@/components/FleetCard"

export default function ArmadaPage() {
	return (
		<PortalShell>
			<div className="page-head">
				<div>
					<h1 className="page-title">Armada</h1>
					<p className="page-sub">
						Platform UAV unit — edit senarai dalam lib/fleet.ts
					</p>
				</div>
			</div>

			<main className="grid">
				<FleetCard />

				<section className="glass card span-12" aria-label="Nota armada">
					<h2 className="card-title">Guna foto dron sendiri</h2>
					<p className="card-hint">
						Letak fail imej dalam folder public/ (cth.
						public/dron-saya.jpg) dan tukar nilai img dalam lib/fleet.ts
						kepada /dron-saya.jpg. Imej lalai ialah foto dron DJI dari
						Wikimedia Commons (lesen Creative Commons).
					</p>
				</section>
			</main>

			<footer className="foot">
				Imej dron: Wikimedia Commons (lesen Creative Commons)
			</footer>
		</PortalShell>
	)
}
