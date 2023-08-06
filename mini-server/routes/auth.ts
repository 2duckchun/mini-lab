import express from "express";
import { createUser } from "../controllers/auth";
import { sendEmailToUserText } from "../controllers/auth";
export const authRouter = express.Router();

authRouter.get("/sendEmailTest", sendEmailToUserText);

authRouter.post("/signin", createUser);
