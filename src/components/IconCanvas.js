import React, { useEffect, useRef } from "react"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	clearCanvas,
	drawIcon
} from "./CanvasCommon"
import { useSettings, useThumbnails } from "./Generator"

const IconCanvas = ({ icon }) => {
	const { scale } = useSettings()
	const canvasRef = useRef()
	useSizeCanvasToCssDimensions(canvasRef)

	const { selected } = useThumbnails()

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(canvasRef.current)
		// if there are no images yet, or they were all removed, exit to prevent errors
		if (!icon) return
		// draw the current image with the correct dimensions
		drawIcon(canvasRef.current, selected.image, scale)
	}, [icon, scale, selected.image])

	return <StyledCanvas ref={canvasRef} />
}

export default IconCanvas
