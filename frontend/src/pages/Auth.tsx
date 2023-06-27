import AuthModal from "../components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "../atoms/stateAtoms";

const Auth = () => {
  const authModal = useRecoilValue(authModalState);
  return (
    <div className=" bg-gradient-to-b from-gray-600 to-black h-screen relative">
      <div className=" max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img
            src="/hero.png"
            alt="LeetClone"
            height={200}
            width={800}
            className=""
          ></img>
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};
export default Auth;
