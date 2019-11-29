import React from "react"
import styled from "styled-components/macro"
import { center } from "../styleUtils"
import { ReactComponent as UploadIcon } from "../assets/file-upload.svg"
import { ReactComponent as LinkIcon } from "../assets/link.svg"

const UploaderModal = ({ onRequestClose, onUpload, onLink }) => {
	const closeOnEsc = (e) => {
		if (e.key === "Escape") {
			onRequestClose()
		}
	}

	const iconSize = "32px"

	return (
		<ModalContainer
			onKeyDown={closeOnEsc}
			onClick={(e) => {
				// prevent click events on the trigger from propagating to the rest of the React tree
				e.stopPropagation()
				e.preventDefault()
				// call the onRequestClose handler
				onRequestClose()
			}}
		>
			<ModalBox
				onClick={(e) => {
					// prevent click events in the modal from accidentaly closing it
					e.stopPropagation()
				}}
			>
				<ModalButton onClick={onUpload} autoFocus>
					<UploadIcon width={iconSize} height={iconSize} title="Upload File" />
					<ButtonLabel>From file</ButtonLabel>
				</ModalButton>
				<ModalButton onClick={onLink}>
					<LinkIcon width={iconSize} height={iconSize} title="Paste Image URL" />
					<ButtonLabel>From bookmark</ButtonLabel>
				</ModalButton>
				{/* <ModalButton onClick={onPaste}>
					<PasteIcon width={iconSize} height={iconSize} title="Paste Image" />
					<ButtonLabel>Paste Image</ButtonLabel>
				</ModalButton> */}
			</ModalBox>
		</ModalContainer>
	)
}

const ModalContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.36);
	z-index: 100;
`

const ModalBox = styled.div`
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	z-index: 110;
	position: relative;
	border-radius: 5px;
	height: 140px;
	display: flex;
	width: auto;
	overflow: hidden;
`

const ModalButton = styled.button`
	:focus {
		outline: 2px dashed #aaa;
		outline-offset: -2px;
	}
	background: white;
	display: block;
	transition: color 200ms ease;
	height: 100%;
	width: 140px;
	border: none;
	${center}
	display: flex;
	flex-direction: column;
	& + * {
		border-left: 1px solid #e1e1e1;
	}
`

const ButtonLabel = styled.div`
	margin-top: 12px;
	color: #383838;
`

export default UploaderModal
