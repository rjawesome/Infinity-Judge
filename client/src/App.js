import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Problem from "./components/Problem"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/:id">
          <Problem />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
