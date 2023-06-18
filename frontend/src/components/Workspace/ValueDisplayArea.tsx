type ValueDisplayAreaProps = {
  value: any;
  label: string;
};

const ValueDisplayArea = ({ value, label }: ValueDisplayAreaProps) => {
  const valueString = value
    ? typeof value === "string"
      ? value
      : JSON.stringify(value)
    : "Undefined";

  return (
    <div key={label}>
      <p className="text-sm mt-4 text-white">{label} =</p>
      <div className="w-full cursor-text rounded-lg border px-3 py-[8px] bg-dark-fill-3 border-transparent text-white mt-2">
        <pre className="whitespace-pre-wrap text-sm leading-6">
          {valueString}
        </pre>
      </div>
    </div>
  );
};

export default ValueDisplayArea;
