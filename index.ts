import express, { RequestHandler } from "express"
import cors from "cors"
import "ejs"
import { compileCPP, runBinary, runCPP, runJava, runPython } from "./judge"
import { promises as fs } from "fs"

const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)
app.use(cors())
app.set("view engine", "ejs")
app.use(express.static(__dirname + "public"))

app.get("/", async (req, res) => {
  let files = await fs.readdir("./problems")
  res.render("index", { probs: files })
})

app.get("/:id", async (req, res) => {
  const { id } = req.params
  res.render("problem", {
    statement: (await fs.readFile(`problems/${id}/statement.txt`)).toString(),
  })
})

app.post("/:id", async (req, res) => {
  let { code, lang } = req.body as { code: string; lang: string }
  const { id } = req.params as { id: string }

  let fullResult = ""
  let tc_count = ((await fs.readdir(`problems/${id}/`)).length - 1) / 2
  if (lang == "cpp") code = await compileCPP(code)

  for (let i = 1; i <= tc_count; i++) {
    const input = (await fs.readFile(`problems/${id}/t${i}.in`)).toString()
    const output = (await fs.readFile(`problems/${id}/t${i}.out`)).toString()
    const result = await getResult(code, lang, input)
    fullResult += result == output ? "AC " : "WA "
  }

  res.render("result", { res: fullResult })
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
