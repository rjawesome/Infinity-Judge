import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#0C0032",
  },
  problemsContainer: {
    paddingTop: theme.spacing(3),
  },
  problemList: {
    alignItems: "center",
  },
  problemTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    background: "#282828",
    padding: 10,
    display: "flex",
    margin: 10,
  },
  media: {},
  problemTitle2: {
    alignItems: "center",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  author: {
    backgroundColor: "#5ce805",
    borderRadius: 10,
    display: "flex",
    padding: 10,
  },
}))

export default useStyles
