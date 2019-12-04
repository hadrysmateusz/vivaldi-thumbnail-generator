import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import Button from "../Button"
import { useFileContext } from "../FilesProvider"
import { useExporter } from "."
import { useSettingsContext } from "../SettingsProvider"

const Exporter = () => {
	const { hasImages } = useFileContext()
	const [{ isLoading, isError, isCanceled, data }, { generate, cancel }] = useExporter()

	return (
		<OuterContainer>
			<Container>
				<Header>
					<h2>Downloads</h2>
					<Button as={Link} to={"/"}>
						Edit
					</Button>
				</Header>
				<ListContainer>
					{data.map((url, i) => (
						<ExporterItem key={url} name={`thumbnail-${i}`} url={url} />
					))}
				</ListContainer>
			</Container>
		</OuterContainer>
	)
}

const ExporterItem = ({ name, url }) => {
	const handleClick = () => {
		downloadImage(url, name)
	}

	return (
		<ItemContainer>
			<Preview url={url} />
			<Data>{name}</Data>
			<Actions>
				<Button onClick={handleClick} variant="text-only">
					Download
				</Button>
			</Actions>
		</ItemContainer>
	)
}

const downloadImage = (url, filename) => {
	filename += ".png"
	const a = document.createElement("a")
	a.href = url
	a.download = filename
	a.style.display = "none"
	document.body.appendChild(a)
	a.click()
	a.remove()
}

const ListContainer = styled.div``

const ItemContainer = styled.div`
	margin: 24px 0;
	display: flex;
	align-items: center;
`

const Preview = styled.div`
	background-color: #f2f2f2;
	background-image: url(${(p) => p.url});
	background-position: center;
	background-size: cover;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.1) inset;
	border-radius: 5px;
	width: 60px;
	height: 60px;
	margin-right: 16px;
`

const Data = styled.div`
	font-weight: bold;
	margin-right: auto;
`

const Actions = styled.div``

const Header = styled.div`
	height: 72px;
	display: flex;
	justify-content: center;
	align-items: center;

	border-bottom: 2px solid #f5f5f5;

	h2 {
		font-weight: 900;
		font-size: 24px;
		line-height: 40px;
		color: #383838;
		margin-right: auto;
		letter-spacing: 0.03em;
	}
`

const OuterContainer = styled.div`
	margin: 0 auto;
	max-width: 1024px;
	display: flex;
	justify-content: center;
`

const Container = styled.div`
	width: 732px;
	background: white;
	padding: 0 24px;
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
`

export default Exporter
