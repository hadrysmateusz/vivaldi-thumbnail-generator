import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import * as serviceWorker from "./serviceWorker"
import "typeface-saira-semi-condensed"
import "typeface-poppins"

ReactDOM.render(<App />, document.getElementById("root"))

// const rootElement = document.getElementById("root")
// if (rootElement.hasChildNodes()) {
// 	ReactDOM.hydrate(<App />, rootElement)
// } else {
// 	ReactDOM.render(<App />, rootElement)
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
