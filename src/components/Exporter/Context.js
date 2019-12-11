import React, { useEffect, useReducer, useContext, createContext } from "react"
import { useFileContext } from "../FilesProvider"
import { useSettingsContext } from "../SettingsProvider"
import { drawIcon, drawBackground, createVirtualCanvas } from "../CanvasCommon"
import { makeAsync, getBase64FromDataUri } from "../../utils"
import JSZip from "jszip"

export const ExporterContext = createContext({})

export const useExporter = () => useContext(ExporterContext)

export const ExporterProvider = ({ children }) => {
	const { images } = useFileContext()
	const { scale, bgColor, exportDimensions } = useSettingsContext()
	const [state, dispatch] = useReducer(generatorReducer, defaultState)

	const actions = {
		generate: async () => {
			try {
				// start generate process
				dispatch({ type: "GENERATE_INIT", payload: images.length })
				// start a separate generate job for every image
				images.forEach(async (image) => {
					try {
						const url = await generateDownloadUrl(image, scale, bgColor, exportDimensions)
						// finish the job for this image
						dispatch({ type: "GENERATE_PROGRESS", payload: url })
					} catch (error) {
						console.error(error)
						dispatch({ type: "GENERATE_FAILURE", error })
					}
				})
			} catch (error) {
				console.error(error)
				dispatch({ type: "GENERATE_FAILURE", error })
			}
		},
		cancel: () => dispatch({ type: "GENERATE_CANCEL" })
	}

	useEffect(() => {
		if (state.progressDone === state.progressTotal && state.progressTotal !== 0) {
			const zip = new JSZip()
			// Generate a directory within the Zip file structure
			const folder = zip.folder("thumbnails")
			// Add all files to the folder
			state.thumbnails.forEach((url, i) => {
				// Generate file name
				const fileName = `${i + 1}.png`
				// Get base64 content of the image
				const fileData = getBase64FromDataUri(url)
				// Add file to folder
				folder.file(fileName, fileData, { base64: true })
			})
			// Generate zip file as a base64 string
			zip.generateAsync({ type: "base64" }).then((zipBase64) => {
				// Assemble a data url
				const zipUrl = "data:application/zip;base64," + zipBase64
				dispatch({ type: "GENERATE_SUCCESS", payload: zipUrl })
			})
		}
	}, [state.progressDone, state.progressTotal, state.thumbnails])

	return (
		<ExporterContext.Provider value={[state, actions]}>
			{children}
		</ExporterContext.Provider>
	)
}

const defaultState = {
	progressTotal: 0,
	progressDone: 0,
	isLoading: false,
	isError: false,
	isCanceled: false,
	thumbnails: [],
	zipUrl: null
}

const generatorReducer = (state, action) => {
	switch (action.type) {
		case "GENERATE_INIT":
			return {
				...state,
				progressTotal: action.payload,
				progressDone: 0,
				isLoading: true,
				isError: false,
				isCanceled: false,
				thumbnails: [],
				zipUrl: null
			}
		case "GENERATE_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: false,
				zipUrl: action.payload
			}
		case "GENERATE_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
				isCanceled: false,
				zipUrl: null
			}
		case "GENERATE_CANCEL":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: true,
				zipUrl: null
			}
		case "GENERATE_PROGRESS":
			return {
				...state,
				progressDone: state.progressDone + 1,
				thumbnails: [...state.thumbnails, action.payload]
			}
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}
}

const generateDownloadUrl = makeAsync((image, scale, bgColor, exportDimensions) => {
	try {
		const [canvas] = createVirtualCanvas(...exportDimensions)
		drawBackground(canvas, bgColor)
		drawIcon(canvas, image, scale)
		return canvas.toDataURL()
	} catch (err) {
		return null
	}
})
