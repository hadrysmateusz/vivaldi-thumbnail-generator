import React, { useEffect, useRef } from "react"
import { useSettingsContext } from "./SettingsProvider"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	clearCanvas,
	drawIcon
} from "./CanvasCommon"

const IconCanvas = ({ icon }) => {
	const { scale } = useSettingsContext()
	const canvasRef = useRef()
	useSizeCanvasToCssDimensions(canvasRef)

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(canvasRef.current)
		// if there are no images yet, or they were all removed, exit to prevent errors
		if (!icon) return
		// draw the current image with the correct dimensions
		drawIcon(canvasRef.current, icon.image, scale)
	}, [icon, scale])

	return <StyledCanvas ref={canvasRef} />
}

export default IconCanvas
