import React, { useEffect, useRef } from "react"
import { useSettingsContext } from "./SettingsProvider"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	clearCanvas,
	drawIcon
} from "./CanvasCommon"

const IconCanvas = ({ image }) => {
	const { scale } = useSettingsContext()
	const canvasRef = useRef()
	useSizeCanvasToCssDimensions(canvasRef)

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(canvasRef.current)
		// if there are no images yet, or they were all removed, exit to prevent errors
		if (!image) return
		// draw the current image with the correct dimensions
		drawIcon(canvasRef.current, image, scale)
	}, [image, scale])

	return <StyledCanvas ref={canvasRef} />
}

export default IconCanvas
