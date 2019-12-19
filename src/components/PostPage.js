import React from "react"
import { useParams, Redirect } from "react-router-dom"
import styled from "styled-components/macro"
import { useMeta, useTitle } from "react-meta-elements"

import { H1 } from "./CopywritingElements"
import FluidContainer from "./FluidContainer"
import logo from "../assets/logo-no-bg.png"
import GuideToFileHandling from "./posts/GuideToFileHandling"
import NotFoundPage from "./pages/NotFound"

const posts = {
	"ultimate-guide-to-file-handling-in-client-side-javascript": {
		component: GuideToFileHandling,
		title: "Ultimate Guide To File Handling In Client-Side Javascript",
		description: "Learn how to read and manipulate files in the browser"
	}
}

const PostPage = () => {
	const { slug } = useParams()

	const post = posts[slug]

	useTitle(post.title)
	useMeta({ name: "description", content: post.description })

	return !post ? (
		<Redirect to={NotFoundPage} />
	) : (
		<div>
			<Header />
			<OuterContainer>
				<FluidContainer>
					<H1>{post.title}</H1>
					<ContentContainer>
						<post.component />
					</ContentContainer>
				</FluidContainer>
			</OuterContainer>
		</div>
	)
}

const ContentContainer = styled.div`
	margin-top: 80px;
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
const OuterContainer = styled.div`
	padding-top: 24px;
	padding-bottom: 60px;
`

const Header = () => {
	return (
		<HeaderContainer>
			<img src={logo} alt="" />
		</HeaderContainer>
	)
}

export default PostPage
