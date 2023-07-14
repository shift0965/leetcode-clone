import { Router } from "express";
import { query } from "express-validator";
import { getProblems, getProblemDetails } from "../controllers/problem.ctrl.js";
import { handleResult } from "../middleware/validator.js";

const router = Router();

router.route("/problems").get(getProblems);
router
  .route("/problems/details")
  .get(query("id").notEmpty().isNumeric(), handleResult, getProblemDetails);

export default router;
