import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_PROBLEM_DETAILS } from "../api.const";
import Navbar from "../components/NavBars/Navbar";
import Split from "react-split";
import Playground from "../components/Workspace/Playground";
import Description from "../components/Workspace/Description";
import { ProblemDetails } from "../types.const";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/stateAtoms";
import { motion as m } from "framer-motion";

const Workspace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [problem, setProblem] = useState<ProblemDetails>();
  const [loading, setLoading] = useRecoilState(loadingState);
  const id = searchParams.get("id") || 0;

  useEffect(() => {
    setLoading(true);
    fetch(`${GET_PROBLEM_DETAILS}?id=${id}`)
      .then(async (response) => {
        if (response.status !== 200) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((result) => {
        setProblem(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Problem not found");
        navigate("/");
      });
  }, [id]);

  return (
    <>
      <Navbar isWorkspace={true} />
      {!loading && problem && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Split minSize={0} snapOffset={100} className="split">
            <Description problem={problem} />
            <Playground problem={problem} />
          </Split>
        </m.div>
      )}
    </>
  );
};

export default Workspace;
