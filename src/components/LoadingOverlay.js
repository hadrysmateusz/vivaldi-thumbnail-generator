import styled from "styled-components/macro"
import { cover } from "polished"

import { center } from "../styleUtils"

const LoadingOverlay = styled.div`
	${cover()}
	${center}
	background: white;
	font-size: 32px;
	font-weight: bold;
`

export default LoadingOverlay
