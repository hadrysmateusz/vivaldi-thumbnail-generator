import React, { useState, createContext, useContext } from "react"
import styled from "styled-components"

import SizePicker from "./SizePicker"
import ColorPicker from "./ColorPicker"

export const SettingsContext = createContext({})

export const SettingsEditor = () => {
	const { targetSize, setTargetSize, bgColor, setBgColor } = useContext(SettingsContext)

	return (
		<Container>
			<SizePicker targetSize={targetSize} setTargetSize={setTargetSize} />
			<ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
		</Container>
	)
}

export const SettingsProvider = ({ children }) => {
	const [bgColor, setBgColor] = useState("white")
	const [targetSize, setTargetSize] = useState(300)

	return (
		<SettingsContext.Provider
			value={{
				bgColor,
				setBgColor,
				targetSize,
				setTargetSize
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

const Container = styled.div``
