import { useReducer } from "react"
import { getBase64FromDataUri } from "../../utils"
import JSZip from "jszip"

export const MAX_THUMBNAILS_IN_ARCHIVE = 15

export const useExporter = (thumbnails) => {
	const [state, dispatch] = useReducer(reducer, defaultState)

	const renderAll = async () => {
		dispatch({ type: "EXPORT_INIT" })
		try {
			const parts = []
			// render thumbnails and split the into parts
			thumbnails.forEach((thumbnail, i) => {
				// render the thumbnail
				thumbnail.render()
				// split the thumbnails into a few parts to avoid the zip size limitation
				const partIndex = Math.floor(i / MAX_THUMBNAILS_IN_ARCHIVE)
				parts[partIndex] = thumbnail
			})
			// generate zips for all parts
			const archives = await Promise.all(
				parts.map((thumbnails) => generateZip(thumbnails))
			)
			// finish exporting
			dispatch({ type: "EXPORT_SUCCESS", payload: archives })
		} catch (error) {
			dispatch({ type: "EXPORT_FAILURE", error })
		}
	}

	return {
		isLoading: state.isLoading,
		isError: state.isError,
		archives: state.archives,
		renderAll: renderAll
	}
}

const defaultState = {
	isLoading: false,
	isError: false,
	archives: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case "EXPORT_INIT":
			return {
				...state,
				isLoading: true,
				isError: false,
				archives: []
			}
		case "EXPORT_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				archives: action.payload
			}
		case "EXPORT_FAILURE":
			console.error(action.error)
			return {
				...state,
				isLoading: false,
				isError: true,
				archives: []
			}
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}
}

const generateZip = async (thumbnails) => {
	const zip = new JSZip()
	// Generate a directory within the Zip file structure
	const folder = zip.folder("thumbnails")
	// Add all files to the folder
	thumbnails.forEach((thumbnail) => {
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
