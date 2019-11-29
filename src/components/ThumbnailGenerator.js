import React from "react"
import styled from "styled-components/macro"

import SettingsProvider from "./SettingsProvider"
import SettingsEditor from "./SettingsEditor"
import FilesProvider from "./FilesProvider"
import ImageProcessor from "./ImageProcessor"
import Downloader from "./Downloader"

const ThumbnailGenerator = () => {
	return (
		<SettingsProvider>
			<FilesProvider>
				<Container>
					<ImageProcessor />
					<SettingsEditor />
				</Container>
				<Downloader />
			</FilesProvider>
		</SettingsProvider>
	)
}

const Container = styled.div`
	margin: 0 auto;
	max-width: 1024px;
	display: flex;
	justify-content: center;
`

export default ThumbnailGenerator
