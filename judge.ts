import { spawn } from "child_process"
import fs from "fs"

const runPython = async (script: string) => {
  fs.writeFile("test.py", script, (err) => {
    if (err) console.log(err)
  })

  const PyProg = spawn("python", ["test.py"])
  let ret = ""
  PyProg.stdout.on("data", (data) => {
    console.log("this is data", data.toString())
    ret = data
  })

  return ret
  // const PyProg = spawn("python", ["-c", `'${script}'`]);

  // return new Promise<string>((resolve, reject) => {
  //   PyProg.stdout.on("data", (data) => {
  //     console.log(data.toString());
  //     resolve(data);
  //   });

  //   PyProg.stderr.on("data", (data) => {
  //     resolve(data);
  //   });

  //   PyProg.on("close", (code) => {
  //     resolve("exit code: " + code.toString());
  //   });
  // });
}

export { runPython }
