import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import type { Login, Register, GoogleAuth } from "../types/authTypes";
import { tokenBlacklist } from "../services/tokenBlacklist";

const register = async (req: express.Request, res: express.Response) => {
  const { username, email, password } = req.body as Register;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  const { password: _, ...userWithoutPassword } = user.toJSON();

  res.status(201).json({
    message: "Registration successful",
    data: userWithoutPassword,
  });
};

const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body as Login;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await User.findOne({ email });

  if (
    user &&
    user.password &&
    (await bcrypt.compare(password, user.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "2h" },
    );
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(200).json({
      message: "Login successful",
      data: { ...userWithoutPassword, accessToken },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

const logout = async (req: express.Request, res: express.Response) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (
    authHeader &&
    typeof authHeader === "string" &&
    authHeader.startsWith("Bearer ")
  ) {
    const token = authHeader.split(" ")[1];
    if (token) {
      // Add token to blacklist
      tokenBlacklist.add(token);
    }
  }

  res.status(200).json({ message: "Logout successful" });
};

const google = async (req: express.Request, res: express.Response) => {
  const { googleId, email, username, avatar } = req.body as GoogleAuth;

  if (!email || !googleId) {
    res.status(400);
    throw new Error("Missing required Google authentication data");
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { googleId }] });

    if (user) {
      // User exists, update googleId if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user
      const newUserData: {
        username: string;
        email: string;
        googleId: string;
        avatar?: string;
      } = {
        username: username ?? email.split("@")[0] ?? "user",
        email,
        googleId,
      };

      if (avatar) {
        newUserData.avatar = avatar;
      }

      user = await User.create(newUserData);
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "2h" },
    );

    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({
      message: "Google authentication successful",
      data: { ...userWithoutPassword, accessToken },
    });
  } catch (error) {
    res.status(500);
    throw new Error("Google authentication failed");
  }
};

export { register, login, logout, google };
