import React from "react"
import styled from "styled-components/macro"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useMeta, useTitle } from "react-meta-elements"
import { hideVisually } from "polished"

import SettingsEditor from "./SettingsEditor"
import ImageProcessor from "./ImageProcessor"
import Exporter, { GenerateButton } from "./Exporter"
import FluidContainer from "./FluidContainer"
import { ReactComponent as TwitterIcon } from "../assets/twitter.svg"
import GlobalStyle from "../globalStyle"
import * as links from "../links"

import { H2, H4, TextBlock, List } from "./CopywritingElements"
import Blog from "./Blog"
import PostPage from "./PostPage"
import NotFoundPage from "./pages/NotFound"
import Generator from "./Generator"

const App = () => (
	<Router>
		<GlobalStyle />
		<Generator>
			<Switch>
				<Route path="/" exact component={EditorPage} />
				<Route path="/downloads" exact component={ExporterPage} />
				<Route path="/blog" exact component={Blog} />
				<Route path="/blog/:slug" component={PostPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</Generator>
	</Router>
)

const EditorPage = () => {
	useTitle(
		"Custom Thumbnails Generator for Vivaldi's Speed Dials | Vivaldi Thumbnail Generator"
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

				<FluidContainer>
					<H2>How to use</H2>
					<TextBlock>
						<p>
							Upload one or more images to represent the site you need a thumbnail for.
							Adjust settings like background color and icon size, by clicking on the
							settings icon in the top-right corner.
						</p>
						<p>
							<b>Tip:</b> Use images with transparent backgrounds
						</p>
						<p>
							When you're ready, click <b>Generate</b>. On the downloads page, you can
							download individual thumbnails or click <b>Download All</b> to create and
							download a zip archive of all your thumbnails.
						</p>
					</TextBlock>

					<H2>Upcoming features</H2>
					<TextBlock>
						This is a very new project, and I have a ton of features planned to release
						very soon. Follow me to be notified about future updates. Here are just a few
						of the planned features:
					</TextBlock>
					<TextBlock>
						<List>
							<li>Per image settings overrides</li>
							<li>Manually position the icon</li>
							<li>Icon-based color palettes</li>
							<li>Importing icons from URL</li>
							<li>Saving your preferences</li>
						</List>
					</TextBlock>

					<H4>
						<StyledLink href={links.twitter}>
							Follow me on twitter to stay updated!
						</StyledLink>
					</H4>

					<PHWidget />
					{/* <H2>From the blog</H2>
					<TextBlock>
						<Link to="/blog">Go to the blog</Link>
					</TextBlock> */}
				</FluidContainer>
			</OuterContainer>
		</>
	)
}

const ExporterPage = () => {
	useTitle("Download Your New Thumbnails | Vivaldi Thumbnail Generator")
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

// const BlogPage = () => {
// 	useTitle("Blog | Vivaldi Thumbnail Generator")
// 	// TODO: add description meta
// 	return <Blog />
// }

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

const PHWidget = () => {
	return (
		<a
			href="https://www.producthunt.com/posts/vivaldi-thumbnail-generator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-vivaldi-thumbnail-generator"
			target="_blank"
			rel="noopener noreferrer"
			style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}
		>
			<img
				src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=178529&theme=light"
				alt="Vivaldi Thumbnail Generator - Create Custom Thumbnails for Vivaldi Browser's Speed Dials | Product Hunt Embed"
				style={{ width: "250px", height: "54px" }}
				width="250px"
				height="54px"
			/>
		</a>
	)
}

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
	padding-bottom: 60px;
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

const StyledLink = styled.a`
	&,
	&:visited {
		color: inherit;
		text-decoration: underline;
	}

	&:hover {
		color: var(--accent-color);
	}
`

const Description = styled.div`
	max-width: 420px;
	margin: 24px auto 32px;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: #444;
`

export default App
