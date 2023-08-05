import express from "express";
import { createUser } from "../controllers/auth";

export const authRouter = express.Router();

authRouter.post("/signin", createUser);
