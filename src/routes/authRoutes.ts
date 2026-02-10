import express from "express";
import expressAsyncHandler from "express-async-handler";
import validateTokenHandler from "../middleware/validateTokenHandler.ts";
import {
  register,
  login,
  logout,
  google,
} from "../controllers/authController.ts";

const authRoutes = express.Router();

authRoutes.post("/register", expressAsyncHandler(register));
authRoutes.post("/login", expressAsyncHandler(login));
authRoutes.post("/logout", validateTokenHandler, expressAsyncHandler(logout));
authRoutes.post("/google", expressAsyncHandler(google));

export default authRoutes;
