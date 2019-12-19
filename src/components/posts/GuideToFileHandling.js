import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import Post from "./GuideToFileHandling.md"

const PostPage = () => {
	const [markdown, setMarkdown] = useState("")

	useEffect(() => {
		fetch(Post)
			.then((res) => res.text())
			.then((text) => setMarkdown(text))
	}, [])

	return <ReactMarkdown source={markdown} />
}

export default PostPage
