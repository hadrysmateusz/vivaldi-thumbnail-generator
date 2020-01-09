import React, { useState } from "react"
import styled from "styled-components/macro"
import { cover } from "polished"
import { useDropzone } from "react-dropzone"

import { useSettings, useUploader } from "../Generator"
import Searchbox from "../Searchbox"
import Button from "../Button"
import FileItem from "../FileItem"
import Checkbox from "../Checkbox"
import { resetButtonStyles, center } from "../../styleUtils"
import { ReactComponent as CrossIcon } from "../../assets/cross.svg"
import { ReactComponent as UploadIcon } from "../../assets/file-upload.svg"
// import { ReactComponent as LinkIcon } from "../../assets/link.svg"
// import { ReactComponent as PasteIcon } from "../../assets/paste.svg"
import { DropOverlay } from "./common"
import { readFile, getNameFromFile } from "../../utils"

// bookmark url works, but produces very low quality images
const methods = {
	fileUpload: { active: true, name: "fileUpload" },
	imageUrl: { false: true, name: "imageUrl" },
	pasteImage: { false: true, name: "pasteImage" },
	bookmarkUrl: { active: true, name: "bookmarkUrl" }
}

/* TODO: make the uploader modal work a bit like the file drawer:
	show previews of the images first (maybe using URL.createObjectURL) allow the user to remove the ones they don't want, change the trim whitespace settings and then confirm which will trigger the old adding flow (show the progress on the button text)
	maybe as a detail make the content container border solid (and maybe darker) after adding items
*/
const UploaderModal = ({ onRequestClose }) => {
	const { isLoading, add } = useUploader()
	const [selectedMethod, setSelectedMethod] = useState(methods.fileUpload.name)

	// TODO: this doesn't seem to work
	const closeOnEsc = (e) => {
		if (e.key === "Escape") {
			onRequestClose()
		}
	}

	const onOverlayClick = (e) => {
		// prevent clicks from inside the modal from closing it
		if (e.target !== e.currentTarget) return
		// call the onRequestClose handler
		onRequestClose()
	}

	// const onBookmarkUrl = async () => {
	// 	let url = prompt("Paste bookmark URL here")
	// 	if (url) {
	// 		await add.fromBookmarkUrl(url)
	// 		onRequestClose()
	// 	}
	// }

	// const onImageUrl = async () => {
	// 	const url = prompt("Paste image URL here")

	// 	if (url) {
	// 		try {
	// 			const response = await fetch(`/.netlify/functions/fetchImage?url=${url}`)
	// 			console.log(await response.text())
	// 		} catch (error) {
	// 			console.error("fetching error:", error)
	// 		}

	// 		await add.fromImageUrl(url)
	// 		onRequestClose()
	// 	}
	// }

	// const onPasteImage = () => {
	// 	// PLACEHOLDER
	// 	onRequestClose()
	// }

	return (
		<ModalContainer onKeyDown={closeOnEsc} onClick={onOverlayClick}>
			<ModalBox>
				<Header>
					<Title>Add Icons</Title>
					<CloseButton onClick={onRequestClose}>
						<CrossIcon width={10} height={10} title="Close" />
					</CloseButton>
				</Header>

				<Navbar>
					<NavItem onClick={() => setSelectedMethod("fileUpload")}>Upload</NavItem>
					<NavItem onClick={() => setSelectedMethod("bookmarkUrl")}>Bookmark Url</NavItem>
				</Navbar>

				{selectedMethod === "fileUpload" && (
					<FileUploadComponent
						onRequestClose={onRequestClose}
						add={add.fromFiles}
						isLoading={isLoading}
					/>
				)}
			</ModalBox>
		</ModalContainer>
	)
}

