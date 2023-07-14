import { Router } from "express";
import { body } from "express-validator";
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
  hostGetPlayersCode,
  getTimeLimit,
  hostSendMessage,
  getContestResult,
  hostCloseContest,
  hostGetHistory,
  hostClearHistory,
} from "../controllers/contest.ctrl.js";
import authentication from "../middleware/authentication.js";
import { handleResult } from "../middleware/validator.js";

const router = Router();

//host
router.route("/contest/hostCheckGame").get(authentication, hostCheckContest);
router.route("/contest/hostCreateGame").post(
  authentication,
  body("timeLimit").isInt({ min: 3, max: 300 }),
  body("problemList")
    .isArray({ min: 1, max: 5 })
    .withMessage("Array should contain at least one element."),
  body("problemList")
    .custom((arr) => new Set(arr).size === arr.length)
    .withMessage("Problems should not repeate"),
  handleResult,
  hostCreateContest
);
router
  .route("/contest/hostTerminateGame")
  .post(authentication, hostTerminateContest);
router
  .route("/contest/hostCloseGame")
  .post(
    authentication,
    body("gameId").isNumeric(),
    handleResult,
    hostCloseContest
  );
router
  .route("/contest/hostStartGame")
  .post(
    authentication,
    body("gameId").isNumeric(),
    handleResult,
    hostStartContest
  );
router
  .route("/contest/hostGetPlayersCode")
  .post(authentication, hostGetPlayersCode);
router
  .route("/contest/hostSendMessage")
  .post(
    body("gameId").isNumeric(),
    body("playerId").isNumeric(),
    body("message").isString().isLength({ min: 1, max: 30 }),
    handleResult,
    hostSendMessage
  );
router.route("/contest/hostGetHistory").post(authentication, hostGetHistory);
router
  .route("/contest/hostClearHistory")
  .post(authentication, hostClearHistory);

//players
router
  .route("/contest/playerCheckGame")
  .post(
    body("gameId").isNumeric(),
    body("playerId").isNumeric(),
    handleResult,
    playerCheckContest
  );
router
  .route("/contest/playerJoinGame")
  .post(
    body("gameId").isNumeric(),
    body("playerName").isString().isLength({ min: 1, max: 20 }),
    handleResult,
    playerJoinContest
  );
router
  .route("/contest/playerExitGame")
  .post(
    body("gameId").isNumeric(),
    body("playerId").isNumeric(),
    handleResult,
    playerExitContest
  );
router
  .route("/contest/getProblems")
  .post(body("gameId").isNumeric(), handleResult, getProblems);
router
  .route("/contest/getPlayersProgress")
  .post(body("gameId").isNumeric(), handleResult, getPlayersProgress);
router
  .route("/contest/playerSubmit")
  .post(
    body("problemId").isNumeric(),
    body("language").isString(),
    body("code").isString().isLength({ min: 1, max: 10000 }),
    body("gameId").isNumeric(),
    body("playerId").isNumeric(),
    body("progress").isArray(),
    handleResult,
    playerSubmit
  );

//both
router
  .route("/contest/getPlayers")
  .post(body("gameId").isNumeric(), handleResult, getPlayers);
router
  .route("/contest/getTimeLimit")
  .post(body("gameId").isNumeric(), handleResult, getTimeLimit);
router
  .route("/contest/getGameResult")
  .post(body("gameId").isNumeric(), handleResult, getContestResult);

export default router;
