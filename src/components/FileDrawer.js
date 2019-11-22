import React from "react"
import styled from "styled-components/macro"
import { overlay } from "../styleUtils"
import Button from "./Button"
import FileItem from "./FileItem"
import { useFileContext } from "./FileManager"

const FileDrawer = () => {
	const { closeFileDrawer, images, removeImage } = useFileContext()

	return (
		<Container>
			<InnerContainer>
				{images.map((image) => (
					<FileItem imageUrl={image.src} removeItem={removeImage} />
				))}
			</InnerContainer>

			<ButtonsContainer>
				<Button onClick={closeFileDrawer}>Close</Button>
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

const ButtonsContainer = styled.div`
	padding: 20px 20px 20px 20px;
	display: grid;
	width: 100%;
	grid-auto-flow: column;
	grid-auto-columns: auto;
	justify-content: right;
	align-items: center;
	gap: 20px;
`

export default FileDrawer
