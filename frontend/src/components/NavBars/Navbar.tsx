import { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";
import { toast } from "react-toastify";

const Navbar = ({ isWorkspace = false }) => {
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setAuthModal((prev) => ({ ...prev, isLogin: false }));
    toast.success("Sign Out Successfully ");
  };
  const [authModal, setAuthModal] = useRecoilState(authModalState);
  const handleSignInBtn = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: true, type: "login" }));
  };

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      if (userData.access_expired > new Date().getTime() / 1000) {
        setAuthModal((prev) => ({ ...prev, isLogin: true }));
      } else {
        localStorage.removeItem("userData");
        setAuthModal((prev) => ({ ...prev, isLogin: false }));
      }
    } else {
      setAuthModal((prev) => ({ ...prev, isLogin: false }));
    }
  }, []);

  return (
    <nav className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !isWorkspace ? "max-w-[1200px] mx-auto" : ""
        }`}
      >
        <div className="flex-1 flex items-center text-white text-lg">
          <Link to="/" className=" block w-[100px]">
            <img src="/logo-full.png" alt="Logo" className=" w-full" />
          </Link>
        </div>

        <div className="flex items-center space-x-4 flex-1 justify-end">
          {isWorkspace && <Timer />}
          {authModal.isLogin ? (
            <>
              <div
                className=" relative flex items-center text-2xl py-1 cursor-pointer"
                onClick={() =>
                  setAuthModal((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: "profile",
                  }))
                }
              >
                <FaUserCircle />
              </div>
              <button
                className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2 transition-all"
                onClick={handleLogout}
              >
                <FiLogOut />
              </button>
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
