import React, { useState, createContext, useContext } from "react"
import styled from "styled-components/macro"

import SizePicker from "./SizePicker"
import ColorPicker from "./ColorPicker"

export const SettingsContext = createContext({})

export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsManager = ({ children }) => {
	const [bgColor, setBgColor] = useState("#fff")
	const [targetSize, setTargetSize] = useState(260)
	const [isSettingsDisplayed, setIsSettingsDisplayed] = useState(false)

	const toggleSettings = () => {
		setIsSettingsDisplayed((prevValue) => !prevValue)
	}

	return (
		<SettingsContext.Provider
			value={{
				bgColor,
				setBgColor,
				targetSize,
				setTargetSize,
				isSettingsDisplayed,
				toggleSettings
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}

export const SettingsEditor = () => {
	const {
		targetSize,
		setTargetSize,
		bgColor,
		setBgColor,
		isSettingsDisplayed
	} = useContext(SettingsContext)

	return (
		<Container visible={isSettingsDisplayed}>
			<Label>Icon Size</Label>
			<SizePicker targetSize={targetSize} setTargetSize={setTargetSize} />
			<Label>Background Color</Label>
			<ColorPicker value={bgColor} onChange={setBgColor} />
		</Container>
	)
}

const Container = styled.div`
	${(p) => (p.visible ? "flex: 1;opacity: 1;margin-left: 20px;" : "opacity: 0;width: 0;")}

	height: 100%;
	border-radius: 5px;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
	padding: 20px;
	background: white;
	text-align: center;
`

const Label = styled.div`
	font-weight: bold;
	font-size: 18px;
	color: #383838;
`
