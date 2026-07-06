import type { Task } from "./types"

const KEY = "uav-ops-dashboard-v1"

export interface SavedState {
	tasks: Task[]
	source: string
}

/** Baca keadaan tersimpan dari localStorage (null jika tiada/rosak). */
export function loadState(): SavedState | null {
	if (typeof window === "undefined") return null
	try {
		const raw = window.localStorage.getItem(KEY)
		if (!raw) return null
		const parsed = JSON.parse(raw) as SavedState
		if (!Array.isArray(parsed.tasks) || typeof parsed.source !== "string") {
			return null
		}
		return parsed
	} catch {
		return null
	}
}

export function saveState(state: SavedState): void {
	try {
		window.localStorage.setItem(KEY, JSON.stringify(state))
	} catch {
		// storan penuh / mod privasi — abaikan
	}
}

export function clearState(): void {
	try {
		window.localStorage.removeItem(KEY)
	} catch {
		// abaikan
	}
}
