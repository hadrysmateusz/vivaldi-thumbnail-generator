import { useState, useMemo } from "react"

export const useSettingsManager = (defaultState) => {
	const [values, setValues] = useState(defaultState)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const settings = useMemo(() => {
		const settings = {
			// 'values' contains an object of settings values
			values: {},
			// 'set' contains an object of setters (with the same names as the values)
			set: {},
			// 'editor' contains methods for interacting with the settings editor menu and its state
			editor: {
				toggle: () => setIsSettingsOpen((val) => !val),
				close: () => setIsSettingsOpen(false),
				open: () => setIsSettingsOpen(true),
				isOpen: isSettingsOpen
			}
		}

		const createSetting = (name) => {
			settings.values[name] = values[name]
		}

		const createSetter = (name) => {
			settings.set[name] = (value) => {
				setValues((state) => ({
					...state,
					[name]: value
				}))
			}
		}

		Object.keys(defaultState).forEach((key) => createSetting(key))
		Object.keys(defaultState).forEach((key) => createSetter(key))

		return settings
	}, [defaultState, isSettingsOpen, values])

	return settings
}
