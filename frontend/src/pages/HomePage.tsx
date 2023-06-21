import React from "react";
import ProblemList from "../components/ProblemList";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className=" bg-dark-layer-2 min-h-screen">
      <Navbar />
      <div className=" w-11/12  md:w-9/12 mx-auto mt-8">
        <div>
          <h1 className="text-xl text-left text-gray-200 ml-1">Let's Code!</h1>
          <div className=" flex mt-5">
            <Link to={"gameHost"}>
              <div className="h-32 w-48 rounded-xl text-white relative bg-dark-fill-2 flex items-end justify-center">
                <img src="createGame.svg" className="h-24 object-contain" />
                <div className="absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-pre text-xl opacity-70">
                  Create Game
                </div>
              </div>
            </Link>
            <Link to={"gamePlayer"} className=" ml-8">
              <div className="h-32 w-48 rounded-xl text-white relative bg-dark-fill-2">
                <img
                  src="joinGame.svg"
                  className="h-full w-full object-contain"
                />
                <div className="absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-pre text-xl opacity-70">
                  Join Game
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-12">
          <h1 className="text-xl text-left text-gray-200 ml-1 mt-5 mb-3">
            Problems
          </h1>
          <ProblemList />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
