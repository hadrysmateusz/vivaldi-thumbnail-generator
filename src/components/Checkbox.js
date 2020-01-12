import React from "react"
import styled, { css } from "styled-components/macro"
import { ReactComponent as CheckIcon } from "../assets/checkmark.svg"

const Checkbox = ({ value, onChange }) => {
	return (
		<Container>
			<Input
				type="checkbox"
				id="trim-whitespace-checkbox"
				checked={value}
				onChange={onChange}
			/>
			<BoxContainer active={value}>{value && <CheckIcon />}</BoxContainer>
		</Container>
	)
}

const Container = styled.div`
	display: inline-block;
`

const Input = styled.input`
	display: none;
`

const activeStyles = css`
	background: var(--accent-color);
`

const inactiveStyles = css`
	background: white;
	border: 2px solid #bbb;
	:hover,
	:active {
		border-color: #a7a7a7;
	}
`

const BoxContainer = styled.div`
	width: 14px;
	height: 14px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	cursor: pointer;

	${(p) => (p.active ? activeStyles : inactiveStyles)}

	svg {
		path {
			fill: white;
		}
	}
`

export default Checkbox
