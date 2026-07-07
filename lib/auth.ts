/**
 * Auth mod demo — sesi disimpan dalam localStorage pelayar sahaja.
 * Tiada data dihantar ke server. Untuk produksi, gantikan dengan
 * penyelesaian sebenar seperti NextAuth.js / Auth.js.
 */
export interface Session {
	name: string
	email: string
	loginAt: string
}

const KEY = "uav-portal-session"

export function getSession(): Session | null {
	if (typeof window === "undefined") return null
	try {
		const raw = window.localStorage.getItem(KEY)
		return raw ? (JSON.parse(raw) as Session) : null
	} catch {
		return null
	}
}

export function login(email: string, name?: string): Session {
	const fallback = email.split("@")[0] || "Operator"
	const session: Session = {
		name: (name || "").trim() || fallback,
		email,
		loginAt: new Date().toISOString(),
	}
	try {
		window.localStorage.setItem(KEY, JSON.stringify(session))
	} catch {
		// abaikan — mod privasi / storage penuh
	}
	return session
}

export function logout(): void {
	try {
		window.localStorage.removeItem(KEY)
	} catch {
		// abaikan
	}
}

export function updateName(name: string): Session | null {
	const s = getSession()
	if (!s) return null
	const next = { ...s, name: name.trim() || s.name }
	try {
		window.localStorage.setItem(KEY, JSON.stringify(next))
	} catch {
		// abaikan
	}
	return next
}
