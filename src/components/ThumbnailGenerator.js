import React from "react"
import styled from "styled-components/macro"

import { SettingsEditor, SettingsManager } from "./Settings"
import FileManager from "./FileManager"
import ImageProcessor from "./ImageProcessor"
import Downloader from "./Downloader"

const ThumbnailGenerator = () => {
	return (
		<SettingsManager>
			<FileManager>
				<Container>
					<ImageProcessor />
					<SettingsEditor />
				</Container>
				<Downloader />
			</FileManager>
		</SettingsManager>
	)
}

const Container = styled.div`
	margin: 0 auto;
	max-width: 1024px;
	display: flex;
	justify-content: center;
`

export default ThumbnailGenerator
