import React from "react"
import styled from "styled-components/macro"
import { Link, Redirect } from "react-router-dom"
import { cover } from "polished"

import { useExporter } from "./Generator"
import Button from "./Button"
import Spacer from "./Spacer"
import FluidContainer from "./FluidContainer"
import SharingButtons from "./SharingButtons"
import { center } from "../styleUtils"
import { useThumbnails } from "./Generator"

const Exporter = () => {
	const { isLoading, isError, download, isReady } = useExporter()
	const { isEmpty, count, list } = useThumbnails()

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
						<LoaderContainer>Generating...</LoaderContainer>
					) : isError ? (
						<EmptyState>Oops!</EmptyState>
					) : isEmpty ? (
						<Redirect to="/" />
					) : (
						<ListContainer>
							{list.map((thumbnail) => (
								<ExporterItem
									key={thumbnail.id}
									name={thumbnail.name}
									url={thumbnail.renderedUrl}
								/>
							))}
						</ListContainer>
					)}
				</ContentContainer>
				{!isLoading && (
					<FooterContainer>
						<FooterText>
							{isError || isEmpty ? (
								<>
									<span role="img" aria-label="Error!">
										❌
									</span>
									<span>&nbsp;There was a problem, please try again</span>
								</>
							) : (
								<>
									<span role="img" aria-label="Success!">
										🎉
									</span>
									<span>
										&nbsp;Generated <b>{count}</b> thumbnail{count > 1 && "s"}
									</span>
								</>
							)}
						</FooterText>
						<Spacer />
						<Button variant="primary" onClick={download} disabled={!isReady}>
							Download All
						</Button>
					</FooterContainer>
				)}
			</Container>
			{!isEmpty && !isLoading && (
				<ShareButtonsContainer>
					<SharingButtons />
				</ShareButtonsContainer>
			)}
		</FluidContainer>
	)
}

const ExporterItem = ({ name, url }) => (
	<ItemContainer>
		<Preview url={url} />
		<Data>{name}</Data>
		<Button as="a" download={name + ".png"} href={url} variant="text-only">
			Download
		</Button>
	</ItemContainer>
)

const LoaderContainer = styled.div`
	${center}
	width: 100%;
	height: 100%;
	background: white;
	color: var(--light-gray);
	font-size: 24px;
	line-height: 48px;
	font-weight: bold;
	min-height: 100px;
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

const FooterText = styled.div`
	max-width: 60%;
`

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
	max-height: 454px;
	overflow-y: auto;
`

const ItemContainer = styled.div`
	margin: 20px 0;
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
