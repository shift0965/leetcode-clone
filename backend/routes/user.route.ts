import { Router } from "express";
import { createUser, updateAuthToken } from "../controllers/user.ctrl.js";

const router = Router();

router
  .route("/user/create")
  .post(createUser);

router
  .route("/user/update-token")
  .post(updateAuthToken);

export default router;
