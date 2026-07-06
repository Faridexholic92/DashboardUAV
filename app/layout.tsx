import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "UAV Ops Console — Dashboard Kemajuan",
	description:
		"Dashboard kemajuan pemprosesan data UAV — checklist, status fasa dan import Excel/CSV.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ms">
			<body>{children}</body>
		</html>
	)
}
