import React, {
	useCallback,
	createContext,
	useContext,
	useEffect,
	useReducer
} from "react"
import { loadImage } from "../utils"
import { trimImageWhitespace } from "./CanvasCommon"

export const FileContext = createContext()

export const useFileContext = () => useContext(FileContext)

const createIcon = (image, name) => ({ image, name })

const FilesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(uploaderReducer, defaultState)

	const addFromFiles = async (files) => {
		try {
			// start upload process
			dispatch({ type: "UPLOAD_INIT", payload: files.length })
			// start a separate upload job for every file
			files.forEach(async (file, i) => {
				try {
					let image
					const objectUrl = URL.createObjectURL(file)
					// load and process the image
					image = await loadImage(objectUrl)
					image = await trimImageWhitespace(image)
					// create icon object
					var name = file.name.substring(0, file.name.lastIndexOf("."))
					const icon = createIcon(image, name)
					// finish the job for this image
					dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
				} catch (error) {
					dispatch({ type: "UPLOAD_FAILURE", error })
				}
			})
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromBookmarkUrl = async (url) => {
		// !!! using clearbit api requires ATTRIBUTION
		try {
			// start upload process
			dispatch({ type: "UPLOAD_INIT", payload: 1 })
			// fetch the image from clearbit api
			try {
				let image
				const hostname = getHostname(url)
				const clearbitApiUrl = `//logo.clearbit.com/${hostname}`
				// load and process the image
				image = await loadImage(clearbitApiUrl)
				image = await trimImageWhitespace(image)
				// create icon object
				const icon = createIcon(image, hostname)
				// finish the job for this image
				dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
			} catch (error) {
				dispatch({ type: "UPLOAD_FAILURE", error })
			}
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromImageUrl = async (url) => {
		try {
			// start upload process
			dispatch({ type: "UPLOAD_INIT", payload: 1 })
			// fetch the image from clearbit api
			try {
				let image
				// load and process the image
				image = await loadImage(url)
				image = await trimImageWhitespace(image)
				// create icon object
				var name = url.substring(url.lastIndexOf("/") + 1)
				const icon = createIcon(image, name)
				// finish the job for this image
				dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
			} catch (error) {
				dispatch({ type: "UPLOAD_FAILURE", error })
			}
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const clear = () => {
		dispatch({ type: "FILES_REMOVE_ALL" })
	}

	const openFileDrawer = () => {
		dispatch({ type: "DRAWER_OPEN" })
	}

	const closeFileDrawer = useCallback(() => {
		dispatch({ type: "DRAWER_CLOSE" })
	}, [])

	const removeIcon = (icon) => {
		dispatch({ type: "FILES_REMOVE_ONE", payload: icon })
	}

	const numIcons = state.icons ? state.icons.length : 0
	const hasIcons = numIcons > 0

	useEffect(() => {
		if (!hasIcons) closeFileDrawer()
	}, [closeFileDrawer, hasIcons])

	useEffect(() => {
		if (state.progressDone === state.progressTotal && state.progressTotal !== 0) {
			dispatch({ type: "UPLOAD_SUCCESS" })
		}
	}, [state.progressDone, state.progressTotal])

	const contextValue = {
		addFromFiles,
		addFromBookmarkUrl,
		addFromImageUrl,
		hasIcons,
		numIcons,
		clear,
		removeIcon,
		openFileDrawer,
		closeFileDrawer,
		...state
	}

	return <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
}

const defaultState = {
	progressTotal: 0,
	progressDone: 0,
	isLoading: false,
	isError: false,
	isCanceled: false,
	isDrawerOpen: false,
	icons: []
}

const uploaderReducer = (state, action) => {
	switch (action.type) {
		case "UPLOAD_INIT":
			return {
				...state,
				progressTotal: action.payload,
				progressDone: 0,
				isLoading: true,
				isError: false,
				isCanceled: false
			}
		case "UPLOAD_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: false
			}
		case "UPLOAD_FAILURE":
			console.error(action.error)
			return {
				...state,
				isLoading: false,
				isError: true,
				isCanceled: false
			}
		case "UPLOAD_CANCEL":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: true
			}
		case "UPLOAD_PROGRESS":
			return {
				...state,
				progressDone: state.progressDone + 1,
				icons: [...state.icons, action.payload]
			}
		case "FILES_REMOVE_ONE":
			return {
				...state,
				icons: state.icons.filter((icon) => icon.name !== action.payload.name)
			}
		case "FILES_REMOVE_ALL":
			return {
				...state,
				icons: []
			}
		case "DRAWER_OPEN":
			return {
				...state,
				isDrawerOpen: true
			}
		case "DRAWER_CLOSE":
			return {
				...state,
				isDrawerOpen: false
			}
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}
}

const getHostname = (url) => {
	return new URL(url).hostname
}

export default FilesProvider
