import styled, { css } from "styled-components/macro"

const buttonVariants = {
	normal: css`
		background: white;
		color: #383838;
		:hover {
			background: #fcfcfc;
			color: #050505;
		}
	`,
	primary: css`
		background: #4fd6d6;
		color: white;
		:hover {
			background: #24d7d7;
		}
	`,
	danger: css`
		background: white;
		color: #e14f4f;
		:hover {
			background: #fcfcfc;
			color: #e01818;
		}
	`
}

const disabledStyles = css`
	background: #d8d8d8;
	color: #fcfcfc;
	:hover {
		color: #fcfcfc;
		background: #d8d8d8;
	}
`

const enabledOnlyStyles = css`
	:hover {
		cursor: pointer;
		box-shadow: 0 6px 13px rgba(0, 0, 0, 0.1);
	}
`

const Button = styled.button`
	display: block;
	border-radius: 5px;
	${(p) => buttonVariants[p.variant]}
	${(p) =>
		p.disabled
			? disabledStyles
			: enabledOnlyStyles}
	transition-property: background, color, box-shadow;
	transition-duration: 200ms;
	transition-timing-function: ease;

	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	font-weight: bold;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.02em;
	padding: 0 32px;
	border: none;
`

Button.defaultProps = {
	variant: "normal"
}

export default Button
