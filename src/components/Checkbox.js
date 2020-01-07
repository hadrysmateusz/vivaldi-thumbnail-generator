import React from "react"
import styled, { css } from "styled-components/macro"
import { ReactComponent as CheckIcon } from "../assets/checkmark.svg"

const Checkbox = ({ value, onChange }) => {
	console.log(value)
	return (
		<div>
			<Input
				type="checkbox"
				id="trim-whitespace-checkbox"
				checked={value}
				onChange={onChange}
			/>
			<BoxContainer active={value}>
				{value && <CheckIcon width={40} height={40} />}
			</BoxContainer>
		</div>
	)
}

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
	display: flex;
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
