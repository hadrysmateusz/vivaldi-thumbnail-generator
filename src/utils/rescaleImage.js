export const gcd = (p, q) => {
	return q === 0 ? p : gcd(q, p % q)
}

export const getRatio = (a, b) => {
	const _gcd = gcd(a, b)
	return { value: a / b, divident: a / _gcd, divisor: b / _gcd }
}

/**
 * Rescales an image to visually match the target size regardless of its aspect ratio
 * @param {Image} image - Image to be rescaled
 * @param {number} targetSize - target size to rescale to
 * @returns A canvas element containing the rescaled image
 */
const rescaleImage = (imageCanvas, targetSize) => {
	// Clone the image canvas
	const newCanvas = document.createElement("canvas")
	const newCtx = newCanvas.getContext("2d")

	// TODO: the formula may need some tweaking, as images get larger the farther the aspect ratio gets from 1
	// Get rescaled dimensions
	const { round, sqrt } = Math
	const { divisor, divident } = getRatio(imageCanvas.width, imageCanvas.height)
	const newHeight = round(sqrt((divisor * (targetSize * targetSize)) / divident))
	const newWidth = round((targetSize * targetSize) / newHeight)

	// TODO: consider clamping the dimensions of transformed image

	// Apply transformations
	newCanvas.width = newWidth
	newCanvas.height = newHeight
	newCtx.drawImage(imageCanvas, 0, 0, newWidth, newHeight)

	return newCanvas
}

export default rescaleImage
