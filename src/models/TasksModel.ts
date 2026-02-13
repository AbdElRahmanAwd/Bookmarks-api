import mongoose from "mongoose";
import {
  TaskStatus,
  TaskPriority,
  TaskTimeFrame,
  ITask,
} from "../types/taskTypes";

interface Task extends ITask {
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    timeFrame: {
      type: String,
      enum: Object.values(TaskTimeFrame),
      default: TaskTimeFrame.TODAY,
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

const Task = mongoose.model<Task>("Task", taskSchema);

export default Task;
