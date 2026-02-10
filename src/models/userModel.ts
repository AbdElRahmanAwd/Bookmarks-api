import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
