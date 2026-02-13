import mongoose from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskTimeFrame {
  TODAY = "today",
  THIS_WEEK = "this_week",
  THIS_MONTH = "this_month",
  THIS_YEAR = "this_year",
}

export interface ITask {
  title: string;
  description?: string;
  completed: boolean;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  timeFrame: TaskTimeFrame;
  notes?: string;
}
