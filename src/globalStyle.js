import { createGlobalStyle } from "styled-components/macro"
import { normalize } from "polished"

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --accent-color: #ef3938;
    --accent-color-darker: #be1f1f;
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
