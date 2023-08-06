// 모델을 컨트롤하는 컨트롤러 작성
import User from "../models/user";
import { Response, Request, NextFunction } from "express";
import { sendEmail } from "../config/email";

export const sendEmailToUserText = (req: Request, res: Response) => {
  // sendEmail("kkts9308@gmail.com", String(123456));
  return res.status(201).json({
    statusCode: 201,
    message: "success",
  });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, age, comment } = req.body;

  // @ts-ignore
  User.create({
    name: name,
    age: age,
    comment: comment,
  })
    .then((data) => {
      console.log("성공했어요!");
      res.status(201).json({
        statusCode: 201,
        message: "User 생성 성공!",
      });
    })
    .catch((error) => {
      res.status(401).json({
        statusCode: 401,
        message: "잘못된 DB 접근입니다.",
      });
    });
};
