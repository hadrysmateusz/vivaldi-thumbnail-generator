import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

import ThumbnailGenerator from "./ThumbnailGenerator"
import { Roadmap } from "./Copy"
import GlobalStyle from "../globalStyle"

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
					<ThumbnailGenerator />
					<Route path="/" exact>
						<Roadmap />
					</Route>
				</InnerContainer>
			</OuterContainer>
		</Container>
	</Router>
)

const Container = styled.div``

const MainCopy = styled.div`
	margin: 52px 0;
`

const Background = styled.div`
	height: 560px;
	position: relative;
	border-top: 6px solid var(--accent-color);
	background: linear-gradient(
		180deg,
		rgba(250, 250, 250, 0) 0%,
		rgba(250, 250, 250, 0) 5.73%,
		#f9f9f9 100%
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
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

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
