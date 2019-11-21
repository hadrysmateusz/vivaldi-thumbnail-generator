import React from "react"
import styled from "styled-components"
import { overlay } from "../styleUtils"
import Button from "./Button"
import FileItem from "./FileItem"

const FileDrawer = ({ closeModal, images, setImages, openFileDialog }) => {
	const clear = () => {
		setImages([])
	}

	const removeItem = (urlToRemove) => {
		URL.revokeObjectURL(urlToRemove)
		setImages((prevState) => prevState.filter((image) => image.src !== urlToRemove))
	}

	return (
		<Container>
			<InnerContainer>
				{images.map((image) => (
					<FileItem imageUrl={image.src} removeItem={removeItem} />
				))}
			</InnerContainer>

			<ButtonsContainer>
				<Button onClick={openFileDialog} variant="primary">
					Add Files
				</Button>
				<DropText>or drop files here</DropText>
				<Button onClick={closeModal}>Close</Button>
				<Button onClick={clear} variant="danger">
					Clear
				</Button>
			</ButtonsContainer>
		</Container>
	)
}

const InnerContainer = styled.div`
	padding: 32px;
	flex: 1;

	display: flex;
	align-content: flex-start;
	flex-wrap: wrap;
	margin-left: -16px;
	margin-bottom: -16px;
	> * {
		margin-left: 16px;
		margin-bottom: 16px;
	}
`

const Container = styled.div`
	${overlay}
	background: white;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const DropText = styled.div`
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.015em;
	color: #888888;
	cursor: default;
`

const ButtonsContainer = styled.div`
	padding: 20px 20px 20px 20px;
	display: grid;
	width: 100%;
	grid-auto-flow: column;
	grid-template-columns: auto 1fr auto auto;
	justify-content: right;
	align-items: center;
	gap: 20px;
`

export default FileDrawer
