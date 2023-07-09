import ReactLoading from "react-loading";
import { useRecoilValue } from "recoil";
import { loadingState } from "../atoms/stateAtoms";

const Loading = () => {
  const loading = useRecoilValue(loadingState);
  return (
    <div
      className={`absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-50 transition-all ${
        loading ? "opacity-100" : "opacity-0"
      }`}
    >
      <ReactLoading type={"spinningBubbles"} color="gray" />
    </div>
  );
};

export default Loading;
