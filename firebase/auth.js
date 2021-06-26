db.collection("problems")
  .get()
  .then((snapshot) => {
    db.collection("profiles")
      .get()
      .then((snapshot2) => {
        setupProblems(snapshot.docs, snapshot2.docs)
      })
  })

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user logged in:", user.email)
  } else {
    console.log("user logged out")
  }
})

const signupForm = document.querySelector("#signup-form")
signupForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = signupForm["signup-email"].value
  const password = signupForm["signup-password"].value

  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred)
    signupForm.reset()
  })
})

const logout = document.querySelector("#logout")
logout.addEventListener("click", (e) => {
  e.preventDefault()
  auth.signOut()
})

const loginForm = document.querySelector("#login-form")
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = loginForm["login-email"].value
  const password = loginForm["login-password"].value

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    loginForm.reset()
  })
})
