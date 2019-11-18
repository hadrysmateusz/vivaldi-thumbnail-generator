import React from "react"

const Thumbnails = ({ imageUrls }) => {
	return (
		<div style={{ padding: "10px" }}>
			<div>
				{imageUrls.map((url) => (
					<img key={url} width="39" height="39" src={url} alt="" />
				))}
			</div>
		</div>
	)
}

export default Thumbnails
