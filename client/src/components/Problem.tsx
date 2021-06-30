import { useParams } from "react-router"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Grid, Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import Result from "./Result"
import useStyles from "../styles"

interface ParamType {
  id: string
}

const Problem = () => {
  const [statement, setStatement] = useState("")
  const [code, setCode] = useState("")
  const [lang, setLang] = useState("cpp")
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
    setSubmission(true)
    console.log(code, lang)
    axios
      .post(`http://localhost:10000/submit/${id}`, { code, lang })
      .then(({ data }) => {
        setResult(data)
      })
  }

  return (
    <div className="content">
      {!submission && (
        <React.Fragment>
          <h1>{id}</h1>
          <div className="submit">
            <p className="statement">{statement}</p>
            <form className="submit-form blue" onSubmit={problemSubmit}>
              <textarea
                required
                placeholder="your code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></textarea>

              <select
                required
                name="lang"
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="py">Python</option>
              </select>
              <input type="submit" value="submit!" />
            </form>
          </div>
        </React.Fragment>
      )}
      {submission && <Result result={result} />}
    </div>
  )
}
export default Problem
