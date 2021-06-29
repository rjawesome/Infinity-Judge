import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [files, setFiles] = useState([])
  useEffect(() => {
    fetch("http://localhost:10000/")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data)
      })
  })
  return (
    <div className="content">
      <h1>Problem List</h1>
      {files.map((file) => (
        <a>
          <Link to={`/${file}`}>
            <div class="problem-card">{file}</div>
          </Link>
        </a>
      ))}
    </div>
  )
}
export default Home
