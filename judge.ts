import { spawn } from "child_process"
import { v4 as uuid } from 'uuid'
import { promises as fs } from "fs"

export const runPython = async (script: string) => {
  const filename = uuid()
  
  try {
    await fs.writeFile(`programs/${filename}.py`, script)
  } catch (e) {
    console.error(e)
  }

  const PyProg = spawn("python", [`programs/${filename}.py`])

  return new Promise<string>((resolve, reject) => {
    let output = ""

    PyProg.stdout.on("data", (data) => {
      output += data
    });

    PyProg.on("close", (code) => {
      if (code != 0) {
        reject()
      } else {
        console.log(output)
        resolve(output)
      }
    });
  });
}

export const runCPP = () => {
  //https://stackoverflow.com/questions/49100336/run-c-c-code-from-nodejs
}

export const runJava = () => {
  //https://stackoverflow.com/questions/29242529/node-js-run-a-java-program
}

