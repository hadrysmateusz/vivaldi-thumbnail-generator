import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"
import { overlay, center } from "../styleUtils"
import Button from "./Button"
import { useFileContext } from "./FilesProvider"
import UploaderModal from "./UploaderModal"

const Uploader = () => {
	const {
		addFromFiles,
		isLoading,
		openFileDrawer,
		hasFiles,
		addFromBookmarkUrl
	} = useFileContext()
	const [isModalOpen, setIsModalOpen] = useState()

	const onPaste = () => {
		// TODO: get image from clipboard
		closeModal()
	}

	const onLink = async () => {
		const url = prompt("Paste bookmark URL here")
		if (url) {
			await addFromBookmarkUrl(url)
		}
		closeModal()
	}

	const onUpload = async () => {
		open()
		// modal gets closed in onDrop after selecting file
	}

	const onDrop = async (acceptedFiles) => {
		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) return
		// transform the files and add to file manager state
		await addFromFiles(acceptedFiles)
		closeModal()
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const openModal = () => {
		setIsModalOpen(true)
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
				<Button onClick={openModal} variant="primary" disabled={isLoading}>
					{isLoading ? "Loading" : "Add Icons"}
				</Button>
				<DropText>or drop files here</DropText>
				{hasFiles && <Button onClick={openFileDrawer}>Manage Icons</Button>}
			</ButtonsContainer>

			{/* drag overlay */}
			{isDragActive && <Overlay>Drop here to add</Overlay>}

			{/* icon-add modal */}
			{isModalOpen && (
				<UploaderModal
					onRequestClose={() => setIsModalOpen(false)}
					onUpload={onUpload}
					onLink={onLink}
					onPaste={onPaste}
				/>
			)}
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
