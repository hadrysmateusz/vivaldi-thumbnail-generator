import React, { useState, createContext, useContext } from "react"
import styled from "styled-components/macro"

import SizePicker from "./SizePicker"
import ColorPicker from "./ColorPicker"

export const SettingsContext = createContext({})

export const SettingsManager = ({ children }) => {
	const [bgColor, setBgColor] = useState("white")
	const [targetSize, setTargetSize] = useState(260)

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

export const SettingsEditor = () => {
	const { targetSize, setTargetSize, bgColor, setBgColor } = useContext(SettingsContext)

	return (
		<Container>
			<Label>Icon Size</Label>
			<SizePicker targetSize={targetSize} setTargetSize={setTargetSize} />
			<Label>Background Color</Label>
			<ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 5px;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
	padding: 20px;
	background: white;
	display: grid;
	justify-content: center;
	align-items: flex-start;
	align-content: flex-start;
`

const Label = styled.div`
	text-align: center;
	font-weight: bold;
	font-size: 18px;
	color: #222;
`
