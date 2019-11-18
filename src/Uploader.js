import React from "react"
import PropTypes from "prop-types"
import styles from "./Uploader.module.scss"
import { useDropzone } from "react-dropzone"
import Thumbnails from "./Thumbnails"

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

	const { getRootProps, getInputProps, isDragActive, rootRef, open } = useDropzone({
		onDrop,
		accept: "",
		noClick: true
	})

	return (
		<div className={styles.container}>
			<button onClick={open}>Add</button>
			<button onClick={onClear}>Clear</button>
			<div {...getRootProps({ style: { height: "200px", border: "1px dashed" } })}>
				<input {...getInputProps()} />
				<Thumbnails imageUrls={imageUrls} />
			</div>
		</div>
	)
}

Uploader.propTypes = {
	setImageUrls: PropTypes.func.isRequired
}

export default Uploader
