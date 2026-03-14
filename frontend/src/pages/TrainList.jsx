import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function TrainList() {
  const location = useLocation();
  const { from, to, date } = location.state || {};
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [trains, setTrains] = useState([]);
  const navigate = useNavigate();

  const fetchTrains = useCallback(() => {
  if (from && to) {
      API.get(`/trains/search?from=${from}&to=${to}&date=${date}`)
      .then(res => setTrains(res.data))
      .catch(err => console.error(err));
  }
}, [from, to, date]);

  useEffect(() => {

  fetchTrains();

  const handleFocus = () => {
    fetchTrains();
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    window.removeEventListener("focus", handleFocus);
  };

}, [fetchTrains]);

useEffect(() => {

  const refreshOnBack = () => {
    fetchTrains();
  };

  window.addEventListener("pageshow", refreshOnBack);

  return () => {
    window.removeEventListener("pageshow", refreshOnBack);
  };

}, [fetchTrains]);

  const calculateFare = (train, coachType) => {

  const fromStation = train.stations.find(s => s.name === from);
  const toStation = train.stations.find(s => s.name === to);

  if(!fromStation || !toStation) return 0;

  const distance = Math.abs(toStation.distance - fromStation.distance);

  let rate = 0;

  switch(coachType){
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

  const baseFare = distance * rate;


  return baseFare;
};

  return (
    <Layout>
      <div className="max-w-5xl mx-auto mt-10">

        <h2 className="text-3xl font-bold mb-2">
          {from} to {to} Trains
        </h2>

        <p className="text-gray-500 mb-6">
          {trains.length} Trains found | {date}
        </p>

        {trains.length === 0 && (
          <p className="text-red-500">No trains found</p>
        )}

        {trains.map((train) => (
        <div
            key={train._id}
            className="bg-gray-50 rounded-2xl p-6 mb-6 shadow-sm"
        >
            {/* Top Section */}
            {/* Top Section */}
<div className="flex justify-between items-start mb-4">

  <div>
    {/* Train Number */}
    <h3 className="text-xl font-bold text-gray-800">
      {train.trainNumber} - {train.trainName}
    </h3>

    {/* Timing Row */}
    <p className="text-gray-700 mt-2 text-sm font-medium">
      00:15 {from?.slice(0,3).toUpperCase()}  
      <span className="mx-2 text-gray-400">•</span>
      4h 2m
      <span className="mx-2 text-gray-400">•</span>
      04:17 {to?.slice(0,3).toUpperCase()}
    </p>

    <p className="text-xs text-gray-400 mt-1">
      Updated 1 hr ago
    </p>
  </div>

  <button className="text-sm text-green-600 font-semibold">
    Schedule
  </button>

</div>

            {/* Class Boxes */}
            <div className="flex gap-4 flex-wrap">
            {train.coaches.map((coach, i) => {
  const availableSeats = coach.totalSeats - coach.bookedSeats.length;
  const isAvailable = availableSeats > 0;

  const isOpen =
    selectedCoach &&
    selectedCoach.trainId === train._id &&
    selectedCoach.index === i;

  return (
    <div key={i} className="relative">

      {/* Clickable Class Box */}
      <div
        onClick={() =>
          setSelectedCoach(
            isOpen
              ? null
              : { trainId: train._id, index: i }
          )
        }
        className={`w-36 rounded-xl p-4 border cursor-pointer transition 
        ${isAvailable
          ? "bg-green-50 border-green-200"
          : "bg-yellow-50 border-yellow-200"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-sm">
            {coach.classType}
          </span>

          <span className="text-sm font-medium">
            ₹{calculateFare(train, coach.classType)}
          </span>
        </div>

        <p
          className={`text-sm font-semibold 
          ${
            availableSeats <= 10 && availableSeats > 0
              ? "text-red-600"
              : isAvailable
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {availableSeats > 10
            ? `AVL ${availableSeats}`
            : availableSeats > 0
            ? `AVL ${availableSeats}`
            : "WL 10"}
        </p>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border shadow-lg rounded-lg p-4 z-50">
          <p className="text-sm mb-2">
            Class: <b>{coach.classType}</b>
          </p>

          <p className="text-sm mb-3">
            Available: {availableSeats}
          </p>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            onClick={() =>
                navigate(`/booking/${train._id}`, {
                    state: {
                    train,
                    coach,
                    from,
                    to,
                    date
                    }
                })
                }
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
})}
            </div>
        </div>
        ))}
      </div>
    </Layout>
  );
}