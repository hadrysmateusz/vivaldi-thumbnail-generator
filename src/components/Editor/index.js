import React from "react"
import SettingsProvider from "../SettingsProvider"
import FilesProvider from "../FilesProvider"
import { ExporterProvider } from "../Exporter"

export const EditorProvider = ({ children }) => {
	return (
		<SettingsProvider>
			<FilesProvider>
				<ExporterProvider>{children}</ExporterProvider>
			</FilesProvider>
		</SettingsProvider>
	)
}
