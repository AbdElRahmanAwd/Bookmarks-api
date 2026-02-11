import serverless from "serverless-http";
import app from "../src/server";
import connectDB from "../src/config/connectDB";

let isConnected = false;

async function ensureDB() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

const serverlessHandler = serverless(app);

export default async function handler(req: any, res: any) {
  try {
    await ensureDB();
  } catch (error) {
    return res.status(500).json({
      message: "Database connection failed",
    });
  }

  return serverlessHandler(req, res);
}
