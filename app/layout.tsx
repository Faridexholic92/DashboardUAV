import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
	title: "UAV Ops Portal",
	description:
		"Portal operasi UAV — dashboard kemajuan, checklist, armada dan laporan pemprosesan data fotogrametri.",
}

const themeInit =
	'try{if(localStorage.getItem("uav-portal-theme")==="light"){document.documentElement.setAttribute("data-theme","light")}}catch(e){}'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="ms" suppressHydrationWarning>
			<head>
				{/* Elak kelipan tema semasa muat — set data-theme sebelum render */}
				<script dangerouslySetInnerHTML={ { __html: themeInit } } />
			</head>
			<body>{children}</body>
		</html>
	)
}
