import { Router } from "express";
import { query } from "express-validator";
import {
  hostCreateContest,
  playerJoinContest,
} from "../controllers/contest.ctrl.js";

const router = Router();

router.route("/contest/createGame").post(hostCreateContest);
router.route("/contest/joinGame").post(playerJoinContest);

export default router;
