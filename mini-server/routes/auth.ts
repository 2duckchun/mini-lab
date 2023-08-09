import express from "express";
import {
  createUser,
  sendEmail,
  checkIdDuplicate,
  checkNickNameDuplicate,
  signin,
} from "../controllers/auth";
import { verifyToken } from "./middleware/verifyToken";
export const authRouter = express.Router();

authRouter.post("/sendauthcode", sendEmail);

authRouter.post("/iddupcheck", checkIdDuplicate);

authRouter.post("/nicknamedupcheck", checkNickNameDuplicate);

authRouter.post("/signup", createUser);

authRouter.post("/signin", signin);

authRouter.get("/token-test", verifyToken, (req, res) => {
  res.json(req.decoded);
});
