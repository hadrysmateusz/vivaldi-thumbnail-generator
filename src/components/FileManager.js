import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { overlay, center } from "../styleUtils"
import Button from "./Button"
import FileDrawer from "./FileDrawer"
import { loadImage } from "../utils"

const FileManager = ({ setImages, setIsLoading, images, isLoading }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const onDrop = async (acceptedFiles) => {
		if (isLoading) {
			alert("Wait for the previous action to finish")
			return
		}

		// TODO: let the user know what happened
		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) return

		setIsLoading(true)

		const imagePromises = acceptedFiles.map((file) => {
			const objectUrl = URL.createObjectURL(file)
			return loadImage(objectUrl)
		})

		const images = await Promise.all(imagePromises)
		setImages((prevState) => [...prevState, ...images])
		setIsLoading(false)
	}

	const onClear = () => {
		setImages([])
	}

	const openModal = () => {
		setModalIsOpen(true)
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}

	const { getRootProps, getInputProps, open: openFileDialog, isDragActive } = useDropzone(
		{
			onDrop,
			accept: "image/*",
			noClick: true
		}
	)

	const hasFiles = images && images.length > 0

	return (
		<DropzoneContainer {...getRootProps()}>
			{/* input */}
			<input {...getInputProps()} />
			{/* buttons */}
			<ButtonsContainer>
				<Button onClick={openFileDialog} variant="primary" disabled={isLoading}>
					{isLoading ? "Loading" : "Upload Icons"}
				</Button>
				<DropText>or drop files here</DropText>
				{hasFiles && (
					<>
						<Button onClick={openModal}>Manage Files</Button>
						<Button onClick={onClear} variant="danger">
							Clear
						</Button>
					</>
				)}
			</ButtonsContainer>
			{/* modal */}
			{modalIsOpen && (
				<FileDrawer
					images={images}
					setImages={setImages}
					closeModal={closeModal}
					openFileDialog={openFileDialog}
				/>
			)}
			{/* drag overlay */}
			{isDragActive && <Overlay>Drop here to add</Overlay>}
		</DropzoneContainer>
	)
}

FileManager.propTypes = {
	setImages: PropTypes.func.isRequired,
	setIsLoading: PropTypes.func.isRequired,
	images: PropTypes.array.isRequired
}

const DropText = styled.div`
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.015em;
	color: #888888;
	cursor: default;
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
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 0 20px 20px 20px;
	display: grid;
	width: 100%;
	grid-auto-flow: column;
	grid-template-columns: auto 1fr auto auto;
	align-items: center;
	gap: 20px;
`

export default FileManager
