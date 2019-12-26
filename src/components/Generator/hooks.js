import { useContext } from "react"
import { GeneratorContext } from "./generator"

export const useSettings = () => {
	const { settings } = useContext(GeneratorContext)
	return settings
}

export const useUploader = () => {
	const { uploader } = useContext(GeneratorContext)
	return uploader
}

export const useThumbnails = () => {
	const { thumbnails } = useContext(GeneratorContext)
	return thumbnails
}

export const useExporter = () => {
	const { exporter } = useContext(GeneratorContext)
	return exporter
}
