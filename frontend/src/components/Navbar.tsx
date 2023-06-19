import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import { useRecoilState } from "recoil";

const Navbar = ({ isWorkspace = false }) => {
  const user = undefined;
  const handleLogout = () => {
    console.log("hi");
  };

  return (
    <nav className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !isWorkspace ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link to="/" className="h-[22px] flex-1">
          <img src="/logo-full.png" alt="Logo" height={100} width={100} />
        </Link>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {isWorkspace && <Timer />}
          {user ? (
            <>
              {" "}
              <div className=" cursor-pointer relative">
                <img src="/avatar.png" height={34} width={34} alt="user"></img>
              </div>
              <button
                className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
                onClick={() => {
                  handleLogout;
                }}
              >
                <FiLogOut />
              </button>
            </>
          ) : (
            <Link to="/to">
              <button className=" bg-dark-fill-3 py-1 px-2 cursor-pointer rounded">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
