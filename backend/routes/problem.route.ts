import { Router } from "express";
import { query } from "express-validator";
import { getProblems, getProblemDetails } from "../controllers/problem.ctrl.js";

const router = Router();

router.route("/problems").get(getProblems);
router
  .route("/problems/details")
  .get(query("id").not().isEmpty().trim(), getProblemDetails);

export default router;
