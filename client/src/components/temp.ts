import { promises as fs } from "fs"

export const temp = async () => {
  const data = await fs.readFile("test.txt")
  //console.log(JSON.parse(data.toString()))
}
