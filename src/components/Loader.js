import styled from "styled-components/macro"
import { center } from "../styleUtils"

const Loader = styled.div`
	${center}
	width: 100%;
	height: 100%;
	background: white;
	color: var(--light-gray);
	font-size: 24px;
	line-height: 48px;
	font-weight: bold;
	min-height: 100px;
`

export default Loader
