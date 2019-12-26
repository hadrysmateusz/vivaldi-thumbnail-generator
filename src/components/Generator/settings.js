import { useState, useMemo } from "react"

export const useSettingsManager = (defaultState) => {
	const [values, setValues] = useState(defaultState)

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

		return settings
	}, [defaultState, values])

	return settings
}
