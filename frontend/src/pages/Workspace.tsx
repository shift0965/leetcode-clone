import React from "react";
import Topbar from "../components/Topbar";
import Split from "react-split";
import Playground from "../components/Workspace/Playground";
import Description from "../components/Workspace/Description";

const Workspace = () => {
  return (
    <>
      <Topbar />
      <Split minSize={0} snapOffset={100} className="split">
        <Description />
        <Playground />
      </Split>
    </>
  );
};

export default Workspace;
