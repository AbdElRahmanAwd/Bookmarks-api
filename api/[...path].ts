import serverless from "serverless-http";
import app from "../src/server.ts";
import connectDB from "../src/config/connectDB.ts";

let isConnected = false;

async function ensureDB() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

export default async function handler(req: any, res: any) {
  await ensureDB();
  return serverless(app)(req, res);
}
