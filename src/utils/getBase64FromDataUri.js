const getBase64FromDataUri = (dataUrl) => {
	const startIndex = dataUrl.indexOf(",") + 1
	return dataUrl.slice(startIndex)
}

export default getBase64FromDataUri
