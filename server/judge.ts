import { spawn, exec } from "child_process"
import { v4 as uuid } from "uuid"
import { promises as fs } from "fs"

export const isolateDebug = async (
  progName: string,
  inpName: string,
  lang: string
) => {
  var child = spawn("isolate", ["--cg", "--init"])
  child.stderr.on("data", (data) => {
    console.log("STDOUT", data.toString())
    console.log("STDERR", data.toString())
  })

  exec("cd /mnt/c/Users/Rishi/Desktop/All/judge/server")
  exec(
    `cp programs/${progName} /var/local/lib/isolate/0/box/${progName}`,
    (err, stdout, stderr) => console.log("COPY ERROR", err)
  )
  exec(
    `cp programs/${inpName} /var/local/lib/isolate/0/box/${inpName}`,
    (err, stdout, stderr) => console.log("COPY ERROR", err)
  )

  console.log("copies done")

  return new Promise<string>((resolve, reject) => {
    var process
    if (lang === "py") {
      console.log("AT PYTHON")
      process = exec(
        `isolate --env=HOME=/home/user -i ${inpName} --mem 128000 --time 3 --run /usr/bin/python3 ${progName}`,
        (err, stdout, stderr) => {
          console.log("run output", stdout)
          console.log("run error", stderr)
        }
      )
    }
    if (lang === "cpp") {
      process = exec(
        `isolate --mem 128000 --time 1 --run ${progName} -i ${inpName}`
      )
    }
    var output = "",
      error = ""

    process.stdout.on("data", (data) => (output += data))
    process.stderr.on("data", (data) => (error += data))
    process.on("close", (code) => {
      if (code != 0) reject(error)
      else resolve(output)
    })
  })
}

export const runPythonIsolate = async (script: string, input: string) => {
  exec("cd /mnt/c/Users/Rishi/Desktop/All/judge/server")
  const filename = uuid()
  try {
    await fs.writeFile(`programs/${filename}.py`, script)
    await fs.writeFile(`programs/${filename}.txt`, input)
  } catch (e) {
    console.log(e)
  }
  return await isolateDebug(`${filename}.py`, `${filename}.txt`, "py")
}

export const runCPP2 = async (script: string, input: string) => {}

function runCommand(cmd: string, options: string[], stdin?: string) {
  const process = spawn(cmd, options)

  return new Promise<string>((resolve, reject) => {
    let output = ""
    let err = ""
    if (stdin) process.stdin.end(stdin)

    process.stdout.on("data", (data) => {
      output += data
    })
    process.stderr.on("data", (data) => {
      err += data
    })

    process.on("close", (code) => {
      console.log("EXIT CODE IS ", code)
      if (code != 0) {
        reject(err)
      } else {
        //console.log(output)
        resolve(output)
      }
    })
  })
}

export const runPython = async (script: string, input: string) => {
  const filename = uuid()
  // try {
  //   await fs.writeFile(`programs/${filename}.py`, script)
  // } catch (e) {
  //   console.log(e)
  // }

  return runPythonIsolate(script, input)
  return runCommand("python", [`programs/${filename}.py`], input)
}

export const compileCPP = async (script: string) => {
  const filename = uuid()
  try {
    await fs.writeFile(`./programs/${filename}.cpp`, script)
  } catch (e) {
    console.log(e)
  }

  try {
    await runCommand("g++", [
      "-std=c++17",
      `./programs/${filename}.cpp`,
      "-o",
      `./programs/${filename}`,
    ])
  } catch (e) {
    console.log("COMPILE CPP ERROR HERE", e)
    return e
  }
  console.log("yo")
  return filename
}

export const runBinary = async (name: string, input: string) => {
  try {
    await fs.writeFile(`./programs/${name}.txt`, input)
  } catch (e) {
    console.log(e)
  }
  return isolateDebug(`${name}`, `${name}.txt`, "cpp")
  //return runCommand(`programs/${name}`, [], input)
}

export const runCPP = async (script: string, input: string) => {
  const filename = uuid()
  try {
    await fs.writeFile(`./programs/${filename}.cpp`, script)
  } catch (e) {
    console.error(e)
  }

  await runCommand("g++", [
    "-std=c++17",
    `./programs/${filename}.cpp`,
    "-o",
    `./programs/${filename}`,
  ])

  return runCommand(`programs/${filename}`, [], input)
}

export const runJava = async (script: string) => {
  try {
    await fs.writeFile("./programs/test.java", script)
  } catch (e) {
    console.error(e)
  }

  exec("java", (error, stdout, stderr) => {})

  //https://stackoverflow.com/questions/29242529/node-js-run-a-java-program
}
