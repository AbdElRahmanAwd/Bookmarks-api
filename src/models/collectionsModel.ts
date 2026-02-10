import mongoose from "mongoose";

interface ICollection {
  name: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
}

const collectionSchema = new mongoose.Schema<ICollection>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Collection = mongoose.model<ICollection>("Collection", collectionSchema);

export default Collection;
