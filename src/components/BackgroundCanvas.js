import React, { useEffect } from "react"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	drawBackground,
	clearCanvas
} from "./CanvasCommon"
import { useSettings, useEditor } from "./Generator"

const BackgroundCanvas = () => {
	const { bgCanvasRef } = useEditor()
	const { values } = useSettings()
	useSizeCanvasToCssDimensions(bgCanvasRef)

	useEffect(() => {
		// clear canvas to remove previous image
		clearCanvas(bgCanvasRef.current)
		// draw background color
		drawBackground(bgCanvasRef.current, values.bgColor)
	}, [bgCanvasRef, values.bgColor])

	return <StyledCanvas ref={bgCanvasRef} />
}

export default BackgroundCanvas
