import { useState } from "react"

export const useSettingsEditor = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const settingsEditor = Object.freeze({
		toggle: () => setIsSettingsOpen((val) => !val),
		close: () => setIsSettingsOpen(false),
		open: () => setIsSettingsOpen(true),
		isOpen: isSettingsOpen
	})

	return settingsEditor
}
