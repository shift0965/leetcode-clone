import Auth from "./pages/Auth";
import Workspace from "./pages/Workspace";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import GameHost from "./pages/GameHost";
import GamePlayer from "./pages/GamePlayer";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="problem" element={<Workspace />} />
          <Route path="gameHost" element={<GameHost />} />
          <Route path="gamePlayer" element={<GamePlayer />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
