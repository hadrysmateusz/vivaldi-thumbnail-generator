import React from "react"
import { useMeta, useTitle } from "react-meta-elements"
import styled from "styled-components/macro"

import FluidContainer from "../FluidContainer"
import SettingsEditor from "../SettingsEditor"
import ImageProcessor from "../ImageProcessor"
import { H1, H2, H4, TextBlock, List } from "../CopywritingElements"
import StyledLink from "../StyledLink"
import ProductHuntWidget from "../ProductHuntWidget"
import { Background, OuterContainer } from "./common"
import * as links from "../../links"

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
				<H1>Vivaldi Thumbnail Generator</H1>
				<GeneratorContainer>
					<ImageProcessor />
					<SettingsEditor />
				</GeneratorContainer>

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
						{/* TODO: add some checkboxes to show what is already done */}
						<List>
							<li>Per image settings overrides</li>
							<li>Manually position the icon</li>
							{/* <li>Icon-based color palettes</li> */}
							<li>Importing icons from URL</li>
							<li>Saving your preferences</li>
						</List>
					</TextBlock>

					<H4>
						<StyledLink href={links.twitter}>
							Follow me on twitter to stay updated!
						</StyledLink>
					</H4>

					<ProductHuntWidget />
					{/* <H2>From the blog</H2>
					<TextBlock>
						<Link to="/blog">Go to the blog</Link>
					</TextBlock> */}
				</FluidContainer>
			</OuterContainer>
		</>
	)
}

const GeneratorContainer = styled.div`
	padding: 0 20px;
	display: flex;
	justify-content: center;
	margin: 0 auto;
`

export default EditorPage
