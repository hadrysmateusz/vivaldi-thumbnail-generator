import React, { useState } from "react"
import styled from "styled-components/macro"

import NavigationButtons from "./NavigationButtons"
import Uploader from "./Uploader"
import FileDrawer from "./FileDrawer"
import { useFileContext } from "./FileManager"
import BackgroundCanvas from "./BackgroundCanvas"
import IconCanvas from "./IconCanvas"

function ImageProcessor() {
	const [currentImage, setCurrentImage] = useState(0)
	const { isLoading, images, isDrawerOpen } = useFileContext()

	return (
		<Container>
			<BackgroundCanvas />
			<IconCanvas image={images[currentImage]} />
			<Uploader />
			<NavigationButtons images={images} setCurrentImage={setCurrentImage} />
			{isDrawerOpen && <FileDrawer />}
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	width: 793px;
	height: 650px;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

export default ImageProcessor
