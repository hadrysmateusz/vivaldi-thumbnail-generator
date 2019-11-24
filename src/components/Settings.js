import React, { useState, createContext, useContext } from "react"
import styled, { css } from "styled-components/macro"

import SizePicker from "./SizePicker"
import ColorPicker from "./ColorPicker"

export const SettingsContext = createContext({})

export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsManager = ({ children }) => {
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

export const SettingsEditor = () => {
	const { scale, setScale, bgColor, setBgColor, isSettingsDisplayed } = useContext(
		SettingsContext
	)

	return (
		<Container visible={isSettingsDisplayed}>
			<Label>Icon Size</Label>
			<SizePicker scale={scale} setScale={setScale} />
			<Label>Background Color</Label>
			<ColorPicker value={bgColor} onChange={setBgColor} />
		</Container>
	)
}

const Container = styled.div`
	${(p) =>
		p.visible
			? css`
					flex: 1;
					opacity: 1;
					margin-left: 20px;
					padding: 20px;
			  `
			: css`
					opacity: 0;
					width: 0;
			  `}

	height: 100%;
	border-radius: 5px;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);

	background: white;
	text-align: center;
`

const Label = styled.div`
	font-weight: bold;
	font-size: 18px;
	color: #383838;
`
