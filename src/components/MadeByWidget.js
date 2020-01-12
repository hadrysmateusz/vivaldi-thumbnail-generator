import React from "react"
import styled from "styled-components/macro"

import { EMAIL_ADDRESS } from "../constants"
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg"
import { ReactComponent as EnvelopeIcon } from "../assets/envelope.svg"

const MadeByWidget = () => (
	<OuterContainer>
		<Container>
			<div>
				{/* TODO: replace this with link to portfolio */}
				<a
					href="https://twitter.com/HadrysMateusz"
					target="_blank"
					rel="noreferrer noopener"
				>
					By <em>Mateusz Hadryś</em>
				</a>
			</div>
			<a href="https://twitter.com/HadrysMateusz">
				<TwitterIcon width={16} height={16} />
			</a>
			<a href={"mailto:" + EMAIL_ADDRESS}>
				<EnvelopeIcon width={16} height={16} />
			</a>
		</Container>
	</OuterContainer>
)

const OuterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const Container = styled.div`
	background: white;
	box-shadow: var(--button-shadow);
	height: 40px;
	margin: 40px auto 0;
	padding: 0 20px;
	display: grid;
	align-items: center;
	grid-auto-columns: auto;
	grid-auto-flow: column;
	gap: 8px;
	text-transform: uppercase;
	font-size: 14px;
	letter-spacing: 0.03em;
	font-weight: bold;
	color: #bebebe;
	path {
		fill: #d6d6d6;
	}
	em {
		color: #3a3a3a;
		font-style: normal;
	}
	> a {
		display: flex;
		align-items: center;
	}
`

export default MadeByWidget
