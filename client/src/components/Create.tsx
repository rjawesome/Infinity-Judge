import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
} from "@material-ui/core"
import useStyles from "../styles"
import { useState } from "react"

interface TestCase {
  tc: string | null | undefined
  answer: string | null | undefined
}

const Create = () => {
  const classes = useStyles()
  const password = process.env.REACT_APP_CREATE_PASSWORD

  const [valid, setValid] = useState(true)
  const [inp, setInp] = useState("")
  const [name, setName] = useState("")
  const [statement, setStatement] = useState("")
  const [tc, setTc] = useState("")
  const [answer, setAnswer] = useState("")
  const [testcases, setTestcases] = useState<TestCase[]>()

  const validate = () => {
    if (inp === password) setValid(true)
    else setInp("")
  }

  const createTestcase = () => {
    setTestcases([...testcases, { tc: tc, answer: answer }])
    setTc("")
    setAnswer("")
  }

  const handleSubmit = () => {
    // create problem in firebase or folder
    console.log("submit")
  }

  return (
    <Container maxWidth="lg" className={classes.problemsContainer}>
      <Typography color="primary" variant="h4" className={classes.problemTitle}>
        Create Problem
      </Typography>
      {valid && (
        <Grid>
          <Paper elevation={10} className={classes.signupForm}>
            <Grid></Grid>
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="Problem name"
              placeholder="Enter name"
              fullWidth
              required
            />
            <TextField
              onChange={(e) => setStatement(e.target.value)}
              label="Problem statement"
              placeholder="Enter statement"
              fullWidth
              required
            />
            <TextField
              onChange={(e) => setTc(e.target.value)}
              label="Testcase"
              value={tc}
              placeholder="Testcase"
              required
            />
            <TextField
              onChange={(e) => setAnswer(e.target.value)}
              label="Answer"
              value={answer}
              placeholder="Answer"
              required
            />
            <Button
              onClick={createTestcase}
              className={classes.signupButton}
              color="primary"
              variant="contained"
            >
              Add testcase
            </Button>
            {testcases?.map((t) => (
              <div>
                <p>tc: {t?.tc}</p>
                <p>answer: {t?.answer}</p>
                <br />
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              className={classes.signupButton}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              create
            </Button>
          </Paper>
        </Grid>
      )}
      {!valid && (
        <Grid>
          <Paper elevation={10} className={classes.signupForm}>
            <TextField
              onChange={(e) => setInp(e.target.value)}
              value={inp}
              label="Admin Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
            />
            <Button
              onClick={validate}
              className={classes.signupButton}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
          </Paper>
        </Grid>
      )}
    </Container>
  )
}

export default Create
