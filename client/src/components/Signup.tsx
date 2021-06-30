import { useEffect, useState } from "react"
import { useAuthState } from "../firebase"
import Loading from "./Loading"

interface LoginFormProps {
  type: "login" | "signup"
}

const Signup = ({ type }: LoginFormProps) => {
  const [user, loading] = useAuthState()

  const [handle, setHandle] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (user) {
    }
  }, [user])

  return (
    <div>
      <div>
        <h1>Create Account</h1>
        {loading && <Loading />}
        {!loading && (
          <form id="signup-form">
            <label>Handle </label>
            <input
              type="text"
              id="handle"
              required
              onChange={(e) => setHandle(e.target.value)}
            />

            <label>Email </label>
            <input
              type="text"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password </label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Login" />
            <input type="submit" value="Signup" />
          </form>
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
