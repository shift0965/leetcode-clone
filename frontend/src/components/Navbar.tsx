import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import { Link } from "react-router-dom";

const Navbar = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "register", isOpen: true }));
  };

  return (
    <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
      <Link to="/" className="flex items-center justify-center h-20 w-40  ">
        <img
          src={"/logo.png"}
          alt="LeetClone"
          height={80}
          width={160}
          className=""
        />
      </Link>
      <div className="flex items-center">
        <button
          className=" bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:bg-opacity-90 duration-300"
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
