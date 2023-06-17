import React from "react";
import Topbar from "../components/Topbar";
import ProblemsTable from "../components/ProblemsTable";

const ProblemList = () => {
  return (
    <main className=" bg-dark-layer-2 min-h-screen">
      <Topbar />
      <h1 className="text-2xl text-center text-gray-300 mt-10 mb-5">
        Problems
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 mb-10">
        <table className="w-full md:w-9/12 max-w-5xl mx-auto">
          <thead className=" text-gray-300 uppercase border-b text-left">
            <tr>
              <th className="px-3 py-3 w-[15%]">status</th>
              <th className="px-3 py-3 w-[30%]">Title</th>
              <th className="px-3 py-3 w-[30%]">Category</th>
              <th className="px-3 py-3 w-[15%">Difficulty</th>
              <th className="px-3 py-3 w-[10%]">Solution</th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
};

export default ProblemList;
