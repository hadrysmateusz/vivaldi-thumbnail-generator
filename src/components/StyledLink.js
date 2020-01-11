import styled from "styled-components/macro"

const StyledLink = styled.a`
	&,
	&:visited {
		color: inherit;
		text-decoration: underline;
	}

	&:hover {
		color: var(--accent-color);
	}
`

export default StyledLink
