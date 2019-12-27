/**
 * Reads a file and return its representation as a data url
 * @param {File|Blob} file - a file or blob to be read
 * @returns Promise resolving to a data url
 */
const readFile = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => resolve(reader.result)
		reader.onerror = () => reject(reader.error)
		reader.readAsDataURL(file)
	})
}

export default readFile
