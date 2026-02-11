import serverless from "serverless-http";
import app from "../src/server";
import connectDB from "../src/config/connectDB";

let isConnected = false;

async function ensureDB() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("DB init timeout"));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

const serverlessHandler = serverless(app);

export default async function handler(req: any, res: any) {
  try {
    await withTimeout(ensureDB(), 4000);
  } catch (error) {
    return res.status(503).json({
      message: "Service unavailable: database connection timeout",
    });
  }

  return serverlessHandler(req, res);
}
