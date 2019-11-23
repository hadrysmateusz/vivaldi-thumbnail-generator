import React from "react"
import styled from "styled-components/macro"
import { center } from "../styleUtils"
import { ReactComponent as TrashIcon } from "../assets/trash.svg"

const FileItem = ({ imageUrl, removeItem }) => {
	return (
		<Container>
			<Image url={imageUrl} />
			<RemoveContainer onClick={() => removeItem(imageUrl)}>
				<TrashIcon width="24px" height="24px" title="Remove" />
			</RemoveContainer>
		</Container>
	)
}

const Container = styled.div`
	position: relative;
	padding: 16px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	overflow: hidden;
`

const Image = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${(p) => p.url});
	background-position: center;
	background-size: contain;
	background-repeat: no-repeat;
`

const RemoveContainer = styled.div`
	${center}
	position: absolute;
	bottom: 0;
	right: 0;
	width: 48px;
	height: 48px;
	border-top-left-radius: 5px;
	background: white;
	font-size: 30px;
	font-weight: bold;
	cursor: pointer;
	transition: opacity 200ms ease;
	opacity: 0.76;

	&:hover {
		opacity: 1;
		path {
			fill: #101010;
		}
	}
`

export default FileItem
