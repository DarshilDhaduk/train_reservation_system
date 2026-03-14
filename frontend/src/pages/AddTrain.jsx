import Layout from "../components/Layout";
import { useState } from "react";
import API from "../services/api";
const gujaratStations = [
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Anand",
  "Bharuch",
  "Gandhinagar",
  "Mehsana",
  "Junagadh",
  "Navsari",
  "Valsad",
  "Porbandar",
  "Kutch",
  "Morbi",
  "Patan",
  "Banaskantha",
  "Sabarkantha",
  "Dahod"
];

export default function AddTrain() {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainName, setTrainName] = useState("");
  const [stations, setStations] = useState([]);
  const [coaches, setCoaches] = useState([]);

  const [stationName, setStationName] = useState("");
  const [distance, setDistance] = useState("");

  const [coachName, setCoachName] = useState("");
  const [classType, setClassType] = useState("SL");
  const [totalSeats, setTotalSeats] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Add Station
  const addStation = () => {
  if (!stationName || !distance)
    return alert("Fill station details");

  // Prevent duplicate
  if (stations.some(s => s.name === stationName))
    return alert("Station already added");

  // Validate increasing distance
  if (
    stations.length > 0 &&
    Number(distance) <= stations[stations.length - 1].distance
  ) {
    return alert("Distance must be greater than previous station");
  }

  setStations([
    ...stations,
    { name: stationName, distance: Number(distance) }
  ]);

  setStationName("");
  setDistance("");
};

  // Add Coach
  const addCoach = () => {
    if (!coachName || !totalSeats) return alert("Fill coach details");

    setCoaches([
      ...coaches,
      {
        coachName,
        classType,
        totalSeats: Number(totalSeats),
        bookedSeats: []
      }
    ]);

    setCoachName("");
    setTotalSeats("");
  };

  // Submit Train
  const submitTrain = async () => {
    if (!trainNumber || stations.length === 0 || coaches.length === 0) {
      return alert("Complete all details");
    }

    try {
      await API.post("/trains", {
      trainNumber: Number(trainNumber),
      trainName,
      stations,
      coaches
    });

      alert("✅ Train Added Successfully");

      setTrainNumber("");
      setTrainName("");
      setStations([]);
      setCoaches([]);
    } catch (error) {
      alert("Error adding train");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">

        <h2 className="text-2xl font-bold mb-6 text-green-600">
          Add Train
        </h2>

        {/* Train Number */}
        <input
          type="number"
          placeholder="Train Number"
          className="border p-3 w-full mb-6"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Train Name (e.g., Gujarat Express)"
          className="border p-3 w-full mb-6"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
        />

        {/* Stations Section */}
        <h3 className="font-semibold mb-2">Add Stations</h3>

        <div className="flex gap-3 mb-3">
         <div className="relative flex-1">
  <input
    placeholder="Station Name"
    className="border p-2 w-full"
    value={stationName}
    onChange={(e) => {
      setStationName(e.target.value);
      setShowDropdown(true);
    }}
    onFocus={() => setShowDropdown(true)}
  />

  {showDropdown && (
    <div className="absolute left-0 w-full bg-white border shadow-md rounded mt-1 max-h-40 overflow-y-auto z-50">
      {gujaratStations
        .filter(city =>
          city.toLowerCase().includes(stationName.toLowerCase())
        )
        .map((city, index) => (
          <div
            key={index}
            className="p-2 hover:bg-green-100 cursor-pointer"
            onClick={() => {
              setStationName(city);
              setShowDropdown(false);   // ✅ Auto hide
            }}
          >
            {city}
          </div>
        ))}
    </div>
  )}
</div>

          <input
            type="number"
            placeholder="Distance"
            className="border p-2 w-32"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          <button
            onClick={addStation}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Station List */}
        <ul className="mb-6">
  {stations.map((s, index) => (
    <li
      key={index}
      className="flex justify-between items-center text-sm text-gray-600 mb-1"
    >
      {s.name} - {s.distance} km

      <button
        onClick={() =>
          setStations(stations.filter((_, i) => i !== index))
        }
        className="text-red-500 text-xs"
      >
        Remove
      </button>
    </li>
  ))}
</ul>

        {/* Coaches Section */}
        <h3 className="font-semibold mb-2">Add Coaches</h3>

        <div className="flex gap-3 mb-3">
          <input
            placeholder="Coach Name"
            className="border p-2"
            value={coachName}
            onChange={(e) => setCoachName(e.target.value)}
          />

          <select
            className="border p-2"
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
          >
            <option value="SL">SL</option>
            <option value="3A">3A</option>
            <option value="2A">2A</option>
            <option value="1A">1A</option>
            <option value="CC">CC</option>
            <option value="EC">EC</option>
          </select>

          <input
            type="number"
            placeholder="Total Seats"
            className="border p-2 w-32"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
          />

          <button
            onClick={addCoach}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Coach List */}
        <ul className="mb-6">
          {coaches.map((c, index) => (
            <li key={index} className="text-sm text-gray-600">
              {c.coachName} - {c.classType} - {c.totalSeats} seats
            </li>
          ))}
        </ul>

        {/* Submit */}
        <button
          onClick={submitTrain}
          className="bg-green-600 text-white px-6 py-3 rounded w-full"
        >
          Submit Train
        </button>

      </div>
    </Layout>
  );
}