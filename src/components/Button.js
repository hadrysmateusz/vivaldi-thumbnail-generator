import styled, { css } from "styled-components/macro"

const buttonVariants = {
	normal: css`
		background: white;
		color: #383838;
		:hover,
		:active {
			background: #fcfcfc;
			color: #050505;
		}
	`,
	primary: css`
		background: var(--accent-color);
		color: white;
		:hover,
		:active {
			background: var(--accent-color-darker);
		}
	`,
	danger: css`
		background: white;
		color: #e14f4f;
		:hover,
		:active {
			background: #fcfcfc;
			color: #e01818;
		}
	`,
	"text-only": css`
		background: none;
		box-shadow: none;
		color: #383838;
		:hover,
		:active {
			box-shadow: none;
			background: none;
			color: black;
			text-decoration: underline;
		}
	`
}

const disabledStyles = css`
	background: #e2e2e2;
	color: #fcfcfc;
	text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
	:hover {
		color: #fcfcfc;
		background: #e2e2e2;
		text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
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
	border: none;
	transition-property: background, color, box-shadow;
	transition-duration: 200ms;
	transition-timing-function: ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-size: 14px;
	line-height: 18px;
	height: 32px;
	padding: 0 16px;
	@media (min-width: 732px) {
		padding: 0 32px;
		height: 40px;
	}

	/* 
		the split of disabled and enabled-only styles is intentional 
		enabled-only styles should be overriden by variant styles 
		disabled styles should override variant styles 
	*/
	${(p) => !p.disabled && enabledOnlyStyles}
	${(p) => buttonVariants[p.variant]}
	${(p) => p.disabled && disabledStyles}
`

Button.defaultProps = {
	variant: "normal"
}

export default Button
