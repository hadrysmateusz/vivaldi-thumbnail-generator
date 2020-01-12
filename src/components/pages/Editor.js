import React from "react"
import { useMeta, useTitle } from "react-meta-elements"
import styled from "styled-components/macro"

import { Background, OuterContainer } from "./common"
import * as links from "../../links"
import roadmap from "../../roadmap"

import FluidContainer from "../FluidContainer"
import SettingsEditor from "../SettingsEditor"
import ImageProcessor from "../ImageProcessor"
import EditorTopbar from "../EditorTopbar"
import { H1, H2, H4, TextBlock, List } from "../CopywritingElements"
import StyledLink from "../StyledLink"
import Checkbox from "../Checkbox"
import ProductHuntWidget from "../ProductHuntWidget"

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

				<EditorTopbar />

				<GeneratorContainer>
					<ImageProcessor />
					<SettingsEditor />
				</GeneratorContainer>

				<FluidContainer>
					{/* <H2>How to use</H2>
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
					</TextBlock> */}

					<H2>Upcoming features</H2>
					<TextBlock>
						This is a new project, and I have a ton of features planned to release very
						soon. Here are just a few of the planned features:
					</TextBlock>
					<TextBlock>
						<List>
							{roadmap.map(({ title, complete }) => (
								<ListItem>
									<Checkbox value={complete} /> <div>{title}</div>
								</ListItem>
							))}
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

const ListItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 6px;
	> * + * {
		margin-left: 8px;
	}
`

const GeneratorContainer = styled.div`
	padding: 0 20px;
	display: flex;
	justify-content: center;
	margin: 0 auto;
`

export default EditorPage
