import JSZip from "jszip"
import { getBase64FromDataUri } from "."

const fromUrl = (url, filename) => {
	const a = document.createElement("a")
	a.href = url
	a.download = filename
	a.style.display = "none"
	document.body.appendChild(a)
	if (typeof a.click === "function") {
		a.click()
	} else {
		a.target = "_blank"
		a.dispatchEvent(
			new MouseEvent("click", {
				view: window,
				bubbles: true,
				cancelable: true
			})
		)
	}
	if (typeof a.remove === "function") {
		a.remove()
	}
}

const fromUrls = async (urls, filename) => {
	const zip = new JSZip()
	// Generate a directory within the Zip file structure
	const folder = zip.folder(filename)
	// Add all files to the folder
	urls.forEach((url, i) => {
		// Generate file name
		const fileName = `${i + 1}.png`
		// Get base64 content of the image
		const fileData = getBase64FromDataUri(url)
		// Add file to folder
		folder.file(fileName, fileData, { base64: true })
	})
	// Generate zip file as a base64 string
	const zipBase64 = await zip.generateAsync({ type: "base64" })
	// Assemble a data url
	const link = "data:application/zip;base64," + zipBase64
	// Download the zip file
	fromUrl(link, "thumbnails.zip")
}

const download = {
	fromUrl,
	zip: {
		fromUrls
	}
}

export default download
