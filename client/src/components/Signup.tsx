import { useEffect, useState } from "react"
import { useAuthState, signUp, signIn } from "../firebase"
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
  const [signupLoading, setSignupLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (user) {
      window.location.href = "/"
    }
  }, [user])

  const handleSubmit = async () => {
    setSignupLoading(true)
    if (type === "signup") {
      await signUp(email, password, handle)
    } else {
      await signIn(email, password)
    }
    setSignupLoading(false)
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
                {...(signupLoading ? { disabled: true } : { disabled: false })}
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
    </div>
  )
}
export default Signup
