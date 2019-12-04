import React, { useReducer, useContext, createContext } from "react"
import { useFileContext } from "../FilesProvider"
import { useSettingsContext } from "../SettingsProvider"
import {
	drawIcon,
	calculateDimensions,
	drawBackground,
	createVirtualCanvas
} from "../CanvasCommon"
import { makeAsync } from "../../utils"

export const ExporterContext = createContext({})

export const useExporter = () => useContext(ExporterContext)

export const ExporterProvider = ({ children }) => {
	const { images } = useFileContext()
	const { scale, bgColor, exportDimensions } = useSettingsContext()
	const [state, dispatch] = useReducer(generatorReducer, {
		isLoading: false,
		isError: false,
		isCanceled: false,
		data: []
	})

	const actions = {
		generate: async () => {
			dispatch({ type: "GENERATE_INIT" })
			try {
				const downloadUrls = await Promise.all(
					images.map((image) => {
						return generateDownloadUrl(image, scale, bgColor, exportDimensions)
					})
				)
				if (!state.isCanceled) {
					dispatch({ type: "GENERATE_SUCCESS", payload: downloadUrls })
				}
			} catch (error) {
				if (!state.isCanceled) {
					dispatch({ type: "GENERATE_FAILURE" })
				}
			}
		},
		cancel: () => dispatch({ type: "GENERATE_CANCEL" })
	}

	return (
		<ExporterContext.Provider value={[state, actions]}>
			{children}
		</ExporterContext.Provider>
	)
}

const generatorReducer = (state, action) => {
	switch (action.type) {
		case "GENERATE_INIT":
			return {
				...state,
				isLoading: true,
				isError: false,
				isCanceled: false
			}
		case "GENERATE_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: false,
				data: action.payload
			}
		case "GENERATE_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
				isCanceled: false
			}
		case "GENERATE_CANCEL":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: true
			}
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}
}

const generateDownloadUrl = makeAsync((image, scale, bgColor, exportDimensions) => {
	try {
		const [canvas] = createVirtualCanvas(...exportDimensions)
		const { width, height } = calculateDimensions(image, scale, canvas)
		drawBackground(canvas, bgColor)
		drawIcon(canvas, image, width, height)
		return canvas.toDataURL()
	} catch (err) {
		return null
	}
})
