import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  name: String,
  distance: Number
});

const coachSchema = new mongoose.Schema({
  coachName: String,     // S1, B1, A1, H1
  classType: String,     // SL, 3A, 2A, 1A
  totalSeats: Number,
  bookedSeats: [Number]
});

const trainSchema = new mongoose.Schema({
  trainNumber: { type: Number, required: true },
  trainName: { type: String, required: true },
  stations: [stationSchema],
  coaches: [coachSchema]
});

export default mongoose.model("Train", trainSchema);
