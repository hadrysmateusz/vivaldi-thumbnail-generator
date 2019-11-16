import React, { useRef, useEffect, useState } from "react"
import "./Upload.scss"

const gcd = (p, q) => {
	return q === 0 ? p : gcd(q, p % q)
}

const ratio = (a, b) => {
	const _gcd = gcd(a, b)
	return { divident: a / _gcd, divisor: b / _gcd }
}

const Upload = () => {
	const fileInputEl = useRef()
	const canvasEl = useRef()
	const bgColor = useState("#333")

	const resetCanvas = () => {
		const canvas = canvasEl.current
		const ctx = canvas.getContext("2d")
		ctx.save()
		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.restore()
	}

	const onImageLoad = (e) => {
		const canvas = canvasEl.current
		const ctx = canvas.getContext("2d")
		const image = e.target

		resetCanvas()

		const originalWidth = image.naturalWidth
		const originalHeight = image.naturalHeight
		const targetSize = canvas.height / 2

		const { divisor, divident } = ratio(originalWidth, originalHeight)

		console.log(`width: ${originalWidth} height: ${originalHeight}`)
		console.log(`divident: ${divident} divisor: ${divisor}`)

		let newHeight, newWidth

		newHeight = Math.round(Math.sqrt((divisor * (targetSize * targetSize)) / divident))
		newWidth = Math.round((targetSize * targetSize) / newHeight)

		console.log(`newWidth: ${newWidth} newHeight: ${newHeight}`)

		ctx.drawImage(
			image,
			canvas.width / 2 - newWidth / 2,
			canvas.height / 2 - newHeight / 2,
			newWidth,
			newHeight
		)
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
			img.onerror = () => alert("couldn't load image")
		})

		// verify the file exists and is an image
		if (!file) return
		if (!file.type.match("image.*")) return alert("not an image")

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
	}, [])

	// // Set the fill color that will be used to create the background
	// useEffect(() => {
	// 	canvasEl.current.getContext("2d").fillStyle = bgColor
	// }, [bgColor])

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
