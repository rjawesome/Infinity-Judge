import express, {RequestHandler} from "express"
import cors from "cors"
import "ejs"
import { runPython } from "./judge"

const app = express()

app.use(express.json() as RequestHandler)
app.use(express.urlencoded({extended: true}) as RequestHandler)
app.use(cors())
app.set("view engine", "ejs")

app.get("/", (req, res) => {
  res.render("index", { error: "" })
})

app.post("/", async (req, res) => {
  const { code } = req.body
  console.log(code)
  /*
  res.render('result', {
    res: await runPython(code)
  })
  */
  res.send("result: " + (await runPython(code)))
})

app.listen(10000, () => console.log("server runing on 10000"))
