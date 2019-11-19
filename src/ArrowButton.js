import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components/macro"
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg"

const directions = {
	right: {
		title: "next",
		rotation: "0deg"
	},
	left: {
		title: "previous",
		rotation: "180deg"
	}
}

const StyledButton = styled.button`
	top: calc(50% - ${(p) => p.size});
	position: absolute;
	${(p) => p.direction}: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(p) => p.size};
	height: ${(p) => p.size};
	background: rgba(255, 255, 255, 0.35);
	border: none;
	border-radius: 50%;
	color: var(--black25);
	cursor: pointer;
	${(p) => `transform: rotate(${directions[p.direction].rotation});`}
	path {
		fill: #0a0a0a;
	}
`

const ArrowButton = ({ onClick, scale = 1, direction }) => {
	const title = directions[direction].title
	const size = 40 * scale + "px"
	return (
		<StyledButton onClick={onClick} size={size} direction={direction}>
			<ArrowIcon width={size} height={size} title={title} />
		</StyledButton>
	)
}

ArrowButton.propTypes = {
	onClick: PropTypes.func,
	scale: PropTypes.number,
	direction: PropTypes.string.isRequired
}

export default ArrowButton
