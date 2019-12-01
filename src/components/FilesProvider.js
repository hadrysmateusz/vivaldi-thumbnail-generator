import React, { useState, createContext, useContext } from "react"
import { loadImage } from "../utils"
import { trimImageWhitespace } from "./CanvasCommon"

export const FileContext = createContext()

export const useFileContext = () => useContext(FileContext)

const FilesProvider = ({ children }) => {
	const [images, setImages] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const addFromFiles = async (files) => {
		if (isLoading) {
			alert("Wait for the previous action to finish")
			return
		}

		setIsLoading(true)

		try {
			const images = await Promise.all(
				files.map((file) => {
					const objectUrl = URL.createObjectURL(file)
					return loadImage(objectUrl).then((image) => trimImageWhitespace(image))
				})
			)

			setImages((prevState) => [...prevState, ...images])
		} catch (err) {
			alert("Some files could not be loaded")
			console.error(err)
		}

		setIsLoading(false)
	}

	const addFromBookmarkUrl = async (url) => {
		if (isLoading) {
			alert("Wait for the previous action to finish")
			return
		}

		setIsLoading(true)

		try {
			const hostname = getHostname(url)

			const clearbitApiUrl = `//logo.clearbit.com/${hostname}`

			const image = await loadImage(clearbitApiUrl).then((image) =>
				trimImageWhitespace(image)
			)

			setImages((prevState) => [...prevState, image])
		} catch (err) {
			alert("Couldn't find icon for this url")
			console.error(err)
		}

		setIsLoading(false)
	}

	const addFromImageUrl = async (url) => {
		// PLACEHOLDER
		if (isLoading) {
			alert("Wait for the previous action to finish")
			return
		}

		setIsLoading(true)

		try {
			const image = await loadImage(url).then((image) => trimImageWhitespace(image))
			setImages((prevState) => [...prevState, image])
		} catch (err) {
			// TODO: better error handling
			alert("This image could not be loaded")
			console.error(err)
		}

		setIsLoading(false)
	}

	const clearImages = () => {
		setImages([])
	}

	const openFileDrawer = () => {
		setIsDrawerOpen(true)
	}

	const closeFileDrawer = () => {
		setIsDrawerOpen(false)
	}

	const removeImage = (urlToRemove) => {
		URL.revokeObjectURL(urlToRemove)
		setImages((prevState) => prevState.filter((image) => image.src !== urlToRemove))
	}

	const hasImages = images && images.length > 0

	const contextValue = {
		addFromFiles,
		addFromBookmarkUrl,
		addFromImageUrl,
		hasImages,
		images,
		setImages,
		clearImages,
		removeImage,
		isLoading,
		setIsLoading,
		openFileDrawer,
		closeFileDrawer,
		isDrawerOpen
	}

	return <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
}

const getHostname = (url) => {
	return new URL(url).hostname
}

export default FilesProvider