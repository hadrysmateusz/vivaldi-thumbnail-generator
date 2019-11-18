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

	const { getRootProps, getInputProps, isDragActive, rootRef, open } = useDropzone({
		onDrop,
		accept: ""
	})

	return (
		<div className={styles.container}>
			<div {...getRootProps({ style: { height: "200px", border: "1px dashed" } })}>
				<Thumbnails imageUrls={imageUrls} />

				<input {...getInputProps()} />
			</div>
		</div>
	)
}

Uploader.propTypes = {
	setImageUrls: PropTypes.func.isRequired
}

export default Uploader
