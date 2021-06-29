import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Problem = () => {
  const [statement, setStatement] = useState();
  const { id } = useParams();
  //console.log("this the id", id)

  useEffect(() => {
    axios
      .get(`http://localhost:10000/${id}`)
      .then(({ data }) => setStatement(data));
  });

  return (
    <div className="content">
      <h1>{id}</h1>
      <div className="submit">
        <p className="statement">{statement}</p>
        <form method="POST" className="submit-form blue">
          <textarea required placeholder="your code" name="code"></textarea>
          <select required name="lang">
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="py">Python</option>
          </select>
          <input type="submit" value="submit!" />
        </form>
      </div>
    </div>
  );
};
export default Problem;
