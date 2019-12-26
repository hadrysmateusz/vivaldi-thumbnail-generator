import { useState } from "react"

// TODO: it might be better if I move it into its own thing
export const useFileDrawer = () => {
	const [isOpen, setIsOpen] = useState("#fff")

	return {
		isOpen: isOpen,
		open: () => setIsOpen(true),
		close: () => setIsOpen(false)
	}
}
