import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Problem from "./components/Problem"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import About from "./components/About"
import Create from "./components/Create"
import Lol from "./components/lol"

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
            <Signup type={"signup"} />
          </Route>
          <Route exact path="/login">
            <Signup type={"login"} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/Lol">
            <Lol />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
