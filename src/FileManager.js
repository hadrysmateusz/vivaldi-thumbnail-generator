import React from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import { overlay, center } from "./styleUtils"
import Button from "./Buttons"

const Uploader = ({ setImageUrls }) => {
	const onDrop = (acceptedFiles) => {
		let imageUrls = []

		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) {
			// TODO: let the user know what happened
			return
		}

		// for every valid file add an object url to the list
		for (let file of acceptedFiles) {
			// if file isn't an image, skip it
			if (!file.type.match("image.*")) continue

			imageUrls.push(window.URL.createObjectURL(file))
		}

		// update the external state
		setImageUrls((prevState) => [...prevState, ...imageUrls])
	}

	const onClear = () => {
		setImageUrls([])
	}

	const openManager = () => {}

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDrop,
		accept: "",
		noClick: true
	})

	return (
		<DropzoneContainer {...getRootProps()}>
			{/* input */}
			<input {...getInputProps()} />
			{/* buttons */}
			<ButtonsContainer>
				<Button onClick={open} variant="primary">
					Add Files
				</Button>
				<DropText>or drop files here</DropText>
				<Button onClick={openManager}>Manage Files</Button>
				<Button onClick={onClear} variant="danger">
					Clear
				</Button>
			</ButtonsContainer>
			{/* drag overlay */}
			{isDragActive && <Overlay>Drop here to add</Overlay>}
		</DropzoneContainer>
	)
}

Uploader.propTypes = {
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

export default Uploader
