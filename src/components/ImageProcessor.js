import React, { useState, useRef, useEffect, useContext } from "react"
import debounce from "lodash.debounce"
import styled from "styled-components"

import Preview from "./Preview"
import FileManager from "./FileManager"
import NavigationButtons from "./NavigationButtons"
import { SettingsContext } from "./Settings"
import { trimImageWhitespace, rescaleImage } from "../utils"

const Container = styled.div`
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

function ImageProcessor({ canvasRef }) {
	const { targetSize, bgColor } = useContext(SettingsContext)
	const [originalImageUrls, setOriginalImageUrls] = useState([])
	const [trimmedImages, setTrimmedImages] = useState([])
	const [rescaledImages, setRescaledImages] = useState([])
	const [currentImage, setCurrentImage] = useState(0)

	const onFilesChange = () => {
		const onImageLoad = (e) => {
			const image = e.target
			const trimmedImage = trimImageWhitespace(image)
			setTrimmedImages((prevState) => [...prevState, trimmedImage])
		}

		const onImageError = () => {
			this.src = null
			alert("couldn't load image")
		}

		// clear previous images
		setTrimmedImages([])

		originalImageUrls.forEach((imageUrl) => {
			const img = new Image()
			img.src = imageUrl
			img.onload = onImageLoad
			img.onerror = onImageError
		})
	}

	const debouncedRescale = useRef(
		debounce((trimmedImages, targetSize) => {
			const rescaledImages = trimmedImages.map((trimmedImage) => {
				return rescaleImage(trimmedImage, targetSize)
			})

			setRescaledImages(rescaledImages)
		}, 150)
	)

	// trim whitespace
	useEffect(onFilesChange, [originalImageUrls])

	// rescale
	useEffect(() => debouncedRescale.current(trimmedImages, targetSize), [
		trimmedImages,
		targetSize
	])

	return (
		<Container>
			<Preview
				canvasRef={canvasRef}
				bgColor={bgColor}
				image={rescaledImages[currentImage]}
			/>
			<FileManager setImageUrls={setOriginalImageUrls} imageUrls={originalImageUrls} />
			<NavigationButtons images={rescaledImages} setCurrentImage={setCurrentImage} />
		</Container>
	)
}

export default ImageProcessor
