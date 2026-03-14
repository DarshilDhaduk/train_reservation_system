import Train from "../models/Train.js";
import Booking from "../models/Booking.js";

export const addTrain = async (req, res) => {
  try {
    const { trainNumber, trainName, stations, coaches } = req.body;

    const train = await Train.create({
      trainNumber,
      trainName,
      stations,
      coaches
    });

    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTrains = async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
};

// @desc   Search trains by from & to
// @route  GET /api/trains/search
// @access Private
export const searchTrains = async (req, res) => {
  try {

    const { from, to, date } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: "From and To required" });
    }

    const trains = await Train.find({
      stations: {
        $all: [
          { $elemMatch: { name: from } },
          { $elemMatch: { name: to } }
        ]
      }
    });

    // 🔵 UPDATE BOOKED SEATS FROM BOOKINGS
    const updatedTrains = await Promise.all(
      trains.map(async (train) => {

        const updatedcoaches = await Promise.all(
          train.coaches.map(async (coach) => {

            const bookings = await Booking.find({
              trainNumber: train.trainNumber,
              coachType: coach.classType,
              date,
              isCancelled: { $ne: true }
            });

            return {
              ...coach.toObject(),
              bookedSeats: bookings.map(b => b.seatNumber)
            };

          })
        );

        return {
          ...train.toObject(),
          coaches: updatedcoaches
        };

      })
    );

    res.json(updatedTrains);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};