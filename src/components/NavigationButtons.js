import React from "react"
import ArrowButton from "./ArrowButton"
import { useThumbnails } from "./Generator"

const NavigationButtons = () => {
	const { next, prev } = useThumbnails()

	return (
		<>
			<ArrowButton direction="right" onClick={next} />
			<ArrowButton direction="left" onClick={prev} />
		</>
	)
}

export default NavigationButtons
