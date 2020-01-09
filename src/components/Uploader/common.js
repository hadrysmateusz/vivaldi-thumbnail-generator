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
