import React, { useState } from "react"
import styled from "styled-components/macro"
import { useDropzone } from "react-dropzone"
import { cover } from "polished"

import Button from "../Button"
import { useThumbnails, useUploader } from "../Generator"
import { getNameFromFile, readFile } from "../../utils"
import UploaderModal from "./UploaderModal"
import Spacer from "../Spacer"
import { DropOverlay } from "./common"

const Uploader = () => {
	const { manager, isEmpty, count } = useThumbnails()
	const { isLoading, add } = useUploader()
	const [isModalOpen, setIsModalOpen] = useState()

	const closeModal = () => setIsModalOpen(false)
	const openModal = () => setIsModalOpen(true)

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
		await add.fromFiles(icons)
		closeModal()
	}

	const dropzoneOptions = {
		onDrop,
		disabled: isModalOpen,
		accept: "image/*",
		noClick: true,
		preventDropOnDocument: true
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions)

	return (
		<UploaderContainer {...getRootProps()}>
			{/* input */}
			<input {...getInputProps()} />

			{/* buttons */}
			{!manager.isOpen && (
				<ButtonsContainer>
					<Button
						onClick={openModal}
						variant={!isEmpty ? "normal" : "primary"}
						disabled={isLoading}
					>
						{isLoading ? "Loading" : "Add Icons"}
					</Button>
					<Spacer />
					{!isEmpty && (
						<Button onClick={manager.open} disabled={isLoading}>
							Manage Icons ({count})
						</Button>
					)}
				</ButtonsContainer>
			)}

			{/* uploader modal */}
			{!manager.isOpen && isModalOpen && <UploaderModal onRequestClose={closeModal} />}

			{/* drag overlay */}
			{isDragActive && <DropOverlay>Drop here to add</DropOverlay>}
		</UploaderContainer>
	)
}

const UploaderContainer = styled.div`
	${cover()}
	z-index: 400;
`

const ButtonsContainer = styled.div`
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	padding: 0 20px 20px 20px;
	display: flex;
	align-items: center;
	> * + * {
		margin-left: 20px;
	}
`

export default Uploader
