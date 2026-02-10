import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const connection = await mongoose.connect(
      process.env.CONNECTION_STRING || "",
    );
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
