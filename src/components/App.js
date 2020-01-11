import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Generator from "./Generator"
import GlobalStyle from "../globalStyle"

import Exporter from "./pages/Exporter"
import Editor from "./pages/Editor"
import Blog from "./pages/BlogHome"
import PostPage from "./pages/BlogPost"
import NotFoundPage from "./pages/NotFound"

const App = () => (
	<Router>
		<GlobalStyle />
		<Generator>
			<Switch>
				<Route path="/" exact component={Editor} />
				<Route path="/downloads" exact component={Exporter} />
				<Route path="/blog" exact component={Blog} />
				<Route path="/blog/:slug" component={PostPage} />
				<Route path="*" component={NotFoundPage} />
			</Switch>
		</Generator>
	</Router>
)

export default App
