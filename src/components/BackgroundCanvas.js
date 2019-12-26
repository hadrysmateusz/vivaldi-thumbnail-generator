import React, { useEffect, useRef } from "react"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	drawBackground,
	clearCanvas
} from "./CanvasCommon"
import { useSettings } from "./Generator"

const BackgroundCanvas = () => {
	const { bgColor } = useSettings()
	const canvasRef = useRef()
	useSizeCanvasToCssDimensions(canvasRef)

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(canvasRef.current)
		// draw background color
		drawBackground(canvasRef.current, bgColor)
	}, [bgColor])

	return <StyledCanvas ref={canvasRef} />
}

export default BackgroundCanvas
