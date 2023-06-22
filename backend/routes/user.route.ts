import { Router, Response, Request } from "express";
import { body } from "express-validator";
import {
  signUp,
  signIn,
  //   fbLogin,
  //   getProfile,
} from "../controllers/user.ctrl.js";
import { PROVIDER } from "../models/userProvider.model.js";
import { handleResult } from "../middleware/validator.js";
import branch from "../middleware/branch.js";
import authentication from "../middleware/authentication.js";

const router = Router();

router.route("/user/signup").post([
  body("email").exists().notEmpty(), //.isEmail().normalizeEmail(),
  body("name").exists().notEmpty().trim(),
  body("password").exists().notEmpty(),
  handleResult,
  signUp,
]);

router.route("/user/signin").post([
  branch(
    (req) => req.body.provider === PROVIDER.NATIVE,
    [
      body("email").exists().notEmpty(), //.isEmail().normalizeEmail(),
      body("password").exists().notEmpty(),
      handleResult,
      signIn,
    ]
  ),
  //   branch(
  //     (req) => req.body.provider === PROVIDER.FACEBOOK,
  //     [body("access_token").exists().notEmpty(), fbLogin]
  //   ),
  //   (req: Request, res: Response) => {
  //     res.status(400).json({ errors: "invalid provider" });
  //   },
]);

// router.route("/user/profile").get([authentication, getProfile]);

export default router;
