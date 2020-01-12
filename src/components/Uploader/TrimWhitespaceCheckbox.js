import React from "react"
import styled from "styled-components/macro"
import ReactTooltip from "react-tooltip"

import Checkbox from "../Checkbox"
import { useSettings } from "../Generator"

const TrimWhitespaceCheckbox = () => {
	const settings = useSettings()

	const onTrimWhitespaceCheckboxChange = (e) => {
		settings.set.trimWhitespace(e.target.checked)
	}

	return (
		<CheckboxLabel data-tip data-for="trim-whitespace-tooltip">
			<Checkbox
				value={settings.values.trimWhitespace}
				onChange={onTrimWhitespaceCheckboxChange}
			/>
			<span>Trim Whitespace</span>
			<ReactTooltip
				place="bottom"
				type="dark"
				effect="solid"
				multiline={true}
				id="trim-whitespace-tooltip"
			>
				<TooltipWrapper>
					If checked, any transparency around the icon
					<br />
					will be removed making it easier to scale and
					<br />
					position the icon properly. It takes longer
					<br />
					though, so use it only if you need to.
					<br />
				</TooltipWrapper>
			</ReactTooltip>
		</CheckboxLabel>
	)
}

const TooltipWrapper = styled.div`
	line-height: 20px;
`

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
