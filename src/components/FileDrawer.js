import React from "react"
import styled from "styled-components/macro"
import { overlay } from "../styleUtils"
import Button from "./Button"
import FileItem from "./FileItem"
import { useFileContext } from "./FileManager"

const FileDrawer = () => {
	const {
		closeFileDrawer,
		images,
		removeImage,
		hasImages,
		clearImages
	} = useFileContext()

	return (
		<Container>
			<InnerContainer>
				<GridContainer>
					{images.map((image) => (
						<FileItem key={image.src} imageUrl={image.src} removeItem={removeImage} />
					))}
				</GridContainer>
			</InnerContainer>

			<ButtonsContainer>
				{hasImages && (
					<Button onClick={clearImages} variant="danger">
						Remove All
					</Button>
				)}
				<Button onClick={closeFileDrawer}>Close</Button>
			</ButtonsContainer>
		</Container>
	)
}

const GridContainer = styled.div`
	padding: 32px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, auto));
	grid-auto-rows: 150px;
	gap: 20px;
`

const InnerContainer = styled.div`
	height: 100%;
	flex: 1;
	overflow: auto;
`

const Container = styled.div`
	${overlay}
	background: white;
	height: 100%;
	position: relative;
`

const ButtonsContainer = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 20px 20px 20px 20px;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	> * + * {
		margin-left: 20px;
	}
`

export default FileDrawer
