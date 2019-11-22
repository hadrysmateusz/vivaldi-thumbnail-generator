import React, { useEffect, useContext, useRef, useMemo } from "react"
import { SettingsContext } from "./Settings"
import { useSizeCanvasToCssDimensions, StyledCanvas } from "./CanvasCommon"
import { getRatio } from "../utils"

const IconCanvas = ({ image }) => {
	const { targetSize } = useContext(SettingsContext)
	const ref = useRef()
	useSizeCanvasToCssDimensions(ref)

	const { width, height } = useDimensions(image, targetSize)

	useEffect(() => {
		const canvas = ref.current

		clearCanvas(canvas)

		if (!image) return // if there is no image, exit early to prevent errors

		drawIcon(canvas, image, width, height)
	}, [height, image, width])

	return <StyledCanvas ref={ref} />
}

// hook that returns memoized value of the rescaled dimensions
const useDimensions = (image, targetSize) => {
	return useMemo(() => {
		if (!image) return {} // if there is no image return an empty object to prevent errors

		try {
			const { round, sqrt } = Math
			const { divisor, divident } = getRatio(image.naturalWidth, image.naturalHeight)
			const height = round(sqrt((divisor * (targetSize * targetSize)) / divident))
			const width = round((targetSize * targetSize) / height)
			return { width, height }
		} catch (err) {
			// if the calculations fail for any reason, just use the image's original dimensions
			return { width: image.naturalWidth, height: image.naturalHeight }
		}
	}, [image, targetSize])
}

const clearCanvas = (canvas) => {
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
}

const drawIcon = (canvas, image, width, height) => {
	canvas
		.getContext("2d")
		.drawImage(
			image,
			canvas.width / 2 - width / 2,
			canvas.height / 2 - height / 2,
			width,
			height
		)
}

export default IconCanvas
