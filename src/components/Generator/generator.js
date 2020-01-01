import React, { useEffect, useReducer, createContext, useState } from "react"
import { loadImage, getHostname } from "../../utils"
import { trimImageWhitespace } from "../CanvasCommon"
import { drawIcon, drawBackground, createVirtualCanvas } from "../CanvasCommon"
import { useSettingsManager } from "./settings"
import { getBase64FromDataUri, readFile } from "../../utils"
import JSZip from "jszip"
import FileSaver from "file-saver"

export const MAX_THUMBNAILS_IN_ARCHIVE = 15
export const GeneratorContext = createContext()

const Generator = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, defaultState)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const settings = useSettingsManager({
		bgColor: "#fff",
		scale: 45,
		exportDimensions: [840, 700]
	})

	const { thumbnails, selectedIndex, uploader, exporter } = state
	const count = thumbnails ? thumbnails.length : 0
	const isEmpty = count === 0
	const selected = thumbnails[selectedIndex] || null
	const isExporterReady = !exporter.isLoading && !uploader.isLoading && !isEmpty
	const isDownloadReady = !exporter.isLoading && !exporter.isError && exporter.archive

	const addFromFiles = async (files) => {
		try {
			// start upload process
			dispatch({ type: "UPLOAD_INIT", payload: files.length })
			// start a separate upload job for every file
			files.forEach(async (file) => {
				if (uploader.isCanceled) return // skip the processing after cancellation
				try {
					const url = await readFile(file)
					const name = file.name.substring(0, file.name.lastIndexOf("."))
					const thumbnail = await createThumbnail(url, name)
					// finish the job for this image
					dispatch({ type: "UPLOAD_PROGRESS", payload: thumbnail })
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
			const icon = await createThumbnail(clearbitApiUrl, hostname)
			dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromImageUrl = async (url) => {
		dispatch({ type: "UPLOAD_INIT", payload: 1 })
		try {
			// const response = await fetch("/.netlify/functions/fetchImage")
			var name = url.substring(url.lastIndexOf("/") + 1)
			const icon = await createThumbnail(url, name)
			dispatch({ type: "UPLOAD_PROGRESS", payload: icon })
		} catch (error) {
			dispatch({ type: "UPLOAD_FAILURE", error })
		}
	}

	const addFromClipboard = async () => {
		alert("not implemented")
	}

	const clear = () => dispatch({ type: "FILES_REMOVE_ALL" })
	const prevIcon = () => dispatch({ type: "SELECT_PREV_ICON" })
	const nextIcon = () => dispatch({ type: "SELECT_NEXT_ICON" })
	const openDrawer = () => setIsDrawerOpen(true)
	const closeDrawer = () => setIsDrawerOpen(false)

	const renderAll = async () => {
		dispatch({ type: "EXPORT_INIT" })
		try {
			// render thumbnails
			thumbnails.forEach((thumbnail) => renderOne(thumbnail))
			// helper functions that renames thumbnails with duplicate names
			;(function renameThumbnails(thumbnails) {
				var count = {} // object that counts the occurences of every name
				// go through each file and rename them if necessary
				thumbnails.forEach((thumb, i) => {
					// get the thumbnail name
					const name = thumb.name
					// if the same name hasn't occured before, skip the renaming
					if (thumbnails.findIndex((thumb) => thumb.name === name) === i) return
					// if the name has already occured, increment its count otherwise set the count to zero
					var c = name in count ? (count[name] = count[name] + 1) : (count[name] = 1)
					// the current 1-based count used for display
					var j = c
					// the constructed name
					var newName = `${name} (${j})`
					// helper function that checks if a thumbnail with given name already exists
					function nameExists(name) {
						return thumbnails.findIndex((thumb) => thumb.name === name) !== -1
					}
					// as long as the name is already taken, keep incrementing the number
					while (nameExists(newName)) {
						j += 1
						newName = `${name} (${j})`
					}
					// rename the file
					thumb.name = newName
				})
				return thumbnails
			})(thumbnails)
			// generate the zip archive containing all thumbnails
			const archiveBlob = await generateZip(thumbnails)
			// finish exporting
			dispatch({ type: "EXPORT_SUCCESS", payload: archiveBlob })
		} catch (error) {
			dispatch({ type: "EXPORT_FAILURE", error })
		}
	}

	/**
	 * Renders the thumbnail and returns the dataURL
	 * @param {Thumbnail} thumbnail
	 * @returns dataURL of the rendered thumbnail
	 */
	const renderOne = function(thumbnail) {
		const { exportDimensions, bgColor, scale } = settings.values
		// render the background and icon on a single canvas
		const [canvas] = createVirtualCanvas(...exportDimensions)
		drawBackground(canvas, bgColor)
		drawIcon(canvas, thumbnail.image, scale)
		// get the canvas contents as a dataURL
		const dataURL = canvas.toDataURL()
		// save the url inside the renderedUrl property of the thumbnail along with a timestamp
		thumbnail.renderedUrl = dataURL
		thumbnail.lastRendered = Date.now()
		// return the dataURL
		return dataURL
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

		const thumbnail = {
			id,
			image,
			name,
			renderedUrl: null,
			lastRendered: null // TODO: lastRendered can later be used for performance optimization
		}

		thumbnail.remove = function() {
			dispatch({ type: "FILES_REMOVE_ONE", payload: this.id })
		}.bind(thumbnail)

		return thumbnail
	}

	const download = () => {
		if (!isDownloadReady) {
			// TODO: show a message
			return
		}

		// download the archive
		FileSaver.saveAs(exporter.archive, "vtg-thumbnails.zip")
	}

	// whenever the currently selected index overflows the available thumbnails count, reset it to zero
	useEffect(() => {
		if (selectedIndex >= count) {
			dispatch({ type: "SELECT_NTH_ICON", payload: 0 })
		}
	}, [count, selectedIndex])

	// dispatch upload success when batch upload operation finishes
	useEffect(() => {
		if (
			uploader.progressLoaded === uploader.progressTotal &&
			uploader.progressTotal !== 0
		) {
			dispatch({ type: "UPLOAD_SUCCESS" })
		}
	}, [uploader.progressLoaded, uploader.progressTotal])

	// close file drawer when the icons list is empty
	useEffect(() => {
		if (isEmpty) {
			closeDrawer()
		}
	}, [isEmpty])

	const context = {
		thumbnails: {
			isEmpty: isEmpty,
			count: count,
			list: thumbnails,
			add: {
				fromFiles: addFromFiles,
				fromBookmarkUrl: addFromBookmarkUrl,
				fromImageUrl: addFromImageUrl,
				fromClipboard: addFromClipboard
			},
			renderAll: renderAll,
			renderOne: renderOne,
			clear: clear,
			selected: selected,
			next: nextIcon,
			prev: prevIcon,
			manager: {
				isOpen: isDrawerOpen,
				open: openDrawer,
				close: closeDrawer
			}
		},
		uploader: {
			isLoading: uploader.isLoading,
			isError: uploader.isError,
			isCanceled: uploader.isCanceled,
			progress: {
				loaded: uploader.progressLoaded,
				total: uploader.progressTotal
			}
		},
		exporter: {
			isLoading: exporter.isLoading,
			isError: exporter.isError,
			isReady: isExporterReady,
			renderAll: renderAll,
			download: download
		},
		settings: settings
	}

	return <GeneratorContext.Provider value={context}>{children}</GeneratorContext.Provider>
}

const defaultState = {
	uploader: {
		progressTotal: 0,
		progressLoaded: 0,
		isLoading: false,
		isError: false,
		isCanceled: false
	},
	exporter: {
		isLoading: false,
		isError: false,
		archive: null
	},
	selectedIndex: 0,
	thumbnails: []
}

const reducer = (state, action) => {
	const { selectedIndex, thumbnails, uploader, exporter } = state

	const numIcons = thumbnails ? thumbnails.length : 0

	switch (action.type) {
		case "UPLOAD_INIT":
			return {
				...state,
				uploader: {
					...uploader,
					isLoading: true,
					isError: false,
					isCanceled: false,
					progressTotal: action.payload,
					progressLoaded: 0
				}
			}
		case "UPLOAD_SUCCESS":
			return {
				...state,
				selectedIndex: thumbnails.length - 1,
				uploader: {
					...uploader,
					isLoading: false,
					isError: false,
					isCanceled: false,
					progressTotal: 0,
					progressLoaded: 0
				}
			}
		case "UPLOAD_FAILURE":
			console.error(action.error)
			return {
				...state,
				uploader: {
					...uploader,
					isLoading: false,
					isError: true,
					isCanceled: false,
					progressTotal: 0,
					progressLoaded: 0
				}
			}
		case "UPLOAD_CANCEL":
			return {
				...state,
				uploader: {
					...uploader,
					isLoading: false,
					isError: false,
					isCanceled: true,
					progressTotal: 0,
					progressLoaded: 0
				}
			}
		case "UPLOAD_PROGRESS":
			return {
				...state,
				thumbnails: [...thumbnails, action.payload],
				uploader: {
					...uploader,
					progressLoaded: uploader.progressLoaded + 1
				}
			}
		case "EXPORT_INIT":
			return {
				...state,
				exporter: {
					...exporter,
					isLoading: true,
					isError: false
				}
			}
		case "EXPORT_SUCCESS":
			return {
				...state,
				exporter: {
					...exporter,
					isLoading: false,
					isError: false,
					archive: action.payload
				}
			}
		case "EXPORT_FAILURE":
			console.error(action.error)
			return {
				...state,
				exporter: {
					...exporter,
					isLoading: false,
					isError: true,
					archive: null
				}
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
		case "SELECT_NTH_ICON":
			return {
				...state,
				selectedIndex: action.payload
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
		const { renderedUrl, name } = thumbnail
		// Get base64 content of the image
		const fileData = getBase64FromDataUri(renderedUrl)
		// Add file to folder
		folder.file(name + ".png", fileData, { base64: true })
	})
	// Generate zip file as a blob string
	const blob = await zip.generateAsync({ type: "blob" })
	return blob
}

export default Generator
