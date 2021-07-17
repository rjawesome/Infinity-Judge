import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
} from "@material-ui/core"
import useStyles from "../styles"
import { useUserData, useAuthState } from "../firebase"
import jsonDataImport from "../metadata.json"

interface metadata {
  [id: string]: {
    difficulty: string
    tc_count: number
  }
}
const jsonData = jsonDataImport as metadata

const Home = () => {
  const [files, setFiles] = useState([])
  const [userData, loading] = useUserData()
  const [user, loading2] = useAuthState()
  const classes = useStyles()

  // if (!loading) console.log((userData as any).problems["problem1"])

  useEffect(() => {
    //console.log(jsonData["problem1"].tc_count)
    fetch("http://localhost:10000/")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data)
      })
    //console.log(loading)
    //console.log(userData)
  })

  const getDifficulty = (problem: string) => jsonData[problem].difficulty
  const getTcCount = (problem: string) => jsonData[problem].tc_count

  const getColor = (x: number | undefined, problem: string) => {
    if (x === undefined) return "#fff"
    //console.log(x, getjson(problem))
    if (x === getTcCount(problem)) return "#5ce805"
    if (x > 0) return "#ffdd00"
    return "#f02416"
  }

  return (
    <Container maxWidth="lg" className={classes.problemsContainer}>
      <Typography color="primary" variant="h4" className={classes.problemTitle}>
        Problem List
      </Typography>
      {!loading2 && user && (
        <Grid className={classes.problemList} container spacing={3}>
          {files.map((file) => (
            <Grid>
              <Card className={classes.card}>
                <Link to={`/problems/${file}`}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        color="primary"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {file}
                      </Typography>
                      <Typography variant="body1" color="primary" component="p">
                        {/* <Box bgcolor="#000" className={classes.difficulty}> */}
                        {getDifficulty(file)}
                        {/* </Box> */}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions className={classes.cardActions}>
                  {!loading && (
                    <Box
                      bgcolor={getColor(userData!.problems[file], file)}
                      className={classes.author}
                    >
                      {userData!.problems[file] === undefined
                        ? "N/A"
                        : `${userData!.problems[file]}/${getTcCount(file)}`}
                    </Box>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!loading2 && !user && (
        <Typography color="primary" gutterBottom variant="h6" component="h2">
          Sign up or login to view and submit problems
        </Typography>
      )}
    </Container>
  )
}
export default Home
