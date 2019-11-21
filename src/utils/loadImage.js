/**
 * Creates an image element and loads an image into it
 * @param {string} src - url of the image
 * @returns Promise resolving to the loaded image element
 */
const loadImage = (src) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = (e) => resolve(e.target)
		img.onerror = () => reject("failed to load image")
		img.src = src
	})
}

export default loadImage
