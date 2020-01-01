import React, { useEffect } from "react"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	clearCanvas,
	drawIcon
} from "./CanvasCommon"
import { useSettings, useThumbnails, useEditor } from "./Generator"

const IconCanvas = () => {
	const { iconCanvasRef } = useEditor()
	const { values } = useSettings()
	const { selected } = useThumbnails()
	useSizeCanvasToCssDimensions(iconCanvasRef)

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(iconCanvasRef.current)
		// if there are no images yet, or they were all removed, exit to prevent errors
		if (!selected || !selected.image) return
		// draw the current image with the correct dimensions
		drawIcon(iconCanvasRef.current, selected.image, values.scale)
	}, [values.scale, selected, iconCanvasRef])

	return <StyledCanvas ref={iconCanvasRef} />
}

export default IconCanvas
