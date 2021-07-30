import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(
  (theme) => ({
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
    problemStatement: {
      fontSize: 15,
      whiteSpace: "pre-wrap"
    },
    problemTitle2: {
      alignItems: "center",
    },
    cardActions: {
      display: "flex",
    },
    author: {
      borderRadius: 10,
      display: "flex",
      padding: 10,
    },
    difficulty: {
      borderRadius: 2,
      display: "flex",
      padding: 2,
    },
    result: {
      borderRadius: 10,
      display: "flex",
      padding: 20,
      whiteSpace: "pre-wrap",
    },
    signupForm: {
      padding: 20,
      width: 400,
      margin: "20px auto",
    },
    signupButton: {
      margin: "8px 0",
    },
  }),
  { index: 1 }
)

export default useStyles
