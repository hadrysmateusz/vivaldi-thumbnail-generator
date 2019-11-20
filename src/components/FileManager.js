import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { overlay, center } from "../styleUtils"
import Button from "./Button"
import FileDrawer from "./FileDrawer"

const FileManager = ({ setImageUrls, imageUrls }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const onDrop = (acceptedFiles) => {
		let newImageUrls = []

		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) {
			// TODO: let the user know what happened
			return
		}

		// for every valid file add an object url to the list
		for (let file of acceptedFiles) {
			// if file isn't an image, skip it
			if (!file.type.match("image.*")) continue

			newImageUrls.push(window.URL.createObjectURL(file))
		}

		// update the external state
		setImageUrls((prevState) => [...prevState, ...newImageUrls])
	}

	const onClear = () => {
		setImageUrls([])
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
			accept: "",
			noClick: true
		}
	)

	const hasFiles = imageUrls && imageUrls.length > 0

	return (
		<DropzoneContainer {...getRootProps()}>
			{/* input */}
			<input {...getInputProps()} />
			{/* buttons */}
			<ButtonsContainer>
				<Button onClick={openFileDialog} variant="primary">
					Add Files
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
					closeModal={closeModal}
					imageUrls={imageUrls}
					setImageUrls={setImageUrls}
					openFileDialog={openFileDialog}
				/>
			)}
			{/* drag overlay */}
			{isDragActive && <Overlay>Drop here to add</Overlay>}
		</DropzoneContainer>
	)
}

FileManager.propTypes = {
	setImageUrls: PropTypes.func.isRequired
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
