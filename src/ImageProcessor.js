import React, { useState, useRef, useEffect } from "react"
import debounce from "lodash.debounce"

import Canvas from "./Canvas"
import Uploader from "./Uploader"

import { trimImageWhitespace, rescaleImage } from "./utils"

function ImageProcessor({ canvasRef, bgColor, targetSize }) {
	const [originalImageUrls, setOriginalImageUrls] = useState([])
	const [trimmedImages, setTrimmedImages] = useState([])
	const [rescaledImages, setRescaledImages] = useState([])
	const [currentImage, setCurrentImage] = useState(0)

	const next = () => {
		setCurrentImage((prevState) => {
			const newIndex = prevState + 1
			const numImages = rescaledImages.length
			return newIndex % numImages
		})
	}

	const prev = () => {
		setCurrentImage((prevState) => {
			const newIndex = prevState - 1
			const numImages = rescaledImages.length
			return newIndex >= 0 ? newIndex : numImages - 1
		})
	}

	// trim whitespace
	useEffect(() => {
		if (originalImageUrls.length === 0) return

		// trim the image whitespace
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
	}, [originalImageUrls])

	const debouncedRescale = useRef(
		debounce((trimmedImages, targetSize) => {
			if (trimmedImages.length === 0) return

			const rescaledImages = trimmedImages.map((trimmedImage) => {
				return rescaleImage(trimmedImage, targetSize)
			})

			setRescaledImages(rescaledImages)
		}, 150)
	)

	useEffect(() => debouncedRescale.current(trimmedImages, targetSize), [
		trimmedImages,
		targetSize
	])

	return (
		<div>
			<button onClick={prev}>Previous</button>
			<button onClick={next}>Next</button>
			<Canvas
				canvasRef={canvasRef}
				bgColor={bgColor}
				image={rescaledImages[currentImage]}
			/>
			<Uploader setImageUrls={setOriginalImageUrls} imageUrls={originalImageUrls} />
		</div>
	)
}

export default ImageProcessor
