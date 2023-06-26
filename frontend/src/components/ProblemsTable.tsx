import { useEffect } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { GET_ALL_PROBLEMS } from "../api.const";
import { Problem } from "../types.const";

const ProblemsTable = () => {
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
    fetch(GET_ALL_PROBLEMS, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((results) => {
        setProblems(results);
      });
  }, []);
  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };

  return (
    <>
      {problems.length > 0 && (
        <>
          <tbody className="text-white">
            {problems !== undefined &&
              problems.map((problem, id) => {
                const difficulyColor =
                  problem.difficulty === "Easy"
                    ? "text-dark-green-s"
                    : problem.difficulty === "Medium"
                    ? "text-dark-yellow"
                    : "text-dark-pink";

                return (
                  <tr
                    className={`${id % 2 === 1 ? "bg-dark-layer-1" : ""}`}
                    key={id}
                  >
                    <td className="px-3 py-4 whitespace-nowrap text-dark-green-s">
                      <BsCheckCircle width="18" />
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
                            {tag.title}{" "}
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
                          fontSize={"28"}
                          className="cursor-pointer hover:text-red-600"
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
        </>
      )}
    </>
  );
};

export default ProblemsTable;
