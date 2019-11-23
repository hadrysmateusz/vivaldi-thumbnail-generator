import React from "react"
import styled from "styled-components/macro"

import ThumbnailGenerator from "./ThumbnailGenerator"

const App = () => (
	<Container>
		<Background />
		<OuterContainer>
			<InnerContainer>
				<Headline>Vivaldi Thumbnail Generator</Headline>
				<Description>
					Quickly and effortlessly generate thumbnails for use in{" "}
					<a href="https://vivaldi.com/">Vivaldi Browser’s</a> Speed Dials
				</Description>
				<ThumbnailGenerator />
			</InnerContainer>
		</OuterContainer>
	</Container>
)

const Container = styled.div``

const Background = styled.div`
	height: 600px;
	position: relative;
	background-color: #4fd6d6;
	background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`

const OuterContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
`

const InnerContainer = styled.div`
	margin: 0 auto;
`

const Headline = styled.h1`
	margin: 40px auto 24px;

	font-weight: 900;
	font-size: 43px;
	line-height: 48px;

	text-align: center;
	justify-content: center;
	letter-spacing: 0.05em;
	color: #ffffff;
	text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
`

const Description = styled.p`
	max-width: 440px;
	margin: 24px auto 32px;
	font-weight: 600;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: white;
	text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

	a,
	a:visited {
		color: inherit;
	}
`

export default App
