import React from "react"
import styled from "styled-components/macro"
import { ellipsis } from "polished"

import { CURRENT_NEWS_ITEM } from "../copywriting"

import FluidContainer from "./FluidContainer"
import { SettingsButton } from "./ImageProcessor"
import Button from "./Button"

const EditorTopbar = ({ toggleHelpModal }) => (
	<FluidContainer>
		<Container>
			<NewsContainer>
				<NewsBadge>NEW</NewsBadge>
				<NewsText>{CURRENT_NEWS_ITEM}</NewsText>
			</NewsContainer>
			<Button onClick={toggleHelpModal}>Help</Button>
			<SettingsButton />
		</Container>
	</FluidContainer>
)

const Container = styled.div`
	display: grid;
	gap: 16px;
	grid-template-columns: 1fr;
	grid-auto-columns: auto;
	grid-auto-flow: column;
	margin-bottom: 16px;
	max-width: 732px;
	> * {
		min-width: 0;
		height: 40px;
	}
`
const NewsContainer = styled.div`
	${ellipsis()}
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 6px;
	background: white;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	font-size: 14px;
	border-radius: 6px;
`
const NewsBadge = styled.div`
	height: 100%;
	/* because this badge only contains 'NEW' it needs uneven side padding to make it look visually centered */
	padding-left: 8px;
	padding-right: 7px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	font-family: var(--header-font-stack);
	color: white;
	background: var(--accent-color);
	border-radius: 4px;
`
const NewsText = styled.div`
	margin-left: 8px;
	font-weight: 600;
	font-family: var();
`

export default EditorTopbar
