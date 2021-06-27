const problemList = document.querySelector("#probs")

const setupProblems = async (problemData, userData) => {
  var curUser = "",
    userProbList = ""
  await auth.onAuthStateChanged((user) => (curUser = user))

  if (!curUser) {
    problemList.innerHTML = `<p>Please signup or login to view problems</p>`
    return
  }

  let html = ""
  userData.forEach((user) => {
    if (user.data().email === curUser.email) userProbList = user
  })

  console.log(userProbList.data())
  userProbList = userProbList.data()

  problemData.forEach((doc) => {
    doc = doc.data()
    const color = userProbList[doc.name] === "solved" ? "bg-green" : ""
    console.log("color for ", doc.name, "is ", color)
    const a = `
    <a href="/${doc.name}"><div class="problem-card ${color}">${doc.name}</div></a>
    `
    html += a
  })

  problemList.innerHTML = html
}
