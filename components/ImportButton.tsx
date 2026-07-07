"use client"

import { useRef, useState } from "react"
import { parseFile } from "@/lib/importFile"
import type { Task } from "@/lib/types"

export default function ImportButton({
	onImport,
	onError,
}: {
	onImport: (tasks: Task[], fileName: string) => void
	onError: (message: string) => void
}) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [dragover, setDragover] = useState(false)
	const [busy, setBusy] = useState(false)

	const handleFile = async (file: File | undefined | null) => {
		if (!file) return
		setBusy(true)
		try {
			const tasks = await parseFile(file)
			onImport(tasks, file.name)
		} catch (err) {
			onError(err instanceof Error ? err.message : "Fail tidak dapat dibaca.")
		} finally {
			setBusy(false)
			if (inputRef.current) inputRef.current.value = ""
		}
	}

	return (
		<>
			<button
				type="button"
				className={dragover ? "btn-primary dragover" : "btn-primary"}
				onClick={() => inputRef.current?.click()}
				onDragOver={(e) => {
					e.preventDefault()
					setDragover(true)
				}}
				onDragLeave={() => setDragover(false)}
				onDrop={(e) => {
					e.preventDefault()
					setDragover(false)
					handleFile(e.dataTransfer.files?.[0])
				}}
				disabled={busy}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M12 3v12" />
					<path d="m7 8 5-5 5 5" />
					<path d="M4 21h16" />
				</svg>
				{busy ? "Memproses…" : "Import Excel/CSV"}
			</button>
			<input
				ref={inputRef}
				type="file"
				accept=".xlsx,.xls,.csv"
				hidden
				onChange={(e) => handleFile(e.target.files?.[0])}
			/>
		</>
	)
}
