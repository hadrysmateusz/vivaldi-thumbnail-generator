import { getImageBounds, loadImage } from "."

/**
 * Trims the whitespace from an image
 * @param {Image} image - Image to remove whitespace from
 * @returns Promise resolving to the trimmed Image
 */
const trimImageWhitespace = (image) => {
	// Create temporary canvas
	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")

	// Set the canvas' dimensions to those of the image
	canvas.width = image.width
	canvas.height = image.height

	// Draw the image to the temporary canvas
	ctx.drawImage(image, 0, 0)

	// Get bounds of the image (without white-space)
	const bounds = getImageBounds(canvas)

	// Get trimmed dimensions
	const trimWidth = bounds.right - bounds.left
	const trimHeight = bounds.bottom - bounds.top

	// Set the canvas' dimensions to those of the trimmed part's
	canvas.width = trimWidth
	canvas.height = trimHeight

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

export default trimImageWhitespace
