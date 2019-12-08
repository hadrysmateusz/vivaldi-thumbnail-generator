import React, { useState } from "react"
import { ChromePicker } from "react-color"
import styled from "styled-components/macro"

const ColorPicker = ({ value, onChange }) => {
	const [isPickerDisplayed, setIsPickerDisplayed] = useState(false)

	const onColorChange = (color) => {
		const { r, g, b, a } = color.rgb
		onChange(`rgba(${r},${g},${b},${a})`)
	}

	const displayPicker = () => {
		setIsPickerDisplayed(true)
	}

	const hidePicker = () => {
		setIsPickerDisplayed(false)
	}

	return (
		<Container>
			<Swatch onClick={displayPicker}>
				<Color color={value} />
			</Swatch>
			{isPickerDisplayed ? (
				<Popover>
					<Cover onClick={hidePicker} />
					<ChromePicker onChangeComplete={onColorChange} color={value} />
				</Popover>
			) : null}
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	margin: 16px 0;
	width: 100%;
`

const Color = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 2px;
	background: ${(p) => p.color};
`

const Swatch = styled.div`
	padding: 5px;
	width: 40px;
	height: 40px;
	margin: 0 auto;
	background: white;
	border-radius: 3px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	cursor: pointer;
`

const Popover = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	position: absolute;
	top: calc(16px + 100%);
	z-index: 2;
`

const Cover = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`

export default ColorPicker
