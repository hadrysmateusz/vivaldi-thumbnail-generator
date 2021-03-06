import React from "react"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
import styled from "styled-components/macro"

const MIN = 1
const MAX = 100

const SizePicker = ({ scale, onChange }) => {
	return (
		<Container>
			<InputRange minValue={MIN} maxValue={MAX} value={scale} onChange={onChange} />
		</Container>
	)
}

const Container = styled.div`
	margin: 32px 0;

	.input-range__slider {
		background: var(--accent-color);
		border-color: var(--accent-color);
	}
	.input-range__track--active {
		background: var(--accent-color);
	}
`

export default SizePicker
