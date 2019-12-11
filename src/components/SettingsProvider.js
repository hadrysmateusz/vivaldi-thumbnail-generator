import React, { useState, createContext, useContext } from "react"

export const SettingsContext = createContext({})

export const useSettingsContext = () => useContext(SettingsContext)

const SettingsProvider = ({ children }) => {
	const [bgColor, setBgColor] = useState("#fff")
	const [scale, setScale] = useState(45)
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false)
	// there is a max size for downloads and exceeding it will cause the download to fail, so the resolution needs to be kept pretty low
	const [exportDimensions, setExportDimensions] = useState([840, 700]) // eslint-disable-line

	const toggleSettings = () => {
		setIsSettingsDisplayed((prevValue) => !prevValue)
	}

	const closeSettings = () => {
		setIsSettingsDisplayed(false)
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
				closeSettings,
				exportDimensions,
				setExportDimensions
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

export default SettingsProvider
