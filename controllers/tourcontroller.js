import Tour from "../model/tour.model.js";

// ---------------- GET ALL TOURS ----------------
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tours" });
  }
};

// ---------------- GET TOUR BY ID ----------------
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: "Failed to get tour" });
  }
};

// ---------------- CREATE NEW TOUR ----------------
// Accepts: name, location, duration, price, maxPeople, imageUrl, description
export const createTour = async (req, res) => {
  try {
    const {
      name,
      location,
      duration,
      price,
      maxPeople,
      imageUrl,
      description,
    } = req.body;

    // Your frontend uses "imageUrl" (single string)
    // Backend schema uses "images" (array)
    const images = [];

    if (req.files && req.files.length > 0) {
      // Case: Image uploaded with Multer
      req.files.forEach((file) =>
        images.push(file.path.replace(/\\/g, "/"))
      );
    } else if (imageUrl) {
      // Case: Image URL manually typed in your form
      images.push(imageUrl);
    }

    const newTour = new Tour({
      name,
      location,
      duration,
      price,
      maxPeople,
      description,
      images,
    });

    await newTour.save();

    res.json({
      message: "Tour created successfully",
      tour: newTour,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create tour" });
  }
};

// ---------------- UPDATE A TOUR ----------------
export const updateTour = async (req, res) => {
  try {
    const {
      name,
      location,
      duration,
      price,
      maxPeople,
      imageUrl,
      description,
    } = req.body;

    let images = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) =>
        images.push(file.path.replace(/\\/g, "/"))
      );
    } else if (imageUrl) {
      images.push(imageUrl);
    }

    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        name,
        location,
        duration,
        price,
        maxPeople,
        description,
        images,
      },
      { new: true }
    );

    if (!updatedTour)
      return res.status(404).json({ message: "Tour not found" });

    res.json({
      message: "Tour updated successfully",
      tour: updatedTour,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update tour" });
  }
};

// ---------------- DELETE A TOUR ----------------
export const deleteTour = async (req, res) => {
  try {
    const deleted = await Tour.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Tour not found" });

    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete tour" });
  }
};