import Tour from "../model/tour.model.js";

// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tours" });
  }
};

// Get a single tour by ID
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tour" });
  }
};

// //Add a new tour with images
// export const createTour = async (req, res) => {
//   try {
//     const data = req.body;
//     // Save uploaded image paths
//     const images = req.files ? req.files.map(file => file.path) : [];
//     const tour = new Tour({ ...data, images });
//     await tour.save();
//     res.json({ message: "Tour created", tour });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create tour" });
//   }
// };


// Add a new tour with images
export const createTour = async (req, res) => {
  try {
    const data = req.body;
    // Store only the relative path for images
    const images = req.files
      ? req.files.map(file => file.path.replace(/\\/g, "/"))
      : [];
    // Optionally, if file.path returns absolute path, convert to relative:
    // const images = req.files.map(file => "uploads/" + file.filename)
    const tour = new Tour({ ...data, images });
    await tour.save();
    res.json({ message: "Tour created", tour });
  } catch (err) {
    res.status(500).json({ message: "Failed to create tour" });
  }
};