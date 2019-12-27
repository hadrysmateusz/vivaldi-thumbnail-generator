import React from "react"
import styled, { css } from "styled-components/macro"

import SizePicker from "./SizePicker"
import ColorPicker from "./ColorPicker"
import { useSettings } from "./Generator"

const SettingsEditor = () => {
	let { values, editor, set } = useSettings()

	return (
		<Container visible={editor.isOpen}>
			<Label>Icon Size</Label>
			<SizePicker scale={values.scale} onChange={set.scale} />
			<Label>Background Color</Label>
			<ColorPicker value={values.bgColor} onChange={set.bgColor} />
		</Container>
	)
}

const Container = styled.div`
	${(p) =>
		p.visible
			? css`
					flex: 1 1 250px;
					min-width: 200px;
					max-width: 250px;
					opacity: 1;
					padding: 20px;
					margin-left: 20px;
			  `
			: css`
					display: none;
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
