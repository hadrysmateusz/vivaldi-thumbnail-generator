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
import Loader from "./Loader"
import { center } from "../styleUtils"

import { VIVALDI_THUMBNAIL_RATIO } from "../constants"
import { ReactComponent as SettingsIcon } from "../assets/cog.svg"
import { ReactComponent as UploadIcon } from "../assets/file-upload.svg"
import transparency from "../assets/transparency.png"

function ImageProcessor() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const {
		isLoading,
		images,
		hasImages,
		isDrawerOpen,
		progressDone,
		progressTotal
	} = useFileContext()
	const isEmpty = !hasImages
	const selectedImage = selectedIndex >= images.length ? images[0] : images[selectedIndex]

	return (
		<RatioContainer>
			<InnerContainer>
				{isLoading ? (
					<Loader>
						Loading ({progressDone}/{progressTotal})
					</Loader>
				) : isEmpty ? (
					<EmptyState>
						<EmptyStateIcon />
						<EmptyStateHeading>There are no icons here yet</EmptyStateHeading>
						<EmptyStateBody>
							Select or drop files here (PNG & SVG work best)
						</EmptyStateBody>
					</EmptyState>
				) : isDrawerOpen ? (
					<FileDrawer />
				) : (
					<>
						{/* canvases */}
						<BackgroundCanvas />
						<IconCanvas image={selectedImage} />
						{/* nav-buttons */}
						<NavigationButtons images={images} setSelectedIndex={setSelectedIndex} />
						{/* settings button */}
						{hasImages && (
							<SettingsButtonContainer>
								<SettingsButton />
							</SettingsButtonContainer>
						)}
					</>
				)}

				{!isDrawerOpen && <Uploader />}
			</InnerContainer>
		</RatioContainer>
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
	z-index: 500;
`

const InnerContainer = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`

const RatioContainer = styled.div`
	background: green;
	width: 100%;
	max-width: 732px;
	flex: 1 1 732px;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
	background: url(${transparency});
	background-repeat: repeat;
	position: relative;

	&:before {
		display: block;
		content: "";
		width: 100%;
		padding-top: calc(${VIVALDI_THUMBNAIL_RATIO} * 100%);
	}
`

const EmptyState = styled.div`
	width: 100%;
	height: 100%;
	${center}
	flex-direction: column;
	background: white;
`

const EmptyStateIcon = styled(UploadIcon)`
	width: 48px;
	height: 63px;
	margin-bottom: 8px;
	@media (min-width: 732px) {
		width: 84px;
		height: 112px;
		margin-bottom: 0;
	}

	path {
		fill: #e2e2e2;
	}
`

const EmptyStateHeading = styled.div`
	color: var(--light-gray);
	font-size: 20px;
	line-height: 28px;

	@media (min-width: 732px) {
		font-size: 24px;
		line-height: 48px;
	}

	font-weight: bold;
`

const EmptyStateBody = styled.div`
	color: #5b5b5b;
	font-size: 14px;
	line-height: 24px;
`

export default ImageProcessor
