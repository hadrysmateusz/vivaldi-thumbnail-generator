import { useState, useMemo } from "react"

export const useSettingsManager = (defaultState) => {
	const [values, setValues] = useState(defaultState)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const settings = useMemo(() => {
		const settings = {
			values: {},
			set: {},
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
