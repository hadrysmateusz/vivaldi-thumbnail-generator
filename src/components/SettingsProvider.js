import React, { useState, createContext, useContext } from "react"

export const SettingsContext = createContext({})

export const useSettingsContext = () => useContext(SettingsContext)

const SettingsProvider = ({ children }) => {
	const [bgColor, setBgColor] = useState("#fff")
	const [scale, setScale] = useState(40)
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false)

	const toggleSettings = () => {
		setIsSettingsDisplayed((prevValue) => !prevValue)
	}

	return (
		<SettingsContext.Provider
			value={{
				bgColor,
				setBgColor,
				scale,
				setScale,
				isSettingsDisplayed,
				toggleSettings
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

export default SettingsProvider
