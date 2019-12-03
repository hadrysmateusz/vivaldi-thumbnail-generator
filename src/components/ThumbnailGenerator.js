import React from "react"
import { Route, Switch } from "react-router-dom"
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
				<Switch>
					<Route path="/downloads">Downloads</Route>
					<Route path="/">
						<Container>
							<ImageProcessor />
							<SettingsEditor />
						</Container>
						<Downloader />
					</Route>
				</Switch>
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
