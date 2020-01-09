/**
 * Gets the filename without the extension
 * @param {File} file
 */
const getNameFromFile = (file) => {
	return file.name.substring(0, file.name.lastIndexOf("."))
}

export default getNameFromFile
