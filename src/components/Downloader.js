import React from "react"
import Button from "./Button"

const Downloader = ({ canvasRef }) => {
	// TODO: improve this
	const onDownload = () => {
		const canvasImage = canvasRef.current.toDataURL("image/png")

		// this can be used to download any image from webpage to local disk
		let xhr = new XMLHttpRequest()
		xhr.responseType = "blob"
		xhr.onload = function() {
			let a = document.createElement("a")
			a.href = window.URL.createObjectURL(xhr.response)
			a.download = "thumbnail.png"
			a.style.display = "none"
			document.body.appendChild(a)
			a.click()
			a.remove()
		}
		xhr.open("GET", canvasImage) // This is to download the canvas Image
		xhr.send()
	}

	return (
		<div style={{ margin: "32px 0" }}>
			<Button onClick={onDownload}>Download</Button>
		</div>
	)
}

export default Downloader
