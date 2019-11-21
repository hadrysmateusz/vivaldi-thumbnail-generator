import React, { useEffect, useContext, useRef, useMemo } from "react"
import { SettingsContext } from "./Settings"
import { useSizeCanvasToCssDimensions, StyledCanvas } from "./CanvasCommon"
import { getRatio } from "../utils"

const IconCanvas = ({ image }) => {
	console.log("image", image)

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

		const { round, sqrt } = Math
		const { divisor, divident } = getRatio(image.width, image.height)
		const height = round(sqrt((divisor * (targetSize * targetSize)) / divident))
		const width = round((targetSize * targetSize) / height)
		return { width, height }
	}, [image, targetSize])
}

const clearCanvas = (canvas) => {
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height)
}

const drawIcon = (canvas, image, width, height) => {
	canvas.getContext("2d").drawImage(image, 0, 0, width, height)
}

export default IconCanvas
