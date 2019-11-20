import styled, { css } from "styled-components"

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
			color: #e01818;
		}
	`
}

const Button = styled.button`
	display: block;
	border-radius: 5px;
	${(p) => buttonVariants[p.variant]}
	transition-property: background, color, box-shadow;
	transition-duration: 200ms;
	transition-timing-function: ease;
	:hover {
		cursor: pointer;
		box-shadow: 0 6px 13px rgba(0, 0, 0, 0.1);
	}
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
