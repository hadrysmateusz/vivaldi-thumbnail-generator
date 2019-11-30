import {
	drawIcon,
	calculateDimensions,
	drawBackground,
	createVirtualCanvas
} from "../components/CanvasCommon"

const generateDownloadUrl = (image, scale, bgColor, exportDimensions) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				const [canvas] = createVirtualCanvas(...exportDimensions)
				const { width, height } = calculateDimensions(image, scale, canvas)
				drawBackground(canvas, bgColor)
				drawIcon(canvas, image, width, height)
				resolve(canvas.toDataURL())
			} catch (err) {
				resolve(null)
			}
		}, 0)
	})
}

export default generateDownloadUrl
