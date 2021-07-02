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
import { useUserData } from "../firebase"

const Home = () => {
  const [files, setFiles] = useState([])
  const [userData, loading] = useUserData()
  const classes = useStyles()

  // if (!loading) console.log((userData as any).problems["problem1"])

  useEffect(() => {
    fetch("http://localhost:10000/")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data)
      })
  })

  return (
    <Container maxWidth="lg" className={classes.problemsContainer}>
      <Typography color="primary" variant="h4" className={classes.problemTitle}>
        Problem List
      </Typography>
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
                      some tags and prob status
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions className={classes.cardActions}>
                {!loading && (
                  <Box
                    bgcolor={
                      (userData as any).problems[file] === undefined
                        ? "#fff"
                        : (userData as any).problems[file] === 10
                        ? "#5ce805"
                        : (userData as any).problems[file] > 0
                        ? "#ffdd00 "
                        : "#f02416"
                    }
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
    </Container>
  )
}
export default Home
