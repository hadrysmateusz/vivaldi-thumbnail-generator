import React, { useEffect, useReducer, createContext } from "react"
import { loadImage, getHostname } from "../../utils"
import { trimImageWhitespace } from "../CanvasCommon"
import { drawIcon, drawBackground, createVirtualCanvas } from "../CanvasCommon"
import { useSettings } from "./settings"
import { useFileDrawer } from "./fileDrawer"
import { useExporter } from "../Exporter"

export const GeneratorContext = createContext()

export const Generator = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultState)
	const settings = useSettings(defaultSettings)
	const exporter = useExporter(state.thumbnails)
	const fileDrawer = useFileDrawer()

	const { thumbnails, selectedIndex, progressLoaded, progressTotal, isCanceled } = state
	const numIcons = thumbnails ? thumbnails.length : 0
	const isEmpty = numIcons === 0
	const selectedIcon =
		selectedIndex >= numIcons ? thumbnails[0] : thumbnails[selectedIndex]

	const addFromFiles = async (files) => {
		try {
			// start upload process
			dispatch({ type: "UPLOAD_INIT", payload: files.length })
			// start a separate upload job for every file
			files.forEach(async (file) => {
				if (isCanceled) return // skip the processing after cancellation
				try {
					const url = URL.createObjectURL(file)
					const name = file.name.substring(0, file.name.lastIndexOf("."))
					const icon = createThumbnail(url, name)
					// finish the job for this image
					dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
				} catch (error) {
					// TODO: custom handling for an error on a single file
					throw error // before the custom handling is done, rethrow the error
				}
			})
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromBookmarkUrl = async (url) => {
		// start upload process
		dispatch({ type: "UPLOAD_INIT", payload: 1 })
		try {
			/* from my trial-and-error testing it seems that 800 is the max size for the clearbit api,
			it returns an image with the size closest to the one requested */
			const size = 800
			// clearbit api expects the domain name so we extract it
			let hostname = getHostname(url)
			// TODO: using clearbit api requires ATTRIBUTION!!!
			// construct a clearbit api url
			const clearbitApiUrl = `https://logo.clearbit.com/${hostname}?size=${size}`
			// TODO: if hostname uses the "www" subdomain, remove it as it causes problems with uplead
			// const uploadApiUrl = `https://logo.uplead.com/${hostname}`
			// TODO: add more fallbacks and better error handling
			const icon = createThumbnail(clearbitApiUrl, hostname)
			// finish the job for this image
			dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromImageUrl = async (url) => {
		// start upload process
		dispatch({ type: "UPLOAD_INIT", payload: 1 })
		// fetch the image from clearbit api
		try {
			// console.log("fetching")
			// const response = await fetch("/.netlify/functions/fetchImage")
			// console.log(response)
			var name = url.substring(url.lastIndexOf("/") + 1)
			const icon = createThumbnail(url, name)
			// finish the job for this image
			dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromClipboard = async () => {
		alert("not implemented")
	}

	const createThumbnail = async (url, name) => {
		const errorBase = "Couldn't create icon: "
		// handle argument errors
		if (!url) throw new Error(errorBase + "url is missing")
		if (!name) throw new Error(errorBase + "name is missing")
		// generate unique id (TODO: test this or use shortid)
		const id = name + Date.now()
		// generate and process the image object
		let image
		image = await loadImage(url)
		image = await trimImageWhitespace(image)

		const remove = function() {
			dispatch({ type: "FILES_REMOVE_ONE", payload: this.id })
		}

		const render = function() {
			const { exportDimensions, bgColor, scale } = settings

			const [canvas] = createVirtualCanvas(...exportDimensions)
			drawBackground(canvas, bgColor)
			drawIcon(canvas, image, scale)

			this.renderedUrl = canvas.toDataURL()
			this.lastRendered = Date.now()
		}

		return {
			id,
			image,
			name,
			render,
			remove,
			renderedUrl: null,
			lastRendered: null // TODO: lastRendered can later be used for performance optimization
		}
	}

	const clear = () => dispatch({ type: "FILES_REMOVE_ALL" })
	const prevIcon = () => dispatch({ type: "SELECT_PREV_ICON" })
	const nextIcon = () => dispatch({ type: "SELECT_NEXT_ICON" })

	// dispatch upload success when batch upload operation finishes
	useEffect(() => {
		if (progressLoaded === progressTotal && progressTotal !== 0) {
			dispatch({ type: "UPLOAD_SUCCESS" })
		}
	}, [progressLoaded, progressTotal])

	// close file drawer when the icons list is empty
	useEffect(() => {
		if (thumbnails.isEmpty) fileDrawer.close()
	}, [fileDrawer, thumbnails.isEmpty])

	const context = {
		thumbnails: {
			isEmpty: isEmpty,
			count: numIcons,
			list: thumbnails,
			add: {
				fromFiles: addFromFiles,
				fromBookmarkUrl: addFromBookmarkUrl,
				fromImageUrl: addFromImageUrl,
				fromClipboard: addFromClipboard
			},
			clear: clear,
			selected: selectedIcon,
			next: nextIcon,
			prev: prevIcon,
			manager: fileDrawer
		},
		uploader: {
			isLoading: state.isLoading,
			isError: state.isError,
			isCanceled: state.isCanceled,
			progress: {
				loaded: state.progressLoaded,
				total: state.progressTotal
			}
		},
		settings: settings,
		exporter: exporter
	}

	return <GeneratorContext.Provider value={context}>{children}</GeneratorContext.Provider>
}

const defaultState = {
	selectedIndex: 0,
	progressTotal: 0,
	progressLoaded: 0,
	isLoading: false,
	isError: false,
	isCanceled: false,
	thumbnails: []
}

const reducer = (state, action) => {
	const { selectedIndex, thumbnails, progressLoaded } = state

	const numIcons = thumbnails ? thumbnails.length : 0

	switch (action.type) {
		case "UPLOAD_INIT":
			return {
				...state,
				progressTotal: action.payload,
				progressLoaded: 0,
				isLoading: true,
				isError: false,
				isCanceled: false
			}
		case "UPLOAD_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				isCanceled: false,
				selectedIndex: thumbnails.length - 1
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
				progressLoaded: progressLoaded + 1,
				thumbnails: [...thumbnails, action.payload]
			}
		case "FILES_REMOVE_ONE":
			return {
				...state,
				thumbnails: thumbnails.filter((icon) => icon.id !== action.payload)
			}
		case "FILES_REMOVE_ALL":
			return {
				...state,
				thumbnails: []
			}
		case "SELECT_PREV_ICON":
			return {
				...state,
				selectedIndex: selectedIndex - 1 >= 0 ? selectedIndex - 1 : numIcons - 1
			}
		case "SELECT_NEXT_ICON":
			return {
				...state,
				selectedIndex: (selectedIndex + 1) % numIcons
			}
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}
}

// there is a max size for downloads and exceeding it will cause the download to fail, so the resolution needs to be kept pretty low until I'm able to split the download into multiple zips
const defaultSettings = {
	bgColor: "#fff",
	scale: 45,
	exportDimensions: [840, 700]
}
