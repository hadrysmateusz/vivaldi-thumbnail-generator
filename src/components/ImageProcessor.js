import React from "react"
import styled from "styled-components/macro"
import { useHistory } from "react-router-dom"
import { cover } from "polished"

import NavigationButtons from "./NavigationButtons"
import { UploaderModal } from "./Uploader"
import FileDrawer from "./FileDrawer"
import { useUploader, useThumbnails, useSettings, useExporter } from "./Generator"
import BackgroundCanvas from "./BackgroundCanvas"
import IconCanvas from "./IconCanvas"
import { center } from "../styleUtils"
import Spacer from "./Spacer"
import Button from "./Button"

import { VIVALDI_THUMBNAIL_RATIO } from "../constants"
import { ReactComponent as SettingsIcon } from "../assets/cog.svg"
import { ReactComponent as UploadIcon } from "../assets/file-upload.svg"
import transparency from "../assets/transparency.png"

function ImageProcessor() {
	const { isEmpty, manager, count } = useThumbnails()
	const uploader = useUploader()

	return (
		<RatioContainer>
			<InnerContainer>
				{manager.isOpen ? (
					<FileDrawer />
				) : (
					<>
						{uploader.isLoading ? (
							<Loader />
						) : isEmpty ? (
							<EmptyState />
						) : (
							<>
								<BackgroundCanvas />
								<IconCanvas />
							</>
						)}
						<EditorContainer>
							{/* <Uploader /> */}
							{count > 1 && <NavigationButtons />}
							<BottomButtons>
								<UploaderButton />
								{!isEmpty && (
									<>
										<ManagerButton />
										<Spacer />
										<GenerateButton />
									</>
								)}
							</BottomButtons>
						</EditorContainer>
					</>
				)}

				{uploader.isOpen && <UploaderModal onRequestClose={uploader.close} />}
			</InnerContainer>
		</RatioContainer>
	)
}

const Loader = () => {
	const uploader = useUploader()
	const { loaded, total } = uploader.progress
	return (
		<LoaderContainer>
			Loading {loaded}/{total}
		</LoaderContainer>
	)
}

const EmptyState = () => (
	<EmptyStateContainer>
		<EmptyStateIcon />
		<EmptyStateHeading>
			Generate thumbnails for Vivaldi Browser’s Speed Dials
		</EmptyStateHeading>
		<EmptyStateBody>Add some icons to get started</EmptyStateBody>
	</EmptyStateContainer>
)

export const HelpButton = () => {
	return <Button>Help</Button>
}

export const SettingsButton = () => {
	const { editor } = useSettings()

	return (
		<Button onClick={editor.toggle}>
			<SettingsIcon title="Settings" width="24px" height="24px" />
			<span>Settings</span>
		</Button>
	)
}

export const GenerateButton = () => {
	const { isReady, renderAll } = useExporter()
	const history = useHistory()

	const handleClick = () => {
		renderAll() // don't wait for this promise to resolve
		history.push("/downloads")
	}

	return (
		<Button onClick={handleClick} disabled={!isReady} variant="primary">
			Generate
		</Button>
	)
}

export const UploaderButton = () => {
	const thumbnails = useThumbnails()
	const uploader = useUploader()

	return (
		<Button
			onClick={uploader.open}
			variant={!thumbnails.isEmpty ? "normal" : "primary"}
			disabled={uploader.isLoading}
		>
			{uploader.isLoading ? "Loading" : "Add Icons"}
		</Button>
	)
}

export const ManagerButton = () => {
	const thumbnails = useThumbnails()
	const uploader = useUploader()

	return (
		<Button
			onClick={thumbnails.manager.open}
			disabled={uploader.isLoading}
			badgeText={thumbnails.count}
		>
			Manage Icons
		</Button>
	)
}

const EditorContainer = styled.div`
	${cover()};
	width: 100%;
	height: 100%;
	display: block;
	z-index: 350;
`

const LoaderContainer = styled.div`
	${center}
	width: 100%;
	height: 100%;
	background: white;
	color: var(--light-gray);
	font-size: 24px;
	line-height: 48px;
	font-weight: bold;
	min-height: 100px;
`

const BottomButtons = styled.div`
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 0 20px 20px 20px;
	display: flex;
	align-items: center;
	> * + * {
		margin-left: 20px;
	}
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

const EmptyStateContainer = styled.div`
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
	font-weight: bold;
	font-size: 24px;
	line-height: 32px;
	display: flex;
	align-items: center;
	text-align: center;
	max-width: 400px;
	margin: 12px 0;
	@media (min-width: 732px) {
		font-size: 24px;
		line-height: 32px;
	}
`

const EmptyStateBody = styled.div`
	color: #5b5b5b;
	font-size: 14px;
	line-height: 20px;
	max-width: 400px;
`

export default ImageProcessor
