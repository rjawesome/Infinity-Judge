import { useParams } from "react-router"
import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Grid,
  Container,
  TextField,
  Typography,
  Paper,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core"
import Result from "./Result"
import useStyles from "../styles"
import { useIdToken } from "../firebase/index"

interface ParamType {
  id: string
}

const Problem = () => {
  const [statement, setStatement] = useState("")
  const [code, setCode] = useState("")
  const [lang, setLang] = useState<string | null>("cpp")
  const [submission, setSubmission] = useState(false)
  const [result, setResult] = useState<string[] | null>()
  const [idToken, idLoading] = useIdToken()
  const { id } = useParams<ParamType>()

  const classes = useStyles()
  const url: string = process.env.REACT_APP_SERVER_URL!

  useEffect(() => {
    axios.get(`${url}problems/${id}`).then(({ data }) => setStatement(data))
  }, [])

  const problemSubmit = async (e: any) => {
    if (lang === "java") window.location.href = "/Lol"
    e.preventDefault()
    if (code === "") return
    if (idLoading) return
    setSubmission(true)
    console.log(code, lang)
    setResult(
      (
        await axios.post(`${url}submit/${id}`, {
          code,
          lang,
          idToken,
        })
      ).data
    )
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
          <Typography
            color="primary"
            variant="h5"
            className={classes.problemStatement}
            dangerouslySetInnerHTML={{ __html: statement }}
          ></Typography>
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
