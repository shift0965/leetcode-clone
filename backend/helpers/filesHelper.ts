import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateFile(
  format: string,
  content: string,
  functionName: string,
  ifRecordConsole: boolean
) {
  const jobId = randomUUID();
  const dirCode = path.join(__dirname, "..", "execution", format);
  if (!fs.existsSync(dirCode)) {
    fs.mkdirSync(dirCode, { recursive: true });
  }

  const prefix = `const consoles = [];
  console.log = function (message) {
    if(${ifRecordConsole}){
      if(message.typeof === "string"){
        consoles.push(message)
      }
      else{
        consoles.push(JSON.stringify(message))
      }
    }
    return ;
  };
  const args = JSON.parse(process.argv[2])`;
  const postfix = `
  const output = ${functionName}(...args);
  process.stdout.write(JSON.stringify(${
    ifRecordConsole ? "{consoles, output}" : "{output}"
  }));
  `;
  const filename = `${jobId}.${format}`;
  const filePath = path.join(dirCode, filename);
  fs.writeFileSync(
    filePath,
    prefix.trim().replace(/\n/g, " ") +
      content +
      postfix.trim().replace(/\n/g, " ")
  );
  return filePath;
}

export async function removeFile(filePath: string) {
  fs.unlinkSync(filePath);
  return;
}
