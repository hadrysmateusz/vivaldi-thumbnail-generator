import React, { useRef, useEffect } from "react"
import "./Upload.scss"

const Upload = () => {
	const fileInputEl = useRef()
	const canvasEl = useRef()

	const onImageLoad = (e) => {
		const canvas = canvasEl.current
		const ctx = canvas.getContext("2d")
		const image = e.target

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = "#3a3a3a"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.drawImage(
			image,
			canvas.width / 2 - image.naturalWidth / 2,
			canvas.height / 2 - image.naturalHeight / 2
		)
	}

	const onImageError = (msg) => {
		alert("Couldn't load image")
		if (msg) console.error(`Couldn't load image: ${msg}`)
	}

	const onFileChange = () => {
		const reader = new FileReader()
		const files = fileInputEl.current.files
		const file = files[0]

		// when the file is loaded, initiate processing
		reader.addEventListener("load", () => {
			const img = new Image()
			img.src = reader.result
			img.onload = onImageLoad
			img.onerror = onImageError
		})

		// verify the file exists and is an image
		if (!file) return onImageError("no file")
		if (!file.type.match("image.*")) return onImageError("file is not an image")

		reader.readAsDataURL(file)
	}

	// TODO: improve this
	const onDownload = () => {
		const canvasImage = canvasEl.current.toDataURL("image/png")

		// this can be used to download any image from webpage to local disk
		let xhr = new XMLHttpRequest()
		xhr.responseType = "blob"
		xhr.onload = function() {
			let a = document.createElement("a")
			a.href = window.URL.createObjectURL(xhr.response)
			a.download = "image_name.jpg"
			a.style.display = "none"
			document.body.appendChild(a)
			a.click()
			a.remove()
		}
		xhr.open("GET", canvasImage) // This is to download the canvas Image
		xhr.send()
	}

	// Set the drawing surface dimensions to match the canvas
	useEffect(() => {
		canvasEl.current.width = canvasEl.current.scrollWidth
		canvasEl.current.height = canvasEl.current.scrollHeight
	})

	return (
		<div className="Upload-outer-container">
			<div>
				<input type="file" ref={fileInputEl} onChange={onFileChange} />
			</div>
			<canvas className="Upload-canvas" ref={canvasEl} />
			<button onClick={onDownload}>Download</button>
		</div>
	)
}

export default Upload
