import React, { useEffect, useContext, useRef } from "react"
import { SettingsContext } from "./Settings"
import { useSizeCanvasToCssDimensions, StyledCanvas } from "./CanvasCommon"

const BackgroundCanvas = () => {
	const { bgColor } = useContext(SettingsContext)
	const ref = useRef()
	useSizeCanvasToCssDimensions(ref)

	// paint background
	useEffect(() => {
		const canvas = ref.current
		const ctx = canvas.getContext("2d")
		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}, [bgColor])

	return <StyledCanvas ref={ref} />
}

export default BackgroundCanvas
