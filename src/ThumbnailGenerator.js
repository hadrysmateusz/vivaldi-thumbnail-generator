import React, { useState, useRef } from "react"

import Downloader from "./Downloader"
import ColorPicker from "./ColorPicker"
import SizePicker from "./SizePicker"
import ImageProcessor from "./ImageProcessor"

function ThumbnailGenerator() {
	const [bgColor, setBgColor] = useState("white")
	const [targetSize, setTargetSize] = useState(300)
	const canvasRef = useRef()

	return (
		<div>
			<ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
			<SizePicker targetSize={targetSize} setTargetSize={setTargetSize} />
			<ImageProcessor canvasRef={canvasRef} bgColor={bgColor} targetSize={targetSize} />
			<Downloader canvasRef={canvasRef} />
		</div>
	)
}

export default ThumbnailGenerator
