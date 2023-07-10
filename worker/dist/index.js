import express from "express";
import { execFile } from "child_process";
import dotenv from "dotenv";
import { Redis } from "ioredis";
dotenv.config();
const redisSub = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
});
const redisPub = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
});
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
const MAX_CONCURRENT_PROCESSES = 10000;
let runningProcess = 0;
while (true && runningProcess < MAX_CONCURRENT_PROCESSES) {
    const runCodeRequest = await redisPub.rpop("ps-runCode");
    if (runCodeRequest === null) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }
    else {
        const { id, runExample, cases, code, functionName, verifyVariable } = JSON.parse(runCodeRequest);
        runningProcess++;
        execFile("node", [
            "dist/helpers/workerFile.js",
            JSON.stringify({
                runExample: runExample,
                inputCases: cases,
                code: code,
                functionName: functionName,
                verifyVariable: verifyVariable,
            }),
        ], (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error}`);
            }
            else {
                redisPub.publish(`ps-runCodeResult-${id}`, stdout);
            }
            runningProcess--;
        });
    }
    console.log(runCodeRequest);
}
