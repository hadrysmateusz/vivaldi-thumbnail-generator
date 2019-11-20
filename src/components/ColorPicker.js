import React from "react"
import { ChromePicker } from "react-color"

const ColorPicker = ({ bgColor, setBgColor }) => {
	const onColorChange = (color) => {
		setBgColor(color.hex)
	}

	return <ChromePicker onChangeComplete={onColorChange} color={bgColor} disableAlpha />
}

export default ColorPicker
