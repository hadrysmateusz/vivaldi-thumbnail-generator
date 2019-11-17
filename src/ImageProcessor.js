import React, { useState, useRef, useEffect } from "react"
import debounce from "lodash.debounce"

import Canvas from "./Canvas"
import Uploader from "./Uploader"

import { trimImageWhitespace, rescaleImage } from "./utils"

function ImageProcessor({ bgColor, targetSize }) {
	const [originalImageUrls, setOriginalImageUrls] = useState([])
	const [trimmedImages, setTrimmedImages] = useState([])
	const [rescaledImages, setRescaledImages] = useState([])
	const [currentImage, setCurrentImage] = useState(0)
	const canvasRef = useRef()

	const cycleImages = () => {
		setCurrentImage((prevState) => {
			const nextIndex = prevState + 1
			const numImages = rescaledImages.length
			console.log(nextIndex, numImages, nextIndex % numImages)
			return nextIndex % numImages
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
			<Uploader setImageUrls={setOriginalImageUrls} />
			<Canvas
				canvasRef={canvasRef}
				bgColor={bgColor}
				image={rescaledImages[currentImage]}
				onClick={cycleImages}
			/>
		</div>
	)
}

export default ImageProcessor
