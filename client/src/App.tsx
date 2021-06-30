import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Problem from "./components/Problem"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/problems/:id">
            <Problem />
          </Route>
          <Route exact path="/signup">
            <Signup type={"login"} />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App