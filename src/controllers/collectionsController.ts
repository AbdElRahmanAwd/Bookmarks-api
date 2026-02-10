import express from "express";
import { Types } from "mongoose";
import Collection from "../models/collectionsModel";
import type {
  Collection as CollectionType,
  CreateCollection,
  UpdateCollection,
} from "../types/collectionsTypes";

const getCollections = async (req: express.Request, res: express.Response) => {
  const collections: CollectionType[] = await Collection.find({
    userId: new Types.ObjectId(req.user?.id),
  });
  res.status(200).json(collections);
};

const getSingleCollection = async (
  req: express.Request,
  res: express.Response,
) => {
  const { id } = req.params;
  const collection = await Collection.findById(id).catch(() => null);
  if (!collection) {
    res.status(404).json({ message: "Collection not found" });
    return;
  }
  if (collection.userId.toString() !== req.user?.id) {
    res.status(404).json({ message: "Collection not found" });
    return;
  }
  res.status(200).json(collection);
};

const createCollection = async (
  req: express.Request,
  res: express.Response,
) => {
  const { name, description = "" }: CreateCollection = req.body;
  if (!name) {
    res.status(400).json({ message: "Name is required" });
    return;
  }
  const collection = await Collection.create({
    name,
    description,
    userId: new Types.ObjectId(req.user?.id),
  });
  res.status(201).json(collection);
};

const updateCollection = async (
  req: express.Request,
  res: express.Response,
) => {
  const { name, description }: UpdateCollection = req.body;
  const { id } = req.params;
  const collection = await Collection.findById(id).catch(() => null);
  if (!collection) {
    res.status(404).json({ message: "Collection not found" });
    return;
  }
  if (collection.userId.toString() !== req.user?.id) {
    res.status(404).json({ message: "Collection not found" });
    return;
  }
  if (name) {
    collection.name = name;
  }
  if (description) {
    collection.description = description;
  }
  await collection.save();
  res.status(200).json(collection);
};

const deleteCollection = async (
  req: express.Request,
  res: express.Response,
) => {
  const { id } = req.params;
  const collection = await Collection.findById(id).catch(() => null);
  if (!collection) {
    res.status(404).json({ message: "Collection not found" });
    return;
  }
  if (collection.userId.toString() !== req.user?.id) {
    res.status(404).json({ message: "Collection not found" });
    return;
  }
  await collection.deleteOne();
  res.status(200).json({ message: "Collection deleted" });
};

export {
  getCollections,
  getSingleCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};
