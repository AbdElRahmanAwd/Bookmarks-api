import mongoose from "mongoose";

interface Vocab {
  word: string;
  sourceLanguage?: string;
  translation: string;
  targetLanguage?: string;
  example?: string;
  userId: mongoose.Types.ObjectId;
  collectionId?: mongoose.Types.ObjectId;
  lastReviewedAt?: Date;
  reviewCount?: number;
  isStarred?: boolean;
}

const vocabSchema = new mongoose.Schema<Vocab>(
  {
    word: {
      type: String,
      required: true,
    },
    sourceLanguage: {
      type: String,
      required: false,
    },
    targetLanguage: {
      type: String,
      required: false,
    },
    translation: {
      type: String,
      required: true,
    },
    example: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: false,
    },
    lastReviewedAt: {
      type: Date,
      required: false,
    },
    reviewCount: {
      type: Number,
      required: false,
      default: 0,
    },
    isStarred: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Vocab = mongoose.model<Vocab>("Vocab", vocabSchema);

export default Vocab;
