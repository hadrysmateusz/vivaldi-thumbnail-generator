/**
 * Creates an image element and loads an image into it
 * @param {string} src - url of the image
 * @returns Promise resolving to the loaded image element
 */
const loadImage = (src) => {
	return new Promise((resolve, reject) => {
		const img = document.createElement("img")
		img.crossOrigin = "anonymous"
		img.referrerpolicy = "no-referrer"
		img.onload = () => resolve(img)
		img.onerror = () => reject("Failed to load image")
		img.src = src
	})
}

export default loadImage
