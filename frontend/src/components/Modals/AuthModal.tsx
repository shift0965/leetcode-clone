import React from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { useEffect } from "react";

const AuthModal = () => {
  const authModal = useRecoilValue(authModalState);
  const closeModal = useCloseModal();

  return (
    <>
      <div
        className="absolute top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className=" bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange to-slate-900 mx-6">
            <div className="flex justify-end p-2">
              <button className=" bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white">
                <IoClose className="h-5 w-5" onClick={closeModal} />
              </button>
            </div>
            {authModal.type === "forgotPassword" ? (
              <ResetPassword />
            ) : authModal.type === "register" ? (
              <Signup />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;

function useCloseModal() {
  const setAuthModal = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return closeModal;
}