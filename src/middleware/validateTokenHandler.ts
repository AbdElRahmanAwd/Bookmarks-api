/// <reference path="../types/express.d.ts" />
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { tokenBlacklist } from "../services/tokenBlacklist";

const validateTokenHandler = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  ) {
    res.status(401);
    throw new Error("Unauthorized: No token provided");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized: No token provided");
  }

  // Check if token is blacklisted
  if (tokenBlacklist.has(token)) {
    res.status(401);
    throw new Error("Unauthorized: Token has been revoked");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as jwt.JwtPayload & {
      user: { username: string; email: string; id: string };
    };

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Unauthorized: Invalid token");
  }
});

export default validateTokenHandler;
