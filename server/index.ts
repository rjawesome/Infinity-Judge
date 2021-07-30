import express, { RequestHandler } from "express"
import cors from "cors"
import {
  compileCPP,
  runBinary,
  runCPP,
  runJava,
  runPython,
  isolateDebug,
  runPythonIsolate,
} from "./judge"
import { verifyUser, updateScore } from "./firebase"
import { promises as fs } from "fs"
import jsonDataImport from "./metadata.json"

interface metadata {
  [id: string]: {
    difficulty: string
    tc_count: number
  }
}

const jsonData = jsonDataImport as metadata

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }) as RequestHandler)
app.use(cors())

// app.get("/debug", async (req, res) => {
//   const ans = await runPythonIsolate("print(123)", "asdf")
//   console.log("ANSWER", ans)
//   res.send(ans)
// })

app.get("/", async (req, res) => {
  const files = await fs.readdir("problems")
  //console.log(files)
  res.json({
    files,
    metadata: jsonData,
  })
})

app.get("/problems/:id", async (req, res) => {
  const { id } = req.params
  //console.log(id)
  const statement = await (
    await fs.readFile(`problems/${id}/statement.txt`)
  ).toString()
  res.json(statement)
})

app.post("/submit/:id", async (req, res) => {
  let { code, lang, idToken } = req.body as {
    code: string
    lang: string
    idToken: string
  }
  const { id } = req.params as { id: string }

  const user = await verifyUser(idToken)
  let fullResult: string[] = []
  let tc_count = ((await fs.readdir(`problems/${id}/`)).length - 1) / 2
  if (lang === "cpp") {
    code = await compileCPP(code)
    if (code[0] === ".") {
      res.json(["Compilation Error \n" + code])
      return
    }
  }

  let correct = 0

  for (let i = 1; i <= tc_count; i++) {
    let error = false

    const input = (await fs.readFile(`problems/${id}/t${i}.in`)).toString()
    const output = (await fs.readFile(`problems/${id}/t${i}.out`)).toString()

    const result = await getResult(code, lang, input).catch((e) => {
      console.log("THE THING IS", e.substring(0, 4), fullResult)
      error = true
      if (e.substring(0, 4) === "Time") {
        //console.log("time case")
        fullResult.push("TLE")
      } else if (e.substring(0, 4) === "/bin") {
        fullResult.push("MEM")
        //console.log("after", fullResult)
      } else {
        fullResult.push("RTE")
      }
    })
    if (!error) fullResult.push(result == output ? "AC" : "WA")
    console.log("RESULT AND OUTPUT", result, output)
    if (result === output) correct++
  }

  await updateScore(user.uid, id, correct)
  res.json(fullResult)
})

async function getResult(code: string, lang: string, input: string) {
  try {
    switch (lang) {
      case "cpp":
        return runBinary(code, input)
      case "py":
        return runPython(code, input)
    }
  } catch (e) {
    console.log("error caught lets go bois")
    console.log(e)
    return ""
  }
}

app.listen(10000, () => console.log("server runing on 10000"))
