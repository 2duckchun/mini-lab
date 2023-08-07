import express from "express";
import {
  createUser,
  sendEmail,
  checkIdDuplicate,
  checkNickNameDuplicate,
} from "../controllers/auth";
export const authRouter = express.Router();

authRouter.post("/sendauthcode", sendEmail);

authRouter.post("/iddupcheck", checkIdDuplicate);

authRouter.post("/nicknamedupcheck", checkNickNameDuplicate);

authRouter.post("/signin", createUser);
