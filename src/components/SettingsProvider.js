import React, { useState, createContext, useContext } from "react"

export const SettingsContext = createContext({})

export const useSettingsContext = () => useContext(SettingsContext)

const SettingsProvider = ({ children }) => {
	const [bgColor, setBgColor] = useState("#fff")
	const [scale, setScale] = useState(40)
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false)
	const [exportDimensions, setExportDimensions] = useState([1320, 1098]) // eslint-disable-line

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
				toggleSettings,
				exportDimensions,
				setExportDimensions
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

export default SettingsProvider
