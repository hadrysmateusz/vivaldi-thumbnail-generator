import React from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"

const SizePicker = ({ targetSize, setTargetSize }) => {
	const onChange = (value) => {
		setTargetSize(value)
	}

	return (
		<div style={{ margin: "30px 0" }}>
			{/* TODO: base the min and max values on the canvas size */}
			<InputRange maxValue={450} minValue={50} value={targetSize} onChange={onChange} />
		</div>
	)
}

export default SizePicker
