import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "./db/mysql";

const JWTTOKEN = "HELLOWORLD";
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

app.get("/practice-signin", async (req, res) => {
  const id = "2duckchun";
  const password = "123456789";
  const nickname = "2DC";
  const hash = await bcrypt.hash(password, 15);
  connection.query(
    `INSERT INTO users(id, password, nickname) VALUES('${id}', '${hash}', '${nickname}')`,
    (err, results, fields) => {
      if (err) {
        res.status(400).json({
          statusCode: 404,
          message: "잘못된 요청입니다.",
        });
      } else {
        res.status(200).json({
          statusCode: 200,
          message: "올바른 요청입니다.",
        });
      }
    }
  );
});

app.get("/make-token", async (req, res) => {
  const reqId = "2duckchun";
  const reqPassword = "123456789";

  connection.query(
    `SELECT id, password, nickname FROM users WHERE id = '${reqId}'`,
    async (err, results: any, fields) => {
      if (err) {
        return res.json({
          statusCode: 400,
          message: "유효하지 않은 로그인입니다.",
        });
      }
      const isCorrect = await bcrypt.compare(reqPassword, results[0].password);
      if (isCorrect) {
        const token = jwt.sign(
          {
            id: results[0].id,
            nickname: results[0].nickname,
          },
          JWTTOKEN,
          {
            expiresIn: 300 * 1000,
            issuer: "2duckchun",
          }
        );

        return res.json({
          statusCode: 200,
          message: "토큰이 발급되었습니다.",
          token,
        });
      }
    }
  );
});

app.get("/verify-token", (req, res) => {
  console.log(req.headers.authorization);
  res.send("<h1>토큰 확인</h1>");
});

app.get("/practice", (req, res) => {
  connection.query(
    "SELECT * FROM books",
    ["Page", 45],
    (err: unknown, results: unknown, fields: unknown) => {
      res.json(results);
    }
  );
});

app.listen(5000, () => {
  console.log("5000번 포트 개방");
});
