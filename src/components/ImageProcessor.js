import React, { useState } from "react"
import styled from "styled-components"

import Preview from "./Preview"
import FileManager from "./FileManager"
import NavigationButtons from "./NavigationButtons"

const Container = styled.div`
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

function ImageProcessor() {
	const [images, setImages] = useState([])
	const [currentImage, setCurrentImage] = useState(0)

	console.log("images", images)

	return (
		<Container>
			<Preview image={images[currentImage]} />
			<FileManager images={images} setImages={setImages} />
			<NavigationButtons images={images} setCurrentImage={setCurrentImage} />
		</Container>
	)
}

export default ImageProcessor
