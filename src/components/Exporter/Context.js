import React, { useState, useContext, createContext } from "react"
import { useFileContext } from "../FilesProvider"
import { useSettingsContext } from "../SettingsProvider"
import { drawIcon, drawBackground, createVirtualCanvas } from "../CanvasCommon"
import { makeAsync, getBase64FromDataUri } from "../../utils"
import JSZip from "jszip"

export const ExporterContext = createContext({})

export const useExporter = () => useContext(ExporterContext)

export const ExporterProvider = ({ children }) => {
	const { icons } = useFileContext()
	const { scale, bgColor, exportDimensions } = useSettingsContext()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [renderedThumbnails, setRenderedThumbnails] = useState([])
	const [zipUrl, setZipUrl] = useState([])

	const renderThumbnails = async () => {
		try {
			setIsLoading(true)
			// generate the thumbnails
			const thumbnails = await Promise.all(
				icons.map(async (icon) => {
					const url = await renderImage(icon.image, scale, bgColor, exportDimensions)
					const name = icon.name + ".png"
					return { url, name }
				})
			)
			// generate the zip
			const zipUrl = await generateZip(thumbnails)
			// update the state
			setRenderedThumbnails(thumbnails)
			setZipUrl(zipUrl)
			setIsLoading(false)
		} catch (error) {
			console.error(error)
			setIsError(true)
		}
	}

	const generateZip = async (thumbnails) => {
		const zip = new JSZip()
		// Generate a directory within the Zip file structure
		const folder = zip.folder("thumbnails")
		// Add all files to the folder
		thumbnails.forEach((thumbnail, i) => {
			const { url, name } = thumbnail

			// Get base64 content of the image
			const fileData = getBase64FromDataUri(url)
			// Add file to folder
			folder.file(name, fileData, { base64: true })
		})
		// Generate zip file as a base64 string
		const zipBase64 = await zip.generateAsync({ type: "base64" })
		// Assemble a data url
		return "data:application/zip;base64," + zipBase64
	}

	const download = async () => {}

	return (
		<ExporterContext.Provider
			value={{
				renderThumbnails,
				download,
				isLoading,
				isError,
				renderedThumbnails,
				zipUrl
			}}
		>
			{children}
		</ExporterContext.Provider>
	)
}

const renderImage = makeAsync((image, scale, bgColor, exportDimensions) => {
	const [canvas] = createVirtualCanvas(...exportDimensions)
	drawBackground(canvas, bgColor)
	drawIcon(canvas, image, scale)
	return canvas.toDataURL()
})
