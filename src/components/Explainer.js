import React from "react"
import styled from "styled-components/macro"

const Explainer = () => {
	return (
		<>
			<Heading>How to use?</Heading>
			<Body>
				<p>
					Upload one or more images to represent the site you need a thumbnail for. Adjust
					settings like background color and icon size, by clicking on the settings icon
					in the top-right corner.
				</p>
				<p>
					When you're ready, click <b>Download</b> to get all of your thumbnails. Make
					sure to allow this site to download multiple files at once, by clicking the
					<b> 'i'</b> icon in your browser's address bar.
				</p>
				<p>
					Any questions, or suggestions? Feel free to contact me at{" "}
					<a href="mailto:hadrys.mateusz86@gmail.com">hadrys.mateusz86@gmail.com</a>
				</p>
			</Body>
		</>
	)
}

const Heading = styled.h1`
	margin: 48px auto 24px;

	font-weight: 900;
	font-size: 43px;
	line-height: 48px;

	text-align: center;
	justify-content: center;
	letter-spacing: 0.05em;
	color: #383838;
`

const Body = styled.p`
	max-width: 600px;
	margin: 24px auto 32px;
	font-size: 18px;
	line-height: 24px;
	text-align: center;
	color: #383838;

	a,
	a:visited {
		color: inherit;
	}
`

// Upload one or more images to represent the site you need a thumbnail for. Use the
// arrows to switch between the different previews. Adjust settings like background
// color and icon size, by clicking on the settings icon in the top-right corner. You
// can see all uploaded icons, and remove ones you don't need in the "Manage Icons"
// menu. When you're ready click the "Download" button to get all of your thumbnails.
// Make sure to allow this site to download multiple files at once, by clicking on
// the 'i' icon in your browser's address bar.

export default Explainer
