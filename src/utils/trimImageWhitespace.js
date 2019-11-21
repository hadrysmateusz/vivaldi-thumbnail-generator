import { getImageBounds } from "."

/**
 * Trims the whitespace from an image
 * @param {Image} image - Image to be remove whitespace from
 * @returns A canvas element containing the trimmed image
 */
const trimImageWhitespace = (image) => {
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
	const trimWidth = bounds.right - bounds.left
	const trimHeight = bounds.bottom - bounds.top

	// Apply transformations
	tempCanvas.width = trimWidth
	tempCanvas.height = trimHeight
	tempCtx.drawImage(
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

	return tempCanvas
}

export default trimImageWhitespace
