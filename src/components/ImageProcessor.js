import React, { useState } from "react"
import styled from "styled-components/macro"

import NavigationButtons from "./NavigationButtons"
import Uploader from "./Uploader"
import FileDrawer from "./FileDrawer"
import { useFileContext } from "./FileManager"
import BackgroundCanvas from "./BackgroundCanvas"
import IconCanvas from "./IconCanvas"
import { overlay, center } from "../styleUtils"

function ImageProcessor() {
	const [currentImage, setCurrentImage] = useState(0)
	const { isLoading, images, isDrawerOpen } = useFileContext()

	return (
		<Container>
			<BackgroundCanvas />
			<IconCanvas image={images[currentImage]} />
			{isLoading && <LoadingOverlay>Loading...</LoadingOverlay>}
			<Uploader />
			<NavigationButtons images={images} setCurrentImage={setCurrentImage} />
			{isDrawerOpen && <FileDrawer />}
		</Container>
	)
}

const LoadingOverlay = styled.div`
	${overlay}
	${center}
	background: white;
	font-size: 32px;
	font-weight: bold;
`

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

export default ImageProcessor
