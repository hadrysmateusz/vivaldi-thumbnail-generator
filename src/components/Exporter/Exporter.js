import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { cover } from "polished"

import { useExporter } from "."
import Button from "../Button"
import Spacer from "../Spacer"
import FluidContainer from "../FluidContainer"
import SharingButtons from "../SharingButtons"
import Loader from "../Loader"
import { download } from "../../utils"
import { center } from "../../styleUtils"

const Exporter = () => {
	const [{ isLoading, isError, thumbnails, progressDone, progressTotal }] = useExporter()
	const isEmpty = !thumbnails || thumbnails.length === 0
	const numThumbnails = isEmpty ? 0 : thumbnails.length

	// TODO: consider merging isEmpty and isError inside the exporter hook
	// TODO: refactor this and move it inside exporter hook, merge error states etc.
	const downloadAll = async () => {
		await download.zip.fromUrls(thumbnails, "thumbnails")
	}

	return (
		<FluidContainer>
			<Container>
				<HeaderContainer>
					<h2>Downloads</h2>
					<Button as={Link} to={"/"}>
						Back
					</Button>
				</HeaderContainer>
				<ContentContainer>
					{isLoading ? (
						<Loader>
							Exporting ({progressDone}/{progressTotal})
						</Loader>
					) : isEmpty ? (
						<EmptyState>
							<div>
								There is nothing here,&nbsp;<Link to="/">go back</Link>&nbsp;to add some
								icons and try again
							</div>
						</EmptyState>
					) : (
						<ListContainer>
							{thumbnails.map((url, i) => (
								<ExporterItem key={url} name={`thumbnail-${i + 1}`} url={url} />
							))}
						</ListContainer>
					)}
				</ContentContainer>
				{!isEmpty && (
					<FooterContainer>
						<div>
							Generated <b>{numThumbnails}</b> thumbnail{numThumbnails > 1 && "s"} 🎉
						</div>
						<Spacer />
						<Button
							variant="primary"
							onClick={downloadAll}
							disabled={isLoading || isError}
						>
							Download All
						</Button>
					</FooterContainer>
				)}
			</Container>
			{!isEmpty && (
				<ShareButtonsContainer>
					<SharingButtons />
				</ShareButtonsContainer>
			)}
		</FluidContainer>
	)
}

const ExporterItem = ({ name, url }) => {
	const handleClick = () => {
		download.fromUrl(url, name)
	}

	return (
		<ItemContainer>
			<Preview url={url} />
			<Data>{name}</Data>
			<Button onClick={handleClick} variant="text-only">
				Download
			</Button>
		</ItemContainer>
	)
}

const ShareButtonsContainer = styled.div`
	margin: 40px auto;
`

const FooterContainer = styled.div`
	display: flex;
	align-items: center;
	min-height: 72px;
	border-top: 2px solid #f5f5f5;
	font-size: 14px;
	line-height: 18px;
	color: #444;
`

const Container = styled.div`
	background: white;
	padding: 0 20px;
	position: relative;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 0 3px 16px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
`

const ContentContainer = styled.div`
	flex: 1;
	min-height: 100px;
	position: relative;
`

const ListContainer = styled.div`
	max-height: 474px;
	overflow-y: auto;
`

const ItemContainer = styled.div`
	margin: 20px 0;
	display: flex;
	align-items: center;
`

const EmptyState = styled.div`
	${center}
	${cover()}
	font-size: 12px;
	line-height: 18px;
	color: var(--light-gray);
	text-align: center;

	a {
		color: black;
		text-decoration: underline;
	}
`

const Preview = styled.div`
	background-color: #f2f2f2;
	background-image: url(${(p) => p.url});
	background-position: center;
	background-size: cover;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.1) inset;
	border-radius: 5px;
	height: 60px;
	width: 73px;
	margin-right: 16px;
`

const Data = styled.div`
	font-weight: bold;
	margin-right: auto;
`

const HeaderContainer = styled.div`
	${center}
	height: 72px;
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

export default Exporter
