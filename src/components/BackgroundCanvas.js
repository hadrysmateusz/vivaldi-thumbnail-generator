import React, { useEffect, useContext, useRef } from "react"
import { SettingsContext } from "./Settings"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	drawBackground
} from "./CanvasCommon"

const BackgroundCanvas = () => {
	const { bgColor } = useContext(SettingsContext)
	const ref = useRef()
	useSizeCanvasToCssDimensions(ref)

	useEffect(() => {
		const canvas = ref.current
		drawBackground(canvas, bgColor)
	}, [bgColor])

	return <StyledCanvas ref={ref} />
}

export default BackgroundCanvas
