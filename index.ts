import express, { RequestHandler } from "express"
import cors from "cors"
import "ejs"
import { runCPP, runJava, runPython } from "./judge"

const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({ extended: true }) as RequestHandler)
app.use(cors())
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index", { error: "" })
})

app.post("/", async (req, res) => {
  const { code, lang } = req.body
  var result
  //console.log(code, lang)
  if (lang === "cpp") result = await runCPP(code)
  if (lang === "py") result = await runPython(code)
  //if (lang == "java") result = await runJava(code)
  res.send("result: " + result)
})

app.listen(10000, () => console.log("server runing on 10000"))
