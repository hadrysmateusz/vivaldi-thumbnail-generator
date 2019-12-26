import { useContext, useState } from "react"
import { GeneratorContext } from "./generator"

export const useSettings = () => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const { settings } = useContext(GeneratorContext)

	/* add a non-enumerbale, immutable 'editor' property 
	that contains methods and properties related to the settings editor */
	Object.defineProperty(settings, "editor", {
		writable: true,
		value: {
			toggle: () => setIsSettingsOpen((val) => !val),
			close: () => setIsSettingsOpen(false),
			open: () => setIsSettingsOpen(true),
			isOpen: isSettingsOpen
		}
	})

	console.log(settings)

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
