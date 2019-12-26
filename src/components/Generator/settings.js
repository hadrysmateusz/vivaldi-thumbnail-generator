import { useState, useMemo } from "react"

export const useSettingsManager = (defaultState) => {
	const [values, setValues] = useState(defaultState)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const settings = useMemo(() => {
		const settings = {}

		const createSetting = function(name) {
			Object.defineProperty(this, name, {
				enumerable: true,
				get: () => values[name],
				set: (val) => {
					setValues((state) => ({ ...state, [name]: val }))
				}
			})
		}.bind(settings)

		Object.keys(defaultState).forEach((key) => createSetting(key))

		/* add a non-enumerbale, immutable 'editor' property 
		hat contains methods and properties related to the settings editor */
		Object.defineProperty(settings, "editor", {
			writable: true,
			value: {
				toggle: () => setIsSettingsOpen((val) => !val),
				close: () => setIsSettingsOpen(false),
				open: () => setIsSettingsOpen(true),
				isOpen: isSettingsOpen
			}
		})

		return settings
	}, [defaultState, isSettingsOpen, values])

	return settings
}
