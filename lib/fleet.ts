/**
 * Armada UAV — edit senarai ini ikut armada sebenar unit anda.
 * Imej lalai: foto dron DJI dari Wikimedia Commons (lesen Creative Commons).
 * Gantikan `img` dengan foto sendiri (letak dalam folder /public dan guna
 * laluan seperti "/dron-saya.jpg") bila-bila masa.
 */
export interface FleetItem {
	name: string
	role: string
	img: string
	alt: string
}

export const FLEET: FleetItem[] = [
	{
		name: "DJI Mavic 3",
		role: "Fotogrametri utama",
		img: "https://commons.wikimedia.org/wiki/Special:FilePath/DJI%20Mavic%203.jpg?width=1280",
		alt: "Dron DJI Mavic 3 sedang terbang",
	},
	{
		name: "DJI Mavic Air 2",
		role: "Peninjauan & dokumentasi",
		img: "https://commons.wikimedia.org/wiki/Special:FilePath/DJI%20-%20Drohne%20Mavic%20Air%202.JPG?width=1100",
		alt: "Dron DJI Mavic Air 2 sedang terbang",
	},
	{
		name: "DJI Phantom 4",
		role: "Pemetaan kawasan",
		img: "https://commons.wikimedia.org/wiki/Special:FilePath/DJI%20Phantom%204%20Drone%20(32285759641).jpg?width=960",
		alt: "Dron DJI Phantom 4",
	},
]

/** Foto hero — Mavic Air 2 di udara (Wikimedia Commons, CC BY-SA). */
export const HERO_IMG =
	"https://commons.wikimedia.org/wiki/Special:FilePath/DJI%20-%20Drohne%20Mavic%20Air%202.JPG?width=1100"
