import { createGlobalStyle } from "styled-components"
import { normalize } from "polished"

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --accent-color: #e71313; /* #ef3938 is vivaldi's brand color,  #e71313 is used for accessibility */
    --accent-color-darker: #be1f1f;
    --light-gray: #757575
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
