import React from "react"
import styled from "styled-components/macro"
import { useDropzone } from "react-dropzone"
import { cover } from "polished"

import { useUploader } from "../Generator"
import { getNameFromFile, readFile } from "../../utils"
import { DropOverlay } from "./common"

const Uploader = () => {
	const uploader = useUploader()

	const onDrop = async (acceptedFiles) => {
		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) return

		const icons = await Promise.all(
			acceptedFiles.map(async (file) => {
				try {
					const url = await readFile(file)
					const name = getNameFromFile(file)
					return { name, url }
				} catch (error) {
					// TODO: custom handling for an error on a single file
					throw error // before the custom handling is done, rethrow the error
				}
			})
		)

		// transform the files and add to file manager state
		await uploader.add(icons)
	}

	const dropzoneOptions = {
		onDrop,
		disabled: uploader.isOpen,
		accept: "image/*",
		noClick: true,
		preventDropOnDocument: true
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

	return (
		<UploaderContainer {...getRootProps()}>
			{/* drag overlay */}
			{isDragActive && <DropOverlay>Drop here to add</DropOverlay>}

			{/* input */}
			<input {...getInputProps()} />
		</UploaderContainer>
	)
}

const UploaderContainer = styled.div`
	${cover()}
	z-index: 400;
`

export default Uploader
