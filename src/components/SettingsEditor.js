import React from "react"
import styled, { css } from "styled-components/macro"

import SizePicker from "./SizePicker"
import ColorPicker from "./ColorPicker"
import { useSettingsContext } from "./SettingsProvider"

const SettingsEditor = () => {
	const {
		scale,
		setScale,
		bgColor,
		setBgColor,
		isSettingsDisplayed
	} = useSettingsContext()

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
					flex: 1 1 240px;
					min-width: 200px;
					opacity: 1;
					padding: 20px;
					margin-left: 20px;
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

export default SettingsEditor
