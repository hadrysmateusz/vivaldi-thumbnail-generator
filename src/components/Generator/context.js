// import React, { createContext, useContext, useEffect, useState } from "react"

// import { useIconManager } from "./iconManager"
// import { useFileDrawer } from "./fileDrawer"
// import { useExporter } from "../Exporter"

// const GeneratorContext = createContext()

// export const useSettings = () => {
// 	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
// 	const { settings } = useContext(GeneratorContext)

// 	/* add a non-enumerbale, immutable 'editor' property
// 	that contains methods and properties related to the settings editor */
// 	Object.defineProperty(settings, "editor", {
// 		value: {
// 			toggle: () => setIsSettingsOpen((val) => !val),
// 			close: () => setIsSettingsOpen(false),
// 			open: () => setIsSettingsOpen(true),
// 			isOpen: isSettingsOpen
// 		}
// 	})

// 	console.log(settings)

// 	return settings
// }

// export const useGenerator

// export const EditorProvider = ({ children }) => {
// 	const { thumbnails, uploader, settings } = useIconManager()
// 	const exporter = useExporter(thumbnails)
// 	const fileDrawer = useFileDrawer()

// 	// close file drawer when the icons list is empty
// 	useEffect(() => {
// 		if (thumbnails.isEmpty) fileDrawer.close()
// 	}, [fileDrawer, thumbnails.isEmpty])

// 	return (
// 		<GeneratorContext.Provider
// 			value={{ settings, thumbnails, fileDrawer, uploader, exporter }}
// 		>
// 			{children}
// 		</GeneratorContext.Provider>
// 	)
// }
