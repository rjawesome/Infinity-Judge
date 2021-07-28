import { useEffect, useState } from "react"

interface blogData {
  [id: string]: {
    title: string
    author: number
    body: string
  }
}

const BlogHome = () => {
  const [blogs, setBlogs] = useState<blogData | null>()
  const url: string = process.env.REACT_APP_SERVER_URL!

  useEffect(() => {
    fetch(`${url}getBlogs`)
      .then((res) => res.json())
      .then((data: blogData) => {
        setBlogs(data)
      })
  })

  return (
    <div>
      <h1>blogs yo</h1>
    </div>
  )
}

export default BlogHome
