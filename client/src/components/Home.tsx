import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Box,
  Avatar,
} from "@material-ui/core"
import useStyles from "../styles"

const Home = () => {
  const [files, setFiles] = useState([])

  const classes = useStyles()

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
                <Box className={classes.author}>10/10</Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
export default Home
