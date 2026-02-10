import express from "express";
import { Types } from "mongoose";
import Vocab from "../models/vocabModel.ts";

const getVocab = async (req: express.Request, res: express.Response) => {
  const vocab = await Vocab.find({
    userId: new Types.ObjectId(req.user?.id),
  });
  res.status(200).json(vocab);
};

const getSingleVocab = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const vocab = await Vocab.findById(id).catch(() => null);
  if (!vocab) {
    res.status(404).json({ message: "Vocab not found" });
    return;
  }
  if (vocab.userId.toString() !== req.user?.id) {
    res.status(404).json({ message: "Vocab not found" });
    return;
  }
  res.status(200).json(vocab);
};

const createVocab = async (req: express.Request, res: express.Response) => {
  const { word, translation } = req.body;
  if (!word || !translation) {
    res.status(400).json({ message: "Word and translation are required" });
    return;
  }
  const newVocab = await Vocab.create({
    word,
    translation,
    userId: new Types.ObjectId(req.user?.id),
  });
  res.status(201).json(newVocab);
};

const updateVocab = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const { word, translation } = req.body;
  if (!word || !translation) {
    res.status(400).json({ message: "Word and translation are required" });
    return;
  }
  const vocab = await Vocab.findOneAndUpdate(
    { _id: id, userId: new Types.ObjectId(req.user?.id) },
    { word, translation },
    { new: true },
  ).catch(null);
  if (!vocab) {
    res.status(404).json({ message: "Vocab not found" });
    return;
  }
  res.status(200).json(vocab);
};

const reviewVocab = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const vocab = await Vocab.findOneAndUpdate(
    { _id: id, userId: new Types.ObjectId(req.user?.id) },
    { $inc: { reviewCount: 1 }, lastReviewedAt: new Date() },
    { new: true },
  ).catch(null);
  if (!vocab) {
    res.status(404).json({ message: "Vocab not found" });
    return;
  }
  res.status(200).json(vocab);
};

const deleteVocab = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const vocab = await Vocab.findOneAndDelete({
    _id: id,
    userId: new Types.ObjectId(req.user?.id),
  }).catch(null);
  if (!vocab) {
    res.status(404).json({ message: "Vocab not found" });
    return;
  }
  res.status(200).json({ message: "Vocab deleted" });
};

export {
  getVocab,
  getSingleVocab,
  createVocab,
  updateVocab,
  reviewVocab,
  deleteVocab,
};
