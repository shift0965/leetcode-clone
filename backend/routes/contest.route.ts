import { Router } from "express";
import { query } from "express-validator";
import { createGame, joinGame } from "../controllers/contest.ctrl.js";

const router = Router();

router.route("/contest/createGame").post(createGame);
router.route("/contest/joinGame").post(joinGame);

export default router;
