import app from "../src/server";
import connectDB from "../src/config/connectDB";
import mongoose from "mongoose";

export default async function handler(req: any, res: any) {
  try {
    // Ensure database is connected before processing any request
    if (mongoose.connection.readyState !== 1) {
      console.log("Connecting to database...");
      await Promise.race([
        connectDB(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("DB connection timeout")), 8000),
        ),
      ]);
      console.log("Database connected successfully");
    }

    // Wait a bit to ensure connection is fully ready
    if (mongoose.connection.readyState === 1) {
      // Let Express handle the request
      return app(req, res);
    } else {
      throw new Error("Database connection not ready");
    }
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(503).json({
      message: "Service unavailable - Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
