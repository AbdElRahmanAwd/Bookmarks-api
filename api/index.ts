import app from "../src/server";
import connectDB from "../src/config/connectDB";

let isConnected = false;

async function ensureDB() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

export default async function handler(req: any, res: any) {
  try {
    // Connect to database with timeout protection
    await Promise.race([
      ensureDB(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("DB connection timeout")), 8000)
      ),
    ]);

    // Let Express handle the request
    return app(req, res);
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(503).json({
      message: "Service unavailable",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

