import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// const JWTTOKEN = "HELLOWORLD";
import morgan from "morgan";
import { db } from "./models";
import cors from "cors";
import { authRouter } from "./routes/auth";

const app = express();

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((error: any) => {
    console.error(error);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.listen(5000, () => {
  console.log("5000번 포트 개방");
});
