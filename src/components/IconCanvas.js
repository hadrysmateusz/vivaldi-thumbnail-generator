import React, { useEffect, useContext, useRef, useMemo } from "react"
import { SettingsContext } from "./Settings"
import {
	useSizeCanvasToCssDimensions,
	StyledCanvas,
	clearCanvas,
	drawIcon,
	calculateDimensions
} from "./CanvasCommon"

const IconCanvas = ({ image }) => {
	const { targetSize } = useContext(SettingsContext)
	const ref = useRef()
	useSizeCanvasToCssDimensions(ref)

	// get the correct dimensions based on image's dimensions and the target size
	const { width, height } = useDimensions(image, targetSize)

	useEffect(() => {
		const canvas = ref.current
		// clear canvas to remove previous image
		clearCanvas(canvas)
		// if there are no images yet, or they were all removed, exit to prevent errors
		if (!image) return
		// draw the current image with the correct dimensions
		drawIcon(canvas, image, width, height)
	}, [height, image, width])

	return <StyledCanvas ref={ref} />
}

// hook that returns memoized value of the rescaled dimensions
export const useDimensions = (image, targetSize) => {
	return useMemo(() => calculateDimensions(image, targetSize), [image, targetSize])
}

export default IconCanvas
