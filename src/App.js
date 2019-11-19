import React from "react"
import styled from "styled-components/macro"

import ThumbnailGenerator from "./ThumbnailGenerator"

const Container = styled.div`
	max-width: 793px;
	margin: 100px auto;
`

function App() {
	return (
		<Container>
			<ThumbnailGenerator />
		</Container>
	)
}

export default App
