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
import { ReactComponent as SettingsIcon } from "../assets/cog.svg"
import { ReactComponent as UploadIcon } from "../assets/file-upload.svg"
import transparency from "../assets/transparency.png"
import { center } from "../styleUtils"

function ImageProcessor() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const { isLoading, images, hasImages, isDrawerOpen } = useFileContext()
	const isEmpty = !hasImages
	const selectedImage = selectedIndex >= images.length ? images[0] : images[selectedIndex]

	return (
		<Container>
			{isEmpty ? (
				<>
					<EmptyState>
						<EmptyStateIcon width={84} height={112} />
						<EmptyStateHeading>There are no icons here yet</EmptyStateHeading>
						<EmptyStateBody>Upload some, to get started</EmptyStateBody>
					</EmptyState>
					{/* uploader */}
					{!isDrawerOpen && <Uploader />}
				</>
			) : isLoading ? (
				<LoadingOverlay>Loading...</LoadingOverlay>
			) : (
				<>
					{/* canvases */}
					<BackgroundCanvas />
					<IconCanvas image={selectedImage} />
					{/* uploader */}
					{!isDrawerOpen && <Uploader />}
					{/* nav-buttons */}
					<NavigationButtons images={images} setSelectedIndex={setSelectedIndex} />
					{/* settings button */}
					{hasImages && (
						<SettingsButtonContainer>
							<SettingsButton />
						</SettingsButtonContainer>
					)}
					{/* file drawer */}
					{isDrawerOpen && <FileDrawer />}
				</>
			)}
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

const LoadingOverlay = styled.div`
	width: 100%;
	height: 100%;
	${center}
	background: white;
	color: var(--light-gray);
	font-size: 24px;
	line-height: 48px;
	font-weight: bold;
`

const EmptyState = styled.div`
	width: 100%;
	height: 100%;
	${center}
	flex-direction: column;
	background: white;
`

const EmptyStateIcon = styled(UploadIcon)`
	path {
		fill: #e2e2e2;
	}
`

const EmptyStateHeading = styled.div`
	color: var(--light-gray);
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
	background: url(${transparency});
	background-repeat: repeat;
`

export default ImageProcessor
