import React from "react"
import styles from "./App.module.scss"

import ThumbnailGenerator from "./ThumbnailGenerator"

function App() {
	return (
		<div className={styles.container}>
			<ThumbnailGenerator />
		</div>
	)
}

export default App
