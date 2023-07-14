import { Router } from "express";
import { body, query } from "express-validator";
import {
  runExampleCases,
  runTestCases,
} from "../controllers/workspace.ctrl.js";
import { handleResult } from "../middleware/validator.js";

const router = Router();

router
  .route("/workspace/run")
  .post(
    body("problemId").isNumeric(),
    body("language").isString(),
    body("code").isString().isLength({ min: 1, max: 10000 }),
    handleResult,
    runExampleCases
  );

router
  .route("/workspace/submit")
  .post(
    body("problemId").isNumeric(),
    body("language").isString(),
    body("code").isString().isLength({ min: 1, max: 10000 }),
    handleResult,
    runTestCases
  );

export default router;
