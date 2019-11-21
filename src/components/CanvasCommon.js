import { useEffect } from "react"
import styled from "styled-components/macro"
import { overlay } from "../styleUtils"

export const StyledCanvas = styled.canvas`
	${overlay}
	width: 100%;
	height: 100%;
	display: block;
`

export const useSizeCanvasToCssDimensions = (canvas) => {
	// TODO: investigate if this can be done in a better way
	// Set the drawing surface dimensions to match the canvas
	useEffect(() => {
		canvas.current.width = canvas.current.scrollWidth
		canvas.current.height = canvas.current.scrollHeight
	}, [canvas])
}
