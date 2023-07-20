import { Router } from "express";
import { body } from "express-validator";
import { signUp, signIn } from "../controllers/user.ctrl.js";
import { handleResult } from "../middleware/validator.js";

const router = Router();

router
  .route("/user/signup")
  .post(
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("name").notEmpty().trim(),
    body("password").notEmpty(),
    handleResult,
    signUp
  );

router
  .route("/user/signin")
  .post(
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty(),
    handleResult,
    signIn
  );

export default router;
