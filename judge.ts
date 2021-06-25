import { spawn, exec } from "child_process"
import { v4 as uuid } from "uuid"
import { promises as fs } from "fs"
import { forEachChild } from "typescript"
import { resolve } from "path/posix"

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
    })

    PyProg.on("close", (code) => {
      if (code != 0) {
        reject()
      } else {
        console.log(output)
        resolve(output)
      }
    })
  })
}

export const runCPP = async (script: string) => {
  try {
    await fs.writeFile("test.cpp", script)
  } catch (e) {
    console.error(e)
  }

  return new Promise<string>((resolve, reject) => {
    const CppProg = spawn("testcpp.exe")
    let output = ""

    CppProg.stdin.end("some_cpp_input")
    CppProg.stdout.on("data", (data) => (output += data.toString()))

    CppProg.on("close", (code) => {
      if (code != 0) reject()
      else {
        console.log(output)
        resolve(output)
      }
    })
  })
}

export const runJava = (code: string) => {
  //https://stackoverflow.com/questions/29242529/node-js-run-a-java-program
}
