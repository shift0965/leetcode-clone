import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_PROBLEM_DETAILS } from "../api.const";
import Navbar from "../components/Navbar";
import Split from "react-split";
import Playground from "../components/Workspace/Playground";
import Description from "../components/Workspace/Description";
import { ProblemDetails } from "../types.const";

const Workspace = () => {
  const [searchParams] = useSearchParams();
  const [problem, setProblem] = useState<ProblemDetails>();
  const id = searchParams.get("id") || 0;

  useEffect(() => {
    fetch(`${GET_PROBLEM_DETAILS}?id=${id}`)
      .then((response) => response.json())
      .then((result) => {
        setProblem(result);
      });
  }, []);

  return (
    <>
      <Navbar isWorkspace={true} />
      <Split minSize={0} snapOffset={100} className="split">
        <Description problem={problem} />
        <Playground problem={problem} />
      </Split>
    </>
  );
};

export default Workspace;
