import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../types/httpStatusCode";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ")[1] ?? "";
    req.decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string);
    // next middleware or Handler
    return next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        statusCode: HttpStatusCode.UNAUTHORIZED,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
