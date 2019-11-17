import React, { useRef } from "react"
import PropTypes from "prop-types"
import styles from "./Uploader.module.scss"

import { trimAndRescaleImage } from "./utils"

const Uploader = ({ targetSize, setImage }) => {
	const fileInputEl = useRef()

	const onImageLoad = (e) => {
		const editedImage = trimAndRescaleImage(e.target, targetSize)
		setImage(editedImage)
	}

	const onImageError = () => {
		alert("couldn't load image")
	}

	const onFileLoad = (e) => {
		const img = new Image()
		img.src = e.target.result
		img.onload = onImageLoad
		img.onerror = onImageError
	}

	const onFileError = () => {
		alert("couldn't load file")
	}

	const onFileChange = () => {
		const reader = new FileReader()
		const files = fileInputEl.current.files
		const file = files[0]

		// verify the file exists and is an image
		if (!file) return
		if (!file.type.match("image.*")) return alert("not an image")

		// set up file reader event handlers
		reader.onload = onFileLoad
		reader.onerror = onFileError

		// read file
		reader.readAsDataURL(file)
	}

	return (
		<div className={styles.container}>
			<input type="file" ref={fileInputEl} onChange={onFileChange} />
		</div>
	)
}

Uploader.propTypes = {
	targetSize: PropTypes.number.isRequired,
	setImage: PropTypes.func.isRequired
}

export default Uploader
