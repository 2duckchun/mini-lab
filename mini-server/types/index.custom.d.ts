declare namespace Express {
  interface Request {
    decoded?: string | JwtPayload;
  }
}
