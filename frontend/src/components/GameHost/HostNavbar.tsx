import { FiTriangle, FiCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HOST_SHOT_DOWN, HOST_START_GAME } from "../../api.const";
import { toast } from "react-toastify";
import { GameHostState } from "../../types.const";

interface HostNavbarProps {
  gameId: number | undefined;
  setCurrentState: React.Dispatch<React.SetStateAction<GameHostState>>;
}

const HostNavbar = ({ gameId, setCurrentState }: HostNavbarProps) => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON && gameId) {
      const userToken = JSON.parse(userDataJSON).access_token;
      fetch(HOST_START_GAME, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      }).then((response) => {
        if (response.status === 200) {
          toast("🔥 Game Started !");
        } else {
          toast.error("Start Game failed");
        }
      });
      setCurrentState("GameWatching");
    }
  };

  const handleShotDown = () => {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON && gameId) {
      const userToken = JSON.parse(userDataJSON).access_token;
      fetch(HOST_SHOT_DOWN, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      }).then((response) => {
        if (response.status === 200) {
          toast.success("Shot down successfully");
        } else {
          toast.error("Shot down failed");
        }
      });
      navigate("/");
    }
  };

  return (
    <nav className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 h-[22px]">
          <Link to="/" className=" h-full block w-32">
            <img src="/logo-full.png" alt="Logo" className="h-full" />
          </Link>
        </div>

        <div className="relative h-11 border-white flex-1 flex justify-center">
          <img src="./gameHost.png" alt="user" className=" h-full"></img>
          <div className="flex items-center ml-2 text-lg text-dark-gray-8">
            HOST
          </div>
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <button
            className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-green-s font-medium hover:bg-dark-fill-2 transition-all"
            onClick={handleStartGame}
          >
            <div className="mr-2">Start Game</div>
            <FiCircle />
          </button>
          <button
            className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-pink font-medium hover:bg-dark-fill-2 transition-all"
            onClick={handleShotDown}
          >
            <div className="mr-2">Shut Down</div>
            <FiTriangle />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default HostNavbar;
