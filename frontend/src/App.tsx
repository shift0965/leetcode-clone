import Workspace from "./pages/Workspace";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameHost from "./pages/GameHost";
import GamePlayer from "./pages/GamePlayer";
import HomePage from "./pages/HomePage";
import AuthModal from "./components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "./atoms/stateAtoms";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const authModal = useRecoilValue(authModalState);
  return (
    <BrowserRouter>
      <div className="bg-dark-layer-2 min-h-screen relative">
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="problem" element={<Workspace />} />
          <Route path="gameHost" element={<GameHost />} />
          <Route path="gamePlayer" element={<GamePlayer />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
        {authModal.isOpen && <AuthModal />}
      </div>
    </BrowserRouter>
  );
}

export default App;
