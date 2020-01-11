import React from "react"
import styled from "styled-components/macro"

import { hideVisually } from "polished"
import FluidContainer from "./FluidContainer"
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg"
import * as links from "../links"
import StyledLink from "./StyledLink"

const TopCopy = () => (
	<FluidContainer>
		<MainCopy>
			<Headline>
				<em>Vivaldi</em> Thumbnail Generator
			</Headline>
			<Description>
				Create beautiful thumbnails for{" "}
				<StyledLink href="https://vivaldi.com/">Vivaldi Browser</StyledLink>
				’s Speed Dials, in a matter of seconds
			</Description>
		</MainCopy>
		<Social>
			<div>by Mateusz Hadryś</div>
			<div>
				Follow me to get updates:
				<a href={links.twitter}>
					<TwitterIcon width={20} height={20} />
					<IconLabel>Follow on Twitter</IconLabel>
				</a>
			</div>
		</Social>
	</FluidContainer>
)

const Description = styled.div`
	max-width: 420px;
	margin: 24px auto 32px;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: #444;
`

const Social = styled.div`
	box-sizing: content-box;
	padding: 0 1px;
	margin-bottom: 4px;
	margin-top: -24px;
	color: var(--light-gray);
	font-size: 12px;
	line-height: 12px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		margin-bottom: -2px;
		margin-left: 8px;
		path {
			fill: #999;
			:hover {
				fill: #1da1f2;
			}
		}
	}

	div {
		display: flex;
		align-items: center;
	}
`

const IconLabel = styled.span`
	${hideVisually()}
`

const MainCopy = styled.div`
	margin: 52px 0;
`

const Headline = styled.h1`
	margin: 40px auto 24px;

	em {
		font-style: inherit;
		color: var(--accent-color);
	}

	font-weight: 900;

	font-size: 32px;
	line-height: 40px;
	@media (min-width: 732px) {
		font-size: 43px;
		line-height: 48px;
	}

	text-align: center;
	justify-content: center;
	letter-spacing: 0.05em;
	color: #383838;
`

export default TopCopy
