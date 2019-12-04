import React from "react"
import styled from "styled-components/macro"

import Button from "../Button"
import { useFileContext } from "../FilesProvider"
import { useExporter } from "."
import { useSettingsContext } from "../SettingsProvider"

const Exporter = () => {
	const { hasImages } = useFileContext()
	const [{ isLoading, isError, isCanceled, data }, { generate, cancel }] = useExporter()

	return (
		<OuterContainer>
			<ul>
				{data.map((url, i) => (
					<li onClick={() => downloadImage(url, i)}>thumbnail {i}</li>
				))}
			</ul>
		</OuterContainer>
	)
}

const downloadImage = (data, filename) => {
	filename = filename || "thumbnail.png"
	const a = document.createElement("a")
	a.href = data
	a.download = filename
	a.style.display = "none"
	document.body.appendChild(a)
	a.click()
	a.remove()
}

const OuterContainer = styled.div`
	background: white;
	border-radius: 5px;
	padding: 24px;
`

export default Exporter
