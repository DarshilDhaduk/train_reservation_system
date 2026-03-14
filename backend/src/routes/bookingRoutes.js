import express from "express";
import {
  createBooking,
  getAllBookings,
  getUserBookings,
  getBookedSeats,
  getTicketByPNR,
  getTicketForCancel,
  cancelTicket
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/admin", protect, adminOnly, getAllBookings);
router.get("/my", protect, getUserBookings);
router.get("/seats", protect, getBookedSeats);
router.get("/pnr/:pnr", getTicketByPNR);
router.post("/cancel/search", getTicketForCancel);
router.put("/cancel/:pnr", cancelTicket);
export default router;