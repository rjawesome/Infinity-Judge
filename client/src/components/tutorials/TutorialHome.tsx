import { useState, useEffect } from "react"

interface tutorialData {
  [id: string]: {
    title: string
    author: number
    //idk how this is gonna work if the body has images and stuff
    body: string
  }
}

const TutorialHome = () => {
  const [tutorials, setTutorials] = useState<tutorialData | null>()
  const url: string = process.env.REACT_APP_SERVER_URL!

  useEffect(() => {
    fetch(`${url}getTutorials`)
      .then((res) => res.json())
      .then((data: tutorialData) => {
        setTutorials(data)
      })
  })

  return (
    <div>
      <h1>tutorials yo</h1>
    </div>
  )
}

export default TutorialHome
