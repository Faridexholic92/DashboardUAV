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
		img: "https://commons.wikimedia.org/wiki/Special:FilePath/DJI%20Mavic%203.jpg?width=900",
		alt: "Dron DJI Mavic 3 sedang terbang",
	},
	{
		name: "DJI Mavic Air 2",
		role: "Peninjauan & dokumentasi",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/DJI_-_Drohne_Mavic_Air_2.JPG/1100px-DJI_-_Drohne_Mavic_Air_2.JPG",
		alt: "Dron DJI Mavic Air 2 sedang terbang",
	},
	{
		name: "DJI Phantom 4",
		role: "Pemetaan kawasan",
		img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/DJI_Phantom_4_Drone_%2832285759641%29.jpg/960px-DJI_Phantom_4_Drone_%2832285759641%29.jpg",
		alt: "Dron DJI Phantom 4",
	},
]

/** Foto hero — Mavic Air 2 di udara (Wikimedia Commons, CC BY-SA). */
export const HERO_IMG =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/DJI_-_Drohne_Mavic_Air_2.JPG/1100px-DJI_-_Drohne_Mavic_Air_2.JPG"
