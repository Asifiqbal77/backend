import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  price: String,
  images: [String], // image file paths (Multer)
  itinerary: [String],
  highlights: [String],
  // Add more fields if you want!
});

export default mongoose.model('Tour', tourSchema);