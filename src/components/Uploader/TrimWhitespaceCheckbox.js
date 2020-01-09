import React from "react"
import styled from "styled-components/macro"

import Checkbox from "../Checkbox"
import { useSettings } from "../Generator"

const TrimWhitespaceCheckbox = () => {
	const settings = useSettings()

	const onTrimWhitespaceCheckboxChange = (e) => {
		settings.set.trimWhitespace(e.target.checked)
	}

	return (
		<CheckboxLabel>
			<Checkbox
				value={settings.values.trimWhitespace}
				onChange={onTrimWhitespaceCheckboxChange}
			/>
			<span>Trim Whitespace</span>
		</CheckboxLabel>
	)
}

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
	span {
		user-select: none;
		margin-left: 8px;
		font-size: 12px;
		line-height: 16px;
		color: #777;
	}
`

export default TrimWhitespaceCheckbox
