import React from "react";
import { useEffect, useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLoading3Quarters,
  AiFillStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";

// type ProblemDescriptionProps = {
//   problem: Problem;
//   _solved: boolean;
// };

const Description = () => {
  //const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
  //   const { liked, disliked, solved, setData, starred } =
  //     useGetUsersDataOnProblem(problem.id);

  const problemDifficultyClass = "bg-dark-pink";
  const starred = true;
  const liked = true;
  const disliked = false;
  const [updating, setUpdating] = useState(false);
  const currentProblem = {
    likes: 50,
    dislikes: 2,
    difficulty: "hard",
  };

  const problem = {
    id: 1,
    title: "Two Sum",
    examples: [
      {
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
      },
      {
        inputText: "nums = [3,3], target = 6",
        outputText: "[0,1]",
      },
    ],

    constraints: [
      `<code> 2 <= nums.length <= 104</code> `,
      `<code> -109 <= nums[i] <= 109 </code>`,
      "<code> -109 <= target <= 109 </code>",
      "Only one valid answer exists.",
    ],
  };

  // const handleLike = async () => {
  // 	if (!user) {
  // 		toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
  // 		return;
  // 	}
  // 	if (updating) return;
  // 	setUpdating(true);
  // 	await runTransaction(firestore, async (transaction) => {
  // 		const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

  // 		if (userDoc.exists() && problemDoc.exists()) {
  // 			if (liked) {
  // 				// remove problem id from likedProblems on user document, decrement likes on problem document
  // 				transaction.update(userRef, {
  // 					likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
  // 				});
  // 				transaction.update(problemRef, {
  // 					likes: problemDoc.data().likes - 1,
  // 				});

  // 				setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
  // 				setData((prev) => ({ ...prev, liked: false }));
  // 			} else if (disliked) {
  // 				transaction.update(userRef, {
  // 					likedProblems: [...userDoc.data().likedProblems, problem.id],
  // 					dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
  // 				});
  // 				transaction.update(problemRef, {
  // 					likes: problemDoc.data().likes + 1,
  // 					dislikes: problemDoc.data().dislikes - 1,
  // 				});

  // 				setCurrentProblem((prev) =>
  // 					prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
  // 				);
  // 				setData((prev) => ({ ...prev, liked: true, disliked: false }));
  // 			} else {
  // 				transaction.update(userRef, {
  // 					likedProblems: [...userDoc.data().likedProblems, problem.id],
  // 				});
  // 				transaction.update(problemRef, {
  // 					likes: problemDoc.data().likes + 1,
  // 				});
  // 				setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
  // 				setData((prev) => ({ ...prev, liked: true }));
  // 			}
  // 		}
  // 	});
  // 	setUpdating(false);
  // };

  //   const handleDislike = async () => {
  //     if (!user) {
  //       toast.error("You must be logged in to dislike a problem", {
  //         position: "top-left",
  //         theme: "dark",
  //       });
  //       return;
  //     }
  //     if (updating) return;
  //     setUpdating(true);
  //     await runTransaction(firestore, async (transaction) => {
  //       const { problemDoc, userDoc, problemRef, userRef } =
  //         await returnUserDataAndProblemData(transaction);
  //       if (userDoc.exists() && problemDoc.exists()) {
  //         // already disliked, already liked, not disliked or liked
  //         if (disliked) {
  //           transaction.update(userRef, {
  //             dislikedProblems: userDoc
  //               .data()
  //               .dislikedProblems.filter((id: string) => id !== problem.id),
  //           });
  //           transaction.update(problemRef, {
  //             dislikes: problemDoc.data().dislikes - 1,
  //           });
  //           setCurrentProblem((prev) =>
  //             prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
  //           );
  //           setData((prev) => ({ ...prev, disliked: false }));
  //         } else if (liked) {
  //           transaction.update(userRef, {
  //             dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
  //             likedProblems: userDoc
  //               .data()
  //               .likedProblems.filter((id: string) => id !== problem.id),
  //           });
  //           transaction.update(problemRef, {
  //             dislikes: problemDoc.data().dislikes + 1,
  //             likes: problemDoc.data().likes - 1,
  //           });
  //           setCurrentProblem((prev) =>
  //             prev
  //               ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }
  //               : null
  //           );
  //           setData((prev) => ({ ...prev, disliked: true, liked: false }));
  //         } else {
  //           transaction.update(userRef, {
  //             dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
  //           });
  //           transaction.update(problemRef, {
  //             dislikes: problemDoc.data().dislikes + 1,
  //           });
  //           setCurrentProblem((prev) =>
  //             prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
  //           );
  //           setData((prev) => ({ ...prev, disliked: true }));
  //         }
  //       }
  //     });
  //     setUpdating(false);
  //   };

  //   const handleStar = async () => {
  //     if (!user) {
  //       toast.error("You must be logged in to star a problem", {
  //         position: "top-left",
  //         theme: "dark",
  //       });
  //       return;
  //     }
  //     if (updating) return;
  //     setUpdating(true);

  //     if (!starred) {
  //       const userRef = doc(firestore, "users", user.uid);
  //       await updateDoc(userRef, {
  //         starredProblems: arrayUnion(problem.id),
  //       });
  //       setData((prev) => ({ ...prev, starred: true }));
  //     } else {
  //       const userRef = doc(firestore, "users", user.uid);
  //       await updateDoc(userRef, {
  //         starredProblems: arrayRemove(problem.id),
  //       });
  //       setData((prev) => ({ ...prev, starred: false }));
  //     }

  //     setUpdating(false);
  //   };

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white">
                {problem.id}. {problem.title}
              </div>
            </div>

            <div className="flex items-center mt-3">
              <div
                className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
              >
                {currentProblem.difficulty}
              </div>

              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                <BsCheck2Circle />
              </div>

              <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                {liked && !updating && (
                  <AiFillLike className="text-dark-green-s" />
                )}
                {!liked && !updating && <AiFillLike />}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                <span className="text-xs">{currentProblem.likes}</span>
              </div>
              <div
                className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6"
                //onClick={handleDislike}
              >
                {disliked && !updating && (
                  <AiFillDislike className="text-dark-blue-s" />
                )}
                {!disliked && !updating && <AiFillDislike />}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                <span className="text-xs">{currentProblem.dislikes}</span>
              </div>
              <div
                className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 "
                //   onClick={handleStar}
              >
                {starred && !updating && (
                  <AiFillStar className="text-dark-yellow" />
                )}
                {!starred && !updating && <TiStarOutline />}
                {updating && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
              </div>
            </div>
            {/* 
            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )} */}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <p className="mt-3">
                Given an array of integers <code>nums</code> and an{" "}
                <code>integer</code>
                target,{" "}
                <em>
                  return indices of the two numbers such that they add up to
                </em>{" "}
                <code>target</code>.
              </p>
              <p className="mt-3">
                You may assume that each input would have{" "}
                <strong>exactly one solution</strong>, and you may not use the
                same element twice.
              </p>
              <p className="mt-3">You can return the answer in any order.</p>
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={index}>
                  <p className="font-medium text-white">Example 1: </p>

                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{" "}
                      {example.inputText}
                      <br />
                      <strong>Output:</strong>
                      {example.outputText} <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="my-8 pb-4">
              <div className="text-white text-sm font-medium">Constraints:</div>
              {problem.constraints.map((constraint, id) => {
                return (
                  <ul className="text-white ml-5 list-disc mt-2" key={id}>
                    <div dangerouslySetInnerHTML={{ __html: constraint }}></div>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
