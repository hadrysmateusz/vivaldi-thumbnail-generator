import React from "react"
import ArrowButton from "./ArrowButton"

function NavigationButtons({ numIcons, setSelectedIndex }) {
	const next = () => {
		debugger
		setSelectedIndex((prevState) => {
			const newIndex = prevState + 1
			return newIndex % numIcons
		})
	}

	const prev = () => {
		debugger
		setSelectedIndex((prevState) => {
			const newIndex = prevState - 1
			return newIndex >= 0 ? newIndex : numIcons - 1
		})
	}

	return (
		<>
			<ArrowButton direction="right" onClick={next} />
			<ArrowButton direction="left" onClick={prev} />
		</>
	)
}

export default NavigationButtons
