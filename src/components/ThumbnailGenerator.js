import React from "react"

import { SettingsEditor, SettingsManager } from "./Settings"
import FileManager from "./FileManager"
import ImageProcessor from "./ImageProcessor"
// import Downloader from "./Downloader"c

const ThumbnailGenerator = () => {
	return (
		<SettingsManager>
			<FileManager>
				<ImageProcessor />
				<SettingsEditor />
				{/* <Downloader canvasRef={canvasRef} /> */}
			</FileManager>
		</SettingsManager>
	)
}

export default ThumbnailGenerator
