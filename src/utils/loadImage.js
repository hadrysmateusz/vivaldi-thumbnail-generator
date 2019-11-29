/**
 * Creates an image element and loads an image into it
 * @param {string} src - url of the image
 * @param {boolean} [revokeUrl=false] - whether the onload handler should revoke the src url or not
 * @returns Promise resolving to the loaded image element
 */
const loadImage = (src, revokeUrl = false) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.crossOrigin = "Anonymous"
		img.onload = (e) => {
			if (revokeUrl) {
				URL.revokeObjectURL(e.target.src)
			}
			resolve(e.target)
		}
		img.onerror = () => reject("failed to load image")
		img.src = src
	})
}

export default loadImage
