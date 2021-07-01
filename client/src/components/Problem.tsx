import { useParams } from "react-router"
import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Grid,
  Container,
  TextField,
  Typography,
  Dialog,
  Paper,
  FormControlLabel,
  Avatar,
  Checkbox,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core"
import Result from "./Result"
import useStyles from "../styles"
import { AirlineSeatFlatAngled } from "@material-ui/icons"

interface ParamType {
  id: string
}

const Problem = () => {
  const [statement, setStatement] = useState("")
  const [code, setCode] = useState("")
  const [lang, setLang] = useState<string | null>("cpp")
  const [submission, setSubmission] = useState(false)
  const [result, setResult] = useState("")
  const { id } = useParams<ParamType>()

  const classes = useStyles()

  useEffect(() => {
    axios
      .get(`http://localhost:10000/${id}`)
      .then(({ data }) => setStatement(data))
  })

  const problemSubmit = (e: any) => {
    e.preventDefault()
    if (code === "") return
    setSubmission(true)
    console.log(code, lang)
    axios
      .post(`http://localhost:10000/submit/${id}`, { code, lang })
      .then(({ data }) => {
        setResult(data)
      })
  }

  const paperStyle = {
    padding: 20,
    margin: "20px auto",
  }
  const avatarStyle = { backgroundColor: "#1bbd7e" }
  const btnstyle = { margin: "8px 0" }

  return (
    <Container maxWidth="lg" className={classes.problemsContainer}>
      {!submission && (
        <React.Fragment>
          <Typography
            color="primary"
            variant="h4"
            className={`${classes.problemTitle2} ${classes.problemTitle}`}
          >
            {id}
          </Typography>
          <Grid alignContent="center">
            <Paper elevation={0} style={paperStyle}>
              <TextField
                label="code"
                multiline
                fullWidth
                rows={10}
                required={true}
                onChange={(e) => setCode(e.target.value)}
              />
              <InputLabel>Language</InputLabel>
              <Select
                required={true}
                onChange={(e) => setLang(e.target.value as string)}
              >
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="py">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
                onClick={problemSubmit}
              >
                Submit
              </Button>
            </Paper>
          </Grid>
        </React.Fragment>
      )}
      {submission && <Result result={result} />}
    </Container>
  )
}
export default Problem
