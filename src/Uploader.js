import React, { useRef } from "react"
import PropTypes from "prop-types"
import styles from "./Uploader.module.scss"

const Uploader = ({ onImageLoad }) => {
	const fileInputEl = useRef()

	const onFileChange = () => {
		const reader = new FileReader()
		const files = fileInputEl.current.files
		const file = files[0]

		// verify the file exists and is an image
		if (!file) return
		if (!file.type.match("image.*")) return alert("not an image")

		// when the file is loaded, initiate processing
		reader.addEventListener("load", () => {
			const img = new Image()
			img.src = reader.result
			img.onload = onImageLoad
			img.onerror = () => alert("couldn't load image")
		})

		reader.readAsDataURL(file)
	}

	return (
		<div className={styles.container}>
			<input type="file" ref={fileInputEl} onChange={onFileChange} />
		</div>
	)
}

Uploader.propTypes = {
	onImageLoad: PropTypes.func.isRequired
}

export default Uploader
