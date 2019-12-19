import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import { H1 } from "./CopywritingElements"
import FluidContainer from "./FluidContainer"
import logo from "../assets/logo-no-bg.png"
import postImage from "./posts/GuideToFileHandling.png"

const Blog = () => {
	return (
		<>
			<HeaderContainer>
				<img src={logo} />
			</HeaderContainer>
			<FluidContainer>
				<Container>
					<H1>Blog</H1>
					<PostsList>
						<PostItem
							imageUrl={postImage}
							title="Ultimate Guide To File Handling"
							link="/posts/ultimate-guide-to-file-handling-in-client-side-javascript"
							excerpt="Learn how to read and manipulate files in the browser"
						/>
					</PostsList>
				</Container>
			</FluidContainer>
		</>
	)
}

const Container = styled.div`
	padding-top: 24px;
	padding-bottom: 60px;
`

const PostItem = ({ link, imageUrl, title, excerpt }) => (
	<Link to={link}>
		<PostItemContainer>
			<Image src={imageUrl} />
			<InfoContainer>
				<PostTitle>{title}</PostTitle>
				<Excerpt>{excerpt}</Excerpt>
			</InfoContainer>
		</PostItemContainer>
	</Link>
)

const PostItemContainer = styled.div`
	background: white;
	border: 1px solid #ddd;
	display: grid;
	height: 120px;
	grid-template-columns: 110px 1fr;
	@media (min-width: 800px) {
		height: 200px;
		grid-template-columns: 200px 1fr;
	}
`

const PostTitle = styled.h3`
	margin: 0;
	font-weight: 700;
	color: #383838;
	font-size: 18px;
	line-height: 24px;
	@media (min-width: 800px) {
		font-size: 24px;
		line-height: 32px;
	}
`

const Excerpt = styled.div`
	color: #383838;
	margin-top: 10px;

	margin-top: 12px;
	@media (min-width: 800px) {
		margin-top: 20px;
	}
`

const InfoContainer = styled.div`
	padding: 12px;
	@media (min-width: 800px) {
		padding: 20px;
	}
`

const Image = styled.div`
	background: url(${(p) => p.src});
	background-size: cover;
	background-position: center;
	box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
`

const PostsList = styled.div`
	display: grid;
	margin: 60px 0;
	gap: 20px;
`

const HeaderContainer = styled.div`
	height: 508px;
	background: var(--accent-color);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	img {
		margin-left: 44px;
	}
`

export default Blog
