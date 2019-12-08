import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import { ReactComponent as TwitterIcon } from "../assets/twitter.svg"
import ThumbnailGenerator from "./ThumbnailGenerator"
import { H2, TextBlock, List } from "./CopywritingElements"
import GlobalStyle from "../globalStyle"
import * as links from "../links"

const taglines = [
	"Quickly and effortlessly generate thumbnails for use in [Vivaldi Browser](https://vivaldi.com/)’s Speed Dials.",
	"Create beautiful thumbnails for [Vivaldi Browser](https://vivaldi.com/)’s Speed Dials, in a matter of seconds."
]

const App = () => (
	<Router>
		<Container>
			<GlobalStyle />
			<Background />
			<OuterContainer>
				<InnerContainer>
					<MainCopy>
						<Headline>
							<em>Vivaldi</em> Thumbnail Generator
						</Headline>
						<Description>
							<ReactMarkdown source={taglines[1]} />
						</Description>
					</MainCopy>
					<Social>
						<div>by Mateusz Hadryś</div>
						<div>
							Follow me to get updates:
							<a href={links.twitter}>
								<TwitterIcon width={20} height={20} />
							</a>
						</div>
					</Social>
					<ThumbnailGenerator />
					<Route path="/" exact>
						<H2>Upcoming features</H2>
						<TextBlock>
							<List>
								<li>Per image settings overrides</li>
								<li>Manually position the icon</li>
								<li>Icon-based color palettes</li>
								<li>Importing icons from URL</li>
								<li>Saving your preferences</li>
								<li>
									<b>and more</b>
								</li>
							</List>
						</TextBlock>
					</Route>
				</InnerContainer>
			</OuterContainer>
		</Container>
	</Router>
)

const Social = styled.div`
	max-width: 732px;
	padding: 1px;
	margin: 0 auto 4px;
	margin-top: -24px;
	color: #888;
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

const Container = styled.div``

const MainCopy = styled.div`
	margin: 52px 0;
`

const Background = styled.div`
	height: 508px;
	position: relative;
	border-top: 6px solid var(--accent-color);
	background: linear-gradient(
		180deg,
		rgba(253, 253, 253, 0.6) 94%,
		rgba(248, 248, 248) 100%
	);
`

const OuterContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
`

const InnerContainer = styled.div`
	margin: 0 auto;
`

const Headline = styled.h1`
	margin: 40px auto 24px;

	/* font-style: oblique; */

	em {
		font-style: inherit;
		color: var(--accent-color);
	}

	font-weight: 900;
	font-size: 43px;
	line-height: 48px;

	text-align: center;
	justify-content: center;
	letter-spacing: 0.05em;
	color: #383838;
	/* text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06); */
`

const Description = styled.p`
	max-width: 420px;
	margin: 24px auto 32px;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: #444;

	a,
	a:visited {
		color: inherit;
		text-decoration: underline;
	}

	a:hover {
		color: var(--accent-color);
	}
`

export default App
