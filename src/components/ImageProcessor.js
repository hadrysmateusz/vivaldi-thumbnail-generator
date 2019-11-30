import React, { useState } from "react"
import styled from "styled-components/macro"
import { cover } from "polished"
import NavigationButtons from "./NavigationButtons"
import Uploader from "./Uploader"
import FileDrawer from "./FileDrawer"
import { useFileContext } from "./FilesProvider"
import { useSettingsContext } from "./SettingsProvider"
import BackgroundCanvas from "./BackgroundCanvas"
import IconCanvas from "./IconCanvas"
import { center } from "../styleUtils"
import IconButton from "./IconButton"
import { ReactComponent as SettingsIcon } from "../assets/cog.svg"

function ImageProcessor() {
	const [currentImage, setCurrentImage] = useState(0)
	const { isLoading, images, isDrawerOpen } = useFileContext()

	return (
		<Container>
			{/* canvases */}
			<BackgroundCanvas />
			<IconCanvas image={images[currentImage]} />
			{/* loading overlay */}
			{isLoading && <LoadingOverlay>Loading...</LoadingOverlay>}
			{/* uploader */}
			<Uploader />
			{/* nav-buttons */}
			<NavigationButtons images={images} setCurrentImage={setCurrentImage} />
			{/* settings button */}
			<SettingsButtonContainer>
				<SettingsButton />
			</SettingsButtonContainer>
			{/* file drawer */}
			{isDrawerOpen && <FileDrawer />}
		</Container>
	)
}

const SettingsButton = () => {
	const { toggleSettings } = useSettingsContext()

	return (
		<IconButton onClick={toggleSettings}>
			<SettingsIcon title="Settings" width="24px" height="24px" />
		</IconButton>
	)
}

const SettingsButtonContainer = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	display: flex;
	align-items: center;
`

const LoadingOverlay = styled.div`
	${cover()}
	${center}
	background: white;
	font-size: 32px;
	font-weight: bold;
`

const Container = styled.div`
	width: 732px;
	height: 600px;
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

export default ImageProcessor
