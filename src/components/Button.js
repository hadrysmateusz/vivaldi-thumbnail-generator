import styled, { css } from "styled-components/macro"

const buttonSizes = {
	normal: css`
		border-radius: 5px;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.018em;
		height: 32px;
		padding: 0 16px;
		@media (min-width: 732px) {
			padding: 0 20px;
			height: 40px;
		}
	`,
	small: css`
		border-radius: 3px;
		font-size: 11px;
		line-height: 16px;
		height: 20px;
		padding: 0 12px;
	`
}

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

const badge = css`
	::after {
		content: "${(p) => p.badgeText}";
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
		font-size: 11px;
		line-height: 16px;
		border-radius: 4px;
		padding: 0 5px 1px;
		background: var(--accent-color);
		color: white;
	}
`

const Button = styled.button`
	position:relative;
	display: block;
	border: none;
	transition-property: background, color, box-shadow;
	transition-duration: 200ms;
	transition-timing-function: ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	svg {
		margin-right: 8px;
		margin-left: -4px;
	}
	/* 
		the split of disabled and enabled-only styles is intentional 
		enabled-only styles should be overriden by variant styles 
		disabled styles should override variant styles 
	*/
	${(p) => !p.disabled && enabledOnlyStyles}
	${(p) => buttonVariants[p.variant]}
	${(p) => p.disabled && disabledStyles}
	${(p) => (p.size ? buttonSizes[p.size] : buttonSizes.normal)}
	${(p) => p.badgeText && badge}
`

Button.defaultProps = {
	variant: "normal",
	size: "normal"
}

export default Button
