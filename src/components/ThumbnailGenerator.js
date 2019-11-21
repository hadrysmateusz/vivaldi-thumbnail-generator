import React from "react"
import styled from "styled-components"

// import Downloader from "./Downloader"
import { SettingsEditor, SettingsProvider } from "./Settings"
import ImageProcessor from "./ImageProcessor"

function ThumbnailGenerator() {
	return (
		<OuterContainer>
			<InnerContainer>
				<SettingsProvider>
					<Headline>Vivaldi Thumbnail Generator</Headline>
					<Description>
						Quickly and effortlessly generate thumbnails for use in{" "}
						<a href="https://vivaldi.com/">Vivaldi Browser’s</a> Speed Dials
					</Description>
					<ImageProcessor />
					<SettingsEditor />
					{/* <Downloader canvasRef={canvasRef} /> */}
				</SettingsProvider>
			</InnerContainer>
		</OuterContainer>
	)
}

const OuterContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
`

const InnerContainer = styled.div`
	max-width: 793px;
	margin: 0 auto;
`

const Headline = styled.h1`
	margin: 40px auto 24px;

	font-weight: 900;
	font-size: 43px;
	line-height: 48px;

	text-align: center;
	justify-content: center;
	letter-spacing: 0.05em;
	color: #ffffff;
	text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
`

const Description = styled.p`
	max-width: 440px;
	margin: 24px auto 32px;
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: white;
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

	a,
	a:visited {
		color: inherit;
	}
`

export default ThumbnailGenerator
