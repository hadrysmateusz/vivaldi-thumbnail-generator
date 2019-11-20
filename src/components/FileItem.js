import React from "react"
import styled from "styled-components"
import { overlay, center } from "../styleUtils"

const FileItem = ({ imageUrl, removeItem }) => {
	return (
		<Container imageUrl={imageUrl}>
			<Overlay onClick={() => removeItem(imageUrl)}>X</Overlay>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	flex: 0 150px;
	width: 150px;
	height: 150px;
	background-image: url(${(p) => p.imageUrl});
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
	padding: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	overflow: hidden;
`

const Overlay = styled.div`
	${overlay}
	${center}
	background: rgba(0, 0, 0, 0.08);
	font-size: 30px;
	font-weight: bold;
`

export default FileItem
