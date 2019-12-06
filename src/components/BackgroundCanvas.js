import React, { useEffect, useRef } from "react"
import { useSettingsContext } from "./SettingsProvider"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	drawBackground
} from "./CanvasCommon"

const BackgroundCanvas = () => {
	const { bgColor } = useSettingsContext()
	const canvasRef = useRef()
	useSizeCanvasToCssDimensions(canvasRef)

	useEffect(() => {
		drawBackground(canvasRef.current, bgColor)
	}, [bgColor])

	return <StyledCanvas ref={canvasRef} />
}

export default BackgroundCanvas
