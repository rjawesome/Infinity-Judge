const problemList = document.querySelector("#probs")

const setupProblems = async (problemData, userData) => {
  var curUser = "",
    userProbList = ""
  await auth.onAuthStateChanged((user) => (curUser = user))

  if (!curUser) {
    const html = `<p>Please signup or login to view problems</p>`
    problemList.innerHTML = html
    return
  }

  let html = ""
  userData.forEach((user) => {
    if (user.id === curUser.email) userProbList = user
  })

  console.log(userProbList.data())
  userProbList = userProbList.data()

  problemData.forEach((doc) => {
    const color = userProbList[doc.id] === "solved" ? "bg-green" : ""
    console.log("color for ", doc.id, "is ", color)
    const a = `
    <a href="/${doc.id}"><div class="problem-card ${color}">${doc.id}</div></a>
    `
    html += a
  })

  problemList.innerHTML = html
}
