import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
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

export default function SearchTrains() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleSearch = () => {
  if (!from || !to) {
    alert("Please enter source and destination");
    return;
  }
  navigate("/trains", {
    state: { from, to, date }
  });
};

  return (
    
    <Layout>
      <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white -z-10"></div>
      <div className="flex flex-col items-center mt-10">

        {/* TITLE */}
        <h2 className="text-4xl font-bold text-green-600 mb-2">
          Train Ticket Booking
        </h2>

        <p className="text-gray-500 mb-8">
          Easy IRCTC Booking Experience
        </p>

        {/* SEARCH BOX */}

        
        <div className="bg-gray-100  flex justify-center w-[100%]">
            <div className="relative bg-white rounded-3xl shadow-2xl p-4 pb-10 w-[100%] max-w-6xl">
             
             <div className="bg-gray-50 rounded-2xl shadow-md ">
                <div className="flex items-center ">
          {/* FROM */}
          <div className="flex-1 p-5  relative">
  <label className="text-gray-500 text-sm">From</label>

  <input
    type="text"
    value={from}
    placeholder="Enter Source"
    className="w-full outline-none text-lg font-semibold"
    onChange={(e) => {
      setFrom(e.target.value);
      setShowFromDropdown(true);
    }}
    onFocus={() => setShowFromDropdown(true)}
  />

  {showFromDropdown && (
    <div className="absolute left-0 top-full w-full bg-white border shadow-lg rounded mt-1 max-h-40 overflow-y-auto z-50">
      {gujaratStations
        .filter(city =>
          city.toLowerCase().includes(from.toLowerCase())
        )
        .map((city, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-green-100 cursor-pointer"
            onClick={() => {
              setFrom(city);
              setShowFromDropdown(false);
            }}
          >
            {city}
          </div>
        ))}
    </div>
  )}
</div>

{/* SWAP BUTTON */}
<button
  onClick={() => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }}
  className="bg-white border hover:bg-green-50 text-green-600 font-bold p-3 rounded-full shadow-md transition"
>
  ⇄
</button>

          {/* TO */}
          <div className="flex-1 p-5  relative">
  <label className="text-gray-500 text-sm">To</label>

  <input
    type="text"
    value={to}
    placeholder="Enter Destination"
    className="w-full outline-none text-lg font-semibold"
    onChange={(e) => {
      setTo(e.target.value);
      setShowToDropdown(true);
    }}
    onFocus={() => setShowToDropdown(true)}
  />

  {showToDropdown && (
    <div className="absolute left-0 top-full w-full bg-white border shadow-lg rounded mt-1 max-h-40 overflow-y-auto z-50">
      {gujaratStations
        .filter(city =>
          city.toLowerCase().includes(to.toLowerCase())
        )
        .map((city, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-green-100 cursor-pointer"
            onClick={() => {
              setTo(city);
              setShowToDropdown(false);
            }}
          >
            {city}
          </div>
        ))}
    </div>
  )}
</div>
          {/* DATE */}
          <div className="flex-1 p-5 ">
            <label className="text-gray-500 text-sm">Departure Date</label>
            <input
              type="date"
              className="w-full outline-none text-lg font-semibold"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        </div>

          {/* SEARCH BUTTON */}
         
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
          <button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-20 py-4 text-lg font-semibold rounded-full shadow-xl transition duration-300"
          >
            Search Trains
          </button>
        </div>

        </div>
        </div>
        
      </div>
    </Layout>
  );
}