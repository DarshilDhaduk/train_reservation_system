import { useState } from "react";
import Layout from "../components/Layout";
import API from "../services/api";

export default function PNRStatus() {

  const [pnr, setPnr] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  const checkPNR = async () => {

    if (!pnr) {
      alert("Enter PNR number");
      return;
    }

    try {

      const res = await API.get(`/bookings/pnr/${pnr}`);

      setTicket(res.data);
      setError("");

    } catch (err) {

      setTicket(null);
      setError("PNR not found");

    }
  };

  return (
    <Layout>

      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Check PNR Status
        </h2>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Enter PNR Number"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            className="border p-2 flex-1 rounded"
          />

          <button
            onClick={checkPNR}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Check
          </button>

        </div>

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {ticket && (

          <div className="border rounded-lg p-4 bg-gray-50">

            <h3 className="text-lg font-bold mb-3">
              Train {ticket.trainNumber} - {ticket.trainName}
            </h3>

            <p><b>PNR:</b> {ticket.pnr}</p>
            <p><b>Passenger:</b> {ticket.passengerName}</p>
            <p><b>Age:</b> {ticket.age}</p>
            <p><b>Gender:</b> {ticket.gender}</p>

            <p><b>From:</b> {ticket.boardingStation}</p>
            <p><b>To:</b> {ticket.destinationStation}</p>

            <p><b>Class:</b> {ticket.className}</p>
            <p><b>Seat:</b> {ticket.seatNumber}</p>

            <p><b>Status:</b> {ticket.bookingStatus}</p>

            <p><b>Journey Date:</b> {new Date(ticket.date).toLocaleDateString()}</p>

            <p className="text-green-600 font-bold">
              Fare ₹{ticket.fare}
            </p>

          </div>

        )}

      </div>

    </Layout>
  );
}