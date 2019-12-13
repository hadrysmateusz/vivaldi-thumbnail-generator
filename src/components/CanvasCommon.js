import { useEffect } from "react"
import styled from "styled-components"
import { cover } from "polished"
import { loadImage } from "../utils"

export const StyledCanvas = styled.canvas`
	${cover()}
	width: 100%;
	height: 100%;
	display: block;
	z-index: 300;
`

export const useSizeCanvasToCssDimensions = (canvas) => {
	// TODO: investigate if this can be done in a better way
	// Set the drawing surface dimensions to match the canvas
	useEffect(() => {
		canvas.current.width = canvas.current.scrollWidth
		canvas.current.height = canvas.current.scrollHeight
	}, [canvas])
}

export const createVirtualCanvas = (width, height) => {
	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")

	if (width && height) {
		canvas.width = width
		canvas.height = height
	}

	return [canvas, ctx]
}

export const getCanvasFromRef = (canvasRef) => {
	const canvas = canvasRef.current
	const ctx = canvas.getContext("2d")
	return [canvas, ctx]
}

export const clearCanvas = (canvas) => {
	const ctx = canvas.getContext("2d")
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

export const drawBackground = (canvas, bgColor) => {
	const ctx = canvas.getContext("2d")
	ctx.save()
	ctx.fillStyle = bgColor
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.restore()
}

export const drawIcon = (canvas, image, scale) => {
	const { width, height } = calculateDimensions(image, scale, canvas)
	const ctx = canvas.getContext("2d")
	const positionX = canvas.width / 2 - width / 2
	const positionY = canvas.height / 2 - height / 2
	ctx.drawImage(image, positionX, positionY, width, height)
}

/**
 * Calculates the correct dimensions that should make images of any ratio look uniform in size
 * @param {Image} image The Image to calculate dimensions from
 * @param {Number} scale The ideal size that the image should have if it was a square
 * @param {*} canvas The canvas on which the image will be drawn, needed to calculate the targetSize
 */
export const calculateDimensions = (image, scale, canvas) => {
	if (!image) return {} // if there is no image return an empty object to prevent errors

	try {
		const { abs, log2, round } = Math

		const targetSize = (canvas.height / 100) * scale
		const imageWidth = image.naturalWidth
		const imageHeight = image.naturalHeight
		const ratio = imageWidth / imageHeight

		// deviance increases logarithmicaly as the difference between width and height grows
		const deviance = abs(log2(ratio))
		const extension = deviance * (targetSize / 10)

		let height, width

		if (ratio > 1) {
			width = targetSize + extension
			height = width / ratio
		} else if (ratio < 1) {
			height = targetSize + extension
			width = height * ratio
		} else {
			width = targetSize
			height = targetSize
		}

		return { width: round(width), height: round(height) }
	} catch (err) {
		console.error("failed to calculate image dimensions: ", err)
		// if the calculations fail for any reason, just use the image's original dimensions
		return { width: image.naturalWidth, height: image.naturalHeight }
	}
}

/**
 * Trims the whitespace from an image
 * @param {Image} image - Image to remove whitespace from
 * @returns Promise resolving to the trimmed Image
 */
export const trimImageWhitespace = (image) => {
	// Get bounds of the image (without white-space)
	const bounds = getImageBounds(image)

	// Get trimmed dimensions
	const trimWidth = bounds.right - bounds.left
	const trimHeight = bounds.bottom - bounds.top

	// Create canvas to the dimensions of the trimmed image
	const [canvas, ctx] = createVirtualCanvas(trimWidth, trimHeight)

	// Apply transformations
	ctx.drawImage(
		image,
		bounds.left,
		bounds.top,
		trimWidth,
		trimHeight,
		0,
		0,
		trimWidth,
		trimHeight
	)

	// Get image of canvas as data url
	const dataUrl = canvas.toDataURL("image/png", 1)

	// Return promise resolving to loaded image
	return loadImage(dataUrl)
}

/**
 * Takes an image and returns the dimensions of the actual image inside, without the surrounding whitespace
 * @param {Image} image - Image to get the bounds from
 * @return Object containing the position of the edges of the image
 */
export const getImageBounds = (image) => {
	let x, y
	let bounds = {
		top: null,
		left: null,
		right: null,
		bottom: null
	}

	// Create canvas to the dimensions of the image
	const [canvas, ctx] = createVirtualCanvas(image.naturalWidth, image.naturalHeight)

	// Draw the image to the temporary canvas
	ctx.drawImage(image, 0, 0)

	// Get ImageData of the entire canvas for processing
	const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)

	// Iterate over every pixel to find the highest
	// and where it ends on every axis ()
	for (let i = 0; i < pixels.data.length; i += 4) {
		if (pixels.data[i + 3] !== 0) {
			x = (i / 4) % canvas.width
			y = ~~(i / 4 / canvas.width)

			if (bounds.top === null) {
				bounds.top = y
			}

			if (bounds.left === null) {
				bounds.left = x
			} else if (x < bounds.left) {
				bounds.left = x
			}

			if (bounds.right === null) {
				bounds.right = x
			} else if (bounds.right < x) {
				bounds.right = x
			}

			if (bounds.bottom === null) {
				bounds.bottom = y
			} else if (bounds.bottom < y) {
				bounds.bottom = y
			}
		}
	}

	return bounds
}
