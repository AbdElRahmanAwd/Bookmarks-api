import express from "express";
import expressAsyncHandler from "express-async-handler";
import validateTokenHandler from "../middleware/validateTokenHandler.ts";
import {
  getCollections,
  getSingleCollection,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../controllers/collectionsController.ts";

const collectionsRoutes = express.Router();

collectionsRoutes.get(
  "/",
  validateTokenHandler,
  expressAsyncHandler(getCollections),
);
collectionsRoutes.get(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(getSingleCollection),
);
collectionsRoutes.post(
  "/",
  validateTokenHandler,
  expressAsyncHandler(createCollection),
);
collectionsRoutes.put(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(updateCollection),
);
collectionsRoutes.delete(
  "/:id",
  validateTokenHandler,
  expressAsyncHandler(deleteCollection),
);

export default collectionsRoutes;
