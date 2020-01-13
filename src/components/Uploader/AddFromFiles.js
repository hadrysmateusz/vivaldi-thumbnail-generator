import React, { useState } from "react"
import styled from "styled-components/macro"
import { useDropzone } from "react-dropzone"

import Button from "../Button"
import FileItem from "../FileItem"
import { readFile, getNameFromFile } from "../../utils"
import { ReactComponent as UploadIcon } from "../../assets/file-upload.svg"
import {
	EmptyStateBody,
	EmptyStateContainer,
	EmptyStateIconContainer,
	EmptyStateHeading,
	Footer,
	DropOverlay,
	ContentContainer,
	InnerContainer
} from "./common"
import TrimWhitespaceCheckbox from "./TrimWhitespaceCheckbox"

const AddFromFiles = ({ onRequestClose, add, isLoading }) => {
	const [icons, setIcons] = useState([])

	const removeIcon = (id) => {
		setIcons((icons) => icons.filter((icon) => icon.id !== id))
	}

	const onAdd = async () => {
		await add(icons)
		onRequestClose()
	}

	const onDrop = async (acceptedFiles) => {
		// if no new files are uploaded, exit silently
		if (!acceptedFiles || acceptedFiles.length === 0) return

		const newIcons = await Promise.all(
			acceptedFiles.map(async (file) => {
				try {
					const url = await readFile(file)
					const name = getNameFromFile(file)
					const id = name + Date.now()
					return { name, url, id }
				} catch (error) {
					// TODO: custom handling for an error on a single file
					throw error // before the custom handling is done, rethrow the error
				}
			})
		)

		setIcons((oldIcons) => [...oldIcons, ...newIcons])
	}

	// const onSearch = (value) => {
	// 	const url = "http://instantlogosearch.com/?q=" + value
	// 	const a = document.createElement("a")
	// 	a.href = url
	// 	a.target = "_blank"
	// 	a.rel = "noopener noreferrer"
	// 	a.click()
	// }

	const dropzoneOptions = {
		onDrop,
		accept: "image/*",
		noClick: true,
		preventDropOnDocument: true
	}

	const {
		getRootProps,
		getInputProps,
		open: openFileSelector,
		isDragActive
	} = useDropzone(dropzoneOptions)

	const isEmpty = !icons || icons.length === 0

	return (
		<>
			<InnerContainer>
				{/* <SearchContainer>
					<Searchbox
						placeholder="Name of website or brand"
						submitText="Search"
						onSubmit={onSearch}
					/>
				</SearchContainer> */}

				<ContentContainer {...getRootProps()} isEmpty={isEmpty}>
					{isEmpty ? (
						<EmptyStateContainer>
							<EmptyStateIconContainer>
								<UploadIcon width={24} height={31} />
							</EmptyStateIconContainer>
							<EmptyStateHeading>Drop icons here to upload</EmptyStateHeading>
							<EmptyStateBody>or</EmptyStateBody>
							<Button variant="primary" size="small" onClick={openFileSelector}>
								Select Files
							</Button>
						</EmptyStateContainer>
					) : (
						<ItemsContainer>
							{icons.map((icon) => (
								<FileItem
									key={icon.id}
									previewSrc={icon.url}
									onRemove={() => removeIcon(icon.id)}
								/>
							))}
						</ItemsContainer>
					)}

					{/* drag overlay */}
					{isDragActive && <DropOverlay>Drop here to add</DropOverlay>}

					{/* input */}
					<input {...getInputProps()} />
				</ContentContainer>
			</InnerContainer>

			<Footer>
				<TrimWhitespaceCheckbox />
				<Button
					variant="primary"
					onClick={onAdd}
					style={{ marginLeft: "auto" }}
					disabled={isEmpty || isLoading}
				>
					Add
				</Button>
			</Footer>
		</>
	)
}

const ItemsContainer = styled.div`
	height: 100%;
	padding: 10px;
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	gap: 10px;
	grid-auto-columns: 80px;
	grid-auto-flow: column;
	overflow-x: auto;
`

export default AddFromFiles
