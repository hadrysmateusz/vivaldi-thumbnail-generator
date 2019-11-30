import React from "react"
import styled from "styled-components/macro"
import Button from "./Button"
import { useFileContext } from "./FilesProvider"

const Downloader = () => {
	const {
		isLoading,
		images,
		hasImages,
		generateDownloadUrls,
		downloadUrls
	} = useFileContext()

	const onDownload = async () => {
		await generateDownloadUrls()
		alert("Done")
	}

	return (
		<>
			<Container>
				<Button onClick={onDownload} disabled={isLoading || !hasImages}>
					Download All {images && images.length > 0 && `(${images.length})`}
				</Button>
			</Container>
			<ul>
				{downloadUrls.map((url, i) => (
					<li onClick={() => downloadImage(url, i)}>thumbnail {i}</li>
				))}
			</ul>
		</>
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

const Container = styled.div`
	margin: 60px auto;
	width: 732px;
	display: flex;
	justify-content: center;
`

export default Downloader
