import { Router } from "express";
import { createUser } from "../controllers/user.ctrl.js";

const router = Router();

router
  .route("/user/create")
  .post(createUser);

export default router;
