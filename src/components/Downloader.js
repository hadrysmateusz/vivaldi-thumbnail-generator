import React, { useState } from "react"
import styled from "styled-components/macro"
import Button from "./Button"
import { useFileContext } from "./FilesProvider"
import { useSettingsContext } from "./SettingsProvider"
import {
	drawIcon,
	calculateDimensions,
	drawBackground,
	createVirtualCanvas
} from "./CanvasCommon"
import { makeAsync } from "../utils"

const Downloader = () => {
	const { isLoading, setIsLoading, images, hasImages } = useFileContext()
	const { scale, bgColor, exportDimensions } = useSettingsContext()
	const [downloadUrls, setDownloadUrls] = useState([])

	const onGenerate = async () => {
		if (isLoading) {
			alert("Wait for the previous action to finish")
			return
		}

		setIsLoading(true)

		try {
			const _downloadUrls = await Promise.all(
				images.map((image) => {
					return generateDownloadUrl(image, scale, bgColor, exportDimensions)
				})
			)
			setDownloadUrls(_downloadUrls)
		} catch (err) {
			alert("Error")
			console.error(err)
		}

		setIsLoading(false)
	}

	const generateDownloadUrl = makeAsync((image, scale, bgColor, exportDimensions) => {
		try {
			const [canvas] = createVirtualCanvas(...exportDimensions)
			const { width, height } = calculateDimensions(image, scale, canvas)
			drawBackground(canvas, bgColor)
			drawIcon(canvas, image, width, height)
			return canvas.toDataURL()
		} catch (err) {
			return null
		}
	})

	return (
		<>
			<Container>
				<Button onClick={onGenerate} disabled={isLoading || !hasImages}>
					Generate
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

// Download All {images && images.length > 0 && `(${images.length})`}

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
