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
        <table className="text-gray-500 w-full md:w-7/12 max-w-7xl mx-auto">
          <thead className=" text-gray-300 uppercase border-b">
            <tr>
              <th className="px-1 py-3 w-0">status</th>
              <th className="px-1 py-3 w-0">Title</th>
              <th className="px-1 py-3 w-0">Difficulty</th>
              <th className="px-1 py-3 w-0">Category</th>
              <th className="px-1 py-3 w-0">Solution</th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
    </main>
  );
};

export default ProblemList;
