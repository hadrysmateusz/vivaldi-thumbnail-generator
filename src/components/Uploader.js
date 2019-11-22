import React from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"
import { overlay, center } from "../styleUtils"
import Button from "./Button"
import { useFileContext } from "./FileManager"

const Uploader = () => {
	const { addFiles, isLoading, openFileDrawer, clearImages, hasFiles } = useFileContext()

	const onDrop = (acceptedFiles) => {
		// TODO: let the user know what happened
		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) return
		addFiles(acceptedFiles)
	}

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*",
		noClick: true
	})

	return (
		<DropzoneContainer {...getRootProps()}>
			{/* input */}
			<input {...getInputProps()} />

			{/* buttons */}
			<ButtonsContainer>
				<Button onClick={open} variant="primary" disabled={isLoading}>
					{isLoading ? "Loading" : "Upload Icons"}
				</Button>
				<DropText>or drop files here</DropText>
				{hasFiles && (
					<Button onClick={clearImages} variant="danger">
						Clear
					</Button>
				)}
				<Button onClick={openFileDrawer}>Manage Files</Button>
			</ButtonsContainer>

			{/* drag overlay */}
			{isDragActive && <Overlay>Drop here to add</Overlay>}
		</DropzoneContainer>
	)
}

const DropText = styled.div`
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.015em;
	color: #888888;
	cursor: default;
	flex: 1;
`

const DropzoneContainer = styled.div`
	${overlay}
`

const Overlay = styled.div`
	${overlay}
	${center}
	z-index: 80;
	background: rgba(0, 0, 0, 0.36);
	color: white;
	font-size: 1.6em;
	font-weight: bold;
	letter-spacing: 0.05em;
	text-transform: uppercase;
`

const ButtonsContainer = styled.div`
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

export default Uploader
