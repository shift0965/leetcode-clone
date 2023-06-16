import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_PROBLEM_DETAILS } from "../api.const";
import Topbar from "../components/Topbar";
import Split from "react-split";
import Playground from "../components/Workspace/Playground";
import Description from "../components/Workspace/Description";

const Workspace = () => {
  const [searchParams] = useSearchParams();
  const [problem, setProblem] = useState();
  const [loading, setLoading] = useState(true);
  const id = searchParams.get("id") || 0;
  console.log(id);

  useEffect(() => {
    fetch(`${GET_PROBLEM_DETAILS}?id=${id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProblem(result);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Topbar />
      <Split minSize={0} snapOffset={100} className="split">
        <Description problem={problem} loading={loading} />
        <Playground />
      </Split>
    </>
  );
};

export default Workspace;
