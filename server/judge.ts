import { spawn, exec } from "child_process"
import { v4 as uuid } from "uuid"
import { promises as fs } from "fs"

export function isolateDebug() {
  //const process2 = spawn("pwd")
  //console.log(process2)
  // exec("isolate --cg --init", (err, stdout, stderr) => {
  //   console.log("ERR", err)
  //   console.log("STDOUT", stdout)
  //   console.log("STDERR", stderr)
  // })
  console.log("---------YEE-------------")
  var child = spawn("isolate", ["--cg", "--init"])
  child.stderr.on('data', (data) => {
    console.log("STDERR", data.toString())
  })
  spawn("cp", ["test.py", "/sys/fs/cgroup/memory/box-0/test.py"])
  var child2 = spawn("ls", ["/sys/fs/cgroup/memory/box-0/"])
  child2.stderr.on('data', (data) => {
    console.log("LS err", data.toString())
  })
  child2.stdout.on('data', (data) => {
    console.log("LS stdout", data.toString())
  })
}

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
      if (code != 0) {
        reject(err)
        console.log("RUN COMMAND")
      } else {
        //console.log(output)
        resolve(output)
      }
    })
  })
}

export const runPython = async (script: string, input: string) => {
  const filename = uuid()
  try {
    await fs.writeFile(`programs/${filename}.py`, script)
  } catch (e) {
    console.log(e)
  }

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
  return runCommand(`programs/${name}`, [], input)
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
