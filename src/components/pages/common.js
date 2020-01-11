import styled from "styled-components/macro"

export const OuterContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding-bottom: 60px;
`

export const Background = styled.div`
	height: 508px;
	position: relative;
	border-top: 6px solid var(--accent-color);
	background: linear-gradient(
		180deg,
		rgba(253, 253, 253, 0.6) 94%,
		rgba(248, 248, 248) 100%
	);
`
