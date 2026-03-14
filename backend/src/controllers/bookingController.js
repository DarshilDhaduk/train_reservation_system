import Booking from "../models/Booking.js";
import Train from "../models/Train.js";
import User from "../models/User.js";

const generatePNR = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

export const createBooking = async (req, res) => {
  try {

    const {
      trainId,
      coachType,
      seatNumber,
      passengerName,
      age,
      gender,
      mobile,
      email,
      quota,
      date,
      from,
      to
    } = req.body;
    
    const train = await Train.findById(trainId);

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    const fromStation = train.stations.find(s => s.name === from);
    const toStation = train.stations.find(s => s.name === to);

const distance = Math.abs(toStation.distance - fromStation.distance);

// class rate calculation
      let rate = 0;

      switch (coachType) {

        case "SL":
          rate = 2;
          break;

        case "3A":
          rate = 4;
          break;

        case "2A":
          rate = 8;
          break;

        case "1A":
          rate = 16;
          break;

        case "CC":
          rate = 10;
          break;

        default:
          rate = 2;
      }

      // base fare
      const baseFare = distance * rate;

      // reservation charge
      let reservationCharge = coachType === "SL" ? 20 : 35;

      // final fare
      const totalFare = baseFare + reservationCharge;

      const existingSeat = await Booking.findOne({
        trainNumber: train.trainNumber,
        coachType,
        seatNumber,
        date,
        isCancelled: { $ne: true }
      });

    if (existingSeat) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    const pnr = generatePNR();

    const booking = await Booking.create({

      user: req.user._id,

      pnr,

      trainNumber: train.trainNumber,
      trainName: train.trainName,

      boardingStation: from,
      destinationStation: to,

      departureTime: "N.A.",
      arrivalTime: "N.A.",

      date,
      bookingDate: new Date(),

      distance,

      quota,

      className: coachType,

      passengerName,
      age,
      gender,
      mobile,
      email,
      
      seatNumber,
      coachType,

      bookingStatus: `CNF/${coachType}/${seatNumber}`,
      currentStatus: `CNF/${coachType}/${seatNumber}`,

      fare: totalFare
    });


    // 🔹 UPDATE TRAIN COACH SEATS
    const coach = train.coaches.find(c => c.classType === coachType);

    if (coach) {
      if (!coach.bookedSeats.includes(seatNumber)) {
        coach.bookedSeats.push(seatNumber);
      }
    }

    await train.save();

    res.status(201).json(booking);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
};

export const getAllBookings = async (req,res)=>{
  const bookings = await Booking.find().populate("user");
  res.json(bookings);
};

export const getUserBookings = async (req,res)=>{
  const bookings = await Booking.find({ user:req.user._id });
  res.json(bookings);
};

export const getBookedSeats = async (req, res) => {
  try {
    const { trainId, coachType, date } = req.query;

    const train = await Train.findById(trainId);

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    const bookings = await Booking.find({
      trainNumber: train.trainNumber,
      coachType,
      date,
      isCancelled: { $ne: true }
    });

    const seats = bookings.map(b => b.seatNumber);

    res.json(seats);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch seats" });
  }
};

export const getTicketByPNR = async (req, res) => {
  try {

    const { pnr } = req.params;

    const booking = await Booking.findOne({ pnr });

    if (!booking) {
      return res.status(404).json({ message: "PNR not found" });
    }

    res.json(booking);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTicketForCancel = async (req,res)=>{
  try{

    const { pnr,email,mobile } = req.body;

    const booking = await Booking.findOne({
      pnr,
      email,
      mobile
    });

    if(!booking){
      return res.status(404).json({
        message:"Ticket not found or details mismatch"
      });
    }

    res.json(booking);

  }catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"});
  }
};

export const cancelTicket = async (req, res) => {

  try {

    const { pnr } = req.params;

    const booking = await Booking.findOne({ pnr });

    if (!booking) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (booking.isCancelled) {
      return res.status(400).json({ message: "Already cancelled" });
    }

    booking.isCancelled = true;
    booking.bookingStatus = "CANCELLED";
    booking.currentStatus = "CANCELLED";
    booking.cancellationDate = new Date();
    
    await booking.save();

    // release seat
    const train = await Train.findOne({
      trainNumber: booking.trainNumber
    });

    if (train) {

  const coach = train.coaches.find(
    c => c.classType === booking.coachType
  );

  if (coach) {

    coach.bookedSeats = coach.bookedSeats.filter(
      seat => seat !== booking.seatNumber
    );

  }

  await train.save();

}

    res.json({ message: "Ticket cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Cancellation failed" });
  }

};