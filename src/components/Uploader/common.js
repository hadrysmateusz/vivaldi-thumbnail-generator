import styled from "styled-components/macro"
import { cover } from "polished"
import { center } from "../../styleUtils"

export const DropOverlay = styled.div`
	${cover()}
	${center}
	z-index: 800;
	background: rgba(0, 0, 0, 0.36);
	color: white;
	font-size: 1.6em;
	font-weight: bold;
	letter-spacing: 0.05em;
	text-transform: uppercase;
`

export const SearchContainer = styled.div`
	margin: 20px 0;
`

export const Footer = styled.div`
	margin: 20px 0;
	display: flex;
`

export const ContentContainer = styled.div`
	height: 140px;
	border-width: 2px;
	border-style: ${(p) => (p.isEmpty ? "dashed" : "solid")};
	border-color: #e2e2e2;
	border-radius: 6px;
	background: white;
	position: relative;
	overflow: hidden;
`

export const EmptyStateContainer = styled.div`
	width: 100%;
	height: 100%;
	${center}
	flex-direction: column;
	background: white;
`

export const EmptyStateIconContainer = styled.div`
	margin-bottom: 8px;
	path {
		fill: #e2e2e2;
	}
`

export const EmptyStateHeading = styled.div`
	color: var(--light-gray);
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
`

export const EmptyStateBody = styled.div`
	color: var(--light-gray);
	font-size: 10px;
	line-height: 16px;
	margin-bottom: 2px;
`
