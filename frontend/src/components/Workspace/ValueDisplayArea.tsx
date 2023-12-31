type ValueDisplayAreaProps = {
  value: any;
  label: string;
};

const ValueDisplayArea = ({ value, label }: ValueDisplayAreaProps) => {
  const valueString =
    value === undefined
      ? "undefined"
      : typeof value === "string"
      ? value
      : JSON.stringify(value);

  return (
    <div>
      <p className="text-sm mt-4 text-white">{label} =</p>
      <div className="w-full cursor-text rounded-lg px-3 py-[8px] bg-dark-fill-3 text-white mt-2 min-h-[40px]">
        <pre className="whitespace-pre-wrap text-sm leading-6">
          {valueString}
        </pre>
      </div>
    </div>
  );
};

export default ValueDisplayArea;
