import React, { useState } from "react"
import styled from "styled-components/macro"
import { ReactComponent as SearchIcon } from "../assets/search.svg"
import { resetButtonStyles } from "../styleUtils"

const Searchbox = () => {
	const [value, setValue] = useState("")

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (!value) return
		const url = "http://instantlogosearch.com/?q=" + value
		const a = document.createElement("a")
		a.href = url
		a.target = "_blank"
		a.rel = "noopener noreferrer"
		a.click()
	}

	const iconSize = 24

	return (
		<form onSubmit={onSubmit}>
			<Container>
				<InputContainer>
					<SearchIcon
						width={iconSize}
						height={iconSize}
						title="Get Image From Bookmark URL"
					/>
					<Input
						type="text"
						value={value}
						onChange={onChange}
						placeholder="Name of website or brand"
					/>
				</InputContainer>
				<SubmitButton type="submit">Search</SubmitButton>
			</Container>
		</form>
	)
}

const Container = styled.div`
	overflow: hidden;
	height: 40px;
	background: #f5f5f5;
	box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.03);
	border-radius: 6px;

	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;
`

const InputContainer = styled.label`
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	cursor: text;
	padding: 0 10px;
`

const Input = styled.input`
	background: 0;
	border-radius: 0;
	border: none;
	margin-left: 10px;
	font-size: 14px;
`

const SubmitButton = styled.button`
	${resetButtonStyles};
	padding: 0 16px;
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 14px;
	line-height: 14px;
	color: white;
	background: var(--accent-color);
	transition: background 200ms ease;
	cursor: pointer;
	height: 100%;
	:hover,
	:active {
		color: white;
		background: var(--accent-color-darker);
	}
`

export default Searchbox
