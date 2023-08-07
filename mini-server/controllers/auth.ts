// 모델을 컨트롤하는 컨트롤러 작성
import User from "../models/user";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import { senderConfig, setSendEmail } from "../config/email";

export const sendEmail = (req: Request, res: Response) => {
  const { userEmail, authCode } = req.body;
  const smtpTransport = nodemailer.createTransport(senderConfig);
  const mail = setSendEmail(userEmail, authCode);

  smtpTransport.sendMail(mail, (error, response) => {
    if (error) {
      console.error(error);
      res.status(421).json({
        statusCode: 421,
        message: "이메일이 전송되지 않았습니다.",
      });
    } else {
      console.log(response);
      res.status(200).json({
        statusCode: 200,
        message: "이메일이 전송되었습니다.",
      });
    }
    smtpTransport.close();
  });
};

export const checkNickNameDuplicate = (req: Request, res: Response) => {
  const { nickname } = req.body;

  // @ts-ignore
  User.findOne({
    attributes: ["nickname"],
    where: {
      nickname,
    },
  })
    .then((response) => {
      if (response === null) {
        res.status(200).json({
          statusCode: 200,
          message: "사용 가능한 닉네임입니다.",
        });
      } else {
        res.status(409).json({
          statusCode: 409,
          message: "중복된 닉네임이 있습니다.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ...error,
        statusCode: 500,
        message: "잘못된 DB 접근입니다.",
      });
    });
};

export const checkIdDuplicate = (req: Request, res: Response) => {
  const { userInputId } = req.body;

  // @ts-ignore
  User.findOne({
    attributes: ["loginId"],
    where: {
      loginId: userInputId,
    },
  })
    .then((response) => {
      if (response === null) {
        res.status(200).json({
          statusCode: 200,
          message: "사용 가능한 ID입니다.",
        });
      } else {
        res.status(409).json({
          statusCode: 409,
          message: "중복된 ID가 있습니다.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ...error,
        statusCode: 500,
        message: "잘못된 DB 접근입니다.",
      });
    });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { loginId, password, email, nickname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 13);

  // @ts-ignore
  User.create({
    loginId: loginId,
    password: hashedPassword,
    email: email,
    nickname: nickname,
  })
    .then((data) => {
      console.log("성공했어요!");
      res.status(201).json({
        statusCode: 201,
        message: "User 생성 성공!",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        ...error,
        statusCode: 500,
        message: "잘못된 DB 접근입니다.",
      });
    });
};
