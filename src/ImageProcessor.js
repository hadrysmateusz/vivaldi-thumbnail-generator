import React, { useState, useRef, useEffect } from "react"

import Canvas from "./Canvas"
import Uploader from "./Uploader"

import { trimImageWhitespace, rescaleImage } from "./utils"

function ImageProcessor({ bgColor, targetSize }) {
	const [originalImageUrls, setOriginalImageUrls] = useState([])
	const [trimmedImages, setTrimmedImages] = useState([])
	const [rescaledImages, setRescaledImages] = useState([])
	const canvasRef = useRef()

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

		originalImageUrls.forEach((imageUrl) => {
			const img = new Image()
			img.src = imageUrl
			img.onload = onImageLoad
			img.onerror = onImageError
		})
	}, [originalImageUrls])

	useEffect(() => {
		if (trimmedImages.length === 0) return

		trimmedImages.forEach((trimmedImage) => {
			const rescaledImage = rescaleImage(trimmedImage, targetSize)
			setRescaledImages((prevState) => [...prevState, rescaledImage])
		})
	}, [trimmedImages, targetSize])

	return (
		<div>
			<Uploader setImageUrls={setOriginalImageUrls} />
			<Canvas canvasRef={canvasRef} bgColor={bgColor} image={rescaledImages[0]} />
		</div>
	)
}

export default ImageProcessor
