import React, { useState } from "react"
import styled from "styled-components/macro"

import Preview from "./Preview"
import NavigationButtons from "./NavigationButtons"
import Uploader from "./Uploader"
import FileDrawer from "./FileDrawer"
import { useFileContext } from "./FileManager"

function ImageProcessor() {
	const [currentImage, setCurrentImage] = useState(0)
	const { isLoading, images, isDrawerOpen } = useFileContext()

	return (
		<Container>
			<Preview image={images[currentImage]} isLoading={isLoading} />
			<Uploader />
			{isDrawerOpen && <FileDrawer />}
			<NavigationButtons images={images} setCurrentImage={setCurrentImage} />
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

export default ImageProcessor
