import React from "react"

const Thumbnails = ({ imageUrls }) => {
	return (
		<div style={{ border: "1px solid red" }}>
			<div>
				{imageUrls.map((url) => (
					<img key={url} width="39" height="39" src={url} alt="" />
				))}
			</div>
		</div>
	)
}

export default Thumbnails
