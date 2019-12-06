import styled, { css } from "styled-components/macro"

export const TextBlock = styled.div`
	max-width: 600px;
	margin: 24px auto 32px;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: #383838;

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
	margin: 48px auto 24px;
	font-weight: 900;
	text-align: center;
	justify-content: center;
	letter-spacing: 0.05em;
	color: #383838;
	text-decoration: underline #ddd;
`

export const H1 = styled.h1`
	${heading}
	font-size: 40px;
	line-height: 52px;
`
export const H2 = styled.h2`
	${heading}
	font-size: 32px;
	line-height: 40px;
`
export const H3 = styled.h3`
	${heading}
	font-size: 24px;
	line-height: 32px;
`
export const H4 = styled.h4`
	${heading}
	font-size: 18px;
	line-height: 24px;
`
export const H5 = styled.h5`
	${heading}
	font-size: 16px;
	line-height: 24px;
`
export const H6 = styled.h6`
	${heading}
	font-size: 14px;
	line-height: 20px;
`
