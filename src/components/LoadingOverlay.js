import styled from "styled-components/macro"
import { cover } from "polished"

import { center } from "../styleUtils"

const LoadingOverlay = styled.div`
	${cover()}
	${center}
	background: white;
	color: #686868;
	font-size: 24px;
	line-height: 48px;
	font-weight: bold;
`

export default LoadingOverlay
