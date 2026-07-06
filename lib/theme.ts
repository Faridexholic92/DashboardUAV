export type Theme = "dark" | "light"

const KEY = "uav-portal-theme"

export function getTheme(): Theme {
	if (typeof window === "undefined") return "dark"
	try {
		return window.localStorage.getItem(KEY) === "light" ? "light" : "dark"
	} catch {
		return "dark"
	}
}

export function applyTheme(theme: Theme): void {
	if (theme === "light") {
		document.documentElement.setAttribute("data-theme", "light")
	} else {
		document.documentElement.removeAttribute("data-theme")
	}
	try {
		window.localStorage.setItem(KEY, theme)
	} catch {
		// abaikan
	}
}
