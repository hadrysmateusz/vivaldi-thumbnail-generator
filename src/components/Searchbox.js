import React, { useState } from "react"
import styled from "styled-components/macro"
import { ReactComponent as SearchIcon } from "../assets/search.svg"
import { resetButtonStyles } from "../styleUtils"

const Searchbox = ({ placeholder, submitText, onSubmit }) => {
	const [value, setValue] = useState("")

	const onChange = (e) => {
		setValue(e.target.value)
	}

	const submit = (e) => {
		e.preventDefault()
		if (!value) return
		onSubmit(value)
		setValue("")
	}

	const iconSize = 24

	return (
		<form onSubmit={submit}>
			<Container>
				<InputContainer>
					<SearchIcon width={iconSize} height={iconSize} />
					<Input
						type="text"
						value={value}
						onChange={onChange}
						placeholder={placeholder}
						autoFocus
					/>
				</InputContainer>
				<SubmitButton type="submit">{submitText}</SubmitButton>
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
	outline: none; /* because the cursor appears in the input when focused it's not necessary to show an outline */
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
	font-weight: 600;
	letter-spacing: 0.018em;
	font-size: 14px;
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
