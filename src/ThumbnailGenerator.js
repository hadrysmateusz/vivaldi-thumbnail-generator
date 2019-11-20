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
			<ImageProcessor canvasRef={canvasRef} bgColor={bgColor} targetSize={targetSize} />
			<SizePicker targetSize={targetSize} setTargetSize={setTargetSize} />
			<ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
			<Downloader canvasRef={canvasRef} />
		</div>
	)
}

export default ThumbnailGenerator
