import express from "express";
import expressAsyncHandler from "express-async-handler";
import validateTokenHandler from "../middleware/validateTokenHandler";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasksController";

const tasksRoutes = express.Router();

tasksRoutes.get("/", validateTokenHandler, expressAsyncHandler(getAllTasks));
tasksRoutes.get("/:id", validateTokenHandler, expressAsyncHandler(getTaskById));
tasksRoutes.post("/", validateTokenHandler, expressAsyncHandler(createTask));
tasksRoutes.put("/:id", validateTokenHandler, expressAsyncHandler(updateTask));
tasksRoutes.delete(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(deleteTask),
);

export default tasksRoutes;
