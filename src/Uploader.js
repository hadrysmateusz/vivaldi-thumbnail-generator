import React from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components"
import Thumbnails from "./Thumbnails"
import { overlay, center } from "./styleUtils"

const DropzoneContainer = styled.div`
	position: relative;
	height: 200px;
	border: 1px dashed #333;
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

const Uploader = ({ setImageUrls, imageUrls }) => {
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

	const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
		onDrop,
		accept: "",
		noClick: true
	})

	return (
		<div>
			<button onClick={open}>Add</button>
			<button onClick={onClear}>Clear</button>
			<DropzoneContainer {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive && <Overlay>Drop here to add</Overlay>}

				<Thumbnails imageUrls={imageUrls} />
			</DropzoneContainer>
		</div>
	)
}

Uploader.propTypes = {
	setImageUrls: PropTypes.func.isRequired
}

export default Uploader
