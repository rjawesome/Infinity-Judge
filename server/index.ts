import express, { RequestHandler } from "express"
import cors from "cors"
import { compileCPP, runBinary, runCPP, runJava, runPython } from "./judge"
import { promises as fs } from "fs"

const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)
app.use(cors())

app.get("/", async (req, res) => {
  const files = await fs.readdir("problems")
  //console.log(files)
  res.json(files)
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  const statement = await (
    await fs.readFile(`problems/${id}/statement.txt`)
  ).toString()
  res.json(statement)
})

app.post("/submit/:id", async (req, res) => {
  let { code, lang } = req.body as { code: string; lang: string }
  const { id } = req.params as { id: string }

  let fullResult = ""
  let tc_count = ((await fs.readdir(`problems/${id}/`)).length - 1) / 2
  if (lang === "cpp") {
    code = await compileCPP(code)
    if (code[0] === ".") fullResult = "Compilation Error ------- " + code
  }

  for (let i = 1; i <= tc_count; i++) {
    if (fullResult[0] === "C") break
    const input = (await fs.readFile(`problems/${id}/t${i}.in`)).toString()
    const output = (await fs.readFile(`problems/${id}/t${i}.out`)).toString()
    const result = await getResult(code, lang, input).catch((e) => {
      fullResult = "Compilation Error ------ " + e
    })
    if (fullResult[0] === "C") break
    fullResult += result == output ? "AC " : "WA "
  }

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
