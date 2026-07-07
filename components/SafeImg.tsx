"use client"

import { useEffect, useState } from "react"

/**
 * Imej yang selamat: hanya dirender selepas hydration supaya handler onError
 * sentiasa aktif. Jika imej gagal dimuat, ia disembunyikan terus — tiada
 * ikon imej rosak atau alt text terpampang.
 */
export default function SafeImg({
	src,
	alt,
	className,
}: {
	src: string
	alt: string
	className?: string
}) {
	const [mounted, setMounted] = useState(false)
	const [failed, setFailed] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted || failed) return null

	return (
		<img
			className={className}
			src={src}
			alt={alt}
			loading="lazy"
			onError={() => setFailed(true)}
		/>
	)
}
