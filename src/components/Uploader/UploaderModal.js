import React, { useState } from "react"
import styled from "styled-components/macro"
import { cover } from "polished"

import { useUploader } from "../Generator"

import { resetButtonStyles, center } from "../../styleUtils"
import { ReactComponent as CrossIcon } from "../../assets/cross.svg"
import FileUploader from "./FileUploader"
import AddFromBookmark from "./AddFromBookmark"
// import { ReactComponent as LinkIcon } from "../../assets/link.svg"
// import { ReactComponent as PasteIcon } from "../../assets/paste.svg"

const methods = {
	fileUpload: { active: true, name: "fileUpload" },
	bookmarkUrl: { active: true, name: "bookmarkUrl" },
	imageUrl: { active: false, name: "imageUrl" },
	pasteImage: { active: false, name: "pasteImage" }
}

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
					<NavItem
						onClick={() => setSelectedMethod("fileUpload")}
						active={selectedMethod === "fileUpload"}
					>
						Upload
					</NavItem>
					<NavItem
						onClick={() => setSelectedMethod("bookmarkUrl")}
						active={selectedMethod === "bookmarkUrl"}
					>
						Bookmark Url
					</NavItem>
				</Navbar>

				{selectedMethod === "fileUpload" && (
					<FileUploader onRequestClose={onRequestClose} add={add} isLoading={isLoading} />
				)}
				{selectedMethod === "bookmarkUrl" && (
					<AddFromBookmark
						onRequestClose={onRequestClose}
						add={add}
						isLoading={isLoading}
					/>
				)}
			</ModalBox>
		</ModalContainer>
	)
}

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

export default UploaderModal

