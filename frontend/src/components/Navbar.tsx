import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/stateAtoms";

const Navbar = ({ isWorkspace = false }) => {
  const [isLogIn, setIsLogin] = useState(false);
  const handleLogout = () => {
    console.log("hi");
  };
  const setAuthModal = useSetRecoilState(authModalState);
  const handleSignInBtn = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true }));
  };

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    //if token not found
    if (!userDataJson) return setIsLogin(false);
    const userData = JSON.parse(userDataJson);
    //if expired
    if (userData.access_expired < new Date().getTime())
      return setIsLogin(false);
    setIsLogin(true);
  }, []);

  return (
    <nav className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !isWorkspace ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <Link to="/" className="h-[22px] flex-1">
          <img src="/logo-full.png" alt="Logo" className="h-full" />
        </Link>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {isWorkspace && <Timer />}
          {isLogIn ? (
            <>
              <div className=" cursor-pointer relative h-7">
                <img src="/avatar.png" alt="user" className=" h-full"></img>
              </div>
              {/* <button
                className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange"
                onClick={() => {
                  handleLogout;
                }}
              >
                <FiLogOut />
              </button> */}
            </>
          ) : (
            <button
              className=" bg-dark-fill-3 py-1 px-2 cursor-pointer rounded"
              onClick={handleSignInBtn}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
