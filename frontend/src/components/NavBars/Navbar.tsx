import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Timer from "./Timer";
import { useSetRecoilState } from "recoil";
import { profileModalState } from "../../atoms/stateAtoms";

const Navbar = ({ isWorkspace = false }) => {
  const setIsProfileOpen = useSetRecoilState(profileModalState);

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  return (
    <nav className="sticky top-0 z-30 flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7 ">
      <div
        className={`flex w-full items-center justify-between ${
          !isWorkspace ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <div className="flex-1 flex items-center text-white text-lg">
          <Link to="/" className=" block w-[100px]" id="letscode-btn">
            <img src="/logo-full.png" alt="Logo" className=" w-full" />
          </Link>
        </div>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {isWorkspace && <Timer />}
          <div
            className=" relative flex items-center text-2xl py-1 cursor-pointer"
            id="profile-btn"
            onClick={handleProfileClick}
          >
            <FaUserCircle />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
