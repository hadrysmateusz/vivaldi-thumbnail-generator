import React, { useState, useRef } from "react"

import { getRatio, getImageBounds } from "./utils"
import Canvas from "./Canvas"
import Uploader from "./Uploader"
import Downloader from "./Downloader"
import ColorPicker from "./ColorPicker"

function Generator() {
	const [bgColor, setBgColor] = useState("#111")
	const [image, setImage] = useState(null)
	const [targetSize, setTargetSize] = useState(300)
	const canvasRef = useRef()

	const onImageLoad = (e) => {
		// Get loaded image
		const image = e.target

		// Create temporary canvas
		const tempCanvas = document.createElement("canvas")
		const tempCtx = tempCanvas.getContext("2d")

		// Draw the original image to the temporary canvas
		tempCanvas.width = image.width
		tempCanvas.height = image.height
		tempCtx.drawImage(image, 0, 0)

		// Get bounds of the image (without white-space)
		const bounds = getImageBounds(tempCanvas)

		// Get trimmed dimensions
		const trimHeight = bounds.bottom - bounds.top
		const trimWidth = bounds.right - bounds.left

		// Get rescaled dimensions
		const { divisor, divident } = getRatio(trimWidth, trimHeight)
		const { round, sqrt } = Math
		const newHeight = round(sqrt((divisor * (targetSize * targetSize)) / divident))
		const newWidth = round((targetSize * targetSize) / newHeight)

		// TODO: consider clamping the dimensions of transformed image

		// Apply transformations
		tempCanvas.height = newHeight
		tempCanvas.width = newWidth
		tempCtx.drawImage(
			image,
			bounds.left,
			bounds.top,
			trimWidth,
			trimHeight,
			0,
			0,
			newWidth,
			newHeight
		)

		// Save transformed image in state
		setImage(tempCanvas)
	}

	return (
		<div>
			<ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
			<Uploader onImageLoad={onImageLoad} />
			<Canvas canvasRef={canvasRef} bgColor={bgColor} image={image} setImage={setImage} />
			<Downloader canvasRef={canvasRef} />
		</div>
	)
}

export default Generator
