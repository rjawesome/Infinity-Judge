import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core"
import useStyles from "../styles"
import { Link } from "@material-ui/core"

const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography color="primary" variant="h6">
          OJ
        </Typography>
        <Button color="primary">
          <Link href="/">Home</Link>
        </Button>
        <Button color="primary">
          <Link href="/signup">Login</Link>
        </Button>
        <Button color="primary">
          <Link href="/">About</Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
