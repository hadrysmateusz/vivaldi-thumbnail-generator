export const getImageBounds = (canvas) => {
	const ctx = canvas.getContext("2d")
	const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
	let x, y

	let bounds = {
		top: null,
		left: null,
		right: null,
		bottom: null
	}

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

export const gcd = (p, q) => {
	return q === 0 ? p : gcd(q, p % q)
}

export const getRatio = (a, b) => {
	const _gcd = gcd(a, b)
	return { value: a / b, divident: a / _gcd, divisor: b / _gcd }
}

/**
 * Trims the whitespace from an image and rescales it to be of the target size visually
 * @param {Image} image - Image to be transformed
 * @param {number} targetSize - target size to rescale to
 * @returns A canvas element containing the transformed image
 */
export const trimAndRescaleImage = (image, targetSize) => {
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

	return tempCanvas
}
