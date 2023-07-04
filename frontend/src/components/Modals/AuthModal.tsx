import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from "./Signup";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/stateAtoms";
import Profile from "./Profile";

const AuthModal = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);
  const closeModal = () => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div
        className="absolute top-0 w-full h-full flex items-center justify-center bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className=" w-fit absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-center z-50 rounded-lg overflow-hidden">
        <button className="absolute bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center text-white right-[5px] top-[5px]">
          <IoClose className="h-6 w-6" onClick={closeModal} />
        </button>
        {authModal.type === "register" && <Signup />}
        {authModal.type === "login" && <Login />}
        {authModal.type === "profile" && <Profile />}
      </div>
    </>
  );
};
export default AuthModal;
