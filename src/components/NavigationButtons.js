import React from "react"
import ArrowButton from "./ArrowButton"
import { useFileContext } from "./FilesProvider"

const NavigationButtons = () => {
	const { numIcons, nextIcon, prevIcon } = useFileContext()

	return numIcons > 0 ? (
		<>
			<ArrowButton direction="right" onClick={nextIcon} />
			<ArrowButton direction="left" onClick={prevIcon} />
		</>
	) : null
}

export default NavigationButtons
