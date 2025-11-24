import express from "express";
import multer from "multer";
import { getAllTours, getTourById, createTour } from "../controllers/tourcontroller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get("/", getAllTours);
router.get("/:id", getTourById);
// For admin: create tour with images (protected)
router.post("/", auth, upload.array("images", 10), createTour);

export default router;




// import express from "express";
// import multer from "multer";
// import { getAllTours, getTourById, createTour } from "../controllers/tourController.js";

// const router = express.Router();

// // Multer config for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, './uploads'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// router.get("/", getAllTours);
// router.get("/:id", getTourById);
// // For admin: create tour with images
// router.post("/", upload.array("images", 10), createTour);

// export default router;