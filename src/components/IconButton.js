import styled, { css } from "styled-components"

const disabledStyles = css`
	background: #e2e2e2;
	path {
		fill: #0a0a0a;
	}
	:hover,
	:active {
		path {
			fill: #0a0a0a;
		}
	}
`

const IconButton = styled.button`
	display: block;
	border-radius: 5px;
	${(p) => p.disabled && disabledStyles}
	transition-property: background, color, box-shadow;
	transition-duration: 200ms;
	transition-timing-function: ease;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	width: 32px;
	@media (min-width: 732px) {
		height: 40px;
		width: 40px;
	}
	border: none;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	background: white;
	path {
		fill: #383838;
	}
	:hover,
	:active {
		cursor: pointer;
		box-shadow: 0 6px 13px rgba(0, 0, 0, 0.1);
		background: #fcfcfc;
		path {
			fill: #050505;
		}
	}
`

export default IconButton
