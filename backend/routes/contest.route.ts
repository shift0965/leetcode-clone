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
  hostStartContest,
  getProblems,
  getPlayersProgress,
  playerSubmit,
} from "../controllers/contest.ctrl.js";
import authentication from "../middleware/authentication.js";

const router = Router();

//host
router.route("/contest/hostCheckGame").get(authentication, hostCheckContest);
router.route("/contest/hostCreateGame").post(authentication, hostCreateContest);
router
  .route("/contest/hostTerminateGame")
  .post(authentication, hostTerminateContest);

router.route("/contest/hostStartGame").post(authentication, hostStartContest);

//players
router.route("/contest/playerCheckGame").post(playerCheckContest);
router.route("/contest/playerJoinGame").post(playerJoinContest);
router.route("/contest/playerExitGame").post(playerExitContest);
router.route("/contest/getProblems").post(getProblems);
router.route("/contest/getPlayersProgress").post(getPlayersProgress);
router.route("/contest/playerSubmit").post(playerSubmit);

//both
router.route("/contest/getPlayers").post(getPlayers);

export default router;
