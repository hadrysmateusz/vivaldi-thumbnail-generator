import React, { useState, useRef, useEffect } from "react"
import debounce from "lodash.debounce"
import styled from "styled-components"

import Preview from "./Preview"
import Uploader from "./Uploader"
import NavigationButtons from "./NavigationButtons"

import { trimImageWhitespace, rescaleImage } from "./utils"

const Container = styled.div`
	position: relative;
`

function ImageProcessor({ canvasRef, bgColor, targetSize }) {
	const [originalImageUrls, setOriginalImageUrls] = useState([])
	const [trimmedImages, setTrimmedImages] = useState([])
	const [rescaledImages, setRescaledImages] = useState([])
	const [currentImage, setCurrentImage] = useState(0)

	const trimWhitespace = () => {
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
	useEffect(trimWhitespace, [originalImageUrls])

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
			<Uploader setImageUrls={setOriginalImageUrls} />
			<NavigationButtons images={rescaledImages} setCurrentImage={setCurrentImage} />
		</Container>
	)
}

export default ImageProcessor
