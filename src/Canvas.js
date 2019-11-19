import React, { useEffect, useCallback } from "react"
import styled from "styled-components"

const StyledCanvas = styled.canvas`
	width: 793px;
	height: 650px;

	border-radius: 5px;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

const Canvas = ({ canvasRef, bgColor, image }) => {
	// Set the drawing surface dimensions to match the canvas
	useEffect(() => {
		canvasRef.current.width = canvasRef.current.scrollWidth
		canvasRef.current.height = canvasRef.current.scrollHeight
	}, [canvasRef])

	const redraw = useCallback(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext("2d")

		// clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// paint background
		if (!bgColor) return
		ctx.save()
		ctx.fillStyle = bgColor
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.restore()

		// draw the image
		if (!image) return

		ctx.drawImage(
			image,
			canvas.width / 2 - image.width / 2,
			canvas.height / 2 - image.height / 2
		)
	}, [bgColor, canvasRef, image])

	useEffect(redraw)

	return (
		<div>
			<StyledCanvas ref={canvasRef} />
		</div>
	)
}

export default Canvas
