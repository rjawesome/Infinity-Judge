import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    background: {
      default: "#000000",
    },
  },
  overrides: {
    MuiTouchRipple: {
      child: {
        //button ripple color
        backgroundColor: "#3500D3",
      },
    },
  },
})

export default theme
