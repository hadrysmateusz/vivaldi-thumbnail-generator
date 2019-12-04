import React from "react"
import { useHistory } from "react-router-dom"
import Button from "../Button"
import { useFileContext } from "../FilesProvider"
import { useExporter } from "."

const GenerateButton = () => {
	const { hasImages } = useFileContext()
	const [{ isLoading }, { generate }] = useExporter()
	const history = useHistory()

	const handleClick = () => {
		generate()
		history.push("/downloads")
	}

	return (
		<Button onClick={handleClick} disabled={isLoading || !hasImages} variant="primary">
			Generate
		</Button>
	)
}

export default GenerateButton
