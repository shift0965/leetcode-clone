import ProblemsTable from "./ProblemsTable";

const ProblemList = () => {
  return (
    <div className="relative overflow-x-auto mx-auto">
      <table className="w-full mx-auto">
        <thead className=" text-gray-300 border-b text-left">
          <tr>
            <th className="px-3 py-3 w-[10%] font-semibold">Status</th>
            <th className="px-3 py-3 w-[30%] font-semibold">Title</th>
            <th className="px-3 py-3 w-[30%] font-semibold">Category</th>
            <th className="px-3 py-3 w-[15%] font-semibold">Difficulty</th>
            <th className="px-3 py-3 w-[10%] font-semibold">Solution</th>
          </tr>
        </thead>
        <ProblemsTable />
      </table>
    </div>
  );
};

export default ProblemList;
