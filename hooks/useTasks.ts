"use client"

import { useEffect, useMemo, useState } from "react"
import { DEFAULT_TASKS } from "@/lib/data"
import { computeInsights } from "@/lib/insights"
import { computeStats } from "@/lib/stats"
import { clearState, loadState, saveState } from "@/lib/storage"
import type { Status, Task } from "@/lib/types"

export const SOURCE_DEFAULT = "Templat asal — belum dikemas kini"

/**
 * Keadaan tugasan yang dikongsi antara halaman portal.
 * Dimuat dari localStorage semasa mount dan auto-save setiap perubahan.
 */
export function useTasks() {
	const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS)
	const [source, setSource] = useState(SOURCE_DEFAULT)
	const [error, setError] = useState<string | null>(null)
	const [hydrated, setHydrated] = useState(false)
	const [fasaFilter, setFasaFilter] = useState("Semua")
	const [statusFilter, setStatusFilter] = useState("Semua")

	useEffect(() => {
		const saved = loadState()
		if (saved) {
			setTasks(saved.tasks)
			setSource(saved.source)
		}
		setHydrated(true)
	}, [])

	useEffect(() => {
		if (hydrated) saveState({ tasks, source })
	}, [tasks, source, hydrated])

	const stats = useMemo(() => computeStats(tasks), [tasks])
	const insights = useMemo(() => computeInsights(tasks), [tasks])

	const handleImport = (imported: Task[], fileName: string) => {
		setTasks(imported)
		setSource(fileName)
		setError(null)
		setFasaFilter("Semua")
		setStatusFilter("Semua")
	}

	const handleReset = () => {
		setTasks(DEFAULT_TASKS)
		setSource(SOURCE_DEFAULT)
		setError(null)
		setFasaFilter("Semua")
		setStatusFilter("Semua")
		clearState()
	}

	const handleTaskStatus = (id: string, status: Status) => {
		setTasks((prev) =>
			prev.map((t) => (t.id === id ? { ...t, status } : t)),
		)
		if (source === SOURCE_DEFAULT) setSource("Diedit dalam dashboard")
	}

	const toggleFasa = (fasa: string) =>
		setFasaFilter((prev) => (prev === fasa ? "Semua" : fasa))

	const toggleStatus = (status: string) =>
		setStatusFilter((prev) => (prev === status ? "Semua" : status))

	return {
		tasks,
		source,
		error,
		setError,
		hydrated,
		stats,
		insights,
		fasaFilter,
		statusFilter,
		setFasaFilter,
		setStatusFilter,
		toggleFasa,
		toggleStatus,
		handleImport,
		handleReset,
		handleTaskStatus,
	}
}
