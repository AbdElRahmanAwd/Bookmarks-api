import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;

export default async function connectDB() {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return mongoose;
  }

  // If connection is in progress, wait for it
  if (mongoose.connection.readyState === 2) {
    console.log("MongoDB connection in progress, waiting...");
    if (connectionPromise) {
      return await connectionPromise;
    }
  }

  // Create new connection
  if (!connectionPromise) {
    console.log("Creating new MongoDB connection...");
    connectionPromise = mongoose.connect(process.env.CONNECTION_STRING || "", {
      serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
      connectTimeoutMS: 10000, // Increased to 10 seconds
      socketTimeoutMS: 45000, // Increased to 45 seconds
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 10000,
      // Disable buffering - fail fast if not connected
      bufferCommands: false,
    });
  }

  try {
    const connection = await connectionPromise;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    console.log(`Connection state: ${mongoose.connection.readyState}`);
    return connection;
  } catch (error) {
    connectionPromise = null;
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
