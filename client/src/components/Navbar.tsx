import { AppBar, Toolbar, Typography, Button, Link } from "@material-ui/core"
import useStyles from "../styles"
import { useAuthState, signOut } from "../firebase"
import React from "react"

const Navbar = () => {
  const classes = useStyles()
  const [user, loading] = useAuthState()

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography color="primary" variant="h6" style={{ flex: 1 }}>
          OJ
        </Typography>
        <Button color="primary">
          <Link href="/">Home</Link>
        </Button>
        {!user && (
          <React.Fragment>
            <Button color="primary">
              <Link href="/signup">Sign up</Link>
            </Button>
            <Button color="primary">
              <Link href="/login">Login</Link>
            </Button>
          </React.Fragment>
        )}
        {user && (
          <Button color="primary" onClick={signOut}>
            Logout
          </Button>
        )}
        <Button color="primary">
          <Link href="/about">About</Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
