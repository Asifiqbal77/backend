import express from "express";
import { getAllBookings, getBookingById } from "../controllers/booking.controller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/bookings  -- protected for admin (uses your existing auth middleware)
router.get("/", auth, getAllBookings);

// GET /api/booking/:id  -- optional single booking
router.get("/:id", auth, getBookingById);

export default router;
