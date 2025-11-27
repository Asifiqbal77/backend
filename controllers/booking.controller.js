import Booking from "../model/booking.model.js";

// GET /api/bookings  (admin - protected)
export const getAllBookings = async (req, res) => {
  try {
    // Optionally you can filter by tourId or customerEmail via query params
    const q = {};
    if (req.query.tourId) q.tourId = req.query.tourId;
    if (req.query.email) q.customerEmail = req.query.email;

    const bookings = await Booking.find(q).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("getAllBookings error:", err);
    res.status(500).json({ message: "Failed to load bookings" });
  }
};

// GET /api/booking/:id  (optional)
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error("getBookingById error:", err);
    res.status(500).json({ message: "Failed to get booking" });
  }
};