const FileUploadComponent = ({ onRequestClose, add, isLoading }) => {
	const [icons, setIcons] = useState([])

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
			<SearchContainer>
				<Searchbox />
			</SearchContainer>

			<ContentContainer {...getRootProps()}>
				{isEmpty ? (
					<EmptyStateContainer>
						<EmptyStateIconContainer>
							<UploadIcon width={24} height={31} />
						</EmptyStateIconContainer>
						<EmptyStateHeading>Drop icons here to upload</EmptyStateHeading>
						<EmptyStateBody>or</EmptyStateBody>
						<Button variant="primary" onClick={openFileSelector}>
							Select Files
						</Button>
					</EmptyStateContainer>
				) : (
					<FileItemsContainer>
						{icons.map((icon) => (
							<FileItem key={icon.id} previewSrc={icon.url} />
						))}
					</FileItemsContainer>
				)}

				{/* drag overlay */}
				{isDragActive && <DropOverlay>Drop here to add</DropOverlay>}

				{/* input */}
				<input {...getInputProps()} />
			</ContentContainer>

			<Footer>
				<TrimWhitespace />
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

const TrimWhitespace = () => {
	const settings = useSettings()

	const onTrimWhitespaceCheckboxChange = (e) => {
		settings.set.trimWhitespace(e.target.checked)
	}

	return (
		<CheckboxLabel>
			<Checkbox
				value={settings.values.trimWhitespace}
				onChange={onTrimWhitespaceCheckboxChange}
			/>
			<span>Trim Whitespace</span>
		</CheckboxLabel>
	)
}

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
	span {
		user-select: none;
		margin-left: 8px;
		font-size: 12px;
		line-height: 16px;
		color: #777;
	}
`

const Header = styled.div`
	margin: 20px 0;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
`
const Title = styled.div`
	font-weight: bold;
	font-size: 14px;
	line-height: 20px;
`
const CloseButton = styled.button`
	${resetButtonStyles};
	padding: 10px;
	margin: -10px;
`
const Navbar = styled.div`
	--side-padding: 10px;
	--side-margin: calc(-1 * var(--side-padding));

	padding-bottom: 10px;
	margin-left: var(--side-margin);
	margin-right: var(--side-margin);

	border-bottom: 2px solid #f5f5f5;

	display: flex;
`
const NavItem = styled.div`
	color: ${(p) => (p.active ? "#383838" : "#B4B4B4")};
	text-transform: uppercase;
	font-size: 11px;
	line-height: 16px;
	font-weight: bold;
	padding: 0 var(--side-padding);
	cursor: pointer;
	transition: color 200ms ease;
	&:hover {
		color: #383838;
	}
`

const SearchContainer = styled.div`
	margin: 20px 0;
`

const Footer = styled.div`
	margin: 20px 0;
	display: flex;
`

const ContentContainer = styled.div`
	height: 140px;
	border: 2px dashed #e2e2e2;
	border-radius: 6px;
	background: white;
	/* display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center; */
	position: relative;
	overflow: hidden;
`

const ModalContainer = styled.div`
	${cover()}
	${center}
	background: rgba(0, 0, 0, 0.36);
	z-index: 1000;
`

const ModalBox = styled.div`
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	position: relative;
	border-radius: 5px;
	width: 540px;
	overflow: hidden;
	padding: 0 20px;
`

const EmptyStateContainer = styled.div`
	width: 100%;
	height: 100%;
	${center}
	flex-direction: column;
	background: white;
`

const EmptyStateIconContainer = styled.div`
	margin-bottom: 8px;
	path {
		fill: #e2e2e2;
	}
`

const EmptyStateHeading = styled.div`
	color: var(--light-gray);
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
`

const EmptyStateBody = styled.div`
	color: var(--light-gray);
	font-size: 10px;
	line-height: 16px;
`

const FileItemsContainer = styled.div`
	height: 100%;
	padding: 10px;
	display: flex;
	justify-content: flex-start;
	overflow-x: scroll;
	> * {
		flex: 0 0 100px;
		&:not(:last-child) {
			margin-right: 10px;
		}
	}
`

export default UploaderModal

/* {availableMethods.fileUpload && (
	<ModalButton onClick={onFileUpload} autoFocus>
		<UploadIcon width={iconSize} height={iconSize} title="Upload File" />
		<ButtonLabel>From file</ButtonLabel>
	</ModalButton>
)}
{availableMethods.bookmarkUrl && (
	<ModalButton onClick={onBookmarkUrl}>
		<LinkIcon
			width={iconSize}
			height={iconSize}
			title="Get Image From Bookmark URL"
		/>
		<ButtonLabel>Bookmark URL (beta)</ButtonLabel>
	</ModalButton>
)}
{availableMethods.pasteImage && (
	<ModalButton onClick={onPasteImage}>
		<PasteIcon width={iconSize} height={iconSize} title="Paste Image" />
		<ButtonLabel>Paste Image (beta)</ButtonLabel>
	</ModalButton>
)}
{availableMethods.imageUrl && (
	<ModalButton onClick={onImageUrl}>
		<PasteIcon width={iconSize} height={iconSize} title="Get Image From URL" />
		<ButtonLabel>Image URL (beta)</ButtonLabel>
	</ModalButton>
)} */
