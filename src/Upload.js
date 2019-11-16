import React, { useRef, useEffect, useState, useCallback } from "react"
import { ChromePicker } from "react-color"
import "./Upload.scss"

const getImageBounds = (canvas) => {
	const ctx = canvas.getContext("2d")
	const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
	let x, y

	let bounds = {
		top: null,
		left: null,
		right: null,
		bottom: null
	}

	// Iterate over every pixel to find the highest
	// and where it ends on every axis ()
	for (let i = 0; i < pixels.data.length; i += 4) {
		if (pixels.data[i + 3] !== 0) {
			x = (i / 4) % canvas.width
			y = ~~(i / 4 / canvas.width)

			if (bounds.top === null) {
				bounds.top = y
			}

			if (bounds.left === null) {
				bounds.left = x
			} else if (x < bounds.left) {
				bounds.left = x
			}

			if (bounds.right === null) {
				bounds.right = x
			} else if (bounds.right < x) {
				bounds.right = x
			}

			if (bounds.bottom === null) {
				bounds.bottom = y
			} else if (bounds.bottom < y) {
				bounds.bottom = y
			}
		}
	}

	return bounds
}

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
	const [bgColor, setBgColor] = useState("#333")
	const [targetSize, setTargetSize] = useState(300)
	const [image, setImage] = useState(null)

	// Set the drawing surface dimensions to match the canvas
	useEffect(() => {
		canvasEl.current.width = canvasEl.current.scrollWidth
		canvasEl.current.height = canvasEl.current.scrollHeight
	}, [])

	const onImageLoad = (e) => {
		// Get loaded image
		const image = e.target

		// Create temporary canvas
		const tempCanvas = document.createElement("canvas")
		const tempCtx = tempCanvas.getContext("2d")

		// Draw the original image to the temporary canvas
		tempCanvas.width = image.width
		tempCanvas.height = image.height
		tempCtx.drawImage(image, 0, 0)

		// Get bounds of the image (without white-space)
		const bounds = getImageBounds(tempCanvas)

		// Get trimmed dimensions
		const trimHeight = bounds.bottom - bounds.top
		const trimWidth = bounds.right - bounds.left

		// Get rescaled dimensions
		const { divisor, divident } = ratio(trimWidth, trimHeight)
		const { round, sqrt } = Math
		const newHeight = round(sqrt((divisor * (targetSize * targetSize)) / divident))
		const newWidth = round((targetSize * targetSize) / newHeight)

		// TODO: consider clamping the dimensions of transformed image

		// Apply transformations
		tempCanvas.height = newHeight
		tempCanvas.width = newWidth
		tempCtx.drawImage(
			image,
			bounds.left,
			bounds.top,
			trimWidth,
			trimHeight,
			0,
			0,
			newWidth,
			newHeight
		)

		// Save transformed image in state
		setImage(tempCanvas)
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

	const onColorChange = (color) => {
		setBgColor(color.hex)
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

	const redraw = useCallback(() => {
		const canvas = canvasEl.current
		const ctx = canvas.getContext("2d")

		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// paint background
		if (!bgColor) return
		ctx.save()
		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.restore()

		// draw the image
		if (!image) return

		ctx.drawImage(
			image,
			canvas.width / 2 - image.width / 2,
			canvas.height / 2 - image.height / 2
		)
	}, [bgColor, image])

	useEffect(redraw)

	return (
		<div className="Upload-outer-container">
			<ChromePicker onChangeComplete={onColorChange} color={bgColor} disableAlpha />
			<div>
				<input type="file" ref={fileInputEl} onChange={onFileChange} />
			</div>
			<canvas className="Upload-canvas" ref={canvasEl} />
			<button onClick={onDownload}>Download</button>
		</div>
	)
}

export default Upload
