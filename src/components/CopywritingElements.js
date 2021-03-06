import styled, { css } from "styled-components/macro"

export const TextBlock = styled.div`
	text-align: center;
	max-width: 600px;
	color: #383838;
	margin: 16px auto 24px;
	font-size: 14px;
	line-height: 20px;

	@media (min-width: 732px) {
		margin: 24px auto 32px;
		font-size: 18px;
		line-height: 24px;
	}

	a,
	a:visited {
		color: inherit;
	}
`

export const List = styled.ul`
	list-style-type: none;
	margin: 0 auto;
	padding: 0;
	li {
		margin-bottom: 8px;
	}
`

export const heading = css`
	margin: 32px auto 16px;
	font-weight: 800;
	text-align: center;
	justify-content: center;
	letter-spacing: 0.03em;
	color: #383838;
`

// overrides for smaller headings
export const smallerHeading = css`
	margin: 1em auto 0.5em;
`

export const H1 = styled.h1`
	${heading}
	text-transform: uppercase;
	font-size: 32px;
	line-height: 48px;
	@media (min-width: 732px) {
		font-size: 48px;
		line-height: 76px;
	}
`
export const H2 = styled.h2`
	${heading}
	text-transform:uppercase;
	font-size: 30px;
	line-height: 36px;
	@media (min-width: 732px) {
		font-size: 40px;
		line-height: 64px;
	}
`
export const H3 = styled.h3`
	${heading}
	${smallerHeading}
	font-size: 24px;
	line-height: 32px;
`
export const H4 = styled.h4`
	${heading}
	${smallerHeading}
	font-size: 18px;
	line-height: 24px;
`
export const H5 = styled.h5`
	${heading}
	${smallerHeading}
	font-size: 16px;
	line-height: 24px;
`
export const H6 = styled.h6`
	${heading}
	font-size: 14px;
	line-height: 20px;
`
