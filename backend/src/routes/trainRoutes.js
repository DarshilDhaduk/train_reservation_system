import express from "express";
import { addTrain, getAllTrains, searchTrains } from "../controllers/trainController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/", protect, adminOnly, addTrain);
router.get("/", protect, getAllTrains);
router.get("/search", protect, searchTrains);
export default router;
