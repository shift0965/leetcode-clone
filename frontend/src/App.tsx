import Auth from "./pages/Auth";
import Workspace from "./pages/Workspace";
import ProblemList from "./pages/ProblemList";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="home" element={<ProblemList />} />
          <Route path="problem" element={<Workspace />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
