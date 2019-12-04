import React from "react"
import { Route, Switch } from "react-router-dom"
import styled from "styled-components/macro"

import SettingsProvider from "./SettingsProvider"
import SettingsEditor from "./SettingsEditor"
import FilesProvider from "./FilesProvider"
import ImageProcessor from "./ImageProcessor"
import { GenerateButton, Exporter, ExporterProvider } from "./Exporter"

const ThumbnailGenerator = () => {
	return (
		<SettingsProvider>
			<FilesProvider>
				<ExporterProvider>
					<Switch>
						<Route path="/downloads">
							<Exporter />
						</Route>
						<Route path="/">
							<Container>
								<ImageProcessor />
								<SettingsEditor />
							</Container>
							<GenerateButton />
						</Route>
					</Switch>
				</ExporterProvider>
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
