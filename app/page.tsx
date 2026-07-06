import { redirect } from "next/navigation"

// Halaman root diletakkan di luar route group (portal) untuk elak
// bug Next.js 14 di Vercel: ENOENT page_client-reference-manifest.js
// apabila route "/" berada terus dalam route group.
export default function Home() {
	redirect("/dashboard")
}
