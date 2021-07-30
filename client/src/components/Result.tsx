import { Typography, Box, CardActions } from "@material-ui/core"
import useStyles from "../styles"

interface ResProps {
  result: string[] | null | undefined
}

const Result = ({ result }: ResProps) => {
  const classes = useStyles()

  return (
    <div>
      <Typography
        color="primary"
        variant="h4"
        className={`${classes.problemTitle2} ${classes.problemTitle}`}
      >
        Your Result
      </Typography>
      {!result && (
        <Typography color="primary" variant="h6">
          Loading ...
        </Typography>
      )}

      {result && (
        <CardActions className={classes.cardActions}>
          {result.map((res) => (
            <Box
              bgcolor={res === "AC" ? "#5ce805" : "#FD4B25"}
              className={`${classes.result}`}
            >
              {res}
            </Box>
          ))}
        </CardActions>
      )}
    </div>
  )
}
export default Result
