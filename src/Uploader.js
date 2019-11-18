import React, { useRef } from "react"
import PropTypes from "prop-types"
import styles from "./Uploader.module.scss"

const Uploader = ({ setImageUrls }) => {
	const fileInputRef = useRef()

	const onFileChange = () => {
		const files = fileInputRef.current.files
		let imageUrls = []

		// if no new files are uploaded, exit silently
		if (!files || files.length === 0) return

		// for every valid file add an object url to the list
		for (let file of files) {
			// if file isn't an image, skip it
			if (!file.type.match("image.*")) continue

			imageUrls.push(window.URL.createObjectURL(file))
		}

		// update the external state
		setImageUrls((prevState) => [...prevState, ...imageUrls])
	}

	return (
		<div className={styles.container}>
			<input type="file" ref={fileInputRef} onChange={onFileChange} multiple />
		</div>
	)
}

Uploader.propTypes = {
	setImageUrls: PropTypes.func.isRequired
}

export default Uploader
