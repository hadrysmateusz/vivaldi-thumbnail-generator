import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { useMeta, useTitle } from "react-meta-elements"

import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"
import FluidContainer from "../FluidContainer"
import { H1, TextBlock } from "../CopywritingElements"

const NotFoundPage = () => {
	useTitle("404 Page Not Found | Vivaldi Thumbnail Generator")
	useMeta({ name: "robots", content: "noindex" })

	return (
		<FluidContainer>
			<H1>Page Not Found</H1>
			<Link to="/">
				<TextBlock
					style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
				>
					<BackArrow /> Go back to the generator
				</TextBlock>
			</Link>
		</FluidContainer>
	)
}

const BackArrow = styled(ArrowIcon)`
	transform: rotate(180deg);
	color: #484848;
	width: 16px;
	height: 16px;
	display: inline-block;
	margin-right: 6px;
`

export default NotFoundPage
