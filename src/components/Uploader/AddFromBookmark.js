import React, { useState } from "react"
import styled from "styled-components/macro"

import TrimWhitespaceCheckbox from "./TrimWhitespaceCheckbox"
import Searchbox from "../Searchbox"
import Button from "../Button"
import FileItem from "../FileItem"
import { getHostname } from "../../utils"
import {
	EmptyStateBody,
	EmptyStateContainer,
	EmptyStateIconContainer,
	EmptyStateHeading,
	Footer,
	SearchContainer,
	ContentContainer
} from "./common"
import { ReactComponent as LinkIcon } from "../../assets/link.svg"

const AddFromBookmark = ({ onRequestClose, add, isLoading }) => {
	const [icons, setIcons] = useState([])

	const removeIcon = (id) => {
		setIcons((icons) => icons.filter((icon) => icon.id !== id))
	}

	const onAdd = async () => {
		await add(icons)
		onRequestClose()
	}

	const onSearch = async (url) => {
		if (url) {
			const hostname = getHostname(url)

			const createClearbitApiUrl = () => {
				/* from my trial-and-error testing it seems that 800 is the max size for the clearbit api,
			  it returns an image with the size closest to the one requested */
				const size = 800
				// clearbit api expects the domain name so we use hostname
				// TODO: using clearbit api requires ATTRIBUTION!!!
				// construct a clearbit api url
				// TODO: if hostname uses the "www" subdomain, remove it as it causes problems with uplead
				return `https://logo.clearbit.com/${hostname}?size=${size}`
			}

			// const uploadApiUrl = `https://logo.uplead.com/${hostname}`
			// TODO: add more fallbacks and better error handling

			const urls = [createClearbitApiUrl()]

			const newIcons = await Promise.all(
				urls.map(async (url) => {
					try {
						// TODO: consider actually fetching the image and getting its dimensions to show on the preview
						const name = getHostname(url)
						const id = name + Date.now()
						return { name, url, id }
					} catch (error) {
						// TODO: custom handling for an error on a single file
						throw error // before the custom handling is done, rethrow the error
					}
				})
			)

			setIcons((oldIcons) => [...oldIcons, ...newIcons])
		}
	}

	const isEmpty = !icons || icons.length === 0

	return (
		<>
			<SearchContainer>
				<Searchbox
					placeholder="URL address of the bookmark"
					submitText="Search"
					onSubmit={onSearch}
				/>
			</SearchContainer>

			<ContentContainer isEmpty={isEmpty}>
				{isEmpty ? (
					<EmptyStateContainer>
						<EmptyStateIconContainer>
							<LinkIcon width={31} height={31} />
						</EmptyStateIconContainer>
						<EmptyStateHeading>Enter the bookmark url above</EmptyStateHeading>
						<EmptyStateBody>All icons we can find will show up here</EmptyStateBody>
					</EmptyStateContainer>
				) : (
					<FileItemsContainer>
						{icons.map((icon) => (
							<FileItem
								key={icon.id}
								previewSrc={icon.url}
								onRemove={() => removeIcon(icon.id)}
							/>
						))}
					</FileItemsContainer>
				)}
			</ContentContainer>

			<Footer>
				<TrimWhitespaceCheckbox />
				<Button
					variant="primary"
					onClick={onAdd}
					style={{ marginLeft: "auto" }}
					disabled={isEmpty || isLoading}
				>
					Add
				</Button>
			</Footer>
		</>
	)
}

const FileItemsContainer = styled.div`
	height: 100%;
	padding: 10px;
	display: flex;
	justify-content: flex-start;
	overflow-x: scroll;
	> * {
		flex: 0 0 100px;
		&:not(:last-child) {
			margin-right: 10px;
		}
	}
`

export default AddFromBookmark
