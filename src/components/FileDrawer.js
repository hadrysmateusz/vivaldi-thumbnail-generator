import React from "react"
import styled from "styled-components/macro"
import { cover } from "polished"
import Button from "./Button"
import FileItem from "./FileItem"
import { useFileContext } from "./FilesProvider"
import { useSettingsContext } from "./SettingsProvider"

const FileDrawer = () => {
	const { closeFileDrawer, icons, removeIcon, hasIcons, clear } = useFileContext()
	const { closeSettings } = useSettingsContext()

	const closeOnEsc = (e) => {
		if (e.key === "Escape") {
			closeSettings()
			closeFileDrawer()
		}
	}

	return (
		<Container onKeyDown={closeOnEsc}>
			<InnerContainer>
				<GridContainer>
					{icons.map((icon) => (
						<FileItem
							key={icon.name}
							icon={icon}
							removeItem={removeIcon}
							/* autoFocus={i === 0 ? true : undefined} */
						/>
					))}
				</GridContainer>
			</InnerContainer>

			<ButtonsContainer>
				{hasIcons && (
					<Button onClick={clear} variant="danger">
						Remove All
					</Button>
				)}
				<Button onClick={closeFileDrawer} autoFocus={!hasIcons ? true : undefined}>
					Close
				</Button>
			</ButtonsContainer>
		</Container>
	)
}

const GridContainer = styled.div`
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(120px, auto));
	grid-auto-rows: 120px;
	@media (min-width: 732px) {
		grid-template-columns: repeat(auto-fill, minmax(140px, auto));
		grid-auto-rows: 140px;
	}
	gap: 20px;
`

const InnerContainer = styled.div`
	overflow: auto;
	background: #fbfbfb;
`

const Container = styled.div`
	${cover()}
	z-index: 700;
	background: white;
	height: 100%;
	position: relative;
	display: grid;
	grid-template-rows: 1fr 80px;
`

const ButtonsContainer = styled.div`
	background: white;
	box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.06);
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 20px;
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	> * + * {
		margin-left: 20px;
	}
`

export default FileDrawer
