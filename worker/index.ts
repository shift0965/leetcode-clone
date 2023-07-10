import express, { Request, Response } from "express";
import { runWorker } from "./helpers/runWorker.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();

runWorker();

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
