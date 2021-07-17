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

const Home = () => {
  const [files, setFiles] = useState([])
  const [userData, loading] = useUserData()
  const [user, loading2] = useAuthState()
  const classes = useStyles()

  // if (!loading) console.log((userData as any).problems["problem1"])

  useEffect(() => {
    fetch("http://localhost:10000/")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data)
      })
    console.log(loading)
    console.log(userData)
  })

  const getColor = (x: number | undefined) => {
    if (x === undefined) return "#fff"
    if (x === 10) return "#5ce805"
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
                        some tags
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions className={classes.cardActions}>
                  {!loading && (
                    <Box
                      bgcolor={getColor((userData as any).problems[file])}
                      className={classes.author}
                    >
                      {(userData as any).problems[file] === undefined
                        ? "N/A"
                        : `${(userData as any).problems[file]}/10`}
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
