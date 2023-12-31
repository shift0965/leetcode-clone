import { useEffect } from "react";
import { BsCheckCircle, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { GET_ALL_PROBLEMS } from "../api.const";
import { Problem } from "../types.const";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/stateAtoms";
import { motion as m } from "framer-motion";

const ProblemList = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const PROBLEM_PER_PAGE = 6;

  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  const [problems, setProblems] = useState<Problem[]>([]);
  const [problemStatus, setProblemStatus] = useState(
    JSON.parse(localStorage.getItem("problemStatus") || "{}")
  );
  useEffect(() => {
    setLoading(true);
    fetch(GET_ALL_PROBLEMS, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((results) => {
        setProblems(results);
        setLoading(false);
      });
  }, []);

  const problemsPages = () => {
    const totalPages = Math.floor(problems.length / PROBLEM_PER_PAGE);
    const pagesDiv = [];
    for (let i = 0; i <= totalPages; i++) {
      pagesDiv.push(
        <div
          onClick={() => {
            setCurrentPage(i);
          }}
          className={`${
            currentPage === i ? "bg-dark-fill-2" : "bg-dark-layer-1"
          }  h-[32px] w-[32px] flex items-center justify-center cursor-pointer rounded text-white hover:bg-dark-fill-2 transition-all mx-1`}
        >
          {i}
        </div>
      );
    }
    return pagesDiv;
  };

  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  return (
    <>
      {!loading && (
        <m.div
          className="relative overflow-x-auto mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {problems.length > 0 && (
            <table className="w-full mx-auto" id="problem-table">
              <thead className=" text-gray-300 border-b text-left">
                <tr>
                  <th className="px-3 py-3 w-[10%] font-semibold">Status</th>
                  <th className="px-3 py-3 w-[30%] font-semibold">Title</th>
                  <th className="px-3 py-3 w-[30%] font-semibold">Category</th>
                  <th className="px-3 py-3 w-[15%] font-semibold">
                    Difficulty
                  </th>
                  <th className="px-3 py-3 w-[10%] font-semibold">Solution</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {problems !== undefined &&
                  problems
                    .slice(
                      currentPage * PROBLEM_PER_PAGE,
                      (currentPage + 1) * PROBLEM_PER_PAGE
                    )
                    .map((problem, id) => {
                      const difficulyColor =
                        problem.difficulty === "Easy"
                          ? "text-dark-green-s"
                          : problem.difficulty === "Medium"
                          ? "text-dark-yellow"
                          : "text-dark-pink";

                      return (
                        <tr
                          className={`${
                            id % 2 === 1
                              ? "bg-dark-layer-1"
                              : " bg-dark-layer-2"
                          }`}
                          key={id}
                        >
                          <td className="pl-4 py-4 whitespace-nowrap text-dark-green-s">
                            <div
                              className=" cursor-pointer h-6"
                              onClick={() => {
                                setProblemStatus((prev: any) => {
                                  prev[problem.id] = !prev[problem.id];
                                  localStorage.setItem(
                                    "problemStatus",
                                    JSON.stringify(prev)
                                  );
                                  return { ...prev };
                                });
                              }}
                            >
                              {problemStatus[problem.id] && (
                                <BsCheckCircle width="18" />
                              )}
                            </div>
                          </td>

                          <td className="px-3 py-4">
                            <Link
                              className="hover:text-blue-600"
                              to={`/problem?id=${problem.id}`}
                            >
                              {problem.title}
                            </Link>
                          </td>

                          <td className={"px-2"}>
                            <div className="flex">
                              {problem.tags.map((tag) => (
                                <div
                                  key={tag.id}
                                  className="mr-3 bg-dark-fill-2 px-2 py-[2px] rounded-lg "
                                >
                                  {tag.title}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className={`px-3 py-4 ${difficulyColor}`}>
                            {problem.difficulty}
                          </td>
                          <td className={"px-3 py-4"}>
                            {problem.solutionVideo ? (
                              <AiFillYoutube
                                fontSize="28"
                                className="cursor-pointer hover:text-red-600"
                                title="solution"
                                onClick={() =>
                                  setYoutubePlayer({
                                    isOpen: true,
                                    videoId: problem.solutionVideo,
                                  })
                                }
                              />
                            ) : (
                              <p className="text-gray-400">Coming soon</p>
                            )}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
              {youtubePlayer.isOpen && (
                <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
                  <div
                    className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
                    onClick={closeModal}
                  ></div>
                  <div className="w-full z-50 h-full px-6 relative max-w-4xl">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="w-full relative">
                        <IoClose
                          fontSize={"35"}
                          className="cursor-pointer absolute -top-16 right-0 text-dark-gray-8"
                          onClick={closeModal}
                        />
                        <YouTube
                          videoId={youtubePlayer.videoId}
                          loading="lazy"
                          iframeClassName="w-full min-h-[500px]"
                        />
                      </div>
                    </div>
                  </div>
                </tfoot>
              )}
            </table>
          )}

          <div className=" flex items-center justify-center mt-8">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="bg-dark-layer-1 h-[32px] w-[40px] flex items-center justify-center cursor-pointer rounded 
                         text-dark-gray-8 font-bold hover:bg-dark-fill-2 transition-all mx-1 disabled:opacity-50"
            >
              <BsChevronLeft />
            </button>
            {problemsPages()}
            <button
              disabled={
                currentPage >= Math.floor(problems.length / PROBLEM_PER_PAGE)
              }
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="bg-dark-layer-1 h-[32px] w-[40px] flex items-center justify-center cursor-pointer rounded 
                         text-dark-gray-8 font-bold hover:bg-dark-fill-2 transition-all mx-1 disabled:opacity-50"
            >
              <BsChevronRight />
            </button>
          </div>
        </m.div>
      )}
    </>
  );
};

export default ProblemList;
