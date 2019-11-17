import React, { useState, useRef } from "react"

import Canvas from "./Canvas"
import Uploader from "./Uploader"
import Downloader from "./Downloader"
import ColorPicker from "./ColorPicker"
import SizePicker from "./SizePicker"

function Generator() {
	const [bgColor, setBgColor] = useState("#111")
	const [image, setImage] = useState(null)
	const [targetSize, setTargetSize] = useState(300)
	const canvasRef = useRef()

	return (
		<div>
			<ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
			<SizePicker targetSize={targetSize} setTargetSize={setTargetSize} />
			<Uploader targetSize={targetSize} setImage={setImage} />
			<Canvas canvasRef={canvasRef} bgColor={bgColor} image={image} setImage={setImage} />
			<Downloader canvasRef={canvasRef} />
		</div>
	)
}

export default Generator
