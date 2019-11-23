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
			const { abs, log2, round } = Math

			const imageWidth = image.naturalWidth
			const imageHeight = image.naturalHeight
			const ratio = imageWidth / imageHeight

			// deviance increases logarithmicaly as the difference between width and height grows
			const deviance = abs(log2(ratio))
			const extension = deviance * (targetSize / 10)

			let height, width

			if (ratio > 1) {
				width = targetSize + extension
				height = width / ratio
			} else if (ratio < 1) {
				height = targetSize + extension
				width = height * ratio
			} else {
				width = targetSize
				height = targetSize
			}

			return { width: round(width), height: round(height) }
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
