import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";

type CodeMirrorProps = {
  userCode: string;
  onChangeCode: (value: string) => void;
};

const CodeMirror = ({ userCode, onChangeCode }: CodeMirrorProps) => {
  return (
    <div className="w-full overflow-auto h-full flex flex-col">
      <ReactCodeMirror
        className="codeMirror"
        value={userCode}
        onChange={(value: string) => onChangeCode(value)}
        theme={vscodeDark}
        extensions={[javascript()]}
        basicSetup={{ autocompletion: false }}
      />
    </div>
  );
};

export default CodeMirror;
