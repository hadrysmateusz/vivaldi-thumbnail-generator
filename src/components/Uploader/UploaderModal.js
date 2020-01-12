import React, { useState } from "react"
import styled from "styled-components/macro"

import { useUploader } from "../Generator"
import Modal, { CloseButton } from "../Modal"

import FileUploader from "./FileUploader"
import AddFromBookmark from "./AddFromBookmark"

const methods = {
	fileUpload: { active: true, name: "fileUpload" },
	bookmarkUrl: { active: true, name: "bookmarkUrl" },
	imageUrl: { active: false, name: "imageUrl" },
	pasteImage: { active: false, name: "pasteImage" }
}

const UploaderModal = ({ onRequestClose }) => {
	const { isLoading, add } = useUploader()
	const [selectedMethod, setSelectedMethod] = useState(methods.fileUpload.name)

	return (
		<Modal onRequestClose={onRequestClose}>
			<Header>
				<Title>Add Icons</Title>
				<CloseButton />
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
		</Modal>
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

export default UploaderModal
