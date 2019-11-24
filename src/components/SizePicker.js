import React from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
import styled from "styled-components/macro"

const MIN = 1
const MAX = 100

const SizePicker = ({ scale, setScale }) => {
	const onChange = (value) => {
		setScale(value)
	}

	return (
		<Container>
			{/* TODO: base the min and max values on the canvas size */}
			<InputRange minValue={MIN} maxValue={MAX} value={scale} onChange={onChange} />
		</Container>
	)
}

const Container = styled.div`
	margin: 32px 0;
`

export default SizePicker
