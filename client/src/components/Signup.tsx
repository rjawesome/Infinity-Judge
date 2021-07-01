import { useEffect, useState } from "react"
import { useAuthState } from "../firebase"
import Loading from "./Loading"
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core"
import useStyles from "../styles"

interface LoginFormProps {
  type: "login" | "signup"
}
const Signup = ({ type }: LoginFormProps) => {
  const [user, loading] = useAuthState()

  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const classes = useStyles()

  useEffect(() => {
    if (user) {
    }
  }, [user])

  const handleSubmit = () => {
    console.log("submitted")
  }

  return (
    <div>
      <div>
        <h1>Create Account</h1>
        {loading && <Loading />}
        {!loading && (
          <Grid>
            <Paper elevation={10} className={classes.signupForm}>
              <Grid>
                <h2>{type === "login" ? "Login" : "Sign-up"}</h2>
              </Grid>
              {type === "signup" && (
                <TextField
                  onChange={(e) => setHandle(e.target.value)}
                  label="Handle"
                  placeholder="Enter handle"
                  fullWidth
                  required
                />
              )}
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                placeholder="Enter email"
                fullWidth
                required
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
              />
              <Button
                onClick={handleSubmit}
                className={classes.signupButton}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                {type === "login" ? "Login" : "Sign-up"}
              </Button>
            </Paper>
          </Grid>
        )}
      </div>

      {/* <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script>

      <script src="../firebase/config.js"></script>
      <script src="../firebase/index.js"></script>
      <script src="../firebase/auth.js"></script> */}
    </div>
  )
}
export default Signup
