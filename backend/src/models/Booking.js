import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pnr: String,

  trainNumber: Number,
  trainName: String,

  boardingStation: String,
  destinationStation: String,

  departureTime: String,
  arrivalTime: String,

  date: Date,
  bookingDate: {
    type: Date,
    default: Date.now
  },

  distance: Number,
  fare: Number, 
  
  quota: {
    type: String,
    default: "GENERAL"
  },

  className: String,

  passengerName: String,
  age: Number,
  gender: {
    type: String,
    default: "M"
  },

mobile: String,
email: String,
cancellationDate: Date,

isCancelled: {
  type: Boolean,
  default: false
},

  seatNumber: Number,
  coachType: String,

  bookingStatus: String,
  currentStatus: String

}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);