import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import authRoutes from "./routes/authRoutes";
import errorHandler from "./middleware/errorHandler";
import collectionsRoutes from "./routes/collectionsRoutes";
import vocabRoutes from "./routes/vocabRoutes";
import tasksRoutes from "./routes/tasksRoutes";

dotenv.config();
const PORT = process.env.PORT || 5000;
let isConnected = false;

async function ensureDB() {
  if (isConnected) return;
  await connectDB();
  isConnected = true;
}

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Mount routes - Vercel will automatically handle the /api prefix
app.use("/auth", authRoutes);
app.use("/collection", collectionsRoutes);
app.use("/vocab", vocabRoutes);
app.use("/tasks", tasksRoutes);
app.use(errorHandler);

export default app;

// Start server only if not in serverless environment (for local development)
if (require.main === module) {
  ensureDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
}
