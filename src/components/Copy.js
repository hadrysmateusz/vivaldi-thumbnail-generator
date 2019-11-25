import React from "react"
import styled from "styled-components/macro"

export const Explainer = () => (
	<>
		<Heading>How to use</Heading>
		<Body>
			<p>
				Upload one or more images to represent the site you need a thumbnail for. Adjust
				settings like background color and icon size, by clicking on the settings icon in
				the top-right corner.
			</p>
			<p>
				When you're ready, click <b>Download All</b> to get all of your thumbnails. Make
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

export const Roadmap = () => (
	<>
		<Heading>Upcoming features</Heading>
		<Body>
			<List>
				<li>Import icons from URL</li>
				<li>Per image settings overrides</li>
				<li>Icon-based color suggestions</li>
				<li>Save your preferences</li>
				<li>
					<b>and more</b>
				</li>
			</List>
		</Body>
	</>
)

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

const Body = styled.div`
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

const List = styled.ul`
	list-style-type: none;
	margin: 0 auto;
	padding: 0;
	li {
		margin-bottom: 8px;
	}
`

// Upload one or more images to represent the site you need a thumbnail for. Use the
// arrows to switch between the different previews. Adjust settings like background
// color and icon size, by clicking on the settings icon in the top-right corner. You
// can see all uploaded icons, and remove ones you don't need in the "Manage Icons"
// menu. When you're ready click the "Download" button to get all of your thumbnails.
// Make sure to allow this site to download multiple files at once, by clicking on
// the 'i' icon in your browser's address bar.
