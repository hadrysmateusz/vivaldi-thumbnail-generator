import React, { useState } from "react"
import styled from "styled-components/macro"
import { useDropzone } from "react-dropzone"
import { cover } from "polished"
import { center } from "../styleUtils"
import Button from "./Button"
import { useFileContext } from "./FilesProvider"
import UploaderModal from "./UploaderModal"
import Spacer from "./Spacer"

// bookmark url works, but produces very low quality images
const availableMethods = {
	fileUpload: true,
	imageUrl: false,
	pasteImage: false,
	bookmarkUrl: true
}

const numAvailableMethods = Object.values(availableMethods).reduce(
	(acc, val) => (val === true ? acc + 1 : acc),
	0
)

const Uploader = () => {
	const {
		isLoading,
		openFileDrawer,
		isDrawerOpen,
		hasIcons,
		numIcons,
		addFromFiles,
		addFromBookmarkUrl,
		addFromImageUrl
	} = useFileContext()
	const [isModalOpen, setIsModalOpen] = useState()

	const onPasteImage = () => {
		// PLACEHOLDER
		closeModal()
	}

	const onBookmarkUrl = async () => {
		let url = prompt("Paste bookmark URL here")
		if (url) {
			await addFromBookmarkUrl(url)
			closeModal()
		}
	}

	const onImageUrl = async () => {
		const url = prompt("Paste image URL here")

		if (url) {
			try {
				console.log("fetching")
				const response = await fetch(`/.netlify/functions/fetchImage?url=${url}`)
				console.log(await response.text())
			} catch (error) {
				console.error("fetching error:", error)
			}

			await addFromImageUrl(url)
			closeModal()
		}
	}

	const onFileUpload = async () => {
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

	const onAdd = () => {
		// if there are multiple methods available, open modal, otherwise open file
		if (numAvailableMethods > 1) {
			openModal()
		} else {
			onFileUpload()
		}
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
		<UploaderContainer {...getRootProps()}>
			{/* input */}
			<input {...getInputProps()} />

			{!isDrawerOpen && (
				<>
					{/* buttons */}
					<ButtonsContainer>
						<Button
							onClick={onAdd}
							variant={hasIcons ? "normal" : "primary"}
							disabled={isLoading}
						>
							{isLoading ? "Loading" : "Add Icons"}
						</Button>
						<Spacer />
						{hasIcons && (
							<Button onClick={openFileDrawer}>Manage Icons ({numIcons}) </Button>
						)}
					</ButtonsContainer>

					{/* icon-add modal */}
					{isModalOpen && (
						<UploaderModal
							availableMethods={availableMethods}
							onFileUpload={onFileUpload}
							onBookmarkUrl={onBookmarkUrl}
							onImageUrl={onImageUrl}
							onPasteImage={onPasteImage}
							onRequestClose={closeModal}
						/>
					)}
				</>
			)}

			{/* drag overlay */}
			{isDragActive && <DropOverlay>Drop here to add</DropOverlay>}
		</UploaderContainer>
	)
}

const UploaderContainer = styled.div`
	${cover()}
	z-index: 400;
`

const DropOverlay = styled.div`
	${cover()}
	${center}
	z-index: 800;
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
