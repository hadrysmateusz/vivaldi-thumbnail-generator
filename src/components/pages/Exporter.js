import React from "react"
import { useMeta, useTitle } from "react-meta-elements"

import { Background, OuterContainer } from "./common"
import Exporter from "../Exporter"
import TopCopy from "../TopCopy"

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

export default ExporterPage
