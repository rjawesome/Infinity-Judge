import express from 'express'
import cors from 'cors'
import 'ejs'
import { runPython } from './judge';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {error: ''})
})

app.post('/', async (req, res) => {
  const { code } = req.body
  console.log(code)
  res.render('result', {
    res: await runPython(code)
  })
})

app.listen(10000, () => console.log("server runing on 10000"))