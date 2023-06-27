import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from "./Signup";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";

const AuthModal = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);
  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
  };

  return (
    <>
      <div
        className="absolute top-0 w-full h-full flex items-center justify-center bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className=" w-full sm:w-96 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-center z-50">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className=" bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-brand-orange-s to-dark-layer-1 mx-6">
            <div className="flex justify-end px-2 pt-2">
              <button className=" bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white text-white">
                <IoClose className="h-5 w-5" onClick={closeModal} />
              </button>
            </div>
            {authModal.type === "register" ? <Signup /> : <Login />}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthModal;
