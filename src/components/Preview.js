import React from "react"
import styled from "styled-components/macro"

import BackgroundCanvas from "./BackgroundCanvas"
import IconCanvas from "./IconCanvas"

const Container = styled.div`
	position: relative;
	width: 793px;
	height: 650px;
`

const Preview = ({ image, isLoading }) => {
	return (
		<Container>
			<BackgroundCanvas />
			<IconCanvas image={image} />
		</Container>
	)
}

export default Preview
