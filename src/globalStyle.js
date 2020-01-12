import { createGlobalStyle } from "styled-components/macro"
import { normalize } from "polished"

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --accent-color: #e71313; /* #ef3938 is vivaldi's brand color, #e71313 is used for accessibility */
    --accent-color-darker: #be1f1f;
    --light-gray: #757575;
    --body-font-stack: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    --header-font-stack: 'Saira Semi Condensed', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    --button-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    font-family: var(--body-font-stack);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: var(--header-font-stack);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyle
