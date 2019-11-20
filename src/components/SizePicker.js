import React from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"

const EXT_MIN = 100
const EXT_MAX = 500
const LOC_MIN = 1
const LOC_MAX = 100

const toExternal = (val) => {
	return Math.round(val * ((EXT_MAX - EXT_MIN) / (LOC_MAX - LOC_MIN)) + EXT_MIN)
}

const toLocal = (val) => {
	return Math.round((val - EXT_MIN) / ((EXT_MAX - EXT_MIN) / (LOC_MAX - LOC_MIN)))
}

const SizePicker = ({ targetSize, setTargetSize }) => {
	const onChange = (value) => {
		setTargetSize(toExternal(value))
	}

	return (
		<div style={{ margin: "30px 0" }}>
			{/* TODO: base the min and max values on the canvas size */}
			<InputRange
				minValue={LOC_MIN}
				maxValue={LOC_MAX}
				value={toLocal(targetSize)}
				onChange={onChange}
			/>
		</div>
	)
}

export default SizePicker
