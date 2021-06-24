import { spawn } from 'child_process';

function runPython (script: string) {
    const PyProg = spawn('python', ['-c', `'${script}'`])


    return new Promise<string>((resolve, reject) => {
      PyProg.stdout.on('data', (data) => {
        console.log(data.toString())
        resolve(data)
      })
      
      PyProg.stderr.on('data', (data) => {
        resolve(data)
      });
      
      PyProg.on('close', (code) => {
        resolve("exit code: " + code.toString())
      });
    })
}

export { runPython }