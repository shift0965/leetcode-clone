import { Router } from "express";
import { body, query } from "express-validator";
import {
  runExampleCases,
  runTestCases,
} from "../controllers/workspace.ctrl.js";

const router = Router();

router
  .route("/workspace/run")
  .post(
    body("problemId").isNumeric(),
    body("language").isString().trim(),
    body("code").isString(),
    runExampleCases
  );

router
  .route("/workspace/submit")
  .post(
    body("problemId").isNumeric(),
    body("language").isString().trim(),
    body("code").isString(),
    runTestCases
  );

export default router;
