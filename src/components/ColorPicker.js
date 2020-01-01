import React, { useState, useEffect } from "react"
import { ChromePicker } from "react-color"
import styled from "styled-components/macro"
import { useThumbnails } from "./Generator"
import ColorThief from "colorthief/dist/color-thief.mjs"
import transparency from "../assets/transparency.png"

const presetSwatches = ["#111", "#2b2b2b", "#fff", "transparent"]

const ColorPicker = ({ value, onChange }) => {
	const [isPickerDisplayed, setIsPickerDisplayed] = useState(false)
	const [swatches, setSwatches] = useState([])
	const { selected } = useThumbnails()

	useEffect(() => {
		try {
			if (!selected || !selected) return
			const colorThief = new ColorThief()
			const COLOR_COUNT = 4
			const palette = colorThief.getPalette(selected.image, COLOR_COUNT)
			const swatches = palette.reduce((acc, color) => {
				const hex = rgbToHex(...color)
				if (!acc.includes(hex)) {
					return [...acc, hex]
				} else {
					return acc
				}
			}, presetSwatches)
			setSwatches(swatches)
		} catch (error) {
			console.error(error)
			setSwatches([])
		}
	}, [selected])

	const onColorChange = (color) => {
		const { r, g, b, a } = color.rgb // uses the color object from react-color
		onChange(`rgba(${r},${g},${b},${a})`)
	}

	const onPickSwatch = (color) => {
		// uses a hex color from the palette
		console.log(color)
		onChange(color)
	}

	const displayPicker = () => {
		setIsPickerDisplayed(true)
	}

	const hidePicker = () => {
		setIsPickerDisplayed(false)
	}

	return (
		<Container>
			<SwatchesContainer>
				{swatches.map((color) => (
					<Swatch onClick={() => onPickSwatch(color)}>
						<Color color={color} />
					</Swatch>
				))}
			</SwatchesContainer>
			<CustomContainer onClick={displayPicker}>
				<Swatch>
					<Color color={value} />
				</Swatch>
				<div>Pick Custom Color</div>
			</CustomContainer>
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

const CustomContainer = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 16px;
	align-items: center;
	justify-items: start;
	font-weight: bold;
	color: #666;
	:hover {
		color: black;
	}
	cursor: pointer;
`

const SwatchesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-columns: 40px;
	gap: 14px;
	margin-bottom: 16px;
`

const Color = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 2px;
	background: ${(p) => (p.color === "transparent" ? `url(${transparency})` : p.color)};
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
	z-index: 900;
`

const Cover = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`

const rgbToHex = (r, g, b) =>
	"#" +
	[r, g, b]
		.map((x) => {
			const hex = x.toString(16)
			return hex.length === 1 ? "0" + hex : hex
		})
		.join("")

export default ColorPicker
