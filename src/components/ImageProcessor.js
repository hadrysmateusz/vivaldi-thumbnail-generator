import React, { useState } from "react"
import styled from "styled-components/macro"
import NavigationButtons from "./NavigationButtons"
import Uploader from "./Uploader"
import FileDrawer from "./FileDrawer"
import { useFileContext } from "./FilesProvider"
import { useSettingsContext } from "./SettingsProvider"
import BackgroundCanvas from "./BackgroundCanvas"
import IconCanvas from "./IconCanvas"
import IconButton from "./IconButton"
import LoadingOverlay from "./LoadingOverlay"
import { ReactComponent as SettingsIcon } from "../assets/cog.svg"
import { ReactComponent as UploadIcon } from "../assets/file-upload.svg"
import { cover } from "polished"

function ImageProcessor() {
	const [currentImage, setCurrentImage] = useState(0)
	const { isLoading, images, hasImages, isDrawerOpen } = useFileContext()

	return (
		<Container>
			{/* canvases */}
			<BackgroundCanvas />
			<IconCanvas image={images[currentImage]} />
			{/* loading overlay */}
			{!hasImages && (
				<EmptyState>
					<EmptyStateIcon width={84} height={112} />
					<EmptyStateHeading>There are no icons here yet</EmptyStateHeading>
					<EmptyStateBody>Upload some, to get started</EmptyStateBody>
				</EmptyState>
			)}
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

const EmptyState = styled.div`
	${cover()}
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const EmptyStateIcon = styled(UploadIcon)`
	path {
		fill: #e2e2e2;
	}
`

const EmptyStateHeading = styled.div`
	color: #686868;
	font-size: 24px;
	line-height: 48px;
	font-weight: bold;
`

const EmptyStateBody = styled.div`
	color: #5b5b5b;
	font-size: 14px;
	line-height: 24px;
`

const SettingsButtonContainer = styled.div`
	position: absolute;
	top: 20px;
	right: 20px;
	display: flex;
	align-items: center;
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
