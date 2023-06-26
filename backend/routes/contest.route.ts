import { Router } from "express";
import { query } from "express-validator";
import {
  hostCreateContest,
  playerJoinContest,
  hostCheckContest,
  playerCheckContest,
  getPlayers,
  hostTerminateContest,
  playerExitContest,
} from "../controllers/contest.ctrl.js";
import authentication from "../middleware/authentication.js";

const router = Router();

//host
router.route("/contest/hostCheckGame").get(authentication, hostCheckContest);
router.route("/contest/hostCreateGame").post(authentication, hostCreateContest);
router
  .route("/contest/hostTerminateGame")
  .post(authentication, hostTerminateContest);

//players
router.route("/contest/playerCheckGame").post(playerCheckContest);
router.route("/contest/playerJoinGame").post(playerJoinContest);
router.route("/contest/playerExitGame").post(playerExitContest);

//both
router.route("/contest/getContestPlayers").post(getPlayers);

export default router;
