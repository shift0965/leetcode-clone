import { Router } from "express";
import { body, param } from "express-validator";
import { runCodeCases } from "../controllers/workspace.ctrl.js";
import { handleResult } from "../middleware/validator.js";

const router = Router();

router
  .route("/workspace/run/:type")
  .post(
    body("problemId").isNumeric(),
    body("language").isString(),
    body("code").isString().isLength({ min: 1, max: 10000 }),
    param("type").isString().isIn(["hidden", "example"]),
    handleResult,
    runCodeCases
  );

export default router;
