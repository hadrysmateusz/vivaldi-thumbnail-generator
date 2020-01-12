import React, { useContext } from "react"
import styled from "styled-components/macro"
import { cover } from "polished"

import { ReactComponent as CrossIcon } from "../assets/cross.svg"

import { center, resetButtonStyles } from "../styleUtils"

const ModalContext = React.createContext()

function Modal({ onRequestClose, children }) {
	// a wrapper function that calls the onRequestCloseCallback and can provide any other pre-close functionality
	const close = () => {
		onRequestClose()
	}

	// TODO: this doesn't seem to work
	const closeOnEsc = (e) => {
		if (e.key !== "Escape") return // only trigger on Escape
		close()
	}

	const onOverlayClick = (e) => {
		if (e.target !== e.currentTarget) return // prevent clicks from inside the modal from closing it
		close()
	}

	return (
		<ModalContext.Provider value={{ close }}>
			<ModalContainer onKeyDown={closeOnEsc} onClick={onOverlayClick}>
				<ModalBox>{children}</ModalBox>
			</ModalContainer>
		</ModalContext.Provider>
	)
}

export const CloseButton = () => {
	const { close } = useContext(ModalContext)
	return (
		<CloseButtonContainer onClick={close}>
			<CrossIcon width={10} height={10} title="Close" />
		</CloseButtonContainer>
	)
}

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
const CloseButtonContainer = styled.button`
	${resetButtonStyles};
	padding: 10px;
	margin: -10px;
	height: 16px;
	width: 16px;
	box-sizing: content-box;
`

export default Modal
