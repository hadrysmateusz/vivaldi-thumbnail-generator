import React from "react"
import { useMeta, useTitle } from "react-meta-elements"

import { Background, OuterContainer } from "./common"
import Exporter from "../Exporter"
import { H1 } from "../CopywritingElements"

const ExporterPage = () => {
	useTitle("Download Your New Thumbnails | Vivaldi Thumbnail Generator")
	useMeta({ name: "robots", content: "noindex" })

	return (
		<>
			<Background />
			<OuterContainer>
				<H1>Vivaldi Thumbnail Generator</H1>
				<Exporter />
			</OuterContainer>
		</>
	)
}

export default ExporterPage
