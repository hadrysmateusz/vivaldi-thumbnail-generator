import React from "react"
import ArrowButton from "./ArrowButton"

function NavigationButtons({ images, setCurrentImage }) {
	const next = () => {
		setCurrentImage((prevState) => {
			const newIndex = prevState + 1
			const numImages = images.length
			return newIndex % numImages
		})
	}

	const prev = () => {
		setCurrentImage((prevState) => {
			const newIndex = prevState - 1
			const numImages = images.length
			return newIndex >= 0 ? newIndex : numImages - 1
		})
	}

	const hasMultipleImages = images && images.length > 1

	return hasMultipleImages ? (
		<>
			<ArrowButton direction="right" onClick={next} />
			<ArrowButton direction="left" onClick={prev} />
		</>
	) : null
}

export default NavigationButtons
