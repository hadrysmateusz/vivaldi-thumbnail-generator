import React, { useState } from "react"
import Button from "./Button"
import { useFileContext } from "./FileManager"
import { useSettingsContext } from "./Settings"
import {
	drawIcon,
	calculateDimensions,
	drawBackground,
	createVirtualCanvas
} from "./CanvasCommon"

const Downloader = () => {
	const { isLoading, setIsLoading, images } = useFileContext()
	const { bgColor, scale } = useSettingsContext()
	const [exportDimensions, setExportDimensions] = useState([1320, 1098])

	const onDownload = () => {
		setIsLoading(true)

		images.forEach((image, i) => {
			const [canvas] = createVirtualCanvas(...exportDimensions)
			const { width, height } = calculateDimensions(image, scale, canvas)
			drawBackground(canvas, bgColor)
			drawIcon(canvas, image, width, height)
			downloadImageFromCanvas(canvas, `thumbnail-${i + 1}.png`)
		})

		setIsLoading(false)
	}

	return (
		<div style={{ margin: "32px 0" }}>
			<Button onClick={onDownload} disabled={isLoading}>
				Download
			</Button>
		</div>
	)
}

const downloadImageFromCanvas = (canvas, fileName) => {
	const imageUrl = canvas.toDataURL("image/png")
	let xhr = new XMLHttpRequest()
	xhr.responseType = "blob"
	xhr.onload = function() {
		let a = document.createElement("a")
		a.href = window.URL.createObjectURL(xhr.response)
		a.download = fileName
		a.style.display = "none"
		document.body.appendChild(a)
		a.click()
		a.remove()
	}
	xhr.open("GET", imageUrl) // This is to download the canvas Image
	xhr.send()
}

export default Downloader
