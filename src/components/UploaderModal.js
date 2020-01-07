import React from "react"
import styled from "styled-components/macro"
import { cover } from "polished"
// import { ReactComponent as UploadIcon } from "../assets/file-upload.svg"
// import { ReactComponent as LinkIcon } from "../assets/link.svg"
// import { ReactComponent as PasteIcon } from "../assets/paste.svg"
import { useSettings } from "./Generator"
import { resetButtonStyles } from "../styleUtils"
import { center } from "../styleUtils"
import Searchbox from "./Searchbox"
import { ReactComponent as CrossIcon } from "../assets/cross.svg"
import Checkbox from "./Checkbox"

const UploaderModal = ({
	onRequestClose,
	onFileUpload,
	onBookmarkUrl,
	onPasteImage,
	onImageUrl,
	availableMethods
}) => {
	const settings = useSettings()

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

	const onTrimWhitespaceCheckboxChange = (e) => {
		console.log(e.target.checked)
		settings.set.trimWhitespace(e.target.checked)
	}

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
					<NavItem>Upload</NavItem>
					<NavItem>Bookmark Url</NavItem>
				</Navbar>
				<SearchContainer>
					<Searchbox />
				</SearchContainer>
				<ContentContainer></ContentContainer>
				<Footer>
					<CheckboxLabel>
						<Checkbox
							value={settings.values.trimWhitespace}
							onChange={onTrimWhitespaceCheckboxChange}
						/>
						<span>Trim Whitespace</span>
					</CheckboxLabel>
				</Footer>
			</ModalBox>

			{/* {availableMethods.fileUpload && (
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
				)} */}
		</ModalContainer>
	)
}

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
