import React from "react"
import styled from "styled-components/macro"
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
		<Container>
			<Button onClick={handleClick} disabled={isLoading || !hasImages} variant="primary">
				Generate
			</Button>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	margin: 64px auto;
`

export default GenerateButton
