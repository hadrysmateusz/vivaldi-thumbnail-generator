import React, { useEffect, useRef } from "react"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	clearCanvas,
	drawIcon
} from "./CanvasCommon"
import { useSettings, useThumbnails } from "./Generator"

const IconCanvas = () => {
	const { scale } = useSettings()
	const { selected } = useThumbnails()
	const canvasRef = useRef()
	useSizeCanvasToCssDimensions(canvasRef)

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(canvasRef.current)
		// if there are no images yet, or they were all removed, exit to prevent errors
		if (!selected.image) return
		// draw the current image with the correct dimensions
		drawIcon(canvasRef.current, selected.image, scale)
	}, [scale, selected.image])

	return <StyledCanvas ref={canvasRef} />
}

export default IconCanvas
