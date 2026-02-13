import express from "express";
import { Types } from "mongoose";
import Task from "../models/TasksModel";
import { ITask } from "../types/taskTypes";

const getAllTasks = async (req: express.Request, res: express.Response) => {
  const tasks = await Task.find({
    userId: new Types.ObjectId(req.user?.id),
  });
  res.status(200).json(tasks);
};

const getTaskById = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const task = await Task.findOne({
    _id: id,
    userId: new Types.ObjectId(req.user?.id),
  }).catch(() => null);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json(task);
};

const createTask = async (req: express.Request, res: express.Response) => {
  const data: ITask = req.body;
  if (!data || !data.title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }
  const newTask = await Task.create({
    ...data,
    userId: new Types.ObjectId(req.user?.id),
  });
  res.status(201).json(newTask);
};

const updateTask = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const data: ITask = req.body;
  if (!data) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: new Types.ObjectId(req.user?.id) },
    data,
    { new: true },
  ).catch(() => null);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.status(200).json(task);
};

const deleteTask = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({
    _id: id,
    userId: new Types.ObjectId(req.user?.id),
  }).catch(() => null);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.status(200).json({ message: "Task deleted successfully" });
};

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
