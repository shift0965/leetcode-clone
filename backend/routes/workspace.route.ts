import { Router } from "express";
import { body, query } from "express-validator";
import { runExampleCases } from "../controllers/workspace.ctrl.js";

const router = Router();

router
  .route("/workspace/run")
  .post(
    body("problemId").isNumeric(),
    body("language").isString().trim(),
    body("code").isString(),
    runExampleCases
  );

export default router;
