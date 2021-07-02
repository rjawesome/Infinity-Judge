import { Typography } from "@material-ui/core"
import useStyles from "../styles"

interface ResProps {
  result: string
}

const Result = ({ result }: ResProps) => {
  const classes = useStyles()
  console.log(result)

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
        <Typography color="primary" variant="h6">
          {result}
        </Typography>
      )}
    </div>
  )
}
export default Result
