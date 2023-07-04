import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";

type CodeMirrorProps = {
  userCode: string;
  onChangeCode?: (value: string) => void;
  readOnly?: boolean;
  textLarge?: boolean;
};

const CodeMirror = ({
  userCode,
  onChangeCode,
  readOnly = false,
  textLarge = false,
}: CodeMirrorProps) => {
  return (
    <div className="w-full overflow-y-auto h-full flex flex-col">
      <ReactCodeMirror
        className={`codeMirror ${textLarge ? "text-[16px]" : "text-[14px]"}`}
        value={userCode}
        onChange={(value: string) => onChangeCode && onChangeCode(value)}
        theme={vscodeDark}
        extensions={[javascript(), EditorView.lineWrapping]}
        basicSetup={{
          autocompletion: false,
          highlightActiveLine: !readOnly,
          foldGutter: !readOnly,
          highlightActiveLineGutter: !readOnly,
        }}
        editable={!readOnly}
        readOnly={readOnly}
      />
    </div>
  );
};

export default CodeMirror;
