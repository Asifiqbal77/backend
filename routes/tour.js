import express from "express";
import multer from "multer";
import {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
} from "../controllers/tourcontroller.js";

import auth from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// GET routes
router.get("/", getAllTours);
router.get("/:id", getTourById);

// CREATE (Admin only)
router.post("/", auth, upload.array("images", 10), createTour);

// UPDATE (Admin only)
router.put("/:id", auth, upload.array("images", 10), updateTour);

// DELETE (Admin only)
router.delete("/:id", auth, deleteTour);

export default router;