import express from "express";
import expressAsyncHandler from "express-async-handler";
import validateTokenHandler from "../middleware/validateTokenHandler";
import {
  getVocab,
  getSingleVocab,
  createVocab,
  updateVocab,
  deleteVocab,
  reviewVocab,
} from "../controllers/vocabController";

const vocabRoutes = express.Router();

vocabRoutes.get("/", validateTokenHandler, expressAsyncHandler(getVocab));
vocabRoutes.get(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(getSingleVocab),
);
vocabRoutes.post("/", validateTokenHandler, expressAsyncHandler(createVocab));
vocabRoutes.put("/:id", validateTokenHandler, expressAsyncHandler(updateVocab));
vocabRoutes.patch(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(reviewVocab),
);
vocabRoutes.delete(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(deleteVocab),
);

export default vocabRoutes;
