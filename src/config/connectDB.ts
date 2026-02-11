import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.CONNECTION_STRING || "", {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 5000,
      maxPoolSize: 10,
    });
  }

  try {
    const connection = await connectionPromise;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    connectionPromise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
