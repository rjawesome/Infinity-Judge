import { useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import Result from "./Result"

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
  //console.log("this the id", id)

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
        <div>
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
        </div>
      )}
      {submission && <Result result={result} />}
    </div>
  )
}
export default Problem
