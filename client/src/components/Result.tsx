interface ResProps {
  result: string
}

const Result = ({ result }: ResProps) => {
  return (
    <div>
      <h1>Your Result:</h1>
      {!result && <p>Loading ...</p>}
      {result && result}
    </div>
  )
}
export default Result