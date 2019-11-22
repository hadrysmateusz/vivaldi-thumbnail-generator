import React, { useState, createContext, useContext } from "react"
import { loadImage } from "../utils"

export const FileContext = createContext()

export const useFileContext = () => useContext(FileContext)

const FileManager = ({ children }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [images, setImages] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const addFiles = async (files) => {
		if (isLoading) {
			alert("Wait for the previous action to finish")
			return
		}

		setIsLoading(true)

		const imagePromises = files.map((file) => {
			const objectUrl = URL.createObjectURL(file)
			return loadImage(objectUrl)
		})

		const images = await Promise.all(imagePromises)
		setImages((prevState) => [...prevState, ...images])
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

	const hasFiles = images && images.length > 0

	const contextValue = {
		addFiles,
		hasFiles,
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

export default FileManager
