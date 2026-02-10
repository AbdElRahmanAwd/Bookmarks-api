import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.ts";
import authRoutes from "./routes/authRoutes.ts";
import errorHandler from "./middleware/errorHandler.ts";
import collectionsRoutes from "./routes/collectionsRoutes.ts";
import vocabRoutes from "./routes/vocabRoutes.ts";

const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/collection", collectionsRoutes);
app.use("/api/vocab", vocabRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
