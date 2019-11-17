import React from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
import throttle from "lodash.throttle"

const SizePicker = ({ targetSize, setTargetSize }) => {
	const throttledUpdate = throttle(setTargetSize, 500, { leading: true })

	const onChange = (value) => {
		throttledUpdate(value)
	}

	return (
		<div style={{ margin: "30px 0" }}>
			{/* TODO: base the min and max values on the canvas size */}
			<InputRange maxValue={400} minValue={20} value={targetSize} onChange={onChange} />
		</div>
	)
}

export default SizePicker
