import React, { useRef, useEffect } from "react"
import "./Upload.scss"

const Upload = () => {
	const fileInputEl = useRef()
	const canvasEl = useRef()

	const onImageLoad = (e) => {
		const ctx = canvasEl.current.getContext("2d")
		ctx.drawImage(e.target, 100, 100, 200, 200)
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
		reader.onload(() => {
			const img = new Image()
			img.src = reader.result
			img.onload = onImageLoad
			img.onerror = onImageError
		})

		// verify the file exists and is an image
		if (!file) onImageError("no file")
		if (!file.type.match("image.*")) onImageError("file is not an image")

		reader.readAsDataURL(file)
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
		</div>
	)
}

export default Upload
