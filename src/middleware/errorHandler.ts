import express from "express";
import errorsConstant from "../constants/errorsConstant";

const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const statusCode = res.statusCode
    ? res.statusCode
    : errorsConstant.INTERNAL_SERVER_ERROR;

  switch (statusCode) {
    case errorsConstant.VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case errorsConstant.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case errorsConstant.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case errorsConstant.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    case errorsConstant.INTERNAL_SERVER_ERROR:
      res.json({
        title: "Internal Server Error",
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
      });
      break;
    default:
      console.log("No error, all good!");
      break;
  }
};

export default errorHandler;
