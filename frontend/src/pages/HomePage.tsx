import ProblemList from "../components/ProblemList";
import Navbar from "../components/NavBars/Navbar";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateGame = () => {
    navigate("/gameHost");
  };

  const handleJoinGame = () => {
    navigate("/gamePlayer");
  };
  return (
    <div>
      <Navbar />
      <m.div
        className="block pb-10 min-h-[calc(100vh-104px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-11/12 md:w-9/12 mx-auto pt-8">
          <div>
            <h1 className="text-xl text-left text-gray-200 ml-1">
              Let's Code!
            </h1>
            <div className=" flex mt-5">
              <button onClick={handleCreateGame} id="create-game-btn">
                <div className="h-32 w-48 rounded-xl text-white relative bg-dark-fill-3 transition-all hover:bg-dark-fill-2 hover:scale-105 flex items-end justify-center">
                  <img src="createGame.svg" className="h-24 object-contain" />
                  <div className="absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-pre text-xl opacity-70">
                    Create Game
                  </div>
                </div>
              </button>
              <button
                onClick={handleJoinGame}
                className="ml-8"
                id="join-game-btn"
              >
                <div className="h-32 w-48 rounded-xl text-white relative bg-dark-fill-3 transition-all hover:bg-dark-fill-2 hover:scale-105">
                  <img
                    src="joinGame.svg"
                    className="h-full w-full object-contain"
                  />
                  <div className="absolute top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] whitespace-pre text-xl opacity-70">
                    Join Game
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="mt-12">
            <h1 className="text-xl text-left text-gray-200 ml-1 mt-5">
              Problems
            </h1>
            <ProblemList />
          </div>
        </div>
      </m.div>
      <Footer />
    </div>
  );
};

export default HomePage;
