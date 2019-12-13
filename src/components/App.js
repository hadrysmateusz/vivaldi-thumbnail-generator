import React from "react"
import styled from "styled-components"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { useMeta, useTitle } from "react-meta-elements"
import { hideVisually } from "polished"

import SettingsEditor from "./SettingsEditor"
import ImageProcessor from "./ImageProcessor"
import { GenerateButton, Exporter } from "./Exporter"
import FluidContainer from "./FluidContainer"
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg"
import { H2, TextBlock, List } from "./CopywritingElements"
import GlobalStyle from "../globalStyle"
import * as links from "../links"
import SettingsProvider from "./SettingsProvider"
import FilesProvider from "./FilesProvider"
import { ExporterProvider } from "./Exporter"

const App = () => (
	<Router>
		<GlobalStyle />
		<SettingsProvider>
			<FilesProvider>
				<ExporterProvider>
					<Switch>
						<Route path="/" exact component={EditorPage} />
						<Route path="/downloads" exact component={ExporterPage} />
						<Route path="/blog" component={BlogPage} />
					</Switch>
				</ExporterProvider>
			</FilesProvider>
		</SettingsProvider>
	</Router>
)

const EditorPage = () => {
	useTitle(
		"Create Beautiful Thumbnails For Vivaldi's Speed Dials | Vivaldi Thumbnail Generator"
	)
	useMeta({
		name: "description",
		content:
			"Custom thumbnail generator for Vivaldi Browser's Speed Dials. Create thumbnails that will match your theme and preferences, quickly and for free!"
	})

	return (
		<>
			<Background />
			<OuterContainer>
				<TopCopy />
				<GeneratorContainer>
					<ImageProcessor />
					<SettingsEditor />
				</GeneratorContainer>
				<GenerateButton />
				{/* <FluidContainer>
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
					<H2>From the blog</H2>
					<TextBlock>
						<Link to="/blog">Go to the blog</Link>
					</TextBlock>
				</FluidContainer> */}
			</OuterContainer>
		</>
	)
}

const ExporterPage = () => {
	useTitle("Download Tour New Thumbnails | Vivaldi Thumbnail Generator")
	useMeta({ name: "robots", content: "noindex" })

	return (
		<>
			<Background />
			<OuterContainer>
				<TopCopy />
				<Exporter />
			</OuterContainer>
		</>
	)
}

const BlogPage = () => {
	useTitle("Blog | Vivaldi Thumbnail Generator")
	// TODO: add description meta
	return (
		<FluidContainer>
			<Headline>Blog Coming Soon</Headline>
		</FluidContainer>
	)
}

const TopCopy = () => (
	<FluidContainer>
		<MainCopy>
			<Headline>
				<em>Vivaldi</em> Thumbnail Generator
			</Headline>
			<Description>
				Create beautiful thumbnails for <a href="https://vivaldi.com/">Vivaldi Browser</a>
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

const GeneratorContainer = styled.div`
	padding: 0 20px;
	display: flex;
	justify-content: center;
	margin: 0 auto;
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

const Description = styled.div`
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
